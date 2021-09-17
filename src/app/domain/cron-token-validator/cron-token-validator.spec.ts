import { CronTokenValidator } from './cron-token-validator';

describe('CronTokenValidator', () => {
  it('should create an instance', () => {
    expect(new CronTokenValidator()).toBeTruthy();
  });
  // 10-5 - invalid
  // 5-10 - valid
  // 5-5 - valid

});
