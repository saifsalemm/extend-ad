import useAccount from "../../hooks/useAccount";
import styles from "./AccountPage.module.css";

const AccountPage = () => {
  const { data, setData, error, isPending, editUser } = useAccount();

  return (
    <div className={`${styles.container} ${isPending ? styles.isPending : ""}`}>
      <form onSubmit={editUser} className={styles.form}>
        <h2 className={styles.title}>Account</h2>
        <div className={styles.input}>
          <label>First Name</label>
          <input
            value={data.first_name}
            onChange={(e) => setData({ ...data, first_name: e.target.value })}
            type="text"
          />
        </div>
        <div className={styles.input}>
          <label>Last Name</label>
          <input
            value={data.last_name}
            onChange={(e) => setData({ ...data, last_name: e.target.value })}
            type="text"
          />
        </div>
        <div className={styles.input}>
          <label>Email</label>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="text"
          />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
          />
        </div>
        <div className={styles.input}>
          <label>Role</label>
          <select
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.submit} disabled={isPending}>
          Update my data
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AccountPage;
