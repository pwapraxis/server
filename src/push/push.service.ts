import { Injectable, Logger } from '@nestjs/common';
import * as webpush from 'web-push';

type Subscription = { endpoint: string };
type PushSubscription = { userAgent: string, subscription: Subscription };

@Injectable()
export class PushService {
    vapidKeys: { publicKey: string, privateKey: string };
    subscriptions = new Map<string, PushSubscription>();

    constructor(private readonly logger: Logger) {
        this.vapidKeys = webpush.generateVAPIDKeys();
        logger.log(`Public Key: ${this.vapidKeys.publicKey}`, 'PushService');
    }

    push(userAgent: string, subscription: Subscription): void {
        this.subscriptions.set(subscription.endpoint, {userAgent, subscription});
    }

    pushToAll(title: string, body?: string): void {
        this.logger.log('Sending push message.');
        this.subscriptions.forEach(subscription => {
            webpush.sendNotification(subscription, {notification: {title, body}});
        });
    }
}
