import {Router} from 'express'
import hiveController from '../controllers/hiveController.js'
import upload from '../config/multer.js';

const router = Router();

router
    .post('/hive/imagem/:id', upload.single('file'), hiveController.postarImagem)
    .post('/hive/:id',upload.single('imagem'), hiveController.cadastrar)
    .post('/tipo', hiveController.criaTipo)
    .post('/post/curtir/:id', hiveController.curtirPost)
    .post('/post/comentar/:id', hiveController.comentarPost)
    .get('/hive', hiveController.buscarTodasHives)
    .get('/hive/usuario/:id', hiveController.buscarHivesIn)
    .get('/hive/nome/:nome', hiveController.buscarHivePorNome)
    .get('/hive/id/:id',hiveController.buscarHivePorId)
    .get('/tipo', hiveController.todosTipos)
    .get('/hive/imagens/:id', hiveController.buscaImagensDaHive)
    .get('/hives/:id/access-code', hiveController.buscaCodigoAcesso)
    .get('/post/curtir/:id', hiveController.pegaCurtidas)
    .get('/post/comentar/:id', hiveController.pegaComentarios)
    .put('/hive/:id',)
    .delete('/hive/:id')
    .delete('/hive/usuario/:id', hiveController.expulsarUsuario)

export default router;