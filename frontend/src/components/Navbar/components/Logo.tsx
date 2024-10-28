import LOGO from "../../../assets/extendad_logo.jpeg";
import style from "../navbar.module.css";

const Logo = () => {
  return (
    <div className={style.logo}>
      <img src={LOGO} alt="Extend" />
    </div>
  );
};

export default Logo;
