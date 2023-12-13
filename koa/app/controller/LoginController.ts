/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 17:42:13
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-13 19:11:05
 * @FilePath: \koa\app\controller\LoginController.ts
 * @Description: 登录表单
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Context } from "koa";
import { sign } from "../../utils/auth";
import AdminService from "../service/AdminService"
import response from "../../utils/response";
import { Rules } from "async-validator";
import vaildate from "../../utils/validate";
class LoginController {
  async index(ctx: Context) {
    const rules: Rules = {
      username: [
        {
          type: "string",
          required: true,
          message: "用户名不可为空"
        },
      ],
      password: [
        {
          type: "string",
          required: true,
          message: "密码错误"
        },
      ],
    }
    interface IAdmin {
      username: string
      password: string
    }
    const { data, error } = await vaildate<IAdmin>(ctx, rules)
    if (error !== null) {
      return response.error(ctx, error)
    }
    const admin = await AdminService.getAdminByName(data.username);
    if (admin === null) {
      return response.error(ctx, "Admin not found")
    }
    const token = sign(admin)
    response.success(ctx, { token })
  }
}
export default new LoginController