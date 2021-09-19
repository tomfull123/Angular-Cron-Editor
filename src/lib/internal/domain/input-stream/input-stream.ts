export class InputStream {

  constructor(private input: string) {
  }

  next(): string {
    const front = this.input[0];
    this.input = this.input.substring(1);
    return front;
  }

  peek(): string {
    return this.input[0];
  }

  isEnd(): boolean {
    return this.input.length <= 0;
  }

}
