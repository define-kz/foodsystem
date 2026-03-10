import { Module } from '@nestjs/common';
import { ProgrammaLoyalnostiController } from './programma_loyalnosti.controller';
import { ProgrammaLoyalnostiService } from './programma_loyalnosti.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProgrammaLoyalnostiController],
  providers: [ProgrammaLoyalnostiService],
  exports: [ProgrammaLoyalnostiService],
})
export class ProgrammaLoyalnostiModule {}
