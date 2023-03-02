const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bycryt = require("bcryptjs");

const auth = require("../../middleware/auth");
const User = require("../../modules/User");

// @route    GET api/auth
// @desc      Get authorized user info
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/auth
// @desc     Log in, authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        // if no return : Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //check password
      const isMatch = await bycryt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] }); //for security, same response for !user & !isMatch is better
      }

      // jsonwebtoken
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
