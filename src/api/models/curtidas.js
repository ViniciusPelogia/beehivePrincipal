'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class curtidas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      curtidas.hasOne(models.interacoes, {foreignKey: 'curtida_id'})
    }
  }
  curtidas.init({
    curtida: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'curtidas',
  });
  return curtidas;
};