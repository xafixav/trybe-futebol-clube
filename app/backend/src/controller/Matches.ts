import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
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
}
