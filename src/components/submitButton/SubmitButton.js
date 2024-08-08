import styles from "./SubmitButton.module.css";
import React from "react";

function SubmitButton({ children, disabled }) {
  return (
    <button type="submit" className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}

export default SubmitButton;
