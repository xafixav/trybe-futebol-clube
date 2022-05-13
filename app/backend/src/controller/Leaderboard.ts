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
      const leaderBoard = await this.LeaderBoard.createLeaderboard('all');
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  };

  public generateLeaderboardAway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await this.LeaderBoard.createLeaderboard('away');
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  };

  public generateLeaderboardHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await this.LeaderBoard.createLeaderboard('home');
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  };
}
