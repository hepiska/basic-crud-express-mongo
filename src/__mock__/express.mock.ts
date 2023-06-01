import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { errorMiddleware } from '../utils/middlewares/error';





const genetareApp = (router: Router) => {

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
  app.use(router);
  app.use(errorMiddleware)
  return app;

}


export default genetareApp;

