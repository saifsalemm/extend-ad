import CategoriesList from "../../components/CategoriesList/CategoriesList";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Pagination from "../../components/Pagination/Pagination";
import Products from "../../components/Products/Products";
import SearchBar from "../../components/SearchBar/SearchBar";
import Spinner from "../../components/Spinner/Spinner";
import useCatalogue from "../../hooks/useCatalogue";
import styles from "./CataloguePage.module.css";

const CataloguePage = () => {
  const {
    products,
    totalPages,
    pageNumber,
    error,
    isPending,
    setPageNumber,
    setCategory,
    setSearchTerm,
  } = useCatalogue();

  if (error) {
    return <ErrorMsg message={error.message} />;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBar setSearchTerm={setSearchTerm} />
        <CategoriesList setCategory={setCategory} />
      </div>
      <Products products={products!} />
      <Pagination
        totalPages={totalPages ?? 1}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default CataloguePage;
