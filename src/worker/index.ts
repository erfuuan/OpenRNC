import async from 'async';
import Service from '../service/index';
import redis from './redis';
import webHook from './webHook';

let isWorkerRunning = false;
async function workerV2() {
  // if (isWorkerRunning) {return;}
  let allConsumeData: any[];
  setInterval(async () => {
    allConsumeData = await Service.CRUD.collectionCount('Consume');
    console.log({ length: allConsumeData });
    const consumeData = await Service.CRUD.find('Consume', { status: 'todo' }, [], '', 'pipelineId', 400);
    if (consumeData.length !== 0) {
      isWorkerRunning = true;
      async.each(consumeData, async (CD: any) => {
        let pipeLienData = await Service.CRUD.findById('Pipeline', CD.pipelineId.toString(), []);
        if (pipeLienData) {
          let pipelineArr = pipeLienData.destinationIds;
          async.each(pipelineArr, async (el: any) => {
            let destinatinDetails = await Service.CRUD.findById('Destination', el.toString(), []);
            if (destinatinDetails.platform === 'redis') {
              await redis(destinatinDetails.credential, 'data', CD.data);
              await Service.CRUD.updateById('Consume', { status: 'done' }, CD._id, [], '');
            }
            if (destinatinDetails.platform === 'webHook') {
              const response = await webHook(destinatinDetails.credential.method, destinatinDetails.credential.url);
              if (response.data) {
                // await Service.CRUD.updateById('Consume', { status: 'done' }, CD._id, [], '');
                await Service.CRUD.hardDelete('Consume', CD._id);
              }
            }
          });
        }
      });
    } else {
      console.log('no data');
      setTimeout(() => {
        isWorkerRunning = false;
        workerV2();
      }, 4000); 
    }
  }, 70);
  // }, 1000);
}

export default workerV2;
