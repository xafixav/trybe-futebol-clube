import * as express from 'express';
import LeaderBoardController from '../controller/Leaderboard';

const leaderBoard = new LeaderBoardController();

const router = express.Router();

router
  .route('/leaderboard/home')
  .get(
    leaderBoard.generateLeaderboardHome,
  );

router
  .route('/leaderboard/away')
  .get(
    leaderBoard.generateLeaderboardAway,
  );

router
  .route('/leaderboard')
  .get(
    leaderBoard.generateLeaderboard,
  );

export default router;
