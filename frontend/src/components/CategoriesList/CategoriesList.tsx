import useCategories from "../../hooks/useCategories";
import styles from "./CategoriesList.module.css";

const CategoriesList = ({
  setCategory,
}: {
  setCategory: (x: string) => void;
}) => {
  const { error, isPending, categories } = useCategories();

  if (error || isPending || !categories) {
    return (
      <select className={styles.categoriesList}>
        <option value="">All</option>
      </select>
    );
  }

  return (
    <select
      className={styles.categoriesList}
      onChange={(e) => {
        setCategory(e.target.value);
      }}
    >
      <option value="">All</option>
      {categories?.map((category: string) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoriesList;
