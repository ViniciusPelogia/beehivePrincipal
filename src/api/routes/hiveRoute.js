import {Router} from 'express'
import hiveController from '../controllers/hiveController.js'

const router = Router();

router
    .post('/hive/:id', hiveController.cadastrar)
    .get('/hive', hiveController.buscarTodasHives)
    .get('/hive/usuario/:id', hiveController.buscarHivesIn)
    .get('/hive:nome')
    .get('/hive/')
    .put('/hive:id')
    .delete('/hive:id')

export default router;