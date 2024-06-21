'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participantes.init({
    nome: DataTypes.STRING,
    funcao: DataTypes.STRING
    /* ,idProjeto: DataTypes.INTEGER */
  }, {
    sequelize,
    modelName: 'Participantes',
    tableName: 'Participantes',
  });
  return Participantes;
};