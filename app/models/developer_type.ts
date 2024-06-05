import { BaseModel, column, beforeCreate, scope } from '@adonisjs/lucid/orm'
import { Generate } from '#utils/index'
import { DateTime } from 'luxon'

export default class DeveloperType extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare designation: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static init_value(dev_type: DeveloperType) {
    dev_type.id = Generate.uuid()
  }

  // scope
  static search = scope((query, q: string) => {
    query.whereILike('designation', `%${q}%`).orWhereILike('description', `%${q}%`)
  })
}
