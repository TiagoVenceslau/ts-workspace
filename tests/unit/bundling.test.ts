import {VERSION} from "../../lib"; // at least one import is needed so the file is considered a module byt jest

describe("Distribution Tests", () => {
    it ("reads lib", () => {
        const {VERSION, goodbye, helloWorld} = require("../../lib");
        expect(VERSION).toBeDefined();
        expect(goodbye).toBeDefined();
        expect(helloWorld).toBeDefined();
    })

    it("reads JS Bundle", () => {
        const {VERSION, goodbye, helloWorld} = require("../../dist/ts-workspace.bundle.min.js");
        expect(VERSION).toBeDefined();
        expect(goodbye).toBeDefined();
        expect(helloWorld).toBeDefined();
    })
})