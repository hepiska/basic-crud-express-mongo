import dotenv from 'dotenv';
dotenv.config()


export default {
  mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME || "1h",
  service_name: process.env.SERVICE_NAME || "consumer-app",
  service_port: process.env.SERVICE_PORT || 3000,
  brokers: process.env.BROKERS || 'localhost:9092'
}