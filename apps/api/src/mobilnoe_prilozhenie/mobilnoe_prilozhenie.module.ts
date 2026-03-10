import { Module } from '@nestjs/common';
import { MobilnoePrilozhenieController } from './mobilnoe_prilozhenie.controller';
import { MobilnoePrilozhenieService } from './mobilnoe_prilozhenie.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MobilnoePrilozhenieController],
  providers: [MobilnoePrilozhenieService],
  exports: [MobilnoePrilozhenieService],
})
export class MobilnoePrilozhenieModule {}
