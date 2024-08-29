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
    id_arquivo: DataTypes.STRING,
    id_hive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'arquivosXhives',
  });
  return arquivosXhives;
};