const express = require('express');
const bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

routers(app);
app.get('/', (req, res) => res.send('Hello World!'))


app.post('/login', passport.authenticate('local'), function (req, res) {

  console.log("-------req.user-----------");
  console.log(req.user);
  console.log("-------req.user-----------");

  res.send({
    msg: 'success'
  });
});

app.get('/login', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(`${__dirname}/login.html`);
})

app.get('/testAuth', passport.ensureAuthenticated(), function(req, res) {
  res.send('testAuth')
});

app.listen(3000, () => console.log('app listening on port 3000!'))
