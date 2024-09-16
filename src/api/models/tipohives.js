'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class tipoHives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tipoHives.hasMany(models.hives, { foreignKey: 'tipo_id'})
    }
  }
  tipoHives.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipoHives',
  });
  return tipoHives;
};