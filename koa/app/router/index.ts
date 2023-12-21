/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-07 15:28:06
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-19 14:01:41
 * @FilePath: \koa\app\router\index.ts
 * @Description: 路由配置
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import koaRouter from "koa-router"
import IndexController from "../controller/TestController"
import LoginController from "../controller/LoginController"
import AdminController from "../controller/AdminController"
import AuthMiddleware from "../middleware/AuthMiddleware"
import UploadController from "../controller/UploadController"
const router = new koaRouter({
  //前缀，之后所有都会附加在它后面
  prefix: "/admin",
})
//不要要鉴权
router.post('/login', LoginController.index) //登录
router.post('/addAdmin', AdminController.addAdmin) //注册
router.post('/queryName', IndexController.index) //测试
//AuthMiddleware以下是需要鉴权
router.use(AuthMiddleware)
router.get('/list', AdminController.getAdminList) //获取管理员列表
router.put('/updateAdmin/:id', AdminController.updatedAdmin) //更新管理员信息
router.delete('/deleteAdmin/:id', AdminController.deleteAdmin) // 删除管理员
// router.post('/upload', UploadController.index)
router.post('/uploadImgFile', UploadController.uploadimg) // 上传图片文件

export default router