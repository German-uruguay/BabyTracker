import { Outlet, Link } from "react-router-dom";
import styles from "./LoginRegister.module.css";
function LogRegContainer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftDiv}>
        <Link to="/login">
          <button className={styles.boton}>Login</button>
        </Link>
        <Link to="/register">
          <button className={styles.boton}>Register</button>
        </Link>
      </div>
      <div className={styles.formWrapper}>
        <Outlet /> {/* Aca se renderizarian Login o Register segun la ruta */}
      </div>
    </div>
  );
}

export default LogRegContainer;
