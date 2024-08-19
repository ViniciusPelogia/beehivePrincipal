'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class hives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hives.init({
    nome: DataTypes.STRING,
    codigo_acesso: DataTypes.STRING,
    qtd_membros: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hives',
    defaultScope:{
      attributes:{
        exclude:['codigo_acesso']
      }
    }
  });
  return hives;
};