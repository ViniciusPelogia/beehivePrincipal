'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class imagensXhives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      imagensXhives.belongsTo(models.imagens, {foreignKey: 'imagem_id'});
      imagensXhives.belongsTo(models.hives, {foreignKey: 'hive_id'});
    }
  }
  imagensXhives.init({
    hive_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    imagem_id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'imagensXhives',
  });
  return imagensXhives;
};