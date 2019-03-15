import React from "react";

//icons
import GreenCheckmark from "./resources/GreenCheckmark";
import RedX from "./resources/RedX";
import VisibleIcon from "./resources/VisibleIcon";
import ObscuredIcon from "./resources/ObscuredIcon";

//stylesheets
import styles from "./RegStepOne.module.css";

const RegStepOne = props => {
  return (
    <form className={styles.formContainer}>
      <input
        className={`${styles.input} ${styles.spaceBetween}  ${
          props.emailRed ? styles.inputError : null
        } ${!props.validEmail ? styles.inputError : null} `}
        name="email"
        placeholder="Enter your email"
        type="text"
        onChange={props.handleInputChange}
      />
      <div className={styles.passCheckContainer}>
        <span
            className={`${styles.tinyFont} ${styles.errorstyle} ${props.validEmail ? styles.showError : null}`}
          >
            This email already exists.
        </span>
      </div>
      
      <div>
        <input
          className={`${styles.input} ${styles.psw} ${
            props.passRed ? styles.inputError : null
          }`}
          name="password"
          placeholder="Choose your password"
          type={props.pswObs ? "password" : "text"}
          onChange={props.handleInputChange}
        />
        <button className={styles.pswToggleBtn} onClick={props.togglePswVis}>
          {props.pswObs ? <VisibleIcon /> : <ObscuredIcon />}
        </button>
      </div>
      <div className={styles.passCheckContainer}>
        <span
          className={`${styles.tinyFont} ${
            props.pleRed ? styles.conditionError : null
          }`}
        >
          {props.ple ? <GreenCheckmark /> : <RedX />} Minimum 8 Characters
        </span>
        <span
          className={`${styles.tinyFont} ${
            props.pcnRed ? styles.conditionError : null
          }`}
        >
          {" "}
          {props.pcn ? <GreenCheckmark /> : <RedX />} At least one number
        </span>
      </div>
      <div className={styles.tosNoticeContainer}>
        <input
          className={`${styles.tosCheckbox} ${
            props.termsRed ? styles.checkboxError : null
          }`}
          type="checkbox"
          name="ToS"
          onChange={props.toggleTermsAccepted}
        />{" "}
        <span className={styles.tosNotice}>
          I agree to MagikTab terms and conditions
        </span>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.nextBtn} onClick={props.nextStep}>
          Next
        </button>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.nextBtn} onClick={props.SignIn}>
          Sign In
        </button>
      </div>
    </form>
  );
};

export default RegStepOne;
