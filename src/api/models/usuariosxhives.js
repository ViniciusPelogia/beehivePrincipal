'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class usuariosXhives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuariosXhives.belongsTo(models.usuarios, { foreignKey: 'usuario_id' });
      usuariosXhives.belongsTo(models.hives, {foreignKey: 'hive_id'});
    }
  }
  usuariosXhives.init({
    id_hive: DataTypes.STRING,
    id_usuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuariosXhives',
  });
  return usuariosXhives;
};