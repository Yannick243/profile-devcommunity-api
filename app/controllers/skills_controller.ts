/* eslint-disable @typescript-eslint/naming-convention */
import Skill from '#models/skill'
import SkillService from '#services/skill.service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { create_skill_validator, update_skill_validator } from '#validators/skill'
import LanguagesService from '#services/languages.service'
// import i18nManager from '@adonisjs/i18n/services/main'

@inject()
export default class SkillsController {
  //
  constructor(
    protected service: SkillService,
    protected lang: LanguagesService
  ) {}

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
      const skills = await Skill.query()
        .withScopes((scope) => scope.search(q))
        .orderBy(order_by, order_type)
        .paginate(page, limit)

      return response.send({
        status: true,
        skills,
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
      const skill = await this.service.find('id', id)

      return response.send({
        status: true,
        skill,
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
    const payload = await request.validateUsing(create_skill_validator)
    try {
      const skill = await this.service.create(payload)

      return response.send({
        status: true,
        skill,
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
    const payload = await update_skill_validator.validate(request.all())
    try {
      //verify
      const skill = await this.service.find('id', request.param('id'))
      // validate & update
      await skill?.merge(payload).save()

      return response.send({
        status: true,
        skill,
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
      //verify
      const { lang = 'en' } = request.only(['lang'])
      const skill = await this.service.find('id', request.param('id'))

      // Delete
      await skill?.delete()

      return response.send({
        status: true,
        message: this.lang.get_message(lang, 'DELETE_SKILL'),
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
