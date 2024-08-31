/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import database from "../models/index.js";
import pkg from "bcryptjs";
const { hash } = pkg;
import { v4 as uuidv4 } from "uuid";

class HiveService {
  async cadastrar(dto) {

    try {
      const senhaHash = await hash(dto.senha, 8);

      const novaHive = await database.Hives.create({
        id: uuidv4(),
        nome: dto.nome,
        codigo_acesso: senhaHash,
        tipo: dto.tipo,
        descricao: dto.descricao, 
        privada: dto.privada, 
        imagem:dto.imagem
      });
      return novaHive;
    } catch (error) {
      throw new Error(error);
    }
  }

  async buscarHivesIn(id){
    const usuariosPresente = await database.usuariosXhives.findAll({
      where:{
        usuario_id: id
      }
    })

    if(!usuariosPresente){
      throw new Error("Usuario não está em nenhuma hive");
    }
    
    return usuariosPresente;
  }

  async buscarTodasHives() {
    const Hives = await database.Hives.findAll();
    return Hives;
  }
  async buscarHivePorNome(nome) {
    const regex = new RegExp(nome, 'i');
    const hive = await database.Hives.findOne({
        where: {
            nome: {
                [Op.like]: `%${regex.source}%`
            }
        }
    });
    if (!hive) {
      throw new Error("hive informada não cadastrado!");
    }
    return hive;
  }
  async buscarHivePorId(id) {
    const hive = await database.Hives.findOne({
        where: {
            id: id
        }
    });
    if (!hive) {
      throw new Error("hive informada não cadastrado!");
    }
    return hive;
  }
  async editarHive(dto) {
    const hive = await this.buscarHivePorId(dto.id);
    try {
        hive.nome = dto.nome, 
        hive.codigo_acesso = dto.codigo_acesso, 
        hive.tipo = dto.tipo, 
        hive.descricao = dto.descricao, 
        hive.imagem = dto.imagem
      await hive.save();
      return hive;
    } catch (error) {
      throw new Error("Erro ao editar hive!");
    }
  }
  async deletarHive(id) {
    await this.buscarHivePorId(id);
    try {
      await database.Hives.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

export default HiveService;
