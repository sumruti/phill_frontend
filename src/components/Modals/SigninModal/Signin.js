import React from "react";

//icons
import GreenCheckmark from "./resources/GreenCheckmark";
import RedX from "./resources/RedX";
import VisibleIcon from "./resources/VisibleIcon";
import ObscuredIcon from "./resources/ObscuredIcon";

//stylesheets
import styles from "./Signin.module.css";

const Signin = props => {
	return (
		<form className={styles.formContainer}>
			<input
				className={`${styles.input} ${styles.spaceBetween}  ${props.emailRed ? styles.inputError : null}`}
				name='email'
				placeholder='Enter your email'
				type='text'
				onChange={props.handleInputChange}
			/>
			<span
            className={`${styles.tinyFont} ${styles.errorstyle} ${!props.emailRed ? styles.showError : null}`}
			>
				The email doesn't exist
			</span>
			<div>
				<input
					className={`${styles.input} ${styles.psw} ${props.passRed ? styles.inputError : null}`}
					name='password'
					placeholder='Enter your password'
					type={props.pswObs ? "password" : "text"}
					onChange={props.handleInputChange}
				/>
				<a
					href=''
					style={{
						textDecoration: "none",
						position: "absolute",
						right: 35,
						padding: 10,
						color: "#0077b4",
						zIndex: 10
					}}
				>
					I forgot
				</a>
			</div>
			<span
            className={`${styles.tinyFont} ${styles.errorstyle} ${!props.passRed ? styles.showError : null}`}
			>
				The password isn't correct
			</span>

			<div className={styles.btnContainer}>
				<button className={styles.signinBtn} onClick={props.signin}>
					Sign in
				</button>
				<div style={{ marginBottom: 10, color: "rgb(31, 63, 87)" }}>Don't have an account?</div>
				<button className={styles.nextBtn} onClick={props.signup}>
					Sign up
				</button>
			</div>
		</form>
	);
};

export default Signin;
