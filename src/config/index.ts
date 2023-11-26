import dotenv from 'dotenv';
dotenv.config()


export default {
  mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME || "1h"
}