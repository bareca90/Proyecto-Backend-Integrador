import {models} from "../../config/dbOrm";
import { Usuario, UsuarioAttributes } from "../../models/usuario";

export default class UserRepository {

    async CreateUser(payload: UsuarioAttributes){
        try {
            return await models.Usuario.scope("eliminarPassword").create(payload)
        } catch (error) {
            console.log(error)
        }
    }

    async FindUserByEmail(email: string){
        try {
            return await models.Usuario.findOne({
                where: {
                    email
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}