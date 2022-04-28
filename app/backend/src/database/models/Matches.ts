import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Matches extends Model {
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  home_team: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
  },
  away_team: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
  },
  in_progress: {
    type: DataTypes.INTEGER,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

export default Matches;
