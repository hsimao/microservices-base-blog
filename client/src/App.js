import { useState, useEffect, useCallback } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(Object.values(res.data));
  }, []);

  const createPost = useCallback(
    async (title) => {
      await axios.post("http://localhost:4000/posts", {
        title
      });
      fetchPosts();
    },
    [fetchPosts]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createComment = useCallback(async (commentData) => {
    const { postId, content } = commentData;
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content
    });
  });

  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate createPost={createPost} />
      <hr />
      <h1>Posts</h1>
      <PostList posts={posts} createComment={createComment} />
    </div>
  );
}

export default App;
