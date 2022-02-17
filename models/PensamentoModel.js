const { DataTypes } = require('sequelize')

const db = require('../database/connection')

//User
const User = require('./UserModel')

const Pensamento = db.define('Pensamento', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  }
})

Pensamento.belongsTo(User)
User.hasMany(Pensamento)

module.exports = Pensamento