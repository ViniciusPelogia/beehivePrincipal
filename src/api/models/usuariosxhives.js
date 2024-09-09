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
      usuariosXhives.belongsTo(models.hives, {foreignKey: 'hive_id'});
      usuariosXhives.belongsTo(models.usuarios, { foreignKey: 'usuario_id' });
    }
  }
  usuariosXhives.init({
    hive_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'usuariosXhives',
  });
  return usuariosXhives;
};