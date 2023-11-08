import { consumer } from "../utils/kafka/kafka"
import { ConsumerSubscribeTopic, EachMessagePayload } from 'kafkajs'
import logger from "../utils/logger"



const topics: Record<string, ConsumerSubscribeTopic> = {
  'round-robin': {
    topic: 'round-robin',
    fromBeginning: true
  },
  'group-by-key': {
    topic: 'group-by-key',
    fromBeginning: true
  },
  'group-by-key-2': {
    topic: 'group-by-key-2',
    fromBeginning: true
  },
  'retry': {
    topic: 'retry',
    fromBeginning: true
  }
}

const handleMessages = async ({ topic, partition, message }: EachMessagePayload) => {
  switch (topic) {
    case 'round-robin':
      logger.info(`round-robin key-${message.key?.toString()} partition-${partition} message-${message?.value?.toString()} `)
      return;
    case 'group-by-key-2':
      logger.info(`group-by-key key-${message.key?.toString()} partition-${partition} message-${message?.value?.toString()} `)
      return
    case 'retry':
      logger.info(`retry key-${message.key?.toString()} partition-${partition} message-${message?.value?.toString()}`)
      // throw new Error('retry-topic')
      return
    default:
      break;
  }
}



const run = async () => {
  await consumer.connect();
  const subcribers = Object.keys(topics).map(async (key) => {
    await consumer.subscribe(topics[key]);
  })

  await Promise.all(subcribers)

  consumer.run({
    autoCommit: true,
    autoCommitThreshold: 2,
    eachMessage: handleMessages
  })


}

run()