import { Link } from "react-router-dom";
import PLACEHOLDER from "../../assets/placeholder_img.jpg";
import styles from "./ProductCard.module.css";

const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
}: {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null;
}) => {
  return (
    <div key={id} className={styles.productCard}>
      <img className={styles.image} src={image ?? PLACEHOLDER} alt={name} />
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>${price}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <Link to={`/product/${id}`} className={styles.detailsBtn}>
        Details
      </Link>
    </div>
  );
};

export default ProductCard;
