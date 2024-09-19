/* eslint-disable no-undef */
import HiveService from "../services/hiveService.js";

const hiveService = new HiveService();

class HiveController {
  //ROTAS POST ========================================
  static async cadastrar(req, res) {
    const { id } = req.params;
    const { nome, tipo_id, codigo_acesso, descricao, privada } = req.body;
    const imagem = req.file ? req.file.filename : null; // Verificar se a imagem foi enviada
    console.log(req.body);
    try {
      const hive = await hiveService.cadastrar({
        nome, tipo_id, codigo_acesso, descricao, privada, imagem, id
      });
  
      res.status(201).send(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error);
    }
  }

  static async criaTipo(req,res){
    const { tipo } = req.body;

    try {
      const novoTipo = await hiveService.criaTipo(tipo);
      res.status(201).send(novoTipo)
    } catch (error) {
      res.status(401).send({message: error.message})
    }
  }

  static async postarImagem(req,res){
    // const {id} = req.params;
    const file = req.file
    const { nome, descricao, caminho, usuario_id} = req.body;
    try {
      const post = await hiveService.postarImagem({nome, descricao, caminho, usuario_id, file})
      res.status(201).json(post)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  //ROTAS GET ============================================

  static async buscarHivesIn(req,res){
    try {
      const {id} = req.params;
      const hives = await hiveService.buscarHivesIn(id);
  
      res.status(200).json(hives)
    } catch (error) {
      res.status(400).json({message: error.message})
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
  static async todosTipos(req,res){
    try {
      const todosOsTipos = await hiveService.todosTipos()

      res.status(200).json(todosOsTipos)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
  static async editarHive(req, res) {
    const { id } = req.params;
    const { nome, codigo_acesso, tipo, descricao, imagem } = req.body;
    try {
      const hive = await hiveService.editarHive({ id, nome, codigo_acesso, tipo, descricao, imagem });
      res.status(200).json(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async deletarHive(req, res) {
    const { id } = req.params;
    try {
      await hiveService.deletarHive(id);
      res.status(200).send({ message: "Hive deletada com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async expulsarUsuario(req, res) {
    const { id } = req.params;
    const { idUsuario, idHive } = req.body;
    try {
      await hiveService.expulsarUsuario({id, idUsuario, idHive});
      res.status(200).send({ message: "Usuario expulso com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

export default HiveController;
