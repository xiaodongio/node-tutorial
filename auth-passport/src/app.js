const express = require('express');
const app = express();
const passport = require('./config/passport');
const session = require('express-session');
const routers = require('./routers')


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

routers(app);
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(3000, () => console.log('app listening on port 3000!'))
