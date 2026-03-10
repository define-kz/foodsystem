import { Module } from '@nestjs/common';
import { MenyuIKatalogController } from './menyu_i_katalog.controller';
import { MenyuIKatalogService } from './menyu_i_katalog.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MenyuIKatalogController],
  providers: [MenyuIKatalogService],
  exports: [MenyuIKatalogService],
})
export class MenyuIKatalogModule {}
