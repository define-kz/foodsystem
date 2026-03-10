import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntegratsiiSVneshnimiServisamiService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, query: { page?: number; limit?: number; search?: string; status?: string }) {
    const { page = 1, limit = 20, search, status } = query;
    const skip = (page - 1) * limit;
    const where: any = { tenantId, status: status || 'ACTIVE' };
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.integratsii_s_vneshnimi_servisami.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.integratsii_s_vneshnimi_servisami.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    const item = await this.prisma.integratsii_s_vneshnimi_servisami.findFirst({ where: { id, tenantId } });
    if (!item) throw new NotFoundException('Интеграции с внешними сервисами not found');
    return item;
  }

  async create(tenantId: string, data: { name: string; metadata?: any }, userId: string) {
    return this.prisma.integratsii_s_vneshnimi_servisami.create({
      data: { ...data, tenantId, createdBy: userId },
    });
  }

  async update(id: string, tenantId: string, data: Partial<{ name: string; metadata?: any }>) {
    await this.findOne(id, tenantId);
    return this.prisma.integratsii_s_vneshnimi_servisami.update({ where: { id }, data });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.integratsii_s_vneshnimi_servisami.update({ where: { id }, data: { status: 'DELETED' } });
  }
}
