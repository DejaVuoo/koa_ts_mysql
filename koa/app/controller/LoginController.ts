/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 17:42:13
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2024-01-22 08:59:26
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
import * as bcrypt from 'bcrypt';
import Rsa from '../../utils/rsa'
const rsa = new Rsa()
const path = require('path');
// const keys = rsa.getKeys()
// const key_puth = path.join(process.cwd(), '/app/config/rsa');
// rsa.output(key_puth)
// console.log(keys)
// const priv_puth= path.join(process.cwd(), '/app/config/rsa/rsa_pri.pem');
// const pub_puth = path.join(process.cwd(), '/app/config/rsa/rsa_pub.pem');
// const pubKey = Rsa.getKey(pub_puth)
// const priKey = Rsa.getKey(priv_puth)
// console.log(pubKey,2222)
// const res_en_by_pub = rsa.encryptByPubKey('ljk990822', pubKey)
// const res_de_by_pri = rsa.decryptByPriKey(res_en_by_pub, priKey)
// const res_sign_by_pri = rsa.signature('123456', priKey)
// const res_verify_by_pub = rsa.verify('123456', res_sign_by_pri, pubKey)
// console.log('公钥加密：' + res_en_by_pub)
// console.log('私钥解密：' + res_de_by_pri)
// console.log('私钥签名：' + res_sign_by_pri)
// console.log('公钥验证：' + res_verify_by_pub)

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
    console.log(data);

    if (error !== null) {
      ctx.status = 404
      return response.error(ctx, error)
    }

    const admin = await AdminService.getAdminByName(data.username);
    if (admin === null) {
      ctx.status = 404
      return response.error(ctx, "用户名或密码错误")
    }
    const res_en_by_pub = data.password
    console.log('公钥加密：' + res_en_by_pub);
    const priv_path = path.join(process.cwd(), '/app/config/rsa/rsa_pri.pem');
    console.log(priv_path);
    const priKey = Rsa.getKey(priv_path)
    console.log(priKey); 
    const res_de_by_pri = rsa.decryptByPriKey(res_en_by_pub, priKey)
    console.log('私钥解密：' + res_de_by_pri);
    const isPasswordMatch = bcrypt.compareSync(res_de_by_pri, admin.dataValues.password);
    console.log(isPasswordMatch);
    if (isPasswordMatch) {
      // 密码匹配，登录成功
      const token = sign(admin);
      response.success(ctx, '登录成功', 200, { token });
    } else {
      // 密码不匹配，返回错误信息
      ctx.status = 404
      response.error(ctx, "用户名或密码错误");
    }
  }

}
export default new LoginController