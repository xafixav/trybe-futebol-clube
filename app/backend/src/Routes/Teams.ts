import * as express from 'express';
import TeamsController from '../controller/Teams';

const { findOne, findAll } = new TeamsController();

const router = express.Router();

router
  .route('/teams')
  .get(
    findAll,
  );

router
  .route('/teams/:id')
  .get(
    findOne,
  );

export default router;
