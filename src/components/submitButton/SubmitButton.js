import styles from "./SubmitButton.module.css";
import React from "react";

function SubmitButton({ children }) {
  return (
    <button type="submit" className={styles.button}>
      {children}
    </button>
  );
}

export default SubmitButton;
