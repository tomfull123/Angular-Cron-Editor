import { CronElementToken } from './cron-element-token';

describe('CronElementToken', () => {
  it('should create an instance', () => {
    expect(new CronElementToken('*')).toBeTruthy();
  });
});
