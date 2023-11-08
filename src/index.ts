import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routers from './routes';
import logger from './utils/logger';
import { errorMiddleware } from './utils/middlewares/error';
import { extractUser } from "./utils/middlewares/auth"
import "./data-source"
import "./messaging/consumers"
import config from "./config"





const app = express();
const port = config.service_port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(extractUser)


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(routers)
app.use(errorMiddleware)

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});

export default app;