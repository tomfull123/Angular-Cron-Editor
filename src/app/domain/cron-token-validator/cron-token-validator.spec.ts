import {CronElementIndex, CronTokenValidator} from './cron-token-validator';
import {CronElementToken} from "../cron-element-token/cron-element-token";

describe('CronTokenValidator', () => {

  it('should validate * token', () => {
    const tokens = [new CronElementToken("*")];
    const validatedTokens = CronTokenValidator.validateTokens(tokens, CronElementIndex.Minute);
    expect(validatedTokens.length).toBe(1);
  });

});
