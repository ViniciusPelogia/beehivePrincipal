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

  async entrarEmHive(dto){
    const presente = await database.usuariosXhives.findOne({
      hive_id: dto.hive_id,
      usuario_id: dto.usuario_id
    })
    if(presente){
      throw new Error("Usuario já esta cadastrado nessa Hive")
    }
    try {
      const entrada = await database.usuariosXhives.create({
        hive_id: dto.hive_id,
        usuario_id: dto.usuario_id
    })
    } catch (error) {
      throw new Error(error.message)
    }
    return entrada;

  }

  async editarUsuario(dto) {
    const usuario = await this.buscarUsuarioPorId(dto.id);
    try {
      usuario.username = dto.username;
      usuario.email = dto.email;
      await usuario.save();
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
