/* eslint-disable no-unused-vars */
'use strict';
/* eslint-disable no-undef */

import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
    username: DataTypes.STRING,
    senha: DataTypes.STRING,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    biografia: DataTypes.STRING,
    rede_social: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    defaultScope:{
      attributes:{
        exclude:['senha']
      }
    }
  });
  return usuarios;
};