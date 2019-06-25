const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get("/userList", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({users});
  } catch (err) {
    next(err);
  }
});

router.post("/login", 
  passport.authenticate('local', {
    successMessage: 'login success',
    failureMessage: "system error"
  })
)

module.exports = router;