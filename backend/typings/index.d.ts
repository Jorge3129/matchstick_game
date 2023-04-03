declare module 'swipl' {
  export class Query {
    constructor(query: string);
    next<T = any>(): T;
    close(): void;
  }
}
