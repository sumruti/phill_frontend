import React, { PureComponent } from "react";
import "./App.css";

import Home from "../Home";
import Footer from "../Footer";
import SearchForm from "../SearchForm";
//import SmartShop from '../SmartShop';
import Profile from "../Profile";

import axios from "axios";
import { css } from "@emotion/core";
// First way to import
import { RingLoader } from "react-spinners";
// import HelpCenter from '../HelpCenter';

import { CartContextProvider } from "../Contexts/Cart";

import { _COMPONENTS_INFO as componentsInfo } from "../../utils/_globals";

const backend_url1 = "https://magictabbackend.herokuapp.com/";
const backend_url = "https://phillapi.herokuapp.com/";

const override = css`
	display: block;
	margin: 0 auto;
`;

class App extends PureComponent {
	state = {
		currentComponentType: "home",
		currentComponentTitle: "Home",
		currentComponent: Home,
		langs: ["EN"],
		selectedLang: "EN",
		componentsStack: [],
		deals: [],
		login: false,
		email: "",
		isLoading: true,
		user: {}
	};

	mapComponentsToInfo = () => {
		componentsInfo.home.component = Home;
		//componentsInfo.smartShop.component = SmartShop;
		componentsInfo.profile.component = Profile;
		// componentsInfo.helpCenter.component = HelpCenter;
	};

	handleCurrentComponentChange = currentComponentType => {
		this.setComponentInfo(currentComponentType);
	};

	handleLangChange = () => {
		// TODO let our parent know to change the context
	};

	backToHome = e => {
		this.setComponentInfo("home");
	};

	GoToProfile = () => {
		this.setComponentInfo("profile");
	};

	registered = email => {
		this.setState({
			login: true,
			email: email
		});
		axios
			.get(`${backend_url}api/user/getUser`, {
				params: {
					email: this.state.email
				}
			})
			.then(res => {
				this.setState({
					user: res.data.user
				});
			});
	};

	loggedin = email => {
		this.setState({
			login: true,
			email: email
		});
		axios
			.get(`${backend_url}api/user/getUser`, {
				params: {
					email: this.state.email
				}
			})
			.then(res => {
				this.setState({
					user: res.data.user
				});
			});
	};

	doRenderSearch = () => <SearchForm />;

	setComponentInfo = componentType => {
		const {
			type: currentComponentType,
			title: currentComponentTitle,
			iconImg: currentComponentIconImg,
			component: currentComponent
		} = componentsInfo[componentType];

		this.setState({ currentComponentType, currentComponentTitle, currentComponentIconImg, currentComponent });
	};

	renderComponent = Component => {
		return (
			<Component
				login={this.state.login}
				handleLangChange={this.handleLangChange}
				langs={this.state.langs}
				selectedLang={this.state.selectedLang}
				deals={this.state.deals}
				registered={this.registered}
				email={this.state.email}
				loggedin={this.loggedin}
				login_cancel={this.backToHome}
				loading={this.state.loading}
				GoToProfile={this.GoToProfile}
				user={this.state.user}
			/>
		);
	};

	async componentDidMount() {
		this.mapComponentsToInfo();
		this.setComponentInfo(this.state.currentComponentType);
		this.setState({ loading: true });
		await axios.get(`${backend_url}api/deals/getAllDeals`).then(res => {
			this.setState({ loading: false });
			if (res.data.length === 0) {
			} else {
				this.setState({
					deals: res.data
				});
			}
			this.setState({ isLoading: false });
		});
	}

	render() {
		const { isLoading } = this.state;
		return (
			<React.Fragment>
				{isLoading && (
					<div className='sweet-loading'>
						<RingLoader css={override} sizeUnit={"px"} size={100} color={"#007bff"} loading={isLoading} />
					</div>
				)}
				{!isLoading && (
					<div className='app'>
						<CartContextProvider>
							{this.renderComponent(this.state.currentComponent)}
							<Footer
								componentsInfo={componentsInfo}
								handleCurrentComponentChange={this.handleCurrentComponentChange}
							/>
						</CartContextProvider>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default App;
