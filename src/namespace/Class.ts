/**
 * @summary This is how you document a class
 * @description
 *
 * @mermaid
 *   sequenceDiagram
 *     Alice ->> Bob: Hello Bob, how are you?
 *     Bob-->>John: How about you John?
 *     Bob--x Alice: I am good thanks!
 *     Bob-x John: I am good thanks!
 *     Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.
 *
 *     Bob-->Alice: Checking with John...
 *     Alice->John: Yes... John, how are you?
 *
 * @typedef T
 *
 * @param {T} arg1 constructor argument description
 * @param {string} [arg2] optional constructor argument description
 *
 * @class Class
 * @implements Interface
 *
 * @category Namespace
 */
import {Interface} from "./Interface";

export class Class implements Interface{

  /**
   * @summary class property summary
   * @description class property description
   *
   * @property {any} prop
   *
   * @private
   */
  private prop: any;

  constructor(arg1: any, arg2: string) {
  }

  /**
   * @summary async class method summary
   * @description async class method description
   *
   * @throws {Error} it always throws an error
   */
  async method<T>(): Promise<string>{
    throw new Error("error")
  }

  /**
   * @summary static class method summary
   * @description static class method description
   *
   * @throws {Error} it always throws an error
   */
  static method(){
    throw new Error("error")
  }
}