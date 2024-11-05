/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('curtidas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      curtida: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('PRAGMA foreign_keys = OFF;'); // Desabilita as restrições de chave estrangeira
    await queryInterface.dropTable('curtidas');
    await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;'); // Habilita novamente as restrições de chave estrangeira
  }
};