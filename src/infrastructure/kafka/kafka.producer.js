import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.BROKER || 'localhost:9092']
})

const producer = kafka.producer()

class KafkaPostProducer {
    async sendPostCreateEvent(postId){
        await producer.connect()

        await producer.send({
            topic: 'post-events',
            messages: [
                {
                    value: `Post with ID: ${postId} created successfully`
                }
            ]
        })
    }
    
    async sendAllPostsEvent(){
        await producer.connect()

        await producer.send({
            topic: 'post-events',
            messages: [
                {
                    value: `All posts retreived successfully`
                }
            ]
        })
    }
    
    async sendSinglePostEvent(postId){
        await producer.connect()

        await producer.send({
            topic: 'post-events',
            messages: [
                {
                    value: `Post with id: ${postId} retreived successfully`
                }
            ]
        })
    }
}

export default KafkaPostProducer
