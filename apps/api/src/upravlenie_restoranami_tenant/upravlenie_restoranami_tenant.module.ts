import { Module } from '@nestjs/common';
import { UpravlenieRestoranamiTenantController } from './upravlenie_restoranami_tenant.controller';
import { UpravlenieRestoranamiTenantService } from './upravlenie_restoranami_tenant.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UpravlenieRestoranamiTenantController],
  providers: [UpravlenieRestoranamiTenantService],
  exports: [UpravlenieRestoranamiTenantService],
})
export class UpravlenieRestoranamiTenantModule {}
