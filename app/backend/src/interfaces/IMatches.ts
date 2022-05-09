export default interface IMatches {
  dataValues?: IMatches,
  'id': number,
  'homeTeam': number,
  'homeTeamGoals': number,
  'awayTeam': number,
  'awayTeamGoals': number,
  'inProgress': number,
  'teamHome': {
    'teamName': string
  },
  'teamAway': {
    'teamName': string
  }
}
