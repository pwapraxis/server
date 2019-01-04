import { IpService } from '../ip/ip.service';
import { PushController } from './push.controller';
import { PushService } from './push.service';

describe('PushController', () => {
  let sut: PushController;

  let pushServiceMock: PushService;
  let ipServiceMock: IpService;

  const ip = 'IP';

  beforeEach(() => {
    pushServiceMock = { push: jest.fn() } as any;
    ipServiceMock = { extractIp: jest.fn(() => ip) } as any;

    sut = new PushController(pushServiceMock, ipServiceMock);
  });

  describe('postSubscription', () => {
    it('should pass subscription to PushService', () => {
      const userAgent = 'Mozilla/5.0';
      const forwardedFor = 'FORWARD';
      const subscription = {};

      sut.postSubscription(userAgent, forwardedFor, subscription);

      expect(ipServiceMock.extractIp).toHaveBeenCalledWith(forwardedFor);
      expect(pushServiceMock.push).toHaveBeenCalledWith(userAgent, subscription, ip);
    });
  });
});
