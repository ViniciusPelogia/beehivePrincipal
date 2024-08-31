/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hives', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      nome: {
        type: Sequelize.STRING
      },
      codigo_acesso: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      privada: {
        type: Sequelize.BOOLEAN
      },
      imagem:{
        type:Sequelize.STRING
      },
      qtd_membros: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('hives');
  }
};