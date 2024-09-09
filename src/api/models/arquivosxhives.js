'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class arquivosXhives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      arquivosXhives.belongsTo(models.arquivos, {foreignKey: 'arquivo_id'});
      arquivosXhives.belongsTo(models.hives, {foreignKey: 'hive_id'});
    }
  }
  arquivosXhives.init({
    hive_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    arquivos_id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'arquivosXhives',
  });
  return arquivosXhives;
};