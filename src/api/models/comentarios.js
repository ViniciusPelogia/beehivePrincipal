'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class comentarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comentarios.hasOne(models.interacoes, {foreignKey: 'comentario_id'})
    }
  }
  comentarios.init({
    comentario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comentarios',
  });
  return comentarios;
};