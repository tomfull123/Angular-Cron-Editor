import {CronElementLexer} from './cron-element-lexer';

describe('CronElementLexer', () => {
  it('should create an instance', () => {
    expect(new CronElementLexer('* * * * *')).toBeTruthy();
  });
});
