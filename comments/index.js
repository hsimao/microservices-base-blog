const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString();
  const { content } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  const newComment = {
    id: commentId,
    content
  };

  comments.push(newComment);

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId }
  });

  res.status(201).send(newComment);
});

app.post("/events", (req, res) => {
  console.log("comments 接收 event", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
