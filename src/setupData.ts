import { faker } from '@faker-js/faker';
import Service from './service/index';

export default {
      async createSource() {
        const platform = ['android', 'ios', 'web', 'flutter'];
        for (let i = 0; i <= 49; i++) {
          await Service.CRUD.create('Source', {
            title: faker.lorem.word(),
            platform: platform[faker.datatype.number({ min: 0, max: 3 })],
            description: faker.lorem.words(7),
            sourceToken: faker.finance.bitcoinAddress(),
            sourceLicence: faker.finance.bitcoinAddress(),
          });
        }
      },


      async createDestination() {
        // const platform = ['redis', 'kafka', 'webhook', 'mysql'];
        // const platform = ['redis', 'mongo', 'webHook'];
        const platform = ['webHook', 'webHook', 'webHook'];
        const redisCredential = { address: '17.0.0.1', port: '6379' };
        const mongoCredential = { address: 'localhost', port: '27017', dbName: 'test' };
        const urlCredential = {
          //  url: 'https://jsonplaceholder.typicode.com/todos/1' ,
           url: 'http://localhost:3003/api/v1/test' ,
           method:'GET'
          };
        for (let i = 0; i <= 49; i++) {
          let randomPlatform = platform[faker.datatype.number({ min: 0, max: 2 })];
          let CredentialData
          // if(randomPlatform=="redis"){CredentialData=redisCredential}
          // if(randomPlatform=="mongo"){CredentialData=mongoCredential}
          if(randomPlatform=="webHook"){CredentialData=urlCredential}
          await Service.CRUD.create('Destination', {
            title: faker.lorem.word(),
            platform: randomPlatform,
            credential: CredentialData,
          });
        }
      },

    async createPipleine() {
      const sources = await Service.CRUD.find('Source', {}, [], '', '_id');
      const destinations = await Service.CRUD.find('Destination', {}, [], '', '_id');
    console.log(sources
        )
      sources.forEach(async(source) => {
          let dest=destinations[faker.datatype.number({ min: 0, max: 41 })]._id.toString()
        //   console.log(dest)
        await Service.CRUD.create('Pipeline', {
          title: faker.lorem.word(),
          description: faker.lorem.words(7),
          sourceId: source._id.toString(),
          destinationIds:dest
        });
      });
    },

  async createConsumeData() {
    const pipelines = await Service.CRUD.find('Pipeline', {}, [], '', 'id');
    // console.log(pipelines);
    pipelines.forEach(async (pipeline) => {
        // console.log(pipeline)
    
      await Service.CRUD.create('Consume', {
        pipelineId: pipeline._id.toString(),
        status: 'todo',
        data: {
          // id: faker.finance.bic({ includeBranchCode: true }),
          // first_name: faker.name.firstName(),
          // last_name: faker.name.lastName(),
          // email: faker.internet.email(),
        },
      });
    });
  },
};
