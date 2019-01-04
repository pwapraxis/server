import { IpService } from './ip.service';

describe('IpService', () => {
  let sut: IpService;

  beforeEach(() => {
    sut = new IpService();
  });

  describe('extractIp', () => {
    const expectedIp = '192.3.14.199';

    it('should return IP from multiple values', () => {
      const ip = '192.3.14.199:12377, 192.3.14.199';

      const result = sut.extractIp(ip);

      expect(result).toBe(expectedIp);
    });

    it('should return IP transparently', () => {
      const ip = '192.3.14.199';

      const result = sut.extractIp(ip);

      expect(result).toBe(expectedIp);
    });

    it('should silently pass undefined', () => {
      const ip = void 0;

      const result = sut.extractIp(ip);

      expect(result).toBeUndefined();
    });
  });
});
