const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.exists({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).send("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPass,
    });

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return res.status(500).send("Error occured, try again!");
  }
};

module.exports = register;
