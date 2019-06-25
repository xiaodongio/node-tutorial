const express = require('express');
const passport = require('../config/passport');
const router = express.Router();

router.get("/test", (req, res, next) => {
  try {
    let name = req.query.name;
    if (!name) {
      name = "world";
    }
    res.json({"result": `hello ${name}`});
  } catch (err) {
    next(err);
  }
});

router.get('/loginValid', passport.ensureAuthenticated(), (req, res) =>
  res.send({
    msg: 'success'
  })
);

module.exports = router;