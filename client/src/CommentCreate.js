import { useState } from "react";

function CommentCreate({ postId, createComment }) {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    createComment({ postId, content });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;
