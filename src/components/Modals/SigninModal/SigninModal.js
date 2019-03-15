import React, { PureComponent } from "react";

import Signin from "./Signin";

//icon images
import firstLogo from "./resources/PNGimages/login_logo.png";

//stylesheets
import styles from "./SigninModal.module.css";

//npm module
import axios from "axios";

const backend_url1 = "https://phillapi.herokuapp.com/";
const backend_url = "https://phillapi.herokuapp.com/";
class SigninModal extends PureComponent {
	state = {
		step: 1,
		email: "",
		emailRed: false,
		password: "",
		pswLongEnough: false,
		pswLongEnoughRed: false,
		pswContainsNum: false,
		pswContainsNumRed: false,
		pwObscured: true,
		termsAccepted: false,
		termsRed: false,
		firstName: "",
		firstNameRed: false,
		lastName: "",
		lastNameRed: false,
		unit: null,
		unitRed: false,
		streetAddress: "",
		streeAddressRed: false,
		city: "",
		cityRed: false,
		province: "",
		provinceRed: false,
		postalCode: "",
		postalCodeRed: false,
		mainPhone: null,
		mainPhoneRed: false,
		secondPhone: null,
		delIntructions: "",
		favProds: [],
		favStores: [],
		pswObs: true,
		allfilled: false
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	stepOneCheck = e => {
		e.preventDefault();
		let re = /^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$/;
		let checkedEmail = re.test(this.state.email);
		if (checkedEmail) {
			axios
				.post(`${backend_url}api/login/login`, {
					email: this.state.email,
					password: this.state.password
				})
				.then(res => {
					if (res.data.success === true) {
						this.props.loggedin(this.state.email);
					} else {
						if (res.data.errors[0].detail === "No user exists.") {
							this.setState({
								emailRed: true,
								passwordRed: false
							});
						} else if (res.data.errors[0].detail === "Password is incorrect.") {
							this.setState({
								passwordRed: true,
								emailRed: false
							});
						}
					}
				});
		} else {
			let password = Boolean(this.state.password);
			this.setState({
				emailRed: !checkedEmail,
				passwordRed: !password
			});
		}
	};

	render() {
		return (
			<div className={styles.modalBlanket} style={this.props.ForOrder ? { marginTop: 100 } : { marginTop: -128 }}>
				<div className={styles.modalContainer}>
					<div
						className='deal_details_modal_header'
						style={{ marginLeft: 0, marginRight: 0, background: "white" }}
					>
						<span className='close btn' style={{ marginRight: "10px" }} onClick={this.props.handleClose}>
							x
						</span>
					</div>
					<div className={styles.modalSplash}>
						<img src={firstLogo} className={styles.modalSplashImg} alt='cartoonHead' />
					</div>
					<div className={styles.modalTitle}>Sign in</div>
					<div className={styles.modalContent}>
						<Signin
							pswObs={this.state.pswObs}
							emailRed={this.state.emailRed}
							passRed={this.state.passwordRed}
							handleInputChange={this.handleInputChange}
							togglePswVis={this.togglePasswordVisiblity}
							signin={this.stepOneCheck}
							signup={this.props.signup}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default SigninModal;
