/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-11 17:37:10
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-12 10:08:25
 * @FilePath: \koa\app\controller\UploadController.ts
 * @Description: 文件上传
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Context } from "koa"; import response from "../../utils/response";
import fs from "fs";
import path from "path";
import { error } from "console";
;

class UploadController {
  index(ctx: Context) {

  }
  /**
   * @description: 文件上传
   * @param {Context} ctx
   * @return {*} 成功返回文件的路径 ， 失败返回失败
   */
  uploadimg = (ctx: Context) => {
    const file = ctx.request.files?.file
    // console.log(file)
    if (file) {
      //@ts-ignore
      // console.log(file.originalFilename, file.filepath, file.mimetype);
      //@ts-ignore
      const fileType = file.mimetype
      const fileSet = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/gif'])
      if (!fileSet.has(fileType)) {
        return response.error(ctx, '非法文件上传')
      }
      //@ts-ignore
      const reader = fs.createReadStream(file.filepath)
      //@ts-ignore
      const ext = path.extname(file.originalFilename)
      //@ts-ignore
      const filepath = `/upload/${this.randomStr(32)}${ext}`
      const writer = fs.createWriteStream(`static${filepath}`)
      reader.pipe(writer)
      response.success(ctx, { file: filepath })
    } else {
      response.error(ctx, '文件不可为空')
    }
  }
  randomStr = (length: number): string => {
    const seeder = 'ABCDEFGHJKMNPORSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符o0Ll,9gq,Vv,Uu,I1****/
    let randomStr = ''
    for (let i = 0; i < length; i++) {
      randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length))
    }
    return randomStr
  }
}
export default new UploadController