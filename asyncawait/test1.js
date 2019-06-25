async function test() {
  console.log('Hello, World!1');
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
  console.log('Hello, World!2');
}

test();

console.log(test());