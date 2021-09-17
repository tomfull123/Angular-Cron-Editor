import {CronElementParser} from './cron-element-parser';
import {CronElementIndex} from "../cron-token-validator/cron-token-validator";

class CronTestHelper {
  static buildCron(cronElement: string, elementIndex: CronElementIndex): string {
    const cronElements = ['*', '*', '*', '*', '*'];
    cronElements[elementIndex] = cronElement;
    return cronElements.join(' ');
  }
}

describe('CronElementParser', () => {
  it('should create an instance', () => {
    expect(new CronElementParser()).toBeTruthy();
  });

  it('should only return valid values for each cron element', () => {
    for (let i = 0; i < 5; i++) {
      let tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*', i), i);
      expect(tokens?.length).toBe(1);
      expect(tokens![0].value).toBe('*');

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*/1', i), i);
      expect(tokens?.length).toBe(1);
      expect(tokens![0].value).toBe('*/1');

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1,2,3', i), i);
      expect(tokens?.length).toBe(5);
      expect(tokens![0].value).toBe('1');
      expect(tokens![1].value).toBe(',');
      expect(tokens![2].value).toBe('2');
      expect(tokens![3].value).toBe(',');
      expect(tokens![4].value).toBe('3');

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*/1,2,3', i), i);
      expect(tokens?.length).toBe(5);
      expect(tokens![0].value).toBe('*/1');
      expect(tokens![1].value).toBe(',');
      expect(tokens![2].value).toBe('2');
      expect(tokens![3].value).toBe(',');
      expect(tokens![4].value).toBe('3');

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*1-11,', i), i);
      console.log("tokens");
      console.log(tokens);
      expect(tokens?.length).toBe(0);

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron(',*/12', i), i);
      expect(tokens?.length).toBe(1);
      expect(tokens![0].value).toBe('*/12');

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*/120', i), i);
      expect(tokens?.length).toBe(1);
      expect(tokens![0].value).toBe('*/120');

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('120', i), i);
      expect(tokens?.length).toBe(0);

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('-1', i), i);
      expect(tokens?.length).toBe(0);

      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('/1', i), i);
      expect(tokens?.length).toBe(0);

      // Invalid
      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*/1/2', i), i);
      expect(tokens?.length).toBe(0);

      // Invalid
      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/0', i), i);
      expect(tokens?.length).toBe(0);

      // Invalid
      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/*', i), i);
      expect(tokens?.length).toBe(0);

      // Invalid
      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('*/*', i), i);
      expect(tokens?.length).toBe(0);

      // Invalid
      tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1,,1/1', i), i);
      expect(tokens?.length).toBe(3);
      expect(tokens![0].value).toBe('1');
      expect(tokens![1].value).toBe(',');
      expect(tokens![2].value).toBe('1/1');
    }
  });

  it('should check minute specific ranges', () => {
    const i = 0;

    // Should remove values higher than 59
    let tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('120', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('59', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('59');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('60', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('0');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/1', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('0/1');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1-10', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1-10');
  });

  it('should check hour specific ranges', () => {
    const i = 1;

    // Should remove values higher than 23
    let tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('23', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('23');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('24', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('0');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/1', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('0/1');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1-10', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1-10');
  });

  it('should check day-of-month specific ranges', () => {
    const i = 2;

    // Should remove values higher than 31
    let tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('31', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('31');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('32', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/1', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1-10', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1-10');
  });

  it('should check month specific ranges', () => {
    const i = 3;

    // Should remove values higher than 12
    let tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('12', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('12');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('13', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/1', i), i);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1-10', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1-10');
  });

  it('should check day-of-week specific ranges', () => {
    const i = 4;

    // Should remove values higher than 6
    let tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('6', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('6');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('7', i), i);
    console.log(tokens);
    expect(tokens?.length).toBe(0);

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('0');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('0/1', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('0/1');

    tokens = CronElementParser.parseCronElement(CronTestHelper.buildCron('1-6', i), i);
    expect(tokens?.length).toBe(1);
    expect(tokens![0].value).toBe('1-6');
  });

});
