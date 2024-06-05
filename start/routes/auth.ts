import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('auth/login', [AuthController, 'store'])
      })
      .prefix('v1')
  })
  .prefix('/api')
