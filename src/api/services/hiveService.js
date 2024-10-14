/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import database from "../models/index.js";
import pkg from "bcryptjs";
import { CgLogIn, CgSlack } from "react-icons/cg";
import { where } from "sequelize";
const { hash } = pkg;
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

class HiveService {
  async cadastrar(dto) {
    try {
      const adm = await database.administradors.create({
        id: uuidv4(),
        usuario_id: dto.id,
      });

      const salt = crypto.randomBytes(4).toString("hex"); // Salt de 8 bytes para manter o tamanho pequeno
      const hashFull = crypto
        .createHash("sha256")
        .update(dto.codigo_acesso + salt)
        .digest("hex");
      const senhaHash = salt + hashFull.slice(0, 3); // Combinar o salt com os primeiros 5 caracteres do hash

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
        imagem_id: post.id,
      });

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async curtirPost(dto) {
    console.log("Service CurtirPost - DTO:", dto);
    try {
      const jaCurtiu = await database.interacoes.findOne({
        where: {
          tipo: "curtida",
          usuario_id: dto.usuario_id,
          imagem_id: dto.id,
        },
      });

      if (jaCurtiu) {
        console.log("Service CurtirPost - Already Liked, Removing Like");
        await database.interacoes.destroy({
          where: {
            tipo: "curtida",
            usuario_id: dto.usuario_id,
            imagem_id: dto.id,
          },
        });
        return { message: "Descurtiu", likes: await this.pegaCurtidas(dto) };
      } else {
        console.log("Service CurtirPost - New Like");

        const curtir = await database.curtidas.create({
          id: uuidv4(),
        });

        const curtida = await database.interacoes.create({
          id: uuidv4(),
          tipo: "curtida",
          usuario_id: dto.usuario_id,
          imagem_id: dto.id,
          curtida_id: curtir.id,
          hora: new Date(),
        });
        return { curtida, likes: await this.pegaCurtidas(dto) };
      }
    } catch (error) {
      console.error("Service CurtirPost - Error:", error.message);
      throw new Error(error.message);
    }
  }

  async comentarPost(dto) {
    try {
      // const jaComentou = await database.interacoes.findOne({
      //   where: {
      //     tipo: "comentario",
      //     usuario_id: dto.usuario_id,
      //     imagem_id: dto.id
      //   }
      // });

      const comentar = await database.comentarios.create({
        id: uuidv4(),
        comentario: dto.comentario,
      });

      const comentario = await database.interacoes.create({
        id: uuidv4(),
        tipo: "comentario",
        usuario_id: dto.usuario_id,
        imagem_id: dto.id,
        comentario_id: comentar.id,
        hora: new Date(),
      });
      return comentario;
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

  async buscarUsuariosPresentes(dto){
    try {
      const relacao = await database.usuariosXhives.findAll({
        where:{
          hive_id: dto.id
        }
      })

      const usuariosId = relacao.map((usuario) => usuario.usuario_id) 

      const usuarios = await database.usuarios.findAll({
        where:{
          id: usuariosId
        }
      })

      return usuarios
    } catch (error) {
      throw new Error(error.message)
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
    const hive = await database.hives.findAll({
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

  async buscaImagensDaHive(dto) {
    try {
      const relacao = await database.imagensXhives.findAll({
        where: {
          hive_id: dto.id,
        },
      });

      const imagensId = relacao.map((e) => e.imagem_id);

      const imagensDaHive = await database.imagens.findAll({
        where: {
          id: imagensId,
        },
      });

      return imagensDaHive;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async buscaCodigoAcesso(dto) {
    try {
      const codigo = await database.hives
        .scope("defaultScope")
        .findByPk(dto.id, {
          attributes: ["codigo_acesso"],
        });

      if (!codigo) {
        throw new Error();
      }
      return codigo.codigo_acesso;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async pegaCurtidas(dto) {
    try {
      const curtidas = await database.interacoes.findAll({
        where: {
          tipo: "curtida",
          imagem_id: dto.id,
        },
      });

      const contagem = curtidas.length;
      return contagem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async pegaComentarios(dto) {
    try {
      const interacoes = await database.interacoes.findAll({
        where: {
          tipo: "comentario",
          imagem_id: dto.id,
        },
        include: [
          {
            model: database.usuarios,
            as: "usuario",
            attributes: ["username", "imagem"],
          },
        ],
      });

      const comentarioIds = interacoes.map(
        (interacao) => interacao.comentario_id
      );

      const comentarios = await database.comentarios.findAll({
        where: {
          id: comentarioIds,
        },
      });

      const result = interacoes.map((interacao) => {
        const comentario = comentarios.find(
          (c) => c.id === interacao.comentario_id
        );
        return {
          id: comentario.id, // Incluindo o ID do comentário
          comentario: comentario.comentario,
          usuario: interacao.usuario,
        };
      });

      return result;
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

  async apagarComentario(dto) {
    try {
      const isAdm = await database.hives.findOne({
        where: {
          adm_id: dto.usuario,
        },
      });

      const isPoster = await database.imagens.findOne({
        where: {
          usuario_id: dto.usuario,
        },
      });

      const permissao = await database.interacoes.findOne({
        where:{
          comentario_id: dto.id,
          usuario_id: dto.usuario
        }
      })

      if ( isPoster || isAdm || permissao ) {
        const relacao = await database.interacoes.destroy({
          where: {
            comentario_id: dto.id,
          },
        });

        if (relacao) {
          await database.comentarios.destroy({
            where: {
              id: dto.id,
            },
          });
        }
        return { message: "comentario excluido com sucesso" };
      }else{
        throw new Error('Você não tem permissão para excluir este comentário')
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }
  async apagarPost(dto) {
    try {
      const isAdm = await database.hives.findOne({
        where: {
          adm_id: dto.usuario,
        },
      });

      const isPoster = await database.imagens.findOne({
        where: {
          usuario_id: dto.usuario,
        },
      });


      if ( isPoster || isAdm  ) {
        await database.imagensXhives.destroy({
          where:{
            imagem_id: dto.id
          }
        })

        await database.imagens.destroy({
          where: {
            id: dto.id
          }
        })
        return { message: "Post excluido com sucesso" };
      }else{
        throw new Error('Você não tem permissão para excluir este post')
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default HiveService;
