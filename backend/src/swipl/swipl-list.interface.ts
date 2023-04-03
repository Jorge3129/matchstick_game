export type SwiplList<T = any> =
  | '[]'
  | {
      head: T;
      tail: SwiplList<T>;
    };
