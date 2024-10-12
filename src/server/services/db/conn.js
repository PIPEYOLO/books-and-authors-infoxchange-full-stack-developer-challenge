'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.connectToDatabase = connectToDatabase
exports.disconnectFromDataBase = disconnectFromDataBase
const mongoose_1 = require('mongoose')
const auth_json_1 = require('./auth.json')
const connectionString = auth_json_1.default.connectionString
function connectToDatabase () {
  mongoose_1.default.connect(connectionString, {
    appName: 'app',
    dbName: 'app'
  })
    .then(function (_) {
      console.log('Connected to database')
    })
    .catch(function (error) {
      console.log('Failed to connect to database', error)
    })
}
function disconnectFromDataBase () {
  mongoose_1.default.disconnect()
    .then(function (_) {
      console.log('Disconnected from database')
    })
    .catch(function (error) {
      console.log('Failed to disconnect from database', error)
    })
}
