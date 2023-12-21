/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 16:05:41
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-21 13:38:14
 * @FilePath: \koa\app\middleware\AuthMiddleware.ts
 * @Description: 鉴权中间键
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Context, Next } from "koa";
import { verify } from "../../utils/auth";
import response from "../../utils/response";
function AuthMiddleware(ctx: Context, next: Next) {
  const authorizationHeader = ctx.headers['authorization'] as string;

  if (!authorizationHeader) {
    ctx.status = 401;
    return response.error(ctx, 'Unauthorized', 401,);
  }

  const [scheme, token] = authorizationHeader.split(' ');
  //确保 token 遵循预期的格式
  if (scheme !== 'Bearer' || !token) {
    ctx.status = 401;
    return response.error(ctx, 'Invalid Authorization header format', 401);
  }

  const { error } = verify(token);

  if (error) {
    ctx.status = 403;
    return response.error(ctx, error.message, 403);
  }

  return next();
}


export default AuthMiddleware;
