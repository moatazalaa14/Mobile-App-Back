const express = require("express");
const server = express.Router();
const verifyToken = require("../helpers/verifyToken");

const UserService = require("../services/user/user.service");
const AchievementService = require("../services/achievement/achievement.service");
const FeedbackService = require("../services/feedback/feedback.service");

let userService = new UserService();
let achievementService = new AchievementService();
let feedbackService = new FeedbackService();

server.post("/login", userService.login);
server.post("/logout", verifyToken(), userService.logout);
server.get("/list", verifyToken(), userService.listRecords);
server.get("/:id/me", verifyToken(), userService.getUserById);
server.post("/new", verifyToken(), userService.createRecord);
server.put("/:id/image", verifyToken(), userService.changeImage);
server.put("/:id/phone", verifyToken(), userService.changePhone);
server.delete("/:id", verifyToken(), userService.deleteRecord);

server.post(
  "/:id/achievements/new",
  verifyToken(),
  achievementService.createRecord
);
server.put(
  "/achievements/:achievementId",
  verifyToken(),
  achievementService.updateRecord
);
server.delete(
  "/:id/achievements/:achievementId",
  verifyToken(),
  achievementService.deleteRecord
);

server.post("/:id/feedbacks/new", verifyToken(), feedbackService.createRecord);
server.put(
  "/:id/feedbacks/:feedbackId",
  verifyToken(),
  feedbackService.updateRecord
);
server.delete(
  "/:id/feedbacks/:feedbackId",
  verifyToken(),
  feedbackService.deleteRecord
);

module.exports = server;
