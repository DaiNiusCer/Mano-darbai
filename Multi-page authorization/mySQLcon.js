import mysql from 'mysql2/promise';

const mysqlConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT2
}

const connect = await mysql.createConnection(mysqlConfig)

export default connect