import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'store'])

        router
          .group(() => {
            router.delete('logout', [AuthController, 'destroy'])
          })
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )
      })
      .prefix('v1/auth')
  })
  .prefix('/api')
