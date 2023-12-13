/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-11 10:19:52
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-11 11:07:21
 * @FilePath: \koa\utils\response.ts
 * @Description: 约束输出的数据格式，用于API的统一管理，根据success error 两个函数返回对应的状态
 * 
 * Copyright (c) 2023 by 1343558760@qq.com, All Rights Reserved. 
 */
import { Context } from "koa";
/**
 * @description: 
 * @param {Context} ctx
 * @param {*} data 返回的数据 可能是数组、对象
 * @param {string} msg 提示信息
 * @param {number} code 状态码
 */

class response {
  success(ctx: Context, data: any = [], msg: string = "success", code: number = 200) {
    ctx.body = {
      code,
      msg,
      data
    }
  }
  /**
   * @description: 
   * @param {Context} ctx 
   * @param {string} msg 错误提示
   * @param {*} data 扩展提示 可能是数组、对象
   * @param {number} code 状态码
   */
  error(ctx: Context, msg: string = "error", data: any = [], code: number = 404) {
    ctx.body = {
      code,
      msg,
      data
    }
  }
}

export default new response
// export {
//   success,
//   error
// }