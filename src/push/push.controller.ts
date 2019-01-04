import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { PushService } from './push.service';
import { Request } from 'express';

@Controller('push')
export class PushController {
    constructor(private readonly pushService: PushService) {
    }

    @Post()
    postSubscription(@Headers('user-agent') userAgent: string, @Body() subscription: any, @Req() { ip }: Request) {
        this.pushService.push(userAgent, subscription, ip);
    }
}
