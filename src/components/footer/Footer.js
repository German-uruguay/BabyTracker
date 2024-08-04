import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer>
      <div className={styles.flexContainer}>
        <p className={styles.nombre}>Germán Delgado </p>
        <p>Nº estudiante: 300557</p>
      </div>
    </footer>
  );
}
export default Footer;
