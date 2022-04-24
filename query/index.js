const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* {
  "id-1234": {
    id: "id-1234",
    title: "title",
    comments: [{ id: "123", content: "content", status: "pending" }]
  },
  ...
}; */
const posts = {};

const handleQueryInit = async () => {
  const res = await axios.get("http://event-bus-srv:4005/events");
  res.data.forEach(({ type, data }) => handleEvent({ type, data }));
};

const handleEvent = ({ type, data }) => {
  const handlePostCreated = (data) => {
    const { id, title } = data;
    posts[id] = { id: id, title: title, comments: [] };
  };

  const handleCommentCreated = (data) => {
    const { id: commentId, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id: commentId, content, status });
  };

  const handleCommentUpdated = (data) => {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  };

  switch (type) {
    case "PostCreated":
      handlePostCreated(data);
      break;
    case "CommentCreated":
      handleCommentCreated(data);
      break;
    case "CommentUpdated":
      handleCommentUpdated(data);
      break;
    default:
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("query 接收 event ", type);
  handleEvent({ type, data });
  res.send({});
});

app.listen(4002, () => {
  console.log("Query Listening on 4002");
  handleQueryInit();
});
