'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class administradors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      administradors.belongsTo(models.usuarios, { foreignKey: 'usuario_id'})
      administradors.hasOne(models.hives, { foreignKey: 'adm_id'})
    }
  }
  administradors.init({
    usuario_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'administradors',
  });
  return administradors;
};