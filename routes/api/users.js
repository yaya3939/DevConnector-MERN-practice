const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bycryt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../modules/User");

// @route    POST api/users
// @desc     register user
// @access   Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        // if no return : Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", //default size
        r: "pg", //rating, 分级, no naked...
        d: "mm", //default data
      });

      user = new User({ name, email, avatar, password });

      //hash password
      const salt = await bycryt.genSalt(10);
      user.password = await bycryt.hash(password, salt);

      //save user info
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //key name in collection is "_id", but mongoose have abstraction for it, can just say id
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
