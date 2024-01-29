import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { log } from 'console';
import { Request, Response } from 'express';
import { LoginService } from '../services/login.service';
import { LoginModel, UserModel } from '../models/login.model';
import axios from 'axios';

@Controller('login')
export class LoginController {

  constructor(
    private service: LoginService
    ) {}
  
  @Post()
  async postLogin(@Req() req: Request, @Res() res: Response) {    
    const serviceResponse = await this.service.consultarUsuario(req.body);
    console.log(serviceResponse);
    res.send(serviceResponse);
  }

  @Post('registrar')
  async postRegister(@Req() req: Request, @Res() res: Response) {    

      const serviceResponse = await this.service.registrarUsuario(req.body);
      console.log(serviceResponse);
      res.send(serviceResponse);
  }
  
  @Post('verificar')
  async postCaptcha(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const recaptchaSecretKey = '6Lddj18pAAAAAB6RKwRS7GpJpGBCzXgE3DT0UDQU';
    const token = req.params.token;

    const payload = {
      secret: recaptchaSecretKey,
      response: token,
      remoteip: req.ip,
    };
    try {
      const response = await axios.post(recaptchaUrl, payload);
      const result = response.data;
      console.log(result);
      
      res.json({ success: result.success || false });
    } catch (error) {
      console.error('Error al verificar el CAPTCHA', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  }


}
