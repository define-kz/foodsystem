import { Controller, Post, Patch, Get, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TenantService } from "./tenant.service";
@ApiTags("tenants")
@Controller("tenants")
export class TenantController {
  constructor(private svc: TenantService) {}
  @Post() create(@Body() body: any) { return this.svc.create(body); }
  @Get(":id") findOne(@Param("id") id: string) { return this.svc.findOne(id); }
  @Patch(":id") update(@Param("id") id: string, @Body() body: any) { return this.svc.update(id, body); }
}
