import styles from "./Accordion.module.css";
import { useState, useRef, useEffect } from "react";
function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef(null); //lo uso para crear una referencia al div y que me lleve el top del div a top de l pantalla
  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    //lo utilizo para desplazarme al div cuando isOpen cambia a true.
    if (isOpen) {
      //itemReg.current accede al nodo del dom directamente
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${isOpen ? styles.open : ""}`}
    >
      <div
        className={`d-flex flex-row justify-content-between ${styles.title}`}
        onClick={handleToggle}
      >
        <p>{title}</p>
        <p>{isOpen ? "-" : "+"}</p>
      </div>

      {isOpen && <div className={styles.contentBox}>{children}</div>}
    </div>
  );
}
export default AccordionItem;
