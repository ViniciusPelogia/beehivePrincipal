import database from '../models/index.js';
import pkg from 'bcryptjs';
const { compare } = pkg;
import plk from 'jsonwebtoken';
const { sign } = plk;
import jsonSecret from '../config/jsonSecret.js'

class AuthService{

    async login(dto){
        const usuario = await database.usuarios.findOne({
            attributes: ['id', 'email', 'senha'],
            where:{
                email: dto.email
            },
        })

        if(!usuario){
            throw new Error('Usuario nao cadastrado');
        }

        const senhasIguais = await compare(dto.senha, usuario.senha)

        if(!senhasIguais){
            throw new Error('Usuario ou senha inválido')
        }

        const accessToken = sign({
            id: usuario.id, 
            email: usuario.email
        }, jsonSecret.secret, {
            expiresIn: 86400
        })

        return { accessToken, id: usuario.id}
    }

}

export default AuthService;