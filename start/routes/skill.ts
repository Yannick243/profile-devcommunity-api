import router from '@adonisjs/core/services/router'
const SkillController = () => import('#controllers/skills_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('skills', [SkillController, 'index'])
        router.get('skill/:id', [SkillController, 'show'])
        router.post('skills', [SkillController, 'store'])
        router.put('skill/:id', [SkillController, 'update'])
        router.delete('skill/:id', [SkillController, 'destroy'])
      })
      .prefix('/v1')
  })
  .prefix('/api')
