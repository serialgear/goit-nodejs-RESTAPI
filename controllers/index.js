const contacts = require("./contacts");
const users = require("./users");
const login = require("./users");
const getCurrent = require("./users");
const logout = require("./users");
const updateSubscriptionUser = require("./users");
const updateAvatar = require("./users");
const verifyEmail = require("./users");
const resendVerifyEmail = require("./users");

module.exports = {
  contacts,
  users,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
