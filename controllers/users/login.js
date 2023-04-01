const { Unautorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const pathCompare = bcrypt.compareSync(password, user.password);
  if (!user || !pathCompare) {
    throw new Unautorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const { email: userEmail, subscription } = user;
  const userObj = { email: userEmail, subscription };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: userObj });
};

module.exports = login;
