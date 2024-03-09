import {VERSION} from "../../src";
import {ChildClass, complexFunction} from "../../lib"; // at least one import is needed so the file is considered a module byt jest

describe("Distribution Tests", () => {
  it ("reads lib", () => {
    const {VERSION, complexFunction, ChildClass} = require("../../lib/index.cjs");
    expect(VERSION).toBeDefined();
    expect(complexFunction).toBeDefined();
    expect(ChildClass).toBeDefined();
  })

  it("reads JS Bundle", () => {
    const {VERSION, complexFunction, ChildClass} = require("../../dist/ts-workspace.bundle.min.js");
    expect(VERSION).toBeDefined();
    expect(complexFunction).toBeDefined();
    expect(ChildClass).toBeDefined();
  })
})