import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'
import { inject } from '@adonisjs/core'
import LanguagesService from '#services/languages.service'
import { login } from '#validators/auth'

export default class AuthController {
  async store({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(login)
      const user = await User.verifyCredentials(email, password)
      //
      await user.load('role')
      const token = await User.accessTokens.create(user)

      return response.send({
        status: true,
        user,
        toke: {
          type: 'bearer',
          value: token.value!.release(),
        },
      })
    } catch (error) {
      //
      logger.error(error.message)
      return response.send({
        status: false,
        message: error.message,
      })
    }
  }

  @inject()
  async destroy({ request, response, auth }: HttpContext, lang_service: LanguagesService) {
    try {
      const { lang = 'en' } = request.only(['lang'])
      const user = auth.getUserOrFail()
      const token_id = user.currentAccessToken.identifier
      //
      await User.accessTokens.delete(user, token_id)
      return response.send({
        status: true,
        message: lang_service.get_message(lang, 'LOGOUT'),
      })
    } catch (error) {
      //
      logger.error(error.message)
      return response.send({
        status: false,
        message: error.message,
      })
    }
  }
}
