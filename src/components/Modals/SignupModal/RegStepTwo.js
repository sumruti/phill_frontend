import React from "react";

//stylesheets
import styles from "./RegStepTwo.module.css";

const RegStepTwo = props => {
  return (
    <form className={styles.formContainer}>
      <input
        className={`${styles.input} ${styles.spaceBetween} ${
          props.fnRed ? styles.inputError : null
        }`}
        name="firstName"
        placeholder="First name"
        type="text"
        onChange={props.handleInputChangeLettersOnly}
      />

      <input
        className={`${styles.input} ${styles.spaceBetween} ${
          props.lnRed ? styles.inputError : null
        }`}
        name="lastName"
        placeholder="Last name"
        type="text"
        onChange={props.handleInputChange}
      />
      <div className={styles.btnContainer}>
        <div className={styles.btnSubContainer}>
          <button className={styles.backBtn} onClick={props.prevStep}>
            Back
          </button>
          <button className={styles.nextBtn} onClick={props.nextStep}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegStepTwo;
