import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';
// import OtherModel from './OtherModel';

class Matches extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;

  public teamHome: { teamName: string };

  public teamAway: { teamName: string };
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
