import {CronElementToken} from "../cron-element-token/cron-element-token";
import {CronElementIndex} from "../cron-element-parser/cron-element-parser";

export class CronTokenValidator {

  static CRON_ELEMENT_MIN_VALUES = {
    [CronElementIndex.Minute]: 0,
    [CronElementIndex.Hour]: 0,
    [CronElementIndex.DayOfMonth]: 1,
    [CronElementIndex.Month]: 1,
    [CronElementIndex.DayOfWeek]: 0
  };
  static CRON_ELEMENT_MAX_VALUES = {
    [CronElementIndex.Minute]: 59,
    [CronElementIndex.Hour]: 23,
    [CronElementIndex.DayOfMonth]: 31,
    [CronElementIndex.Month]: 12,
    [CronElementIndex.DayOfWeek]: 6
  };

  static validateTokens(tokens: CronElementToken[], elementIndex: CronElementIndex): CronElementToken[] {
    const minValue = this.CRON_ELEMENT_MIN_VALUES[elementIndex];
    const maxValue = this.CRON_ELEMENT_MAX_VALUES[elementIndex]

    for (let i = 0; i < tokens.length; i++) {
      tokens[i].valid = this.isTokenValid(tokens, tokens[i], i, minValue, maxValue);
      const isFirstToken = i === 0;
      // We have a previous token and the current token is invalid
      if (!isFirstToken && !tokens[i].valid) {
        const previousToken = tokens[i - 1];
        if (previousToken.value === ',' && tokens[i].value !== ',') {
          previousToken.valid = false;
        }
      }
    }

    return tokens;
  }

  private static isTokenValid(tokens: CronElementToken[], token: CronElementToken, index: number, minValue: number, maxValue: number): boolean {
    const isFirstToken = index === 0;
    const isLastToken = index === (tokens.length - 1);
    const previousToken = isFirstToken ? null : tokens[index - 1];

    if (token.value === ',') {
      if (previousToken?.value === ',') return false;
      return !isFirstToken && !isLastToken;
    }

    if (token.value.includes('/')) { // Stepped values
      const steppedValues = token.value.split('/').filter(v => v !== '');
      if (steppedValues.length !== 2) return false;
      return this.isValidValue(steppedValues[0], minValue, maxValue) &&
        this.isValidNumberValue(steppedValues[1], 1);
    }

    if (token.value.includes('-')) { // Range values
      const rangeValues = token.value.split('-').filter(v => v !== '');
      if (rangeValues.length !== 2) return false;
      return this.isValidNumberValue(rangeValues[0], minValue, maxValue) &&
        this.isValidNumberValue(rangeValues[1], minValue, maxValue);
    }

    return this.isValidValue(token.value, minValue, maxValue);
  }

  private static isValidNumberValue(value: string, minValue?: number, maxValue?: number): boolean {
    const valueAsNumber = Number(value);
    if (!isNaN(valueAsNumber)) {
      return ((minValue == null || valueAsNumber >= minValue) && (maxValue == null || valueAsNumber <= maxValue));
    }
    return false;
  }

  private static isValidValue(value: string, minValue?: number, maxValue?: number): boolean {
    if (value === '*') return true;
    return this.isValidNumberValue(value, minValue, maxValue);
  }

}
