import {cloneDeep} from "lodash";

/**
 * 深克隆对象并排除指定字段
 *
 * 如果传入的值为Proxy, 将会对proxy拆包, 返回实际对象而非proxy, 这也意味着
 *
 * <strong>vue的代理对象将失去响应性</strong>, 包括ref, reactive, props等
 * @param source 源对象
 * @param excludes 要排除的字段
 */
export function cloneDeepExclude<T, K extends keyof T>(source: T, excludes: K | Array<K>): Omit<T, K> {
  const clone = cloneDeep(source);
  if (Array.isArray(excludes)) {
    excludes.forEach(exclude => {
      delete clone[exclude];
    });
  }
  else {
    delete clone[excludes];
  }
  return clone;
}
