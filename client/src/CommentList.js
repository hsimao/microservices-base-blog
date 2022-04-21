import { useState, useEffect } from "react";

function CommentList({ postId, fetchComments }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComment = async () => {
      const res = await fetchComments(postId);
      setComments(res.data);
    };
    fetchComment();
  }, []);

  const renderComments = comments.map(({ id, content }) => (
    <li key={id}>{content}</li>
  ));

  return <ul>{renderComments}</ul>;
}

export default CommentList;
