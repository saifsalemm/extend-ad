import { Link } from "react-router-dom";
import { RoutesEnum } from "../../../App";
import useNavbar from "../../../hooks/useNavbar";
import styles from "../navbar.module.css";

const MidLinks = () => {
  const { showNavMenu, isLoggedIn, isAdmin } = useNavbar();

  return (
    <ul
      className={`${styles.midNavLinks} ${
        showNavMenu ? "" : styles.showNavMenu
      }`}
    >
      <li>
        <Link to={RoutesEnum.CATALOGUE}>Catalogue</Link>
      </li>
      {isLoggedIn && (
        <li>
          <Link to={RoutesEnum.ACCOUNT}>Account</Link>
        </li>
      )}
      {isAdmin && (
        <li>
          <Link to={RoutesEnum.ADMIN}>Admin area</Link>
        </li>
      )}
    </ul>
  );
};

export default MidLinks;
