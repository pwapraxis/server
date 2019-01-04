import { PushController } from './push.controller';
import { PushService } from './push.service';

describe('PushController', () => {
  let sut: PushController;

  let pushServiceMock: PushService;

  beforeEach(() => {
    pushServiceMock = { push: jest.fn() } as any;

    sut = new PushController(pushServiceMock);
  });

  describe('postSubscription', () => {
    it('should pass subscription to PushService', () => {
      const userAgent = 'Mozilla/5.0';
      const subscription = {};
      const ip = 'IP';

      sut.postSubscription(userAgent, subscription, { ip } as any);

      expect(pushServiceMock.push).toHaveBeenCalledWith(userAgent, subscription, ip);
    });
  });
});
