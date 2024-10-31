/* eslint-disable no-undef */
import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import autenticado from '../middleware/autenticado.js';
import upload from '../config/multer.js';

const router = Router();

router
  .get('/', UsuarioController.buscarTodosUsuarios)
  .post('/usuarios', UsuarioController.cadastrar)
  .get('/usuarios', UsuarioController.buscarTodosUsuarios)
  .use(autenticado)
  .post('/usuarios/entrarEmHive', UsuarioController.entrarEmHive)
  .post('/usuarios/entrarComCodigo/:codigo', UsuarioController.entrarComCodigo)
  .get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId)
  .get('/usuarios/imagem/:id', UsuarioController.pegaImagem)
  .put('/usuarios/:id', upload.single('imagem'), UsuarioController.editarUsuario)
  .delete('/usuarios/id/:id', UsuarioController.deletarUsuario);

export default router;
