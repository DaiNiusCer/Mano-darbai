//Modulių importavimas
import mysql from 'mysql2/promise';
//Modulių importavimas
const mysqlConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT
}

const connect = await mysql.createConnection(mysqlConfig)

export default connect