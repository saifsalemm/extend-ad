import React from "react";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../App";
import useLogin from "../../hooks/useLogin";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const { loginUser, error, isPending, emailRef, passwordRef } = useLogin();

  return (
    <div className={styles.container}>
      <form onSubmit={loginUser} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.register}>
          <p className={styles.registerMsg}>Don't have an account?</p>
          <Link className={styles.registerLink} to={RoutesEnum.REGISTER}>
            Register
          </Link>
        </div>
        <div className={styles.input}>
          <label>Email</label>
          <input ref={emailRef} type="text" required />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input ref={passwordRef} type="password" required />
        </div>
        <button type="submit" className={styles.submit} disabled={isPending}>
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
