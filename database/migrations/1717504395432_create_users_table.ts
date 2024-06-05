import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('full_name').notNullable()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('avatar')
      table.string('password').notNullable()
      table.uuid('role_id').notNullable().references('roles.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
