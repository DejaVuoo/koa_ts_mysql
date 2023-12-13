import { Sequelize } from "sequelize-typescript";
import path from "path";
import config from '../config'
import { dbLogger } from "../logger";
const sequelize = new Sequelize(config.db.db_name as string, config.db.db_user as string, config.db.db_password, {
  host: config.db.db_host,
  port: config.db.db_port as unknown as number, 
  dialect: 'mysql',
  logging: msg => dbLogger.info(msg),
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // deletedAt: 'deleted_at'
  },
  models: [path.join(__dirname, '..', 'model/**/*.ts'), path.join(__dirname, '..', 'model/**/*.js')],
  // dialectOptions: {
  //   socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
  // },
  // pool: { //连接池设置
  //   max: 5, //最大连接数
  //   idle: 30000,
  //   acquire: 60000
  // },


})
const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
export default db