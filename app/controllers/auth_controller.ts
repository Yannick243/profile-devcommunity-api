import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  async store({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
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
}
