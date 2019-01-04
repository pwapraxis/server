import { Injectable } from '@nestjs/common';

@Injectable()
export class IpService {
  extractIp(headerValue: string | undefined): string | undefined {
    return headerValue && headerValue.split(':')[0];
  }
}