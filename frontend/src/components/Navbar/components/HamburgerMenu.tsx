import HAMBURGER_MENU from "../../../assets/hamburger-menu-svgrepo-com.svg";
import useNavbar from "../../../hooks/useNavbar";
import style from "../navbar.module.css";

const HamburgerMenu = () => {
  const { setShowNavMenu } = useNavbar();
  return (
    <div className={style.menu} onClick={() => setShowNavMenu()}>
      <img src={HAMBURGER_MENU} alt="dropdown menu" />
    </div>
  );
};

export default HamburgerMenu;
