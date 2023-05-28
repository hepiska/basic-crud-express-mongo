import { DataSource, EntitySchema, MixedList } from "typeorm"
import logger from "../utils/logger";
import config from "../config";

export const intiateDataSource = (entities: MixedList<string | EntitySchema<any>> | undefined) => {
  const AppDataSource = new DataSource({
    type: "mongodb",
    useNewUrlParser: true,
    url: config.mongo_uri,
    synchronize: true,
    entities: entities
  })



  AppDataSource.initialize()
    .then(() => {
      logger.info("Data Source has been initialized!")
    })
    .catch((err) => {
      logger.error("Error during Data Source initialization", err)
    })

  return AppDataSource

}

