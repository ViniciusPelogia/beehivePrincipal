import {Router} from 'express'
import hiveController from '../controllers/hiveController.js'
import acessoHive from '../middleware/acessoHive.js'

const router = Router();

router
    .post('/hive', hiveController.criarHive)
    .get('/hive')
    .get('/hive/')
    .get('/hive:nome')
    .use(acessoHive)
    .get('/hive/')
    .put('/hive:id')
    .delete('/hive:id')

export default router;