import { useState } from "react";

function PostCreate({ createPost }) {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    createPost(title);
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
