import { CodesHttpEnum } from "../../enums/codesHttpEnum";
import { HttpResponse } from "../../utils/httpResponse";
import AuthRepository from "./repository";
import jwt from "jsonwebtoken";
import UserRepository from "../user/repository";
import { UserAttributes } from "../../models/User";
import { UsuarioAttributes } from "../../models/usuario";
import nodemon from "nodemon";
import { hashPassword } from "../../helpers/hash";
import { PUCLIC_KEY } from "../../environments/env";


export class AuthServices {
  private readonly _authRepository: AuthRepository;
  private readonly _userRepository: UserRepository
  constructor() {
    this._authRepository = new AuthRepository();
    this._userRepository = new UserRepository();
  }

  async registerService(payload: UsuarioAttributes) {
    const existingUser = await this._userRepository.FindUserByEmail(payload.email);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const newUser = await this._userRepository.CreateUser(payload);
    return HttpResponse.response(
      CodesHttpEnum.created,
      {
        id: newUser!.id,
        nombre: newUser!.nombre,
        username: newUser!.username,
        email: newUser!.email      
        

      },
      "Usuario creado con éxito"
    );
  }

  async loginService(email: string, password: string) {
    const allUser = await this._userRepository.FindUserByEmail(email);
    if (!allUser) {
      throw new Error("El usuario no existe");
    }

    if (!(await hashPassword(password,allUser.password))) {
      throw new Error("Clave incorrecta");
    }

    const token = jwt.sign(
      { nameUser: allUser.username, mailUser: allUser.email },
      PUCLIC_KEY,
      { expiresIn: 60 * 60 }
    );

    // return HttpResponse.response(
    //   CodesHttpEnum.ok,{}, "Usuario Validado"
    // );

    return HttpResponse.response(
      CodesHttpEnum.ok,
      { token },
      "Usuario Validado"
    );
  }
}
