import {InputStream} from "../input-stream/input-stream";
import {CronElementToken} from "../cron-element-token/cron-element-token";

export class CronElementLexer {

  private inputStream: InputStream;

  constructor(private cronElement: string) {
    this.inputStream = new InputStream(cronElement);
  }

  readNext(): CronElementToken {
    const ch = this.inputStream.peek();

    if(this.isComma(ch)) return this.readComma();
    return this.readTillComma();
  }

  isEnd(): boolean {
    return this.inputStream.isEnd();
  }

  private readWhile(fn: (char: string) => boolean): string {
    let string = '';

    while(!this.inputStream.isEnd() && fn(this.inputStream.peek())) {
      string += this.inputStream.next();
    }

    return string;
  }

  private isComma(char: string): boolean {
    return char === ',';
  }

  private isNotComma(char: string): boolean {
    return !this.isComma(char);
  }

  private readComma(): CronElementToken {
    return new CronElementToken(this.inputStream.next());
  }

  private readTillComma(): CronElementToken {
    return new CronElementToken(this.readWhile(this.isNotComma));
  }

}
