import { ProductData } from "../../services/types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./Products.module.css";

const Products = ({ products }: { products: ProductData[] }) => {
  return (
    <div className={styles.productsGrid}>
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
