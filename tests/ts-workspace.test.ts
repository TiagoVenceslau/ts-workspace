import {helloWorld} from '../src';

describe(`Type Script Workspace test`, function(){
    it(`runs hello world`, function(){
        expect(helloWorld()).toBe('Hello World');
    });
});