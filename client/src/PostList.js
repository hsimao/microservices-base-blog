import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList({ posts, createComment, fetchComments }) {
  const renderPosts = posts.map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
        <CommentList postId={post.id} fetchComments={fetchComments} />
        <CommentCreate postId={post.id} createComment={createComment} />
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}

export default PostList;
