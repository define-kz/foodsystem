import { Controller, Post, Patch, Get, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MenuService } from "./menu.service";
@ApiTags("menu")
@Controller("menu")
export class MenuController {
  constructor(private svc: MenuService) {}
  @Post("categories") createCategory(@Body() body: any) { return this.svc.createCategory(body); }
  @Get("categories/:restaurantId") getCategories(@Param("restaurantId") id: string) { return this.svc.getCategories(id); }
  @Post("items") createItem(@Body() body: any) { return this.svc.createItem(body); }
  @Patch("items/:id/stop-list") toggleStopList(@Param("id") id: string) { return this.svc.toggleStopList(id); }
  @Get("public/:slug") getPublicMenu(@Param("slug") slug: string) { return this.svc.getPublicMenu(slug); }
}
