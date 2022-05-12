import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../service/Leaderboards';

export default class LeaderboardController {
  private LeaderBoard: LeaderBoardService;

  constructor() {
    this.LeaderBoard = new LeaderBoardService();
  }

  public generateLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await this.LeaderBoard.createLeaderboard();
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  };
}
