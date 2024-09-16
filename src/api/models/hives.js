'use strict';
/* eslint-disable no-unused-vars */
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class hives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hives.hasMany(models.arquivosXhives, { foreignKey: 'hive_id'})
      hives.hasMany(models.imagensXhives, { foreignKey: 'hive_id'})
      hives.hasMany(models.usuariosXhives, { foreignKey: 'hive_id'})
      hives.hasOne(models.administrador, { foreignKey: 'hive_id' });
      hives.belongsTo(models.tipoHives, {foreignKey: 'tipo_id'});
    }
  }
  hives.init({
    nome: DataTypes.STRING,
    codigo_acesso: DataTypes.STRING,
    descricao: DataTypes.STRING,
    privada: DataTypes.BOOLEAN,
    imagem:DataTypes.STRING,
    qtd_membros: DataTypes.INTEGER,
    tipo_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hives',
    defaultScope:{
      attributes:{
        exclude:['codigo_acesso']
      }
    }
  });
  return hives;
};