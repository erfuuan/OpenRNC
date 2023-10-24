import Service from '../service/index';
import redis from './redis';

async function worker() {
  // setTimeout(() => {
    setInterval(async () => {
      console.log('start read data at : ', new Date());
      const consumeData = await Service.CRUD.findOneRecord('Consume', { status: 'todo' }, []);
      if (consumeData) {
        console.log(consumeData)
        let pipeLienData = await Service.CRUD.findById('Pipeline', consumeData.pipelineId.toString(), []);
        if (pipeLienData) {
          console.log(pipeLienData)
          let pipelineArr = pipeLienData.destinationIds;
          pipelineArr?.forEach(async (el) => {
            console.log(el.toString())
            let destinatinDetails: any = await Service.CRUD.findById('Destination', el.toString(), []);
            console.log(destinatinDetails)
            if (destinatinDetails.platform === 'redis') {
              await redis(destinatinDetails.credential, 'data', consumeData.data);
              await Service.CRUD.updateById('Consume', { status: 'done' }, consumeData._id, [], '');
            }
          });
        }
      }
    }, 50);
  // }, 1000);
}

export default worker;
