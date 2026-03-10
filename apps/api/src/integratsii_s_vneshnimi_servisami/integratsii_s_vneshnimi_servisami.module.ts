import { Module } from '@nestjs/common';
import { IntegratsiiSVneshnimiServisamiController } from './integratsii_s_vneshnimi_servisami.controller';
import { IntegratsiiSVneshnimiServisamiService } from './integratsii_s_vneshnimi_servisami.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IntegratsiiSVneshnimiServisamiController],
  providers: [IntegratsiiSVneshnimiServisamiService],
  exports: [IntegratsiiSVneshnimiServisamiService],
})
export class IntegratsiiSVneshnimiServisamiModule {}
