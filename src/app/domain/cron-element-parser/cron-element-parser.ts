import {CronElementToken} from "../cron-element-token/cron-element-token";
import {CronElementLexer} from "../cron-element-lexer/cron-element-lexer";
import {Injectable} from "@angular/core";

export enum CronElementIndex {
  Minute = 0,
  Hour = 1,
  DayOfWeek = 4,
  DayOfMonth = 2,
  Month = 3
}

@Injectable({
  providedIn: 'root'
})
export class CronElementParser {

  isCronElementValid(elementIndex: CronElementIndex, cron?: string): boolean {
    if(cron === null) return false;
    const cronElements = cron!.split(' ');
    if(elementIndex >= cronElements.length) return false;
    const cronElement = cronElements[elementIndex];
    if(cronElement === '') return false;
    const parsedCronElement = this.parseCronElement(cron!, elementIndex)?.join('');
    return cronElement === parsedCronElement;
  }

  parseCronElement(cron: string, elementIndex: CronElementIndex): string[] | undefined {
    const cronElements = cron.split(' ');

    if (elementIndex >= cronElements.length) return;
    const cronElement = cronElements[elementIndex];

    const tokens = this.parseTokens(cronElement)

    return tokens.map(t => t.value);
  }

  private parseTokens(cronElement: string): CronElementToken[] {
    const lexer = new CronElementLexer(cronElement);
    const tokens = [];

    while (!lexer.isEnd()) {
      tokens.push(lexer.readNext());
    }

    return tokens;
  }

}
