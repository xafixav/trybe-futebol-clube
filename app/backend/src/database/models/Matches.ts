import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';
// import OtherModel from './OtherModel';

class Matches extends Model {
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
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
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'awayTeam' });

export default Matches;
