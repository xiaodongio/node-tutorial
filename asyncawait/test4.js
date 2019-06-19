function test() {
  const p = new Promise(resolve => setTimeout(() => resolve(), 1000));
  // SyntaxError: Unexpected identifier
  await p;
}

test();