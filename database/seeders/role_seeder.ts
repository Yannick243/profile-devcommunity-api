/* eslint-disable @typescript-eslint/naming-convention */
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // values
    const payload_search = { designation: 'admin' }
    const payload = { designation: 'admin' }
    // create init role
    await Role.firstOrCreate(payload_search, payload)
  }
}
