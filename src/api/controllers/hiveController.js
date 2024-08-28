/* eslint-disable no-undef */
import HiveService from "../services/hiveService.js";

const hiveService = new HiveService();

class HiveController {
  static async cadastrar(req, res) {
    const { nome, tipo, codigo_acesso, descricao, privada, imagem } = req.body;

    try {
      const hive = await hiveService.cadastrar({
        nome, tipo, privada, codigo_acesso, descricao, imagem
      });

      res.status(201).send(hive);
    } catch (error) {
      res.status(400).send({ message: error.message });
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
}

export default HiveController;
