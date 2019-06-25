const testRouter = require('./test');
const userRouter = require('./users');

module.exports = (server) => {
  server.use("/api/test", testRouter);
  server.use("/api/users", userRouter);
}