import {Class} from "../Class";
import {Type} from "../type";

/**
 * @summary function summary
 * @description function description
 *
 * @typedef T extends {@link Class}
 * @typedef V
 *
 * @param {V[]} args
 *
 * @see Type
 *
 * @memberOf module:ts-workspace.Namespace.
 */
export function something<T extends Class, V>(this: T, ...args: V[]): Type<T> {
  console.log(...args);
  return this;
}