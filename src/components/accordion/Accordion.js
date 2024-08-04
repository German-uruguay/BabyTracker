import styles from "./Accordion.module.css";

function Accordion({ children }) {
  return <div className={styles.accordion}>{children}</div>;
}
export default Accordion;
