import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../App";
import EDIT from "../../assets/edit.png";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import useAdminPage from "../../hooks/useAdminPage";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const navigate = useNavigate();

  const { products, error, isPending, pageNumber, setPageNumber, totalPages } =
    useAdminPage();

  if (error) {
    return <ErrorMsg message={error.message} />;
  }
  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products Management</h1>
        <button onClick={() => navigate(RoutesEnum.CREATE_PRODUCT)}>
          Add Product
        </button>
      </div>
      <div className={styles.wrapper}>
        <table>
          <thead>
            <tr>
              <th className={styles.edit}></th>
              <th className={styles.productId}>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td className={styles.edit}>
                  <img
                    src={EDIT}
                    alt="Edit"
                    onClick={() => {
                      navigate(`/admin/products/${product.id}`);
                    }}
                  />
                </td>
                <td className={styles.productId}>{product.id}</td>
                <td>{product.name}</td>
                <td className={styles.image}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                </td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages ?? 1}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default AdminPage;
