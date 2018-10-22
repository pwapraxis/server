import { Injectable, Logger } from '@nestjs/common';
import * as UAParser from 'ua-parser-js';
import * as webpush from 'web-push';
import { StorageService } from '../storage.service';

type Subscription = { endpoint: string };
type PushSubscription = { userAgent: string, subscription: Subscription };

const VAPID_STORAGE_KEY = 'pwapraxis-vapid-keys';

@Injectable()
export class PushService {
  vapidKeys: { publicKey: string, privateKey: string };
  subscriptions = new Map<string, PushSubscription>();

  constructor(private readonly logger: Logger, storageService: StorageService) {
    this.vapidKeys = storageService.get(VAPID_STORAGE_KEY) || webpush.generateVAPIDKeys();
    storageService.set(VAPID_STORAGE_KEY, this.vapidKeys);
    webpush.setVapidDetails('mailto:pwapraxis@liebel.org', this.vapidKeys.publicKey, this.vapidKeys.privateKey);
    this.logger.log(`Public Key: ${this.vapidKeys.publicKey}`, 'PushService');
  }

  push(userAgent: string, subscription: Subscription): void {
    this.subscriptions.set(subscription.endpoint, { userAgent, subscription });
  }

  pushToAll(title: string, body?: string): void {
    this.logger.log('Sending push message.');
    const notification = { notification: { title, body, icon: 'assets/icons/icon-128x128.png' } };
    this.subscriptions.forEach(subscription => {
      webpush.sendNotification(subscription.subscription, JSON.stringify(notification))
        .catch(err => {
          this.logger.error(err);
          this.subscriptions.delete(subscription.subscription.endpoint);
        });
    });
  }

  getForPresentation(): object[] {
    return Array.from(this.subscriptions.values()).map(subscription => {
      return {
        icon: this.getIcon(subscription.userAgent),
        userAgent: subscription.userAgent,
      };
    });
  }

  private getIcon(userAgent: string): string {
    const ua = UAParser(userAgent);

    if (ua.os.name === 'iOS') return 'fa-apple';
    if (ua.os.name === 'Android') return 'fa-android';
    if (ua.browser.name === 'Edge') return 'fa-edge';
    if (ua.browser.name === 'Firefox') return 'fa-firefox';
    if (ua.browser.name === 'Chrome') return 'fa-chrome';

    return 'fa-angular';
  }
}
