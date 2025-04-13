export type RequiredKeys<T, K extends keyof T> =
  Omit<Partial<T>, K> & Required<Pick<T, K>>