import { Module } from '@nestjs/common';
import { KorzinaIZakazyController } from './korzina_i_zakazy.controller';
import { KorzinaIZakazyService } from './korzina_i_zakazy.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KorzinaIZakazyController],
  providers: [KorzinaIZakazyService],
  exports: [KorzinaIZakazyService],
})
export class KorzinaIZakazyModule {}
