import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import INewMatch from '../interfaces/INewMatch';
import ErrorExtension from '../utility/ErrorExtension';
import TeamService from './Teams';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IUpdateMatch from '../interfaces/IUpdateMatch';

export default class MatchesService {
  private static noMatchFoundMessage = 'No match has been found';

  private teams: TeamService;

  constructor() {
    this.teams = new TeamService();
  }

  public findAll = async () => {
    const allMatches = await this.findMatchAll();

    if (!allMatches) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
        message: MatchesService.noMatchFoundMessage });
    }

    return allMatches;
  };

  private validateTeams = async (data: INewMatch) => {
    const { awayTeam, homeTeam } = data;
    if (data.awayTeam === data.homeTeam) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: 'It is not possible to create a match with two equal teams' });
    }
    await this.teams.findOne(homeTeam);
    await this.teams.findOne(awayTeam);
  };

  public createMatch = async (data: INewMatch) => {
    await this.validateTeams(data);
    const createdMatch = await Matches.create(data);

    return createdMatch;
  };

  public endMatch = async (id: number) => {
    const MatchToEnd = Matches.findOne({ where: { id } });
    if (!MatchToEnd) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: MatchesService.noMatchFoundMessage });
    }
    const MatchEnded = await Matches.update({
      inProgress: false,
    }, {
      where: { id },
    });
    return MatchEnded;
  };

  public updateMatch = async (data: IUpdateMatch) => {
    const { id, homeTeamGoals, awayTeamGoals } = data;
    const matchSelected = Matches.findOne({ where: { id } });
    if (!matchSelected) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: MatchesService.noMatchFoundMessage });
    }
    const MatchEnded = await Matches.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });
    return MatchEnded;
  };

  public findTeamMatchesById = async (id: number) => {
    const matchesFromThisTeam = await Matches.findAll({
      where: {
        in_progress: false,
        [Op.or]: [{ home_team: id }, { away_team: id }],
      },
    });

    return matchesFromThisTeam;
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
