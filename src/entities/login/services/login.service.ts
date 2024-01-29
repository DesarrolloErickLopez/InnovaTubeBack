import { Injectable } from '@nestjs/common';
import { ErrorMessage, SuccessfulMessage } from '../../../common/utils/movimientos.utils';
import { LoginModel, UserModel } from '../models/login.model';
import { LoginDao } from '../dao/login.dao';
import axios from 'axios';

@Injectable()
export class LoginService {

  constructor(
    ) {}

  async consultarUsuario(credenciales: LoginModel): Promise<object | string | any> {

    try {
                
        let consulta: UserModel= await LoginDao.consultarUsuario(credenciales);
        
        if (!consulta){
            return{
                status: 0,
                mensaje: "Credenciales incorrectas",
            };
        }
        
        if(consulta.contrasenia !== credenciales.contrasenia){
            return{
                status: -1,
                mensaje: "Contraseña incorrecta"
            };
        }
        
        return{
            status: 1,
            mensaje: "Inisio de sesion exitoso",
            data:{
                usuario: consulta.nombre,
                correo: consulta.correo
            }
        };
        
    } catch (error: any) {
      console.error('Error en LoginService:', error);
      return `Error en LoginService- Función: consultarUsuario - ${error.message}`;
    }
  }

  async registrarUsuario(usuario: UserModel): Promise<object | string | any> {

    try {
            
        let registro: UserModel= await LoginDao.registrarUsuario(usuario);
        
        // if (!consulta){
        //     return{
        //         status: 0,
        //         mensaje: "Credenciales incorrectas",
        //     };
        // }
        
        // if(consulta.contrasenia !== credenciales.contrasenia){
        //     return{
        //         status: -1,
        //         mensaje: "Contraseña incorrecta"
        //     };
        // }
        
        // return{
        //     status: 1,
        //     mensaje: "Inisio de sesion exitoso",
        //     data:{
        //         usuario: consulta.nombre,
        //         correo: consulta.correo
        //     }
        // };
        
    } catch (error: any) {
      console.error('Error en LoginService:', error);
      return `Error en LoginService- Función: consultarUsuario - ${error.message}`;
    }
  }

}
