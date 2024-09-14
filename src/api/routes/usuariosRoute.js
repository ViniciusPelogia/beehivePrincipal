/* eslint-disable no-undef */
import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import autenticado from '../middleware/autenticado.js';

const router = Router()

router
    .get('/', UsuarioController.buscarTodosUsuarios)
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.buscarTodosUsuarios)
    .use(autenticado)
    .post('/usuarios/entrarEmHive', UsuarioController.entrarEmHive)
    .get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId)
    .put('/usuarios/id/:id', UsuarioController.editarUsuario)
    .delete('/usuarios/id/:id', UsuarioController.deletarUsuario)

export default router;