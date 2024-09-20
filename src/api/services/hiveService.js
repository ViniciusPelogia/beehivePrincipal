/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import database from "../models/index.js";
import pkg from "bcryptjs";
import { CgLogIn, CgSlack } from "react-icons/cg";
import { where } from "sequelize";
const { hash } = pkg;
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

class HiveService {
  async cadastrar(dto) {
    try {
      const adm = await database.administradors.create({
        id: uuidv4(),
        usuario_id: dto.id,
      });

      const hashFull = crypto.createHash('sha256').update(dto.codigo_acesso).digest('hex');
      const senhaHash = hashFull.slice(0, 5); // Limitar a 5 caracteres
      
      const novaHive = await database.hives.create({
        id: uuidv4(),
        nome: dto.nome,
        codigo_acesso: senhaHash,
        tipo_id: dto.tipo_id,
        descricao: dto.descricao,
        privada: dto.privada,
        imagem: dto.imagem,
        adm_id: adm.id,
      });
      console.log("Hive foi criada ================");

      const existingRecord = await database.usuariosXhives.findOne({
        where: {
          hive_id: novaHive.id,
          usuario_id: dto.id,
        },
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

  async criaTipo(tipo) {
    try {
      const existeTipo = await database.tipoHives.findOne({
        where: {
          tipo: tipo,
        },
      });

      if (!existeTipo) {
        const novoTipo = await database.tipoHives.create({
          tipo: tipo,
        });
        return novoTipo;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postarImagem(dto) {
    try {
      const usuario = await database.usuarios.findByPk(dto.usuario_id);
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      const post = await database.imagens.create({
        id: uuidv4(),
        nome: dto.nome,
        descricao: dto.descricao,
        caminho: dto.caminho,
        usuario_id: dto.usuario_id,
      });

      await database.imagensXhives.create({
        hive_id: dto.id,
        imagem_id: post.id
      })

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // ROTAS GET ===========================================

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
      throw new Error(error.message);
      // "Erro ao procurar hives onde o usuário pode estar presente",
    }
  }

  async buscarTodasHives() {
    const Hives = await database.hives.findAll();
    return Hives;
  }
  async todosTipos() {
    try {
      const todosOsTipos = await database.tipoHives.findAll();
      return todosOsTipos;
    } catch (error) {
      throw new Error(error);
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

  async buscaImagensDaHive(dto){
    try {
      const relacao = await database.imagensXhives.findAll({
        where:{
          hive_id:dto.id
        }
      })

      const imagensId = relacao.map((e) => e.imagem_id);

      const imagensDaHive = await database.imagens.findAll({
        where: {
          id: imagensId,
        },
      });


      return imagensDaHive
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //ROTAS PUT ========================================================= 

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
  async deletarHive(dto) {
    try {
      const hive = await database.hives.findByPk(dto.id);

      await database.administradors.destroy({
        where: {
          id: hive.adm_id,
        },
      });

      await database.usuariosXhives.destroy({
        where: {
          hive_id: dto,
        },
      });

      await database.hives.destroy({
        where: {
          id: dto,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
  async expulsarUsuario(dto) {
    try {
      const verificarAdm = await database.hives.findOne({
        where: {
          id: dto.idHive,
          adm_id: dto.idUsuario,
        },
      });

      if (verificarAdm) {
        await database.usuariosXhives.destroy({
          where: {
            hive_id: dto.idHive,
            usuario_id: dto.id,
          },
        });
      }
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

export default HiveService;
