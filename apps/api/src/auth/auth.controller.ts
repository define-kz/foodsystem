import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("otp/send")
  sendOtp(@Body() body: { phone: string }) { return this.authService.sendOtp(body.phone); }
  @Post("otp/verify")
  verifyOtp(@Body() body: { phone: string; code: string }) { return this.authService.verifyOtp(body.phone, body.code); }
  @Post("refresh")
  refresh(@Body() body: { refreshToken: string }) { return this.authService.refreshToken(body.refreshToken); }
}
