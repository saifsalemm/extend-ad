import DELETE from "../../../assets/bin.png";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";
import Spinner from "../../../components/Spinner/Spinner";
import useEditProduct from "../../../hooks/useEditProduct";
import styles from "./EditProduct.module.css";

const EditProduct = () => {
  const { data, setData, error, isPending, editProduct, deleteProduct } =
    useEditProduct();

  if (error) {
    return <ErrorMsg message={error} />;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={`${styles.container} ${isPending ? styles.isPending : ""}`}>
      <form onSubmit={editProduct} className={styles.form}>
        <button className={styles.deleteBtn} onClick={deleteProduct}>
          <img src={DELETE} height={40} width={40} alt="Edit" />
        </button>
        <h2 className={styles.title}>Edit Product</h2>
        <div className={`${styles.input} ${styles.disabled}`}>
          <label>ID</label>
          <input value={data.id} type="text" disabled />
        </div>
        <div className={styles.input}>
          <label>Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            type="text"
            required
          />
        </div>
        <div className={`${styles.input} ${styles.disabled}`}>
          <label>Creation Date</label>
          <input value={data.creation_date} type="text" disabled />
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
          Edit Product
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
