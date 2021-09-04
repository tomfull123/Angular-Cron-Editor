import {CronElementToken} from "../cron-element-token/cron-element-token";
import {CronElementLexer} from "../cron-element-lexer/cron-element-lexer";

export class CronElementParser {

  parseCronElement(cron: string, elementIndex: number) {
    const cronElements = cron.split(' ');

    if(elementIndex >= cronElements.length) return
    const cronElement = cronElements[elementIndex];

    const tokens = this.parseTokens(cronElement)

    return tokens;
  }

  private parseTokens(cronElement: string): CronElementToken[] {
    const lexer = new CronElementLexer(cronElement);
    const tokens = [];

    while(!lexer.isEnd()) {
      tokens.push(lexer.readNext());
    }

    return tokens;
  }

}
