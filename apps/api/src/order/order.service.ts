import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(data: any) {
    const c = await this.prisma.order.count({ where: { restaurantId: data.restaurantId } });
    return this.prisma.order.create({ data: { number: c+1, restaurantId: data.restaurantId, customerId: data.customerId, type: data.type||"DELIVERY", address: data.address, subtotal: data.subtotal||0, deliveryFee: data.deliveryFee||0, total: data.total||0, items: { create: (data.items||[]).map((i:any)=>({ menuItemId: i.menuItemId, name: i.name, price: i.price, quantity: i.quantity||1, modifiers: i.modifiers||[], subtotal: i.price*(i.quantity||1) })) } }, include: { items: true } });
  }
  async findOne(id: string) { const o = await this.prisma.order.findUnique({ where: { id }, include: { items: true, payment: true, delivery: true } }); if (!o) throw new NotFoundException(); return o; }
  async updateStatus(id: string, status: string) { return this.prisma.order.update({ where: { id }, data: { status: status as any } }); }
  async history(customerId: string) { return this.prisma.order.findMany({ where: { customerId }, include: { items: true }, orderBy: { createdAt: "desc" }, take: 50 }); }
}
