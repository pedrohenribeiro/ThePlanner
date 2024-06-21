'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projetos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projetos.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    dataInicial: DataTypes.DATE,
    dataFinal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Projetos',
    tableName: 'Projetos',
  });
  return Projetos;
};