function CommentList({ comments }) {
  const renderComments = comments.map(({ id, content, status }) => {
    let formatContent;

    switch (status) {
      case "approved":
        formatContent = content;
        break;
      case "pending":
        formatContent = "This comment is await moderation";
        break;
      case "rejected":
        formatContent = "This comment has been rejected";
        break;
      default:
        formatContent = "";
    }
    return <li key={id}>{formatContent}</li>;
  });

  return <ul>{renderComments}</ul>;
}

export default CommentList;
