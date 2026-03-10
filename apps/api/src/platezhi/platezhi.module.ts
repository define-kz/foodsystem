import { Module } from '@nestjs/common';
import { PlatezhiController } from './platezhi.controller';
import { PlatezhiService } from './platezhi.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlatezhiController],
  providers: [PlatezhiService],
  exports: [PlatezhiService],
})
export class PlatezhiModule {}
