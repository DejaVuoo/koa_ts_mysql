/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 16:00:35
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-13 16:00:55
 * @FilePath: \koa\app\controller\TestController.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Context, Next } from "koa";
import Logger from "../logger";
import AdminService from "../service/AdminService";
class IndexController {
  async index(ctx: Context, next: Next) {
    // Logger.info('msg', 'msg')
    const admin = await AdminService.getAdmin();
    // ctx.body = [1, 2, 3, 4, 5, 6, 7, 8];
    ctx.body = admin;
    // return next().catch((err: any) => {
    //   if (401 == err.status) {
    //     ctx.status = 404;
    //     ctx.body = 'Protected resource, use Authorization header to get access\n';
    //   } else {
    //     throw err;
    //   }
    // });
  }
}
export default new IndexController