import { Module } from '@nestjs/common';
import { SistemaDostavkiController } from './sistema_dostavki.controller';
import { SistemaDostavkiService } from './sistema_dostavki.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SistemaDostavkiController],
  providers: [SistemaDostavkiService],
  exports: [SistemaDostavkiService],
})
export class SistemaDostavkiModule {}
