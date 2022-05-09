import { StatusCodes } from 'http-status-codes';
import IMatches from '../interfaces/IMatches';
import ErrorExtension from '../utility/ErrorExtension';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  private static noMatchFoundMessage = 'No match has been found';

  public findAll = async () => {
    const allMatches = this.inProgressToBoolean(await this.findMatchAll());

    if (!allMatches) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
        message: MatchesService.noMatchFoundMessage });
    }

    return allMatches;
  };

  public findByQuery = async (query: string) => {
    if (query === 'true') {
      const matchesInProgress = this.inProgressToBoolean(await this.findInProgressTrue());
      if (!matchesInProgress) {
        throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
          message: MatchesService.noMatchFoundMessage });
      }
      return matchesInProgress;
    }
    if (query === 'false') {
      const matchesNotInProgress = this.inProgressToBoolean(await this.findInProgressFalse());
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
      attributes: [['team_name', 'teamName']],
    }, {
      model: Teams,
      as: 'teamAway',
      attributes: [['team_name', 'teamName']],
    }],
    attributes: ['id',
      ['home_team', 'homeTeam'],
      ['home_team_goals', 'homeTeamGoals'],
      ['away_team', 'awayTeam'],
      ['away_team_goals', 'awayTeamGoals'],
      ['in_progress', 'inProgress']],
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
    attributes: ['id',
      ['home_team', 'homeTeam'],
      ['home_team_goals', 'homeTeamGoals'],
      ['away_team', 'awayTeam'],
      ['away_team_goals', 'awayTeamGoals'],
      ['in_progress', 'inProgress']],
    where: { in_progress: 0 },
  });

  private findMatchAll = async () => Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: [['team_name', 'teamName']],
    }, {
      model: Teams,
      as: 'teamAway',
      attributes: [['team_name', 'teamName']],
    }],
    attributes: ['id',
      ['home_team', 'homeTeam'],
      ['home_team_goals', 'homeTeamGoals'],
      ['away_team', 'awayTeam'],
      ['away_team_goals', 'awayTeamGoals'],
      ['in_progress', 'inProgress']],
  });

  private inProgressToBoolean = (allMatches: IMatches[]) => {
    if (allMatches) {
      if (allMatches[0]?.dataValues) {
        return allMatches.map(({ dataValues }: any) => {
          let newEl;
          if (dataValues.inProgress === 1) {
            newEl = { ...dataValues, inProgress: true };
          } else {
            newEl = { ...dataValues, inProgress: false };
          }
          return newEl;
        });
      }
      return allMatches;
    }
  };
}
