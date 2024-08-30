import {Router} from 'express'
import hiveController from '../controllers/hiveController.js'

const router = Router();

router
    .post('/hive', hiveController.cadastrar)
    .get('/hive')
    .get('/hive/')
    .get('/hive:nome')
    .get('/hive/')
    .put('/hive:id')
    .delete('/hive:id')

export default router;