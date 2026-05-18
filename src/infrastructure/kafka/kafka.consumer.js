import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.BROKER || 'localhost:9092']
})

const consumer = kafka.consumer({groupId: 'post-group'})

async function startConsumer() {
    await consumer.connect()

    await consumer.subscribe({
        topic: 'post-events',
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Event Triggered...');
            console.log({
                value: message.value.toString(),
            })
        },
    })
}

export default startConsumer