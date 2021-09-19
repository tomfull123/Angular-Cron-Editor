import {CronElementToken} from "../cron-element-token/cron-element-token";
import {CronElementLexer} from "../cron-element-lexer/cron-element-lexer";
import {CronElementIndex, CronTokenValidator} from "../cron-token-validator/cron-token-validator";

export class CronElementParser {

  static isCronValid(cron?: string): boolean {
    if (!cron) return false;

    for (let i = 0; i < 5; i++) {
      if (!this.isCronElementValid(i, cron)) return false;
    }

    return true;
  }

  static isCronElementValid(elementIndex: CronElementIndex, cron?: string): boolean {
    if (cron == null) return false;
    const cronElementTokens = this.parseCronElement(cron!, elementIndex);
    if ((cronElementTokens?.length ?? 0) === 0) return false;
    return (!cronElementTokens?.some(t => !t.valid)) ?? false;
  }

  static parseCronElement(cron: string | undefined, elementIndex: CronElementIndex): CronElementToken[] | undefined {
    if (cron == null) return undefined;
    const cronElements = cron.split(' ');

    if (elementIndex >= cronElements.length) return;
    const cronElement = cronElements[elementIndex];
    if (cronElement === '') return;

    const tokens = this.parseTokens(cronElement)

    return CronTokenValidator.validateTokens(tokens, elementIndex);
  }

  private static parseTokens(cronElement: string): CronElementToken[] {
    const lexer = new CronElementLexer(cronElement);
    const tokens = [];

    while (!lexer.isEnd()) {
      tokens.push(lexer.readNext());
    }

    return tokens;
  }

}
