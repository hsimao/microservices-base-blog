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
    case "PostCreate":
      posts[id] = { id: data.id, title: data.title, comments: [] };
      break;
    case "CommentCreated":
      const post = posts[data.postId];
      post.comments.push({ id: data.id, content: data.content });
      break;
    default:
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Query Listening on 4002");
});
