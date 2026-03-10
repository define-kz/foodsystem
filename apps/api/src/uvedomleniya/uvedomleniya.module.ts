import { Module } from '@nestjs/common';
import { UvedomleniyaController } from './uvedomleniya.controller';
import { UvedomleniyaService } from './uvedomleniya.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UvedomleniyaController],
  providers: [UvedomleniyaService],
  exports: [UvedomleniyaService],
})
export class UvedomleniyaModule {}
