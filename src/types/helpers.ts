export type DeepRequired<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends object
    ? NonNullable<T[K]> extends
        | ((...args: unknown[]) => unknown)
        | Date
        | RegExp
      ? NonNullable<T[K]>
      : DeepRequired<NonNullable<T[K]>>
    : T[K];
};
