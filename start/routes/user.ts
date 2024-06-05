import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('users', [UsersController, 'index'])
      })
      .prefix('/v1')
  })
  .prefix('/api')
