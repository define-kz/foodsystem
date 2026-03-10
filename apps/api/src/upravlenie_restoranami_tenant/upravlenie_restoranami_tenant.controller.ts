import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { UpravlenieRestoranamiTenantService } from './upravlenie_restoranami_tenant.service';

@Controller('api/v1/upravlenie_restoranami_tenant')
export class UpravlenieRestoranamiTenantController {
  constructor(private readonly service: UpravlenieRestoranamiTenantService) {}

  @Get()
  findAll(@Req() req: any, @Query() query: { page?: number; limit?: number; search?: string; status?: string }) {
    return this.service.findAll(req.tenantId || 'default', query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(id, req.tenantId || 'default');
  }

  @Post()
  create(@Body() body: { name: string; metadata?: any }, @Req() req: any) {
    return this.service.create(req.tenantId || 'default', body, req.userId || 'system');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<{ name: string; metadata?: any }>, @Req() req: any) {
    return this.service.update(id, req.tenantId || 'default', body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.service.remove(id, req.tenantId || 'default');
  }
}
