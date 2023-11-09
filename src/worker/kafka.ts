import { Kafka } from 'kafkajs'
interface Idata{
    brokers :string[],
    clientId :string,
    topic:string,
    message:any
}

async function startProduce(data:Idata) {
    const kafka = new Kafka({
        clientId: data.clientId,
        brokers: data.brokers
    })
const producer = kafka.producer()    
    await producer.connect()
    await producer.send({
        topic: data.topic,
        // messages: [{ value: '' }],
        messages: [data.message],
    })
    await producer.disconnect()
}
export default startProduce