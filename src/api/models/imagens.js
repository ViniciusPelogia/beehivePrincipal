'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class imagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      imagens.hasOne(models.interacoes, {foreignKey: 'imagem_id'})
      imagens.hasOne(models.imagensXhives, {foreignKey: 'imagem_id'})
      imagens.belongsTo(models.usuarios, {foreignKey: 'usuario_id'});
    }
  }
  imagens.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    caminho: DataTypes.STRING,
    usuario_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'imagens',
  });
  return imagens;
};