import { Kafka } from 'kafkajs';
import config from '../../config';
import logger from '../logger';


logger.info('config.brokers' + config.brokers.split(','));
const kafka = new Kafka({
  clientId: 'consumer-app',
  brokers: config.brokers.split(',')
});



export const consumer = kafka.consumer({ groupId: 'test-group-1', retry: { initialRetryTime: 50, retries: 2 } });


export const producer = kafka.producer();


export default kafka;