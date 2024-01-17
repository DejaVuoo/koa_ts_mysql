/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 16:04:50
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2024-01-16 15:57:56
 * @FilePath: \koa\app\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
require('dotenv').config()
import db from "./db"
db()
import Koa from "koa"

import router from "./router/"
import { Server } from 'http'
import AccessLogMiddleware from "./middleware/AccessLogMiddleware"
import koabody from 'koa-body'
import KoaStatic from 'koa-static'
import path from "path"
const cors = require("koa2-cors");
const app = new Koa()

app
  .use(cors())
  .use(koabody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  }))
  .use(KoaStatic(path.join(__dirname, '..', 'static'))) //__dirname指的是app这个目录 , '..'是指再往上走一层目录到项目的根目录 , 然后指向根目录下的static
  .use(AccessLogMiddleware)
  .use(router.routes())


const run = (port: any): Server => {
  return app.listen(port, () => {
    console.log('Server is running on ' + port);
  })
}

export default run 
