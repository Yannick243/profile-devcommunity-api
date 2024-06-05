/* eslint-disable @typescript-eslint/naming-convention */
import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { create_primitive_validator, update_primitive_validator } from '#validators/primitive'
import LanguagesService from '#services/languages.service'
import { inject } from '@adonisjs/core'

@inject()
export default class CategoriesController {
  constructor(private lang: LanguagesService) {}
  //
  async index({ request, response }: HttpContext) {
    try {
      const {
        limit = 10,
        page = 1,
        q = '',
        order_by = 'created_at',
        order_type = 'desc',
      } = request.only(['q', 'page', 'order_by', 'order_type', 'limit'])

      const categories = await Category.query()
        .withScopes((scope) => scope.search(q))
        .orderBy(order_by, order_type)
        .paginate(page, limit)

      return response.send({
        status: true,
        categories,
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

  //
  async show({ request, response }: HttpContext) {
    try {
      const id = request.param('id')
      const category = await Category.findByOrFail('id', id)
      return response.send({
        status: true,
        category,
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

  //
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(create_primitive_validator)
    try {
      const category = await Category.updateOrCreate({ designation: payload.designation }, payload)
      return response.send({
        status: true,
        category,
      })
    } catch (error) {
      //
      logger.error(error.message)
      return response.status(error.status).send({
        status: false,
        message: error.message,
      })
    }
  }
  //
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(update_primitive_validator)
    try {
      //verify
      const category = await Category.findByOrFail('id', request.param('id'))
      // validate & update
      await category?.merge(payload).save()

      return response.send({
        status: true,
        category,
      })
    } catch (error) {
      //
      logger.error(error.message)
      return response.status(error.status).send({
        status: false,
        message: error.message,
      })
    }
  }
  //
  async destroy({ request, response }: HttpContext) {
    try {
      const { lang = 'en' } = request.only(['lang'])

      //verify
      const category = await Category.findByOrFail('id', request.param('id'))
      // Delete
      await category?.delete()

      return response.send({
        status: true,
        message: this.lang.get_message(lang, 'DELETE_CATEGORY'),
      })
    } catch (error) {
      //
      logger.error(error.message)
      return response.status(error.status).send({
        status: false,
        message: error.message,
      })
    }
  }
}
