import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  async createCategory(data: any) { const c = await this.prisma.category.count({ where: { restaurantId: data.restaurantId } }); return this.prisma.category.create({ data: { ...data, sortOrder: c } }); }
  async getCategories(restaurantId: string) { return this.prisma.category.findMany({ where: { restaurantId, isActive: true }, include: { items: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { sortOrder: "asc" } }); }
  async createItem(data: any) { return this.prisma.menuItem.create({ data }); }
  async toggleStopList(id: string) { const i = await this.prisma.menuItem.findUnique({ where: { id } }); if (!i) throw new NotFoundException(); return this.prisma.menuItem.update({ where: { id }, data: { inStopList: !i.inStopList } }); }
  async getPublicMenu(slug: string) { const r = await this.prisma.restaurant.findUnique({ where: { slug }, include: { brand: true, categories: { where: { isActive: true }, include: { items: { where: { isActive: true, inStopList: false } } }, orderBy: { sortOrder: "asc" } } } }); if (!r) throw new NotFoundException(); return r; }
}
