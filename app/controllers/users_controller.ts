import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return response.send({
        status: true,
        users,
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
