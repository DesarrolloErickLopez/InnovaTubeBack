import { DatabaseService } from '../../../database/services/database.service';
import { LoginModel, UserModel } from '../models/login.model';

export class LoginDao {
    constructor() {}

  static async consultarUsuario(credenciales: any): Promise<any> {
    
    // console.log(credenciales);
    let sql;
    let correo: String = credenciales.usuario;
    
    try {

        sql = 'SELECT * FROM innova_tube.usuario WHERE correo = ?;';

        const values = [correo];
        
        const result = await DatabaseService.executeQuery(sql, values);
        
        return result[0];
        
    } catch (error) {
        console.error('Error en LoginDao:', error);
        throw error;
    }
  }

  static async registrarUsuario(usuario: UserModel): Promise<any> {
    
    console.log(usuario);
    let sql;
    // let correo: String = credenciales.usuario;
    
    try {

        sql = ' INSERT INTO innova_tube.usuario (nombre, ap_paterno, ap_materno, correo, contrasenia) VALUES (?, ?, ?, ?, ?);';

        const values = [
            usuario.nombre,
            usuario.ap_paterno,
            usuario.ap_materno,
            usuario.correo,
            usuario.contrasenia
          ];
        
        const result = await DatabaseService.executeQuery(sql, values);
        
    //     return result[0];
        
    } catch (error) {
        console.error('Error en LoginDao:', error);
        throw error;
    }
  }
}
