'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class arquivos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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