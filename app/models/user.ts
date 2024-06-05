import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { Generate } from '#utils/index'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare full_name: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare avatar: string

  @column()
  declare password: string

  @column({ serializeAs: null })
  declare roleId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async init_value(user: User) {
    user.id = Generate.uuid()
    const password = Generate.password(8)
    user.password = await hash.make(password)
    // print
    console.log(`+- pssword: ${password}`)
  }

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
