'use strict';
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('arquivosXhives', {
      arquivo_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'arquivos', key: 'id' }
      },
      hive_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'hives', key: 'id' }
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
    await queryInterface.dropTable('arquivosXhives');
  }
};