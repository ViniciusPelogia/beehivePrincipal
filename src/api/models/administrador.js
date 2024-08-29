'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class administrador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      administrador.belongsTo(models.usuarios, { foreignKey: 'usuario_id'})
    }
  }
  administrador.init({
    adm_id: DataTypes.STRING,
    usuario_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'administrador',
  });
  return administrador;
};