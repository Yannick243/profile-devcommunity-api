/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '#start/routes/user'
import '#start/routes/auth'
import '#start/routes/admin'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
