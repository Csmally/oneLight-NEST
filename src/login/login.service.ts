import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  login(mobile: string) {
    return { mobile };
  }

  getMsgCode() {
    return { code: '1234' };
  }
}
