import Admin from "../model/Admin"
class AdminService {
  getAdmin() {
    return Admin.findOne()
  }
  getAdminById(adminId: number) {
    return Admin.findByPk(adminId) //主键
  }
  getAdminListByPage(page: number = 1, limit: number = 15) {
    return Admin.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit
    })
  }
  getAdminByName(username: string) {
    return Admin.findOne({
      where: { username: username }
    })
  }
  addAdmin(admin: any) {
    return Admin.create(admin)
  }
  updateAdmin(id: number, data: any) {
    return Admin.update(data, { where: { id: id } })
  }
  deleteAdmin(id: number) {
    return Admin.destroy({ where: { id: id } })
  }
}
export default new AdminService