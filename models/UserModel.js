const { DataTypes } = require('sequelize')

const db = require('../database/connection')

const User = db.define('User', {
  nome: {
    type: DataTypes.STRING,
    require: true
  },
  email: {
    type: DataTypes.STRING,
    require: true
  },
  senha: {
    type: DataTypes.STRING,
    require: true
  }
})


module.exports = User