'use strict';
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('interacoes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      tipo: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'usuarios', key: 'id' }
      },
      imagem_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'imagens', key: 'id' }
      },
      arquivo_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'arquivos', key: 'id' }
      },
      comentario_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'comentarios', key: 'id' }
      },
      hive_id: {
        allowNull: false,
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('interacoes');
  }
};