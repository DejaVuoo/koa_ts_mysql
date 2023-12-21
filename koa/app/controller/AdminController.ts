/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-11 13:50:36
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-21 09:49:17
 * @FilePath: \koa\app\controller\AdminController.ts
 * @Description: 数据分页
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Context } from "koa";
import AdminService from "../service/AdminService";
import response from "../../utils/response";
import paginate from "../../utils/paginate";
import { Rules } from "async-validator";
import vaildate from "../../utils/validate";
// import { createHash, randomBytes } from "crypto";
import * as bcrypt from 'bcrypt';
const saltRounds = 10; // 这是加密的轮数，可以根据需要调整

// const hashedPassword = bcrypt.hashSync(password, salt);

class AdminController {

  /**
   * @description: 分页
   * @param {Context} ctx
   */
  async getAdminList(ctx: Context) {
    const usp = new URLSearchParams(ctx.querystring)
    console.log(usp)
    console.log(usp.get('page'), usp.get('limit'))
    let page = 1, limit = 15
    if (usp.get('page') !== null && !isNaN(Number(usp.get('page')))) {
      page = Number(usp.get('page'))
    }
    // 进行类型转化的时候一定要判断一下能否转化为数字，保证程序的健壮性
    if (usp.get('limit') !== null && !isNaN(Number(usp.get('limit')))) {
      limit = Number(usp.get('limit'))
    }
    const { rows, count } = await AdminService.getAdminListByPage(page, limit)
    response.success(ctx, `第${page}页,每页${limit}条，`,200, paginate(rows, page, count, limit))
  }

  async addAdmin(ctx: Context) {
    const rules: Rules = {
      username: [
        {
          type: 'string',
          required: true,
          message: '用户名不可为空',

        }
      ],
      password: [
        {
          type: 'string',
          required: true,
          message: '密码不可为空',
        },
        {
          type: 'string',
          min: 8,
          message: '密码长度不可小于8位',
        }
      ]
    }
    interface IAdmin {
      id: number,
      username: string,
      password: string
    }
    const { data, error } = await vaildate<IAdmin>(ctx, rules)
    if (error !== null) {
      return response.error(ctx, error)
    }
    //判断是否新账户重复
    const newadmin = await AdminService.getAdminByName(data.username)
    if (newadmin !== null) {
      return response.error(ctx, '用户名重复,账户已存在')
    }
    //数据加密
    // const salt = this.generateSalt();
    // data.password = this.hashPassword(data.password, salt);//加盐
    // data.password = createHash('md5').update(data.password).digest('hex')
    const saltRounds = 10; // 这是加密的轮数，可以根据需要调整
    const salt = bcrypt.genSaltSync(saltRounds);
    data.password = bcrypt.hashSync(data.password, salt)
    const row = await AdminService.addAdmin(data)
    if (row.id > 0) {
      return response.success(ctx,'恭喜！注册成功~')
    }
    return response.error(ctx, "插入失败")
  }

  async updatedAdmin(ctx: Context) {
    const id = ctx.params['id'] as number
    const admin = AdminService.getAdminById(id)
    if (admin === null) {
      return response.error(ctx, '管理员不存在')
    }
    const rules: Rules = {
      username: [
        {
          type: 'string',
          required: true,
          message: '用户名不可为空',

        }
      ],
      passwords: [
        {
          type: 'string',
          min: 8,
          message: '密码长度不可小于8位',
        }
      ]
    }
    interface IAdmin {
      username: string,
      password: string
    }
    const { data, error } = await vaildate<IAdmin>(ctx, rules)
    if (error !== null) {
      response.error(ctx, error)
    }
    //判断是否修改了密码
    if (data.password !== undefined && data.password !== '') {
      //对密码加密
      // const salt = this.generateSalt();
      // data.password = this.hashPassword(data.password, salt);//加盐
      // data.password = createHash('sha256').update(data.password).digest('hex')
      const saltRounds = 10; // 这是加密的轮数，可以根据需要调整
      const salt = bcrypt.genSaltSync(saltRounds);
      data.password = bcrypt.hashSync(data.password, salt)
    }
    const [number] = await AdminService.updateAdmin(id, data)
    if (number > 0) {
      response.success(ctx)
    } else {
      response.error(ctx, '数据更新失败')
    }
  }

  async deleteAdmin(ctx: Context) {
    const id = ctx.params['id'] as number
    const admin = await AdminService.getAdminById(id)
    //判断是否存在
    if (admin === null) {
      return response.error(ctx, "账户不存在")
    }
    const row = await AdminService.deleteAdmin(id)
    if (row > 0) {
      return response.success(ctx)
    }
    return response.error(ctx, '删除失败')

  }

  // hashPassword = (password: any, salt: any) => {
  //   const hashedPassword = createHash('sha256')//更强大且安全性更好 密码哈希函数 SHA-256
  //     .update(password + salt)
  //     .digest('hex');
  //   return hashedPassword;
  // };
  // generateSalt = () => randomBytes(16).toString('hex');//随机生成的值与密码组合在一起
}
export default new AdminController