import { Module } from '@nestjs/common';
import { PublichnyySaytRestoranaController } from './publichnyy_sayt_restorana.controller';
import { PublichnyySaytRestoranaService } from './publichnyy_sayt_restorana.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PublichnyySaytRestoranaController],
  providers: [PublichnyySaytRestoranaService],
  exports: [PublichnyySaytRestoranaService],
})
export class PublichnyySaytRestoranaModule {}
