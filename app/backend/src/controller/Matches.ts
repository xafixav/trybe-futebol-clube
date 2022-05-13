import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUpdateMatch from '../interfaces/IUpdateMatch';
import MatchesService from '../service/Matches';

export default class MatchesController {
  private MatchesService: MatchesService;

  constructor() {
    this.MatchesService = new MatchesService();
  }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      if (inProgress === 'true' || inProgress === 'false') {
        const matchesFiltered = await this.MatchesService.findByQuery(inProgress);
        return res.status(StatusCodes.OK).json(matchesFiltered);
      }
      const allMatches = await this.MatchesService.findAll();
      return res.status(StatusCodes.OK).json(allMatches);
    } catch (e) {
      next(e);
    }
  };

  public createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const matchesFiltered = await this.MatchesService
        .createMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
      return res.status(StatusCodes.CREATED).json(matchesFiltered);
    } catch (e) {
      next(e);
    }
  };

  public endMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const matchEnded = await this.MatchesService.endMatch(+id);
      return res.status(StatusCodes.OK).json(matchEnded);
    } catch (e) {
      next(e);
    }
  };

  public updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { id } = req.params;
      const updateRequest: IUpdateMatch = {
        homeTeamGoals,
        awayTeamGoals,
        id: +id,
      };
      const matchUpdated = await this.MatchesService.updateMatch(updateRequest);
      return res.status(StatusCodes.OK).json(matchUpdated);
    } catch (e) {
      next(e);
    }
  };

  public findTeamMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const matchEnded = await this.MatchesService.findTeamMatchesById(+id, 'all');
      return res.status(StatusCodes.OK).json(matchEnded);
    } catch (e) {
      next(e);
    }
  };
}
