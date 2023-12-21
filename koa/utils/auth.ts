/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 16:05:37
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-15 10:50:27
 * @FilePath: \koa\utils\auth.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import config from '../app/config'
function sign(data: any) {
  return jwt.sign({ admin: data }, config.jwt.jwt_secret as string, { expiresIn: config.jwt.jwt_expire })//token 期限30days
}
function verify(token: string): { admin: JwtPayload | string | null, error: TokenExpiredError | JsonWebTokenError | null } {
  try {
    const decoded = jwt.verify(token, config.jwt.jwt_secret as string) as JwtPayload;
    return {
      admin: decoded,
      error: null,
    };
  } catch (err) {
    return {
      admin: null,
      error: err as TokenExpiredError | JsonWebTokenError | null,
    };
  }
}


export {
  sign,
  verify
}