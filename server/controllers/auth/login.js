const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        userDetails: {
          _id: user._id,
          email: user.email,
          token,
          username: user.username,
        },
      });
    }
    return res.status(400).send("Invalid credentials!");
  } catch (error) {
    return res.status(500).send("Error occured, try again!");
  }
};

module.exports = login;
