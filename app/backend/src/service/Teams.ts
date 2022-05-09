import { StatusCodes } from 'http-status-codes';
import ErrorExtension from '../utility/ErrorExtension';
import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/Teams';
import JwtService from './Jwt';

export default class TeamsController {
  jwt: JwtService;

  constructor() {
    this.jwt = new JwtService();
  }

  public findOne = async (id: number): Promise<ITeam> => {
    const Team = await Teams.findOne({ where: { id },
      raw: true,
      attributes: ['id', ['team_name', 'teamName']] });

    if (!Team) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST, message: 'Team not found' });
    }

    return Team;
  };

  public findAll = async () => {
    const allTeams = await Teams.findAll({ raw: true,
      attributes: ['id', ['team_name', 'teamName']] });

    if (!allTeams) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST, message: 'Team not found' });
    }

    return allTeams;
  };
}