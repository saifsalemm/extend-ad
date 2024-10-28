import PLACEHOLDER from "../../assets/placeholder_img.jpg";
import CommentInput from "../../components/CommentInput/CommentInput";
import Comments from "../../components/Comments/Comments";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Spinner from "../../components/Spinner/Spinner";
import StarRating from "../../components/StarRating/StarRating";
import useProduct from "../../hooks/useProduct";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const {
    error,
    isPending,
    data,
    comment,
    commentPending,
    commentError,
    setComment,
    addComment,
  } = useProduct();

  if (error) {
    return <ErrorMsg message={error.message} />;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.details}>
          <img className={styles.image} src={PLACEHOLDER} alt="product" />
          <div className={styles.info}>
            <p className={styles.name}>{data?.product?.name}</p>
            <p className={styles.price}>${data?.product?.price}</p>
            <StarRating userReview={data?.userReview!} />
            {data?.rating?.[0].avg && (
              <p className={styles.totalRates}>
                Rate: {Number(data?.rating[0].avg).toFixed(1)}
              </p>
            )}
            <p className={styles.category}>
              Category: {data?.product?.category}
            </p>
            <p className={styles.description}>{data?.product?.description}</p>
            <button className={styles.addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.comments}>
          <h1>Comments</h1>
          {data?.productComments && data?.productComments.length > 0 ? (
            <Comments comments={data?.productComments} />
          ) : (
            <p className={styles.noComments}>No comments yet</p>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <CommentInput
          comment={comment}
          commentPending={commentPending}
          commentError={commentError}
          setComment={setComment}
          addComment={addComment}
        />
      </div>
    </>
  );
};

export default ProductPage;
