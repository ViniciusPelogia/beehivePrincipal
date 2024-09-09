'use strict';
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuariosXhives', {
      hive_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'hives', key: 'id' }
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'usuarios', key: 'id' }
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
    await queryInterface.dropTable('usuariosXhives');
  }
};