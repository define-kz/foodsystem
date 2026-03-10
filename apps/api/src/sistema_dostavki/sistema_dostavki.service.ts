import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SistemaDostavkiService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, query: { page?: number; limit?: number; search?: string; status?: string }) {
    const { page = 1, limit = 20, search, status } = query;
    const skip = (page - 1) * limit;
    const where: any = { tenantId, status: status || 'ACTIVE' };
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.sistema_dostavki.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.sistema_dostavki.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    const item = await this.prisma.sistema_dostavki.findFirst({ where: { id, tenantId } });
    if (!item) throw new NotFoundException('Система доставки not found');
    return item;
  }

  async create(tenantId: string, data: { name: string; metadata?: any }, userId: string) {
    return this.prisma.sistema_dostavki.create({
      data: { ...data, tenantId, createdBy: userId },
    });
  }

  async update(id: string, tenantId: string, data: Partial<{ name: string; metadata?: any }>) {
    await this.findOne(id, tenantId);
    return this.prisma.sistema_dostavki.update({ where: { id }, data });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.sistema_dostavki.update({ where: { id }, data: { status: 'DELETED' } });
  }
}
