const user = require('./user');

async function test() {
  const p = await user.findById(3);
  console.log(p)
}

test();