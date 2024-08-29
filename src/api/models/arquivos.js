'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class arquivos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      arquivos.hasOne(models.interacoes, { foreignKey: 'arquivo_id' });
      arquivos.hasOne(models.arquivosXhives, { foreignKey: 'arquivo_id' });
      arquivos.belongsTo(models.usuarios, {foreignKey: 'usuario_id'});
    }
  }
  arquivos.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    tipo: DataTypes.STRING,
    tamanho: DataTypes.STRING,
    caminho: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'arquivos',
  });
  return arquivos;
};