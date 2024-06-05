import Skill from '#models/skill'
import { T_SKILL } from '#utils/index'

export default class SkillService {
  //
  async find(key: string, value: string): Promise<Skill | undefined> {
    return await Skill.findByOrFail(key, value)
  }

  //
  async create(input: T_SKILL): Promise<Skill> {
    return await Skill.firstOrCreate({ designation: input.designation }, input)
  }
}
