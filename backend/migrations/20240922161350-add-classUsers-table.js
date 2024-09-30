// migrations/[timestamp]-create-class-users-table.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classUsers', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'userId'
        },
        onDelete: 'CASCADE'
      },
      classId: {
        type: Sequelize.UUID,
        references: {
          model: 'Classes',
          key: 'classId'
        },
        onDelete: 'CASCADE'
      },
      role: {
        type: Sequelize.ENUM('member', 'admin', 'creator'),
        defaultValue: 'member'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('classUsers');
  }
};
