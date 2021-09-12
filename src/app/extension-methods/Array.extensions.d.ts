interface Array<T> {
  findLastIndex<T>(predicate: (value: T, index: number, obj: T[]) => boolean): number;
}

