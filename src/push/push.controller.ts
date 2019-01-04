import { Body, Controller, Headers, Post } from '@nestjs/common';
import { IpService } from '../ip/ip.service';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
    constructor(private readonly pushService: PushService, private readonly ipService: IpService) {
    }

    @Post()
    postSubscription(@Headers('user-agent') userAgent: string, @Headers('x-forwarded-for') forwardedFor: string, @Body() subscription: any) {
        this.pushService.push(userAgent, subscription, this.ipService.extractIp(forwardedFor));
    }
}
