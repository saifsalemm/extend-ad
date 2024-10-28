import React from "react";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../App";
import useRegister from "../../hooks/useRegister";
import styles from "./RegisterPage.module.css";

const RegisterPage: React.FC = () => {
  const {
    firstNameRef,
    lastNameRef,
    emailRef,
    passwordRef,
    roleRef,
    error,
    isPending,
    registerUser,
  } = useRegister();

  return (
    <div className={styles.container}>
      <form onSubmit={registerUser} className={styles.form}>
        <h2 className={styles.title}>Register</h2>
        <div className={styles.login}>
          <p className={styles.loginMsg}>Already have an account?</p>
          <Link className={styles.loginLink} to={RoutesEnum.LOGIN}>
            Login
          </Link>
        </div>
        <div className={styles.input}>
          <label>First Name</label>
          <input ref={firstNameRef} type="text" required />
        </div>
        <div className={styles.input}>
          <label>Last Name</label>
          <input ref={lastNameRef} type="text" required />
        </div>
        <div className={styles.input}>
          <label>Email</label>
          <input ref={emailRef} type="text" required />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input ref={passwordRef} type="password" required />
        </div>
        <div className={styles.input}>
          <label>Role</label>
          <select ref={roleRef} required>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.submit} disabled={isPending}>
          Register
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
