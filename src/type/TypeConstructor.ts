/**
 * 将T类型中的指定属性设置为必填, 其他属性全部设置为可选
 *
 * 使用 | 指定多个类型
 * 如: 'a' | 'b'
 */
export type RequiredKeys<T, K extends keyof T> =
  Omit<Partial<T>, K> & Required<Pick<T, K>>