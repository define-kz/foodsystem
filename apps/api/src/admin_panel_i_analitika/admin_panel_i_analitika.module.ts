import { Module } from '@nestjs/common';
import { AdminPanelIAnalitikaController } from './admin_panel_i_analitika.controller';
import { AdminPanelIAnalitikaService } from './admin_panel_i_analitika.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminPanelIAnalitikaController],
  providers: [AdminPanelIAnalitikaService],
  exports: [AdminPanelIAnalitikaService],
})
export class AdminPanelIAnalitikaModule {}
