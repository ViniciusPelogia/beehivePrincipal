'use strict';
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      tamanho: {
        type: Sequelize.STRING
      },
      caminho: {
        type: Sequelize.STRING
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('imagens');
  }
};