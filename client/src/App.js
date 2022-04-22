import { useState, useEffect, useCallback, useMemo } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState({});
  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  }, []);

  const createPost = useCallback(async (title) => {
    const res = await axios.post("http://localhost:4000/posts", {
      title
    });

    setPosts((posts) => ({
      ...posts,
      [res.data.id]: { ...res.data, comments: [] }
    }));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatPosts = useMemo(() => Object.values(posts), [posts]);

  const createComment = useCallback(async (commentData) => {
    const { postId, content } = commentData;
    const res = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        content
      }
    );

    setPosts((posts) => {
      const { id: commentId, content } = res.data;
      const targetPost = posts[postId];
      targetPost.comments.push({ id: commentId, content });
      return { ...posts };
    });
  }, []);

  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate createPost={createPost} />
      <hr />
      <h1>Posts</h1>
      <PostList posts={formatPosts} createComment={createComment} />
    </div>
  );
}

export default App;
