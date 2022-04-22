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
    comments: [{ id: "123", content: "content" }]
  },
  ...
}; */
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "PostCreated":
      const { id, title } = data;
      posts[id] = { id: id, title: title, comments: [] };
      break;
    case "CommentCreated":
      const { id: commentId, content, postId } = data;
      const post = posts[postId];
      post.comments.push({ id: commentId, content });
      break;
    default:
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Query Listening on 4002");
});
