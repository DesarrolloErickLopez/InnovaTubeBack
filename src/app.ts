// src/app.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const express = require('express');
  const cors = require('cors');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });
  
  app.setGlobalPrefix('api');
  
  await app.listen(port);

  console.log(`
  ██╗███╗   ██╗███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ 
  ██║████╗  ██║████╗  ██║██╔═══██╗██║   ██║██╔══██╗
  ██║██╔██╗ ██║██╔██╗ ██║██║   ██║██║   ██║███████║
  ██║██║╚██╗██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║
  ██║██║ ╚████║██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║
  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝
  
      ████████╗██╗   ██╗██████╗ ███████╗
      ╚══██╔══╝██║   ██║██╔══██╗██╔════╝
         ██║   ██║   ██║██████╔╝█████╗  
         ██║   ██║   ██║██╔══██╗██╔══╝  
         ██║   ╚██████╔╝██████╔╝███████╗
         ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝
                                      
  `);

  console.log(`Servidor escuchando en el puerto ${port}`);
}

bootstrap();
