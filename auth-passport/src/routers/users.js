const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const User = require('../models/user');


router.get("/user", async (req, res) => {
  let name = req.query.name;
  const user = await User.findByName(name);
  res.send({user});
});

router.post("/login", 
  passport.authenticate('local', {
    successMessage: 'success',
    failureMessage: 'failure'
  }),
  function(req, res) {
    console.log(111);
    res.send('123')
  }
)

module.exports = router;