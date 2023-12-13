import { Context, Next } from "koa";
import { verify } from "../../utils/auth";
function AuthMiddleware(ctx: Context, next: Next) {
  console.log(ctx.headers)
  const token = ctx.headers['Authorization'] as string;
  console.log(token);
  if (token !== undefined && token !== "") {
    const { error } = verify(token)
    if (error !== null) {
      return ctx.body = {
        msg: error.message,
        code: 4000
      }
    } else {
      return next()
    }
  }
  ctx.body = {
    msg: 'Protected resource, use Authorization header to get access',
    code: 4000
  }
  return

}
export default AuthMiddleware
