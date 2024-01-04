/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 16:00:35
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-27 15:37:45
 * @FilePath: \koa\app\controller\TestController.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Context, Next } from "koa";
import Logger from "../logger";
import AdminService from "../service/AdminService";
import vaildate from "../../utils/validate";
import response from "../../utils/response";
import { Rules } from "async-validator";
class IndexController {
  async index(ctx: Context) {
    // Logger.info('msg', 'msg')
    const rules: Rules = {
      username: [
        {
          type: 'string',
          required: true,
          message: '用户名不可为空',
        }
      ]
    }
    interface IAdmin {
      username: string
    }
    const { data, error } = await vaildate<IAdmin>(ctx, rules)
    console.log(data,'验证用户名');
    if (error !== null) {
      return response.error(ctx, error)
    }
    //判断是否新账户重复
    const newadmin = await AdminService.getAdminByName(data.username)
    if (newadmin !== null) {
      return response.error(ctx, '用户名重复,账户已存在')
    } else {
      console.log(data, '用户名可以使用');
      return response.success(ctx, '用户名可以使用')
    }
  }
}
export default new IndexController