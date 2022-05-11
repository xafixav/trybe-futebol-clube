import * as express from 'express';
import Matches from '../controller/Matches';

const MatchController = new Matches();

const router = express.Router();

router
  .route('/matches')
  .get(
    MatchController.findAll,
  );

router
  .route('/matches')
  .post(
    MatchController.createMatch,
  );

router
  .route('/matches/:id/finish')
  .patch(
    MatchController.endMatch,
  );

router
  .route('/matches/:id/')
  .patch(
    MatchController.updateMatch,
  );

export default router;
