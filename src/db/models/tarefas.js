'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarefas.init({
    titulo: DataTypes.STRING,
    estado: DataTypes.STRING,
    tempoEstimado: DataTypes.STRING,
    dataPrevista: DataTypes.DATE,
    projetoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarefas',
    tableName: 'Tarefas',
  });
  return Tarefas;
}