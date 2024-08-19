/* eslint-disable no-undef */
import bodyParser from'body-parser'
import usuario from './usuariosRoute.js'
import auth from './authRoute.js'

export default app => {
    app.use(
      bodyParser.json(),
      auth,
      usuario
    )
}