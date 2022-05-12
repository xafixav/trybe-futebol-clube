import { Op } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderBoard';
import ITeam from '../interfaces/ITeam';
import Teams from './Teams';
import MatchesServ from './Matches';
import Match from '../database/models/Matches';
import IMatches from '../interfaces/IMatches';

export default class LeaderboardService {
  private TeamService: Teams;

  private MatchService: MatchesServ;

  constructor() {
    this.TeamService = new Teams();
    this.MatchService = new MatchesServ();
  }

  public createLeaderboard = async () => this.mountTeamsPoints();

  private mountTeamsPoints = async () => {
    const allTeams = await this.TeamService.findAll();
    const teamsScore = allTeams.map((team: ITeam) => this.mountTeamScore(team));
    const response: ILeaderboard[] = await Promise.all(teamsScore);
    const sorted = response.sort(this.sortTable);
    return sorted;
  };

  private mountTeamScore = async (team: ITeam) => {
    const { id, teamName } = team;
    const matchesFromThisTeam = await Match.findAll({
      where: {
        in_progress: false,
        [Op.or]: [{ home_team: id }, { away_team: id }],
      },
    });
    // const matchesFromThisTeam = allMatches
    //   .filter(
    //     ({ homeTeam, awayTeam }: IMatches) =>
    //       (homeTeam === id || awayTeam === id),
    //   ).filter((match) => match.inProgress === false);
    const teamGoalsObj = await this.countTeamGoals(matchesFromThisTeam, team);
    const teamPointsObj = await this.countTeamPoints(matchesFromThisTeam, team);
    const result = {
      name: teamName,
      ...teamPointsObj,
      ...teamGoalsObj,
      effiency: Number(((teamPointsObj.totalPoints / (teamPointsObj.totalGames * 3)) * 100)
        .toFixed(2)),
    };
    return result;
  };

  private countTeamGoals = async (arrofMatches: IMatches[], team: ITeam) => {
    const { id } = team;
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;
    arrofMatches.forEach((match: IMatches) => {
      if (match.homeTeam === id) {
        goalsFavor += Number(match.homeTeamGoals);
      } else {
        goalsOwn += Number(match.awayTeam);
      }
      if (match.awayTeam === id) {
        goalsFavor += Number(match.awayTeam);
      } else {
        goalsOwn += Number(match.homeTeam);
      }
    });
    goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  private countTeamPoints = async (arrofMatches: IMatches[], team: ITeam) => {
    const { id } = team;
    let totalPoints = 0;
    let totalGames = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    arrofMatches.forEach((match: IMatches) => {
      if (match.homeTeam === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) { totalPoints += 3; totalVictories += 1; }
        if (match.homeTeamGoals === match.awayTeamGoals) { totalPoints += 1; totalDraws += 1; }
        totalGames += 1;
      } else {
        if (match.awayTeamGoals > match.homeTeamGoals) { totalPoints += 3; totalVictories += 1; }
        if (match.awayTeamGoals === match.homeTeamGoals) { totalPoints += 1; totalDraws += 1; }
        totalGames += 1;
      }
    });
    const totalLosses = totalGames - totalVictories - totalDraws;

    return { totalPoints, totalGames, totalVictories, totalLosses, totalDraws };
  };

  private sortTable = (a: ILeaderboard, b: ILeaderboard) => {
    if (b.totalPoints > a.totalPoints) return 1;
    if (b.totalPoints < a.totalPoints) return -1;

    if (b.totalVictories > a.totalVictories) return 1;
    if (b.totalVictories < a.totalVictories) return -1;

    if (b.goalsBalance > a.goalsBalance) return 1;
    if (b.goalsBalance < a.goalsBalance) return -1;

    if (b.goalsFavor > a.goalsFavor) return 1;
    if (b.goalsFavor < a.goalsFavor) return -1;

    if (b.goalsOwn > a.goalsOwn) return -1;
    if (b.goalsOwn < a.goalsOwn) return 1;

    return 0;
  };
}
