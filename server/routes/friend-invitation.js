const express = require("express");
const joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authenticate = require("../middlewares/authentication");
const {
  controllers,
} = require("../controllers/friend-invitation/friend-invitation-controller");
const Joi = require("joi");

const router = express.Router();

const postFriendInvitationSchema = joi.object({
  targetEmail: joi.string().email(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  authenticate,
  validator.body(postFriendInvitationSchema),
  controllers.postInvite
);

router.post(
  "/accept",
  authenticate,
  validator.body(inviteDecisionSchema),
  controllers.postAccept
);

router.post(
  "/reject",
  authenticate,
  validator.body(inviteDecisionSchema),
  controllers.postReject
);

module.exports = router;
