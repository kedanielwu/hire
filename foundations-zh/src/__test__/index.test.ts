import { expect } from 'chai';
import { parseError } from '../index';
const fixtureStack = `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at calc http://192.168.31.8:8000/a.js:4:3
  at foo http://192.168.31.8:8000/b.js:4:1
  at dsa http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`
const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`

describe('parseError test', () => {
  it('should contain correct message', () => {
    const err = new Error('test');
    const errLog = parseError(err);
    expect(errLog.message).to.equal('test');
  });

  it('should parse correctly for chrome stack', () => {
    const err = new Error('test');
    err.stack = fixtureStack;
    const errLog = parseError(err);
    expect(errLog.message).to.equal('test');
    expect(errLog.stack.length).to.equal(5);
    //content check
    expect(errLog.stack[0].line).to.equal(2);
    expect(errLog.stack[0].column).to.equal(9);
    expect(errLog.stack[0].filename).to.equal("http://192.168.31.8:8000/c.js");

    expect(errLog.stack[1].line).to.equal(4);
    expect(errLog.stack[1].column).to.equal(3);
    expect(errLog.stack[1].filename).to.equal("http://192.168.31.8:8000/a.js");

    expect(errLog.stack[2].line).to.equal(4);
    expect(errLog.stack[2].column).to.equal(1);
    expect(errLog.stack[2].filename).to.equal("http://192.168.31.8:8000/b.js");

    expect(errLog.stack[3].line).to.equal(4);
    expect(errLog.stack[3].column).to.equal(3);
    expect(errLog.stack[3].filename).to.equal("http://192.168.31.8:8000/a.js");

    expect(errLog.stack[4].line).to.equal(22);
    expect(errLog.stack[4].column).to.equal(3);
    expect(errLog.stack[4].filename).to.equal("http://192.168.31.8:8000/a.js");
  });

  it('should parse correctly for firefox stack', () => {
    const err = new Error('test');
    err.stack = fixtureFirefoxStack;
    const errLog = parseError(err);
    expect(errLog.message).to.equal('test');
    expect(errLog.stack.length).to.equal(4);
    //content check
    expect(errLog.stack[0].line).to.equal(2);
    expect(errLog.stack[0].column).to.equal(9);
    expect(errLog.stack[0].filename).to.equal("http://192.168.31.8:8000/c.js");

    expect(errLog.stack[1].line).to.equal(4);
    expect(errLog.stack[1].column).to.equal(15);
    expect(errLog.stack[1].filename).to.equal("http://192.168.31.8:8000/b.js");

    expect(errLog.stack[2].line).to.equal(4);
    expect(errLog.stack[2].column).to.equal(3);
    expect(errLog.stack[2].filename).to.equal("http://192.168.31.8:8000/a.js");

    expect(errLog.stack[3].line).to.equal(22);
    expect(errLog.stack[3].column).to.equal(3);
    expect(errLog.stack[3].filename).to.equal("http://192.168.31.8:8000/a.js");

  });

});