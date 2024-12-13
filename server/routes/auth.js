const express = require("express");
const joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const authenticate = require("../middlewares/authentication");
const { controllers } = require("../controllers/auth/auth");

const router = express.Router();

const registerSchema = joi.object({
  username: joi.string().min(3).max(12).required(),
  password: joi.string().min(6).max(12).required(),
  email: joi.string().email().required(),
});

const loginSchema = joi.object({
  password: joi.string().min(6).max(12).required(),
  email: joi.string().email().required(),
});

router.post("/register", validator.body(registerSchema), controllers.register);

router.post("/login", validator.body(loginSchema), controllers.login);

router.get("/rest", authenticate, (req, res) => res.send("hello"));

module.exports = router;
