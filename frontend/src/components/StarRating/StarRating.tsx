import { useEffect } from "react";
import ACTIVE_STAR from "../../assets/active-star.png";
import INACTIVE_STAR from "../../assets/grey-star.png";
import useStarRating from "../../hooks/useStarRating";
import { useAppSelector } from "../../store/hooks";
import styles from "./StarRating.module.css";

const StarRating = ({ userReview }: { userReview: number }) => {
  const { rating, setRating, isPending, error, addReview } = useStarRating();

  const getDisplayImage = (index: number) => {
    if (index <= rating) {
      return ACTIVE_STAR;
    } else {
      return INACTIVE_STAR;
    }
  };

  const user = useAppSelector((state) => state.user.user);

  const handleClick = async (index: number) => {
    if (!isPending && user) {
      setRating(index);
      await addReview(index);
    }
  };

  useEffect(() => {
    setRating(userReview);
  }, [userReview]);

  if (error) return <></>;

  return (
    <div className={styles.starRating}>
      <img
        width={30}
        height={30}
        src={getDisplayImage(1)}
        alt=""
        onClick={() => handleClick(1)}
      />
      <img
        width={30}
        height={30}
        src={getDisplayImage(2)}
        alt=""
        onClick={() => handleClick(2)}
      />
      <img
        width={30}
        height={30}
        src={getDisplayImage(3)}
        alt=""
        onClick={() => handleClick(3)}
      />
      <img
        width={30}
        height={30}
        src={getDisplayImage(4)}
        alt=""
        onClick={() => handleClick(4)}
      />
      <img
        width={30}
        height={30}
        src={getDisplayImage(5)}
        alt=""
        onClick={() => handleClick(5)}
      />
    </div>
  );
};

export default StarRating;
