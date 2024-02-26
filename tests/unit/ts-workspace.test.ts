import {goodbye, helloWorld} from '../../src';

describe(`Type Script Workspace test`, function(){
    it(`runs hello world`, function(){
        expect(helloWorld()).toBe('Hello World');
    });

    it(`runs goodbye world`, function(){
        expect(goodbye()).toBe('goodbye');
    });
});