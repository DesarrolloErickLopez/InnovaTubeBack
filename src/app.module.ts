import { Module } from '@nestjs/common';
import { MovimientosModule } from './entities/movimientos/movimientos.module';
import { LoginModule } from './entities/login/login.module';

@Module({
  controllers: [],
  imports: [
    MovimientosModule,
    LoginModule
  ],
})
export class AppModule {}