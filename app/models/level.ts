import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, scope } from '@adonisjs/lucid/orm'
import { Generate } from '#utils/index'

export default class Level extends BaseModel {
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
  static init_value(level: Level) {
    level.id = Generate.uuid()
  }

  // scope
  static search = scope((query, q: string) => {
    query.whereILike('designation', `%${q}%`).orWhereILike('description', `%${q}%`)
  })
}
