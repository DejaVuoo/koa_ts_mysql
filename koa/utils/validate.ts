/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-11 15:25:44
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-13 18:48:02
 * @FilePath: \koa\utils\validate.ts
 * @Description: 表单的数据校验的方法
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import Schema, { Rules, Values } from 'async-validator'
import { Context } from 'koa'
/**
 * @description: 
 * @param {Context} ctx 上下文
 * @param {Rules} rules 校验规则
 * @param {boolean} flag 如果是true 试图返回完整的错误信息
 * @return {*}
 */
async function vaildate<T extends Values>(ctx: Context, rules: Rules, flag: boolean = false): Promise<{ data: T, error: any | null }> {
  const validator = new Schema(rules)
  let data: any = {}

  switch (ctx.method) {
    case "GET":
      break
    case "POST":
      data = getFormData(ctx)
      console.log(data);

      break
    case "PUT":
      data = getFormData(ctx)
      break
    case "DELETE":
      break
  }
  return await validator.validate(data).then(() => {
    return {
      data: data as T,
      error: null,
    }
  }).catch(err => {
    if (flag) {
      return {
        data: {} as T,
        error: err
      }
    }
    return {
      data: {} as T,
      error: err.errors[0].message
    }
  })
}
function getFormData(ctx: Context) {
  console.log(ctx);
  console.log(ctx.request);
  return ctx.request.body
}
export default vaildate