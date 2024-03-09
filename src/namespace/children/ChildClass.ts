import {Class} from "../Class";
import {ChildInterface} from "./ChildInterface";

/**
 * @summary child class summary
 * @description child class description
 *
 * @typedef T generic type description
 *
 * @param {T} arg1 constructor argument description
 * @param {string} [arg2] optional constructor argument description
 *
 * @class ChildClass
 * @extends Class
 * @implements ChildInterface<T>
 *
 * @category Namespace
 */
export class ChildClass<T> extends Class implements ChildInterface<T>{

  /**
   * @summary child class property summary
   * @description child class property description
   *
   * @property {T} [prop]
   *
   * @private
   */
  private prop2?: T;

  constructor(arg1: T, arg2: string) {
    super(arg1, arg2)
    this.prop2 = arg1;
  }

  /**
   * @summary overridden class method summary
   * @description overridden class method description
   *
   * @typedef V generic type description
   *
   * @throws {Error} always
   */
  async method<V>(): Promise<string>{
    return "ok"
  }
  /**
   * @summary class method summary
   * @description class method description
   *
   * @param {T} arg1
   *
   * @throws {Error} always
   */
  method2(arg1: T): Promise<string> {
    throw new Error("error")
  }
}