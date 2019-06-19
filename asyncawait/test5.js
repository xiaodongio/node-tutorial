const assert = require('assert');

async function test() {
  const p = Promise.resolve('test');
  assert.doesNotThrow(function() {
    // SyntaxError: Unexpected identifier
    await p;
  });
  console.log('Hello, world!');
}

test();