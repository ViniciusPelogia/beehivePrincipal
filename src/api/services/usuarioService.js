/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import database from "../models/index.js";
import pkg from "bcryptjs";
const { hash } = pkg;
import { v4 as uuidv4 } from "uuid";

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.usuarios.findOne({
      where: {
        email: dto.email,
      },
    });

    if (usuario) {
      throw new Error("Usuario ja cadastrado");
    }

    try {
      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await database.usuarios.create({
        id: uuidv4(),
        username: dto.username,
        senha: senhaHash,
        nome: dto.nome,
        email: dto.email,
        idade: dto.idade,
      });
      return novoUsuario;
    } catch (error) {
      throw new Error(error);
    }
  }
  async entrarEmHive(dto) {
    try {
      console.log("chegou aqui");
      console.log(dto.hive_id, dto.usuario_id);
      const presente = await database.usuariosXhives.findOne({
        where: {
          hive_id: dto.hive_id,
          usuario_id: dto.usuario_id,
        },
      });
      console.log(presente);
      if (presente) {
        throw new Error("Usuario já esta cadastrado nessa Hive");
      }
      const entrada = await database.usuariosXhives.create({
        hive_id: dto.hive_id,
        usuario_id: dto.usuario_id,
      });

      return entrada;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async entrarComCodigo(dto){
    try {
      const existeHive = await database.hives.findOne({
        where:{
          codigo_acesso: dto.codigo
        }
      })
      
      if(!existeHive){
        throw new Error("Não foi possível encontrar uma hive com esse código")
      }

      const presente = await database.usuariosXhives.findOne({
        where: {
          hive_id: existeHive.id,
          usuario_id: dto.usuario_id,
        },
      });

      console.log(presente);
      if (presente) {
        throw new Error("Usuario já esta cadastrado nessa Hive");
      }


      if(!presente){
        const entrada = await database.usuariosXhives.create({
          hive_id: existeHive.id,
          usuario_id: dto.usuario_id,
        });
  
        return entrada;
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  //ROTAS GET ==================================

  async buscarTodosUsuarios() {
    const usuarios = await database.usuarios.findAll();
    return usuarios;
  }
  async buscarUsuarioPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id,
      },
    });
    if (!usuario) {
      throw new Error("Usuario informado não cadastrado!");
    }
    return usuario;
  }

  async pegaImagem() {
    try {
      const imagem = await database.imagens.findOne;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editarUsuario(dto) {
    const usuario = await database.usuarios.findByPk(dto.id);
    try {
      if (usuario) {
        usuario.username = dto.username;
        usuario.biografia = dto.biografia;
        usuario.rede_social = dto.rede_social;
        usuario.imagem = dto.imagem.path
        await usuario.save();
      }
      return usuario; 
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }
  async deletarUsuario(id) {
    await this.buscarUsuarioPorId(id);
    try {
      await database.usuarios.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

export default UsuarioService;
