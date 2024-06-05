/* eslint-disable @typescript-eslint/naming-convention */
import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const role = await Role.findBy('designation', 'admin')
    if (!role) return

    // values
    const payload_search = { roleId: role.id }
    const payload = {
      full_name: 'super admin',
      username: '@super_admin',
      role_id: role.id,
      email: 'admin@gmail.com',
    }
    // create default user
    await User.firstOrCreate(payload_search, payload)
  }
}
