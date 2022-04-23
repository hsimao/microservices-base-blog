const express = require("express");
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

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

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

  res.send({});
});

app.listen(4002, () => {
  console.log("Query Listening on 4002");
});
