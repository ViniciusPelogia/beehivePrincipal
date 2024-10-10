'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class interacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      interacoes.belongsTo(models.usuarios, {foreignKey: 'usuario_id'});
      interacoes.belongsTo(models.imagens, {foreignKey: 'imagem_id'});
      interacoes.belongsTo(models.arquivos, {foreignKey: 'arquivo_id'});
      interacoes.belongsTo(models.comentarios, {foreignKey: 'comentario_id'});
    }
  }
  interacoes.init({
    tipo: DataTypes.STRING,
    hora: DataTypes.DATE,
    imagem_id: DataTypes.UUID,
    arquivo_id: DataTypes.UUID,
    usuario_id: DataTypes.UUID,
    comentario_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'interacoes',
  });
  return interacoes;
};