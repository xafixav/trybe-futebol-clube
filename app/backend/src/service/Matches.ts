import { StatusCodes } from 'http-status-codes';
import ErrorExtension from '../utility/ErrorExtension';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  private static noMatchFoundMessage = 'No match has been found';

  public findAll = async () => {
    const allMatches = await this.findMatchAll();

    if (!allMatches) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
        message: MatchesService.noMatchFoundMessage });
    }

    return allMatches;
  };

  public findByQuery = async (query: string) => {
    if (query === 'true') {
      const matchesInProgress = await this.findInProgressTrue();
      if (!matchesInProgress) {
        throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
          message: MatchesService.noMatchFoundMessage });
      }
      return matchesInProgress;
    }
    if (query === 'false') {
      const matchesNotInProgress = await this.findInProgressFalse();
      if (!matchesNotInProgress) {
        throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
          message: MatchesService.noMatchFoundMessage });
      }
      return matchesNotInProgress;
    }
  };

  private findInProgressTrue = () => Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: ['teamName'],
    }, {
      model: Teams,
      as: 'teamAway',
      attributes: ['teamName'],
    }],
    where: { in_progress: 1 },
  });

  private findInProgressFalse = () => Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: [['team_name', 'teamName']],
    }, {
      model: Teams,
      as: 'teamAway',
      attributes: [['team_name', 'teamName']],
    }],
    where: { in_progress: 0 },
  });

  private findMatchAll = async () => Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: ['teamName'],
    }, {
      model: Teams,
      as: 'teamAway',
      attributes: ['teamName'],
    }],
  });
}
