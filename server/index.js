const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/auth");
const friendInvitationRoute = require("./routes/friend-invitation");
const { registerSocketServer } = require("./socket-server");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/friend-invitation", friendInvitationRoute);

const PORT = process.env.PORT;

const start = async () => {
  registerSocketServer(server);
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      server.listen(PORT, () => {
        console.log("Server listening on port " + PORT);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

start();
