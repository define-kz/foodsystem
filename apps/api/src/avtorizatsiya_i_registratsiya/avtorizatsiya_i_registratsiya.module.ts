import { Module } from '@nestjs/common';
import { AvtorizatsiyaIRegistratsiyaController } from './avtorizatsiya_i_registratsiya.controller';
import { AvtorizatsiyaIRegistratsiyaService } from './avtorizatsiya_i_registratsiya.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AvtorizatsiyaIRegistratsiyaController],
  providers: [AvtorizatsiyaIRegistratsiyaService],
  exports: [AvtorizatsiyaIRegistratsiyaService],
})
export class AvtorizatsiyaIRegistratsiyaModule {}
