import mongoose from 'mongoose'
import authData from './auth.json'

const connectionString = authData.connectionString

export function connectToDatabase (): void {
  mongoose.connect(connectionString, {
    appName: 'app',
    dbName: 'app'
  })
    .then(_ => {
      console.log('Connected to database')
    })
    .catch(error => {
      console.log('Failed to connect to database', error)
    })
}

export function disconnectFromDataBase (): void {
  mongoose.disconnect()
    .then(_ => {
      console.log('Disconnected from database')
    })
    .catch(error => {
      console.log('Failed to disconnect from database', error)
    })
}
