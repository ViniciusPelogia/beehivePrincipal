/* eslint-disable no-undef */
import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import autenticado from '../middleware/autenticado.js';

const router = Router()

router.use(autenticado)

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.buscarTodosUsuarios)
    .get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId)
    .put('/usuarios/id/:id', UsuarioController.editarUsuario)
    .delete('/usuarios/id/:id', UsuarioController.deletarUsuario)

export default router;