/**
 * @summary Interface summary
 * @description Interface description
 *
 * @interface Interface
 *
 * @category Namespace
 */
export interface Interface {
  /**
   * @summary Interface method summary
   * @description Interface method description
   *
   * @typedef T
   *
   * @param {T} arg1
   */
  method<T>(arg1: T): Promise<string>
}