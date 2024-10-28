import HamburgerMenu from "./components/HamburgerMenu";
import Logo from "./components/Logo";
import MidLinks from "./components/MidLinks";
import SideLinks from "./components/SideLinks";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoAndMenu}>
        <HamburgerMenu />
        <Logo />
      </div>
      <MidLinks />
      <SideLinks />
    </nav>
  );
};

export default Navbar;
