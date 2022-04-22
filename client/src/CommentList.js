function CommentList({ comments }) {
  const renderComments = comments.map(({ id, content }) => (
    <li key={id}>{content}</li>
  ));

  return <ul>{renderComments}</ul>;
}

export default CommentList;
