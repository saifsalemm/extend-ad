import { CommentI } from "../../services/types";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import styles from "./CommentInput.module.css";

const CommentInput = ({
  comment,
  commentPending,
  commentError,
  setComment,
  addComment,
}: {
  comment: CommentI;
  commentPending: boolean;
  commentError: string;
  setComment: (comment: CommentI) => void;
  addComment: () => Promise<void>;
}) => {
  return (
    <div className={styles.commentInput}>
      <h1>Write a comment</h1>
      <div
        className={`${styles.commentForm} ${
          commentPending ? styles.isPending : ""
        }`}
      >
        <div className={styles.customerName}>
          <label>Name:</label>
          <input
            type="text"
            value={comment.name}
            onChange={(e) => setComment({ ...comment, name: e.target.value })}
          />
        </div>
        <div className={styles.customerEmail}>
          <label>Email:</label>
          <input
            type="email"
            value={comment.email}
            onChange={(e) => setComment({ ...comment, email: e.target.value })}
          />
        </div>
        <div className={styles.customerComment}>
          <label>Comment:</label>
          <textarea
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
          />
        </div>
        <button
          type="button"
          className={styles.submitComment}
          disabled={commentPending}
          onClick={addComment}
        >
          Send comment
        </button>
      </div>
      {commentError && <ErrorMsg message={commentError} />}
    </div>
  );
};

export default CommentInput;
