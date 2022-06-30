require('dotenv').config()

import { Category, User, Password } from './models'

const dbInit = () => Promise.all([
    Category.sync(),
    Password.sync(),
    User.sync(),
  ])

export default dbInit

// npx nodemon ./index.ts