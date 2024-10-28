import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";
import Spinner from "../../../components/Spinner/Spinner";
import useCreateProduct from "../../../hooks/useCreateProduct";
import styles from "./CreateProduct.module.css";

const CreateProduct = () => {
  const { data, setData, error, isPending, createProduct } = useCreateProduct();

  if (error) {
    return <ErrorMsg message={error} />;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={`${styles.container} ${isPending ? styles.isPending : ""}`}>
      <form onSubmit={createProduct} className={styles.form}>
        <h2 className={styles.title}>Create Product</h2>
        <div className={styles.input}>
          <label>Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            type="text"
            required
          />
        </div>
        <div className={styles.input}>
          <label>Price</label>
          <input
            value={data.price}
            onChange={(e) => setData({ ...data, price: +e.target.value })}
            type="number"
            required
          />
        </div>
        <div className={styles.input}>
          <label>Image Url (optional)</label>
          <input
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
            type="text"
          />
        </div>
        <div className={styles.input}>
          <label>Category</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" className={styles.submit} disabled={isPending}>
          Create Product
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
