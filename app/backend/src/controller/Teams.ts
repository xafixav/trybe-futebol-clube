import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../service/Teams';

export default class TeamsController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AllTeams = await this.teamService.findAll();
      return res.status(StatusCodes.OK).json(AllTeams);
    } catch (e) {
      next(e);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.teamService.findOne(Number(id));
      return res.status(StatusCodes.OK).json(team);
    } catch (e) {
      next(e);
    }
  };
}
