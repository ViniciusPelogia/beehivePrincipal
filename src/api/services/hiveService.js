/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import database from "../models/index.js";
import pkg from "bcryptjs";
import { CgLogIn, CgSlack } from "react-icons/cg";
import { where } from "sequelize";
const { hash } = pkg;
import { v4 as uuidv4 } from "uuid";

class HiveService {
  async cadastrar(dto) {
    try {

      const adm = await database.administradors.create({
        id: uuidv4(),
        usuario_id: dto.id,
      });

      const senhaHash = await hash(dto.codigo_acesso, 5);
      const novaHive = await database.hives.create({
        id: uuidv4(),
        nome: dto.nome,
        codigo_acesso: senhaHash,
        tipo_id: dto.tipo_id,
        descricao: dto.descricao,
        privada: dto.privada,
        imagem: dto.imagem,
        adm_id: adm.id
      });
      console.log("Hive foi criada ================");
  
      const existingRecord = await database.usuariosXhives.findOne({
        where: {
          hive_id: novaHive.id,
          usuario_id: dto.id
        }
      });
  
      if (!existingRecord) {
        await database.usuariosXhives.create({
          hive_id: novaHive.id,
          usuario_id: dto.id,
        });
      }
  
      return novaHive;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  
  async criaTipo(tipo){
    try {
      const existeTipo = await database.tipoHives.findOne({
        where:{
          tipo: tipo
        }
      })

      if(!existeTipo){
        const novoTipo = await database.tipoHives.create({
          tipo: tipo
        })
        return novoTipo;
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async postarImagem(dto){
    try {

      const post = await database.imagens.create({
        id: uuidv4(),
        nome: dto.nome,
        descricao: dto.descricao,
        caminho: dto.file,
        usuario_id: dto.usuario_id
      })

      return post
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async buscarHivesIn(id) {
    try {
      const usuariosPresente = await database.usuariosXhives.findAll({
      where: {
        usuario_id: id,
      },
    });

    if (!usuariosPresente) {
      throw new Error("Usuario não está em nenhuma hive");
    }

    const hiveIds = usuariosPresente.map((usuario) => usuario.hive_id);

    const hivesPresentes = await database.hives.findAll({
      where: {
        id: hiveIds,
      },
    });

    return hivesPresentes;
    } catch (error) {
      throw new Error(error.message)
      // "Erro ao procurar hives onde o usuário pode estar presente", 
    }
    

  }

  async buscarTodasHives() {
    const Hives = await database.hives.findAll();
    return Hives;
  }
  async todosTipos(){
    try {
      const todosOsTipos = await database.tipoHives.findAll();
      return todosOsTipos;
    } catch (error) {
      throw new Error(error)
    }
  }
  async buscarHivePorNome(nome) {
    const regex = new RegExp(nome, "i");
    const hive = await database.hives.findOne({
      where: {
        nome: {
          [Op.like]: `%${regex.source}%`,
        },
      },
    });
    if (!hive) {
      throw new Error("hive informada não cadastrado!");
    }
    return hive;
  }
  async buscarHivePorId(id) {
    const hive = await database.hives.findOne({
      where: {
        id: id,
      },
    });
    if (!hive) {
      throw new Error("hive informada não cadastrado!");
    }
    return hive;
  }
  async editarHive(dto) {
    const hive = await this.buscarHivePorId(dto.id);
    try {
      (hive.nome = dto.nome),
        (hive.codigo_acesso = dto.codigo_acesso),
        (hive.tipo = dto.tipo),
        (hive.descricao = dto.descricao),
        (hive.imagem = dto.imagem);
      await hive.save();
      return hive;
    } catch (error) {
      throw new Error("Erro ao editar hive!");
    }
  }
  async deletarHive(id) {
    await this.buscarHivePorId(id);
    try {
      await database.hives.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
  async expulsarUsuario(dto) {
    try{
      const verificarAdm = await database.hives.findOne({
        where:{
          id: dto.idHive,
          adm_id: dto.idUsuario
        }
      })

      if(verificarAdm){
        await database.usuariosXhives.destroy({
          where:{
            hive_id: dto.idHive,
            usuario_id: dto.id
          }
        })
      }
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

export default HiveService;
