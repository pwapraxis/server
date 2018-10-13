import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
    constructor(private readonly pushService: PushService) {
    }

    @Post()
    postSubscription(@Headers('user-agent') userAgent: string, @Body() subscription: any) {
        console.log(userAgent);
        this.pushService.push(userAgent, subscription);
    }
}
