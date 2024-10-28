import { Link } from "react-router-dom";
import { RoutesEnum } from "../../../App";
import useNavbar from "../../../hooks/useNavbar";
import styles from "../navbar.module.css";

const SideLinks = () => {
  const { showNavMenu, isLoggedIn, logOut } = useNavbar();

  return (
    <ul
      className={`${styles.sideNavLinks} ${
        showNavMenu ? "" : styles.showNavMenu
      }`}
    >
      {!isLoggedIn && (
        <>
          <li>
            <Link to={RoutesEnum.LOGIN}>Login</Link>
          </li>
          <li>
            <Link to={RoutesEnum.REGISTER}>Register</Link>
          </li>
        </>
      )}
      {isLoggedIn && (
        <li>
          <Link to="#" onClick={logOut}>
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};

export default SideLinks;
