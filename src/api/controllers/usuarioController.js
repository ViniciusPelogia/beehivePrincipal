/* eslint-disable no-undef */
import UsuarioService from "../services/usuarioService.js";

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { username, senha, nome, email, idade } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({
        username,
        senha,
        nome,
        email,
        idade,
      });
      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  
  static async entrarEmHive(req, res){
    try{
      const { usuario_id, hive_id} = req.body;
      const entrar = await usuarioService.entrarEmHive({usuario_id, hive_id});
    res.status(200).json(entrar)
    } catch(error){
      res.status(400).send({ message: error.message })
    }
    
  }

  static async entrarComCodigo(req,res){
    try{
      const { codigo } = req.params;
      const { usuario_id} = req.body;
      console.log("IDS:", codigo, usuario_id)
      const entrar = await usuarioService.entrarComCodigo({usuario_id, codigo});

      const codigoHive = entrar.hive_id
      
    res.status(200).json(codigoHive)
    } catch(error){
      res.status(400).send({ message: error.message })
    }
  }
  //ROTAS GET ============================================


  static async buscarTodosUsuarios(req, res) {
    const usuarios = await usuarioService.buscarTodosUsuarios();

    res.status(200).json(usuarios);
  }
  static async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.buscarUsuarioPorId(id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async pegaImagem(req,res){
    const {id} = req.params;
    try {
      const imagem = await usuarioService.pegaImagem({id})
      
      res.status(200).json(imagem)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  static async editarUsuario(req, res) {
    const { id } = req.params;
    const imagem = req.file;
    const { username, biografia, rede_social} = req.body;
    try {
      const usuario = await usuarioService.editarUsuario({ id, username, biografia, rede_social, imagem });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deletarUsuario(id);
      res.status(200).send({ message: "Usuario deletado com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

export default UsuarioController;
