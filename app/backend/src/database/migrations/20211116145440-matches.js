module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'          
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        field: 'home_team'
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
      },
      away_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'          
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        field: 'away_team',
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
