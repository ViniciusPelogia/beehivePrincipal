/* eslint-disable no-undef */
import HiveService from "../services/hiveService.js";

const hiveService = new HiveService();

class HiveController {
  //ROTAS POST ========================================
  static async cadastrar(req, res) {
    const { id } = req.params;
    const { nome, tipo_id, codigo_acesso, descricao, privada } = req.body;
    const imagem = req.file ? req.file.path : null; // Verificar se a imagem foi enviada
    console.log(req.body);
    try {
      const hive = await hiveService.cadastrar({
        nome,
        tipo_id,
        codigo_acesso,
        descricao,
        privada,
        imagem,
        id,
      });

      res.status(201).send(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error);
    }
  }

  static async criaTipo(req, res) {
    const { tipo } = req.body;

    try {
      const novoTipo = await hiveService.criaTipo(tipo);
      res.status(201).send(novoTipo);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }

  static async postarImagem(req, res) {
    const {id} = req.params;
    const file = req.file;
    const { nome, descricao, usuario_id } = req.body;
    try {
      if (!file) {
        throw new Error("Arquivo não enviado");
      }
      const post = await hiveService.postarImagem({
        id,
        nome,
        descricao,
        caminho: file.path,
        usuario_id,
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async curtirPost(req, res) {
    const { id } = req.params;
    const { usuario_id} = req.body;
    console.log("CurtirPost - Params:", req.params);
    console.log("CurtirPost - Body:", req.body);
    try {
      const curtirPost = await hiveService.curtirPost({ id, usuario_id});
      console.log("CurtirPost - Success:", curtirPost);
      res.status(200).json(curtirPost);
    } catch (error) {
      console.error("CurtirPost - Error:", error.message);
      res.status(400).json(error.message);
    }
  }
  
  static async comentarPost(req, res) {
    const { id } = req.params;
    const { usuario_id, comentario} = req.body;
    console.log("CurtirPost - Params:", req.params);
    console.log("CurtirPost - Body:", req.body);
    try {
      const comentarPost = await hiveService.comentarPost({ id, usuario_id, comentario});
      console.log("comentarPost - Success:", comentarPost);
      res.status(200).json(comentarPost);
    } catch (error) {
      console.error("CurtirPost - Error:", error.message);
      res.status(400).json(error.message);
    }
  }
  
  

  //ROTAS GET ============================================

  static async buscarHivesIn(req, res) {
    try {
      const { id } = req.params;
      const hives = await hiveService.buscarHivesIn(id);

      res.status(200).json(hives);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async buscarUsuariosPresentes(req,res){
    try{
      const { id } = req.params;

      const usuarios = await hiveService.buscarUsuariosPresentes({ id})

      res.status(200).json(usuarios)
    } catch(error){
      res.status(400).json(error.message)
    }
  }

  static async buscarTodasHives(req, res) {
    const hives = await hiveService.buscarTodasHives();

    res.status(200).json(hives);
  }
  static async buscarHivePorNome(req, res) {
    try {
      const { nome } = req.params;
      const hive = await hiveService.buscarHivePorNome(nome);
      res.status(200).json(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async buscarHivePorId(req, res) {
    try {
      const { id } = req.params;
      const hive = await hiveService.buscarHivePorId(id);
      res.status(200).json(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async todosTipos(req, res) {
    try {
      const todosOsTipos = await hiveService.todosTipos();

      res.status(200).json(todosOsTipos);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async buscaImagensDaHive(req,res){
    const {id} = req.params;
    try {
      const imagens = await hiveService.buscaImagensDaHive({id})

      res.status(200).json(imagens)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async buscaCodigoAcesso(req,res){
    const { id } = req.params;
    try {
      const codigo = await hiveService.buscaCodigoAcesso({ id })
      console.log("codigo:",codigo)

      res.status(200).json(codigo)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  static async pegaCurtidas (req,res){
    const { id } = req.params;

    try {
      const curtidas = await hiveService.pegaCurtidas({ id })

      res.status(200).json(curtidas)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  static async pegaComentarios (req,res){
    const { id } = req.params;

    try {
      const comentarios = await hiveService.pegaComentarios({ id })

      res.status(200).json(comentarios)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
// ROTAS PUT =======================================

  static async editarHive(req, res) {
    const { id } = req.params;
    const { nome, codigo_acesso, tipo, descricao, imagem } = req.body;
    try {
      const hive = await hiveService.editarHive({
        id,
        nome,
        codigo_acesso,
        tipo,
        descricao,
        imagem,
      });
      res.status(200).json(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async deletarHive(req, res) {
    const { id } = req.params;
     try {
      await hiveService.deletarHive({id});
      res.status(200).send({ message: "Hive deletada com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async expulsarUsuario(req, res) {
    const { id } = req.params;
    const { idUsuario, idHive } = req.body;
    try {
      await hiveService.expulsarUsuario({ id, idUsuario, idHive });
      res.status(200).send({ message: "Usuario expulso com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async apagarComentario(req,res){
    const { id } = req.params;
    const { usuario } = req.body;
    try {
      const apagar = await hiveService.apagarComentario({ id, usuario })

      res.status(200).json(apagar)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  }
  static async apagarPost(req,res){
    const { id } = req.params;
    const { usuario } = req.body;
    try {
      const apagar = await hiveService.apagarPost({ id, usuario })

      res.status(200).json(apagar)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  }
}

export default HiveController;
