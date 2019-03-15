import React, { PureComponent } from "react";

import RegStepOne from "./RegStepOne";
import RegStepTwo from "./RegStepTwo";
import RegStepThree from "./RegStepThree";

//icon images
import firstLogo from "./resources/PNGimages/firstIcon.png";
import secondLogo from "./resources/PNGimages/secondIcon.png";
import thirdLogo from "./resources/PNGimages/thirdIcon.png";
import fourthLogo from "./resources/PNGimages/fourthIcon.png";

//stylesheets
import styles from "./SingupModal.module.css";

//npm module
import axios from "axios";

const backend_url1 = "https://magictabbackend.herokuapp.com/";
const backend_url = "https://phillapi.herokuapp.com/";
class SignupModal extends PureComponent {
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
		allfilled: false,
		validEmail: true
	};

	handleInputChange = e => {
		let val = e.target.value;
		let hasNum = this.checkForNumber(val);
		if (e.target.name === "password") {
			if (val.length > 7 && hasNum) {
				this.setState({
					[e.target.name]: val,
					pswLongEnough: true,
					pswContainsNum: true
				});
			} else if (val.length > 7 && !hasNum) {
				this.setState({
					[e.target.name]: val,
					pswLongEnough: true,
					pswContainsNum: false
				});
			} else if (val.length < 7 && hasNum) {
				this.setState({
					[e.target.name]: val,
					pswContainsNum: true,
					pswLongEnough: false
				});
			} else if (val.length < 7 && !hasNum) {
				this.setState({
					[e.target.name]: val,
					pswContainsNum: false,
					pswLongEnough: false
				});
			}
		} else {
			this.setState({
				[e.target.name]: val
			});
			let phoneCorrectLength = Boolean(
				this.state.mainPhone && Boolean(this.state.mainPhone.length === 7 || this.state.mainPhone.length === 10)
			);
			if (
				this.state.streetAddress &&
				this.state.city &&
				this.state.province &&
				this.state.postalCode &&
				phoneCorrectLength
			) {
				this.setState({
					allfilled: true
				});
			}
		}
	};

	handleInputChangeLettersOnly = e => {
		const re = /^[a-zA-Z\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			this.setState({
				[e.target.name]: e.target.value
			});
		} else {
			e.target.value = this.state[e.target.name];
		}
	};

	handleInputChangeNumbersOnly = e => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			this.setState({
				[e.target.name]: e.target.value
			});
		} else {
			e.target.value = this.state[e.target.name];
		}
	};

	handleInputChangeLettersAndNumbersOnly = e => {
		const re = /^[0-9a-zA-Z\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			this.setState({
				[e.target.name]: e.target.value
			});
		} else {
			e.target.value = this.state[e.target.name];
		}
	};

	checkForNumber = string => {
		return /\d/.test(string);
	};

	togglePasswordVisiblity = e => {
		e.preventDefault();
		this.setState(state => ({
			pswObs: !state.pswObs
		}));
	};

	toggleTermsAccepted = e => {
		this.setState({
			termsAccepted: e.target.checked
		});
	};

	nextStep = e => {
		e.preventDefault();
		this.setState(state => ({
			step: state.step + 1
		}));
	};

	prevStep = e => {
		e.preventDefault();
		this.setState(state => ({
			step: state.step - 1
		}));
	};

	stepOneCheck = e => {
		e.preventDefault();
		let re = /^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$/;
		let checkedEmail = re.test(this.state.email);
		if (checkedEmail && this.state.pswContainsNum && this.state.pswLongEnough && this.state.termsAccepted) {
			axios.get(`${backend_url}api/register/valid`, { params: { email: this.state.email } }).then(res => {
				if (res.data === "valid Email") {
					this.setState(state => ({
						step: state.step + 1,
						emailRed: false,
						passwordRed: false,
						pswContainsNumRed: false,
						pswLongEnoughRed: false,
						termsRed: false,
						validEmail: true
					}));
				} else {
					this.setState({
						validEmail: false
					});
				}
			});
		} else {
			// let email = Boolean(this.state.email);
			let password = Boolean(this.state.password && this.state.pswLongEnough && this.state.pswContainsNum);
			this.setState(state => ({
				emailRed: !checkedEmail,
				passwordRed: !password,
				pswContainsNumRed: !state.pswContainsNum,
				pswLongEnoughRed: !state.pswLongEnough,
				termsRed: !state.termsAccepted
			}));
		}
	};

	stepTwoCheck = e => {
		e.preventDefault();
		let firstName = Boolean(this.state.firstName.length > 2);
		let lastName = Boolean(this.state.lastName.length > 2);
		if (firstName && lastName) {
			this.setState(state => ({
				step: state.step + 1,
				firstNameRed: false,
				lastNameRed: false
			}));
		} else {
			this.setState({
				firstNameRed: !firstName,
				lastNameRed: !lastName
			});
		}
	};

	stepThreeCheck = e => {
		e.preventDefault();
		let phoneCorrectLength = Boolean(
			this.state.mainPhone && Boolean(this.state.mainPhone.length === 7 || this.state.mainPhone.length === 10)
		);
		if (
			this.state.streetAddress &&
			this.state.city &&
			this.state.province &&
			this.state.postalCode &&
			phoneCorrectLength
		) {
			this.setState(state => ({
				cityRed: false,
				mainPhoneRed: false,
				provinceRed: false,
				postalCodeRed: false,
				streetAddressRed: false
			}));
			axios
				.get(`${backend_url}api/register/new`, {
					params: {
						FirstName: this.state.firstName,
						LastName: this.state.lastName,
						Email: this.state.email,
						password: this.state.password,
						address: this.state.streetAddress,
						DeliveryInstructions: this.state.delInstructions
					}
				})
				.then(res => {
					if (res.data === "registered") {
						this.props.registered(this.state.email);
					} else if (res.data === "register failed") {
					}
				});
		} else {
			let city = Boolean(this.state.city);
			let address = Boolean(this.state.streetAddress);
			let province = Boolean(this.state.province);
			let postalCode = Boolean(this.state.postalCode);

			this.setState({
				cityRed: !city,
				mainPhoneRed: !phoneCorrectLength,
				streeAddressRed: !address,
				provinceRed: !province,
				postalCodeRed: !postalCode
			});
		}
	};

	render() {
		return (
			<div className={styles.modalBlanket} style={this.props.ForOrder ? { marginTop: 100 } : { marginTop: -128 }}>
				<div className={styles.modalContainer}>
					<div className='deal_details_modal_header'>
						<button className='close btn' style={{ marginRight: "10px" }} onClick={this.props.handleClose}>
							x
						</button>
					</div>
					<div className={styles.modalSplash}>
						{this.state.step === 1 && (
							<img src={firstLogo} className={styles.modalSplashImg} alt='cartoonHead' />
						)}
						{this.state.step === 2 && (
							<img src={secondLogo} className={styles.modalSplashImg} alt='chatBubble' />
						)}
						{this.state.step === 3 && (
							<img src={thirdLogo} className={styles.modalSplashImg} alt='successPhone' />
						)}
						{this.state.step === 4 && (
							<img src={fourthLogo} className={styles.modalSplashImg} alt='piggyBank' />
						)}
					</div>
					<div className={styles.modalTitle}>
						{this.state.step === 1
							? `Create Your Account`
							: this.state.step === 2
							? `Tell Us About You`
							: this.state.step === 3
							? `Deliver Setup`
							: this.state.step === 4
							? `Saving Preferences`
							: null}
					</div>
					<div className={styles.stepTrackerContainer}>
						<div className={styles.stepActivated} />
						<div className={this.state.step > 1 ? styles.stepActivated : styles.stepInactive} />
						<div className={this.state.step > 2 ? styles.stepActivated : styles.stepInactive} />
						<div className={this.state.step > 3 ? styles.stepActivated : styles.stepInactive} />
					</div>
					<div className={styles.modalContent}>
						{this.state.step === 1 ? (
							<RegStepOne
								pswObs={this.state.pswObs}
								ple={this.state.pswLongEnough}
								pcn={this.state.pswContainsNum}
								emailRed={this.state.emailRed}
								passRed={this.state.passwordRed}
								pleRed={this.state.pswLongEnoughRed}
								pcnRed={this.state.pswContainsNumRed}
								termsRed={this.state.termsRed}
								handleInputChange={this.handleInputChange}
								togglePswVis={this.togglePasswordVisiblity}
								toggleTermsAccepted={this.toggleTermsAccepted}
								nextStep={this.stepOneCheck}
								SignIn={this.props.SignIn}
								validEmail={this.state.validEmail}
							/>
						) : this.state.step === 2 ? (
							<RegStepTwo
								fnRed={this.state.firstNameRed}
								lnRed={this.state.lastNameRed}
								handleInputChange={this.handleInputChange}
								handleInputChangeLettersOnly={this.handleInputChangeLettersOnly}
								nextStep={this.stepTwoCheck}
								prevStep={this.prevStep}
							/>
						) : this.state.step === 3 ? (
							<RegStepThree
								streetAddressRed={this.state.streeAddressRed}
								cityRed={this.state.cityRed}
								provinceRed={this.state.provinceRed}
								postalCodeRed={this.state.postalCodeRed}
								mainPhoneRed={this.state.mainPhoneRed}
								handleInputChange={this.handleInputChange}
								handleInputChangeNumbersOnly={this.handleInputChangeNumbersOnly}
								handleInputChangeLettersOnly={this.handleInputChangeLettersOnly}
								handleInputChangeLettersAndNumbersOnly={this.handleInputChangeLettersAndNumbersOnly}
								nextStep={this.stepThreeCheck}
								allfilled={this.state.allfilled}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default SignupModal;
