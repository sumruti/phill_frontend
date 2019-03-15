import React from "react";

//stylesheets
import styles from "./RegStepThree.module.css";

const RegStepThree = props => {
  return (
    <form className={styles.formContainer}>
      <div>
        <input
          className={`${styles.input} ${styles.spaceBetween} ${styles.quarter}`}
          name="unit"
          placeholder="Unit#"
          type="text"
          maxLength="8"
          onChange={props.handleInputChangeLettersAndNumbersOnly}
        />
        <input
          className={`${styles.input} ${styles.spaceBetween} 
          ${styles.threeQuarter} ${
            props.streetAddressRed ? styles.inputError : null
          }`}
          name="streetAddress"
          placeholder="Street address"
          type="text"
          onChange={props.handleInputChange}
        />
      </div>
      <div>
        <input
          className={`${styles.input} ${styles.spaceBetween} ${styles.half} ${
            props.cityRed ? styles.inputError : null
          }`}
          name="city"
          placeholder="City"
          type="text"
          onChange={props.handleInputChangeLettersOnly}
        />
        <input
          className={`${styles.input} ${styles.spaceBetween} ${
            styles.quarter
          } ${props.provinceRed ? styles.inputError : null}`}
          name="province"
          placeholder="Province"
          type="text"
          onChange={props.handleInputChangeLettersOnly}
        />

        <input
          className={`${styles.input} ${styles.spaceBetween} ${
            styles.quarter
          } ${props.postalCodeRed ? styles.inputError : null}`}
          name="postalCode"
          placeholder="Post code"
          type="text"
          onChange={props.handleInputChangeLettersAndNumbersOnly}
        />
      </div>
      <div>
        <input
          className={`${styles.input} ${styles.spaceBetween} ${styles.half} ${
            props.mainPhoneRed ? styles.inputError : null
          }`}
          name="mainPhone"
          placeholder="Main phone #"
          type="tel"
          minLength="7"
          maxLength="10"
          onChange={props.handleInputChangeNumbersOnly}
        />
        <input
          className={`${styles.input} ${styles.spaceBetween} ${styles.half}`}
          name="secondPhone"
          placeholder="Other phone # (opt)"
          type="tel"
          minLength="7"
          maxLength="10"
          onChange={props.handleInputChangeNumbersOnly}
        />
      </div>
      <input
        className={`${styles.input} ${styles.spaceBetween} ${styles.full}`}
        name="delInstructions"
        placeholder="Deliver instructions (e.g: door code, parking tips...)"
        type="text"
        maxLength="300"
        onChange={props.handleInputChange}
      />
      <div className={styles.btnContainer}>
        <div className={styles.btnSubContainer}>
          <button className={styles.nextBtn} onClick={props.nextStep} disabled={!props.allfilled}>
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegStepThree;
