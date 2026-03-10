import { Injectable } from "@nestjs/common";
@Injectable()
export class OtpService {
  private codes = new Map<string, { code: string; exp: number }>();
  generate(phone: string): string {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    this.codes.set(phone, { code, exp: Date.now() + 300000 });
    return code;
  }
  verify(phone: string, code: string): boolean {
    const e = this.codes.get(phone);
    if (!e || Date.now() > e.exp || e.code !== code) return false;
    this.codes.delete(phone);
    return true;
  }
}
