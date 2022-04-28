import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matches from './Matches';
// import OtherModel from './OtherModel';

class Teams extends Model {
}

Teams.init({
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
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'homeTeam'});
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'awayTeam'});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
