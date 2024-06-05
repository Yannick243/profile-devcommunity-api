import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import { Generate } from '#utils/index'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare designation: string

  @column()
  declare description: string

  @column()
  declare cover: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static init_value(skill: Skill) {
    skill.id = Generate.uuid()
  }

  // scope
  static search = scope((query, q: string) => {
    query.whereILike('designation', `%${q}%`).orWhereILike('description', `%${q}%`)
  })
}
