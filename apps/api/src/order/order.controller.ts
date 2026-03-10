import { Controller, Post, Patch, Get, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
@ApiTags("orders")
@Controller("orders")
export class OrderController {
  constructor(private svc: OrderService) {}
  @Post() create(@Body() body: any) { return this.svc.create(body); }
  @Get(":id") findOne(@Param("id") id: string) { return this.svc.findOne(id); }
  @Patch(":id/status") updateStatus(@Param("id") id: string, @Body() body: any) { return this.svc.updateStatus(id, body.status); }
  @Get("history/:customerId") history(@Param("customerId") id: string) { return this.svc.history(id); }
}
