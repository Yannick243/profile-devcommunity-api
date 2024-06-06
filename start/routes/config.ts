import router from '@adonisjs/core/services/router'
const SkillController = () => import('#controllers/skills_controller')
const CategoryController = () => import('#controllers/categories_controller')
const LevelController = () => import('#controllers/levels_controller')
const DevTypeController = () => import('#controllers/developer_types_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        /**
         * S K I L L
         */
        router.get('skills', [SkillController, 'index'])
        router.get('skill/:id', [SkillController, 'show'])

        /**
         * C A T E G O R Y
         */
        router.get('categories', [CategoryController, 'index'])
        router.get('category/:id', [CategoryController, 'show'])

        /**
         * L E V E L
         */
        router.get('levels', [LevelController, 'index'])
        router.get('level/:id', [LevelController, 'show'])

        /**
         * D E V - T Y P E
         */
        router.get('dev-types', [DevTypeController, 'index'])
        router.get('dev-type/:id', [DevTypeController, 'show'])

        /**
         *
         */
        router
          .group(() => {
            /**
             * S K I L L
             */
            router.post('skills', [SkillController, 'store'])
            router.put('skill/:id', [SkillController, 'update'])
            router.delete('skill/:id', [SkillController, 'destroy'])

            /**
             * C A T E G O R Y
             */
            router.post('categories', [CategoryController, 'store'])
            router.put('category/:id', [CategoryController, 'update'])
            router.delete('category/:id', [CategoryController, 'destroy'])

            /**
             * L E V E L
             */
            router.post('levels', [LevelController, 'store'])
            router.put('level/:id', [LevelController, 'update'])
            router.delete('level/:id', [LevelController, 'destroy'])

            /**
             * D E V - T Y P E
             */
            router.post('dev-types', [DevTypeController, 'store'])
            router.put('dev-type/:id', [DevTypeController, 'update'])
            router.delete('dev-type/:id', [DevTypeController, 'destroy'])
          })
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )
      })
      .prefix('/v1')
  })
  .prefix('/api')
