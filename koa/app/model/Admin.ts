/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-13 16:14:42
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-13 16:15:03
 * @FilePath: \koa\app\model\Admin.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Model, Table, Column } from "sequelize-typescript";
@Table
export default class Admin extends Model {
  @Column
  name!: string
  @Column
  email!: string
  @Column
  mobile!: string
  @Column
  password!: string
}