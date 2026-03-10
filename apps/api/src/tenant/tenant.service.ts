import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}
  async create(data: any) { return this.prisma.restaurant.create({ data: { ...data, brand: { create: {} } }, include: { brand: true } }); }
  async findOne(id: string) { const r = await this.prisma.restaurant.findUnique({ where: { id }, include: { brand: true, categories: true } }); if (!r) throw new NotFoundException(); return r; }
  async update(id: string, data: any) { return this.prisma.restaurant.update({ where: { id }, data }); }
}
