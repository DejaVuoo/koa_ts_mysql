/*
 * @Author: DejaVu 1343558760@qq.com
 * @Date: 2023-12-11 13:39:27
 * @LastEditors: DejaVu 1343558760@qq.com
 * @LastEditTime: 2023-12-11 13:43:45
 * @FilePath: \koa\utils\paginate.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import { Model } from "sequelize";

/**
 * @description: 分页
 * @param {any} data 数据
 * @param {number} currentPage 当前页码
 * @param {number} total 总数据
 * @param {number} limit 每一页数据
 * @return {*}
 */
export default function paginate<T extends Model[]>(data: T, currentPage: number = 1, total: number = 0, limit: number = 15) {
  return {
    data,
    currentPage,
    total,
    totalPages: Math.ceil(total / limit), //总页数
    limit
  }
}