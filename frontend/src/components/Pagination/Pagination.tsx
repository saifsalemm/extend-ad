import LEFT_ARROW from "../../assets/left-arrow.png";
import RIGHT_ARROW from "../../assets/right-arrow.png";
import styles from "./Pagination.module.css";

const Pagination = ({
  totalPages,
  pageNumber,
  setPageNumber,
}: {
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}) => {
  return (
    <div className={styles.container}>
      <button
        className={pageNumber <= 1 ? styles.disabled : ""}
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber <= 1}
      >
        <img width={30} height={30} src={LEFT_ARROW} alt="left arrow" />
      </button>
      <button
        className={pageNumber >= totalPages ? styles.disabled : ""}
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber >= totalPages}
      >
        <img width={30} height={30} src={RIGHT_ARROW} alt="right arrow" />
      </button>
    </div>
  );
};

export default Pagination;
