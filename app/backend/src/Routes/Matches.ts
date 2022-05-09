import * as express from 'express';
import Matches from '../controller/Matches';

const { findAll } = new Matches();

const router = express.Router();

router
  .route('/matches')
  .get(
    findAll,
  );

export default router;
