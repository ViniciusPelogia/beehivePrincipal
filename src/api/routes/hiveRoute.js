import {Router} from 'express'
import hiveController from '../controllers/hiveController.js'

const router = Router();

router
    .post('/hive/:id', hiveController.cadastrar)
    .post('/tipo', hiveController.criaTipo)
    .get('/hive', hiveController.buscarTodasHives)
    .get('/hive/usuario/:id', hiveController.buscarHivesIn)
    .get('/hive/:nome', hiveController.buscarHivePorNome)
    .get('/hive/id/:id',hiveController.buscarHivePorId)
    .get('/tipo', hiveController.todosTipos)
    .put('/hive:id')
    .delete('/hive:id')

export default router;