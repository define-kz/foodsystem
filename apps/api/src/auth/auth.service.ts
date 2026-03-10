import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { OtpService } from "./otp.service";
import { randomBytes } from "crypto";
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private otp: OtpService) {}
  async sendOtp(phone: string) {
    const code = this.otp.generate(phone);
    return { success: true, message: "OTP sent", debug_code: code };
  }
  async verifyOtp(phone: string, code: string) {
    if (!this.otp.verify(phone, code)) throw new UnauthorizedException("Invalid OTP");
    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) user = await this.prisma.user.create({ data: { phone } });
    const accessToken = this.jwt.sign({ sub: user.id, role: user.role });
    const refreshToken = randomBytes(32).toString("hex");
    await this.prisma.session.create({ data: { userId: user.id, refreshToken, expiresAt: new Date(Date.now() + 30*24*60*60*1000) } });
    return { accessToken, refreshToken, user };
  }
  async refreshToken(token: string) {
    const session = await this.prisma.session.findUnique({ where: { refreshToken: token }, include: { user: true } });
    if (!session || session.expiresAt < new Date()) throw new UnauthorizedException("Invalid refresh token");
    return { accessToken: this.jwt.sign({ sub: session.user.id, role: session.user.role }) };
  }
}
