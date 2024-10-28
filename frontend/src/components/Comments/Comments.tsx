import { Comment } from "../../services/types";
import styles from "./Comments.module.css";

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className={styles.commentsContainer}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <h2>{comment.name}</h2>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
