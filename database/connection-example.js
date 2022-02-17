const { Sequelize } = require('sequelize')

const dbURL =
  'DRIVER://USER:PASSWORD@HOST/DBNAME'

const dbsequelize = new Sequelize(dbURL)

try {
  dbsequelize.authenticate()
  console.log('Conectado ao banco de dados!')
} catch(err) {
  console.log(`Não foi possível conectar: ${err}`)
}


module.exports = dbsequelize