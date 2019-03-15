import React, { Component } from "react";
import Header from "../Header";
import "./Profile.css";
import image_1 from "./images/1.png";
import shopper_png from "./images/shopper.png";
import image_2 from "./images/2.png";
import image_3 from "./images/3.png";
import { FaCheck, FaPencilAlt, FaSave } from "react-icons/fa";
import SignupModal from "../Modals/SignupModal";
import SigninModal from "../Modals/SigninModal";
import axios from "axios";
// const Profile = () => {
//     return (
//         <div>Profile</div>
//     )
// }

const backend_url1 = "https://magictabbackend.herokuapp.com/";
const backend_url = "https://phillapi.herokuapp.com/";

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			registering: false,
			editname: false,
			editaddress: false,
			editemail: false,
			name: "John Smith",
			address: "90 Clement St. LaSaile, Qc. H8R 2M7",
			email: "johnsmith@gmail.com",
			user: {},
			index: 0,
			orders: [],
			recentOrder: {},
			isViewClicked: false,
			reorders: [],
			orderDetails: [], 
			reorderStatus: []
		};
	}

	goToSignIn = e => {
		e.preventDefault();
		this.setState({
			registering: false
		});
	};

	gotoSignUp = e => {
		e.preventDefault();
		this.setState({
			registering: true
		});
	};

	editName = e => {
		e.preventDefault();
		this.setState({
			editname: true
		});
	};

	editAddress = e => {
		e.preventDefault();
		this.setState({
			editaddress: true
		});
	};

	editEmail = e => {
		e.preventDefault();
		this.setState({
			editemail: true
		});
	};

	saveName = e => {
		this.setState({
			editname: false
		});
	};

	saveAddress = e => {
		e.preventDefault();
		this.setState({
			editaddress: false
		});
	};

	saveEmail = e => {
		e.preventDefault();
		this.setState({
			editemail: false
		});
	};

	handleNameChange = e => {
		this.setState({
			name: e.target.value
		});
	};

	handleAddressChange = e => {
		this.setState({
			address: e.target.value
		});
	};

	handleEmailChange = e => {
		this.setState({
			email: e.target.value
		});
	};

	loggedin = async email => {
		this.props.loggedin(email);
		axios
			.get(`${backend_url}api/order/getAllOrders`, {
				params: {
					email: email
				}
			})
			.then(res => {
				this.setState({
					user: res.data.user,
					orders: res.data.orders,
					recentOrder: res.data.orders[0],
					name: res.data.user.Firstname,
					address: res.data.user.address,
					email: res.data.user.Email,
					orderItems: res.data.orderItems
				});
				console.log(this.state.orderItems);
				var temp = [];
					for (var i = 0; i< this.state.orders.length; i++){
						temp[i] = false;
					}
					console.log(temp);
					this.setState({
						reorderStatus: temp
					})
			});
	};

	registered = email => {
		this.props.registered(email);
		axios
			.get(`${backend_url}api/order/getAllOrders`, {
				params: {
					email: email
				}
			})
			.then(res => {
				this.setState({
					user: res.data.user,
					orders: res.data.orders,
					recentOrder: res.data.orders[0],
					name: res.data.user.Firstname,
					address: res.data.user.address,
					email: res.data.user.Email,
					orderItems: res.data.orderItems
				});
				var temp = [];
					for (var i = 0; i< this.state.orders.length; i++){
						temp[i] = false;
					}
					console.log(temp);
					this.setState({
						reorderStatus: temp
					})
			});
	};

	// orderDetail = index => {
	// 	console.log(index);
	// 	console.log(this.state.orders[index].orderItemsId);
	// 	axios
	// 		.get(`${backend_url1}api/order/getOrderItem`, {
	// 			params: {
	// 				id: this.state.orders[index].orderItemsId
	// 			}
	// 		})
	// 		.then(res => {
	// 			console.log(res.data);
	// 		});
	// }

	getMonth = obj => {
		if (Object.getOwnPropertyNames(Object(obj)).length !== 0) {
			var d = new Date(obj.orderTime);
			var month = new Array();
			month[0] = "Jan";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Apr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Aug";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dec";
			var month = month[d.getMonth()];
			return month;
		}
		return "";
	};

	getDate = obj => {
		if (Object.getOwnPropertyNames(Object(obj)).length !== 0) {
			var d = new Date(obj.orderTime);
			var day = d.getDate();
			return day;
		}
		return "";
	};

	componentDidMount() {
		console.log("12345");
		if (this.props.login) {
			console.log("wefwef");
			axios
				.get(`${backend_url}api/order/getAllOrders`, {
					params: {
						email: this.props.email
					}
				})
				.then(res => {
					this.setState({
						user: res.data.user,
						orders: res.data.orders,
						recentOrder: res.data.orders[0],
						name: res.data.user.Firstname,
						address: res.data.user.address,
						email: res.data.user.Email,  
						orderItems: res.data.orderItems
					});
					var temp = [];
					for (var i = 0; i< this.state.orders.length; i++){
						temp[i] = false;
					}
					console.log(temp);
					this.setState({
						reorderStatus: temp
					})
				});
		}
		
	}

	handleClick = () => {
		this.setState({ isViewClicked: true });
	};

	handleReorder = e => {
		var index = e.target.value;
		var temp = [];
		for (var i = 0; i< this.state.orders.length; i++){
			if (i == index) {
				temp[i] = !this.state.reorderStatus[i];
			}
			else temp[i] = this.state.reorderStatus[i];
		}
		this.setState({ reorderStatus: temp });
		console.log(this.state.reorderStatus);
	};

	render() {
		const { recentOrder, orders, isViewClicked } = this.state;

		return (
			<div className=''>
				<React.Fragment>
					<div className='fixed_header_search'>
						{this.props.login && (
							<Header
								handleLangChange={this.props.handleLangChange}
								langs={this.props.langs}
								selectedLang={this.props.selectedLang}
								selectedTag='profile'
								name={this.state.user.Firstname}
								idToRemove={{ _id: 0 }}
								reOrders={this.state.reorders}
							/>
						)}
					</div>
					{this.state.registering && !this.props.login && (
						<SignupModal
							handleClose={this.props.login_cancel}
							registered={this.registered}
							SignIn={this.goToSignIn}
						/>
					)}

					{!this.state.registering && !this.props.login && (
						<SigninModal
							handleClose={this.props.login_cancel}
							loggedin={this.loggedin}
							signup={this.gotoSignUp}
						/>
					)}

					<div className='main_body'>
						<div>
							<button className='btn_s most_recent'>Most recent order</button>
							<br />
							<button className='btn_s about_me'>About me</button>
						</div>
						<h4 className='mgt-10'>Most Recent Orders</h4>
						{!isViewClicked && Object.getOwnPropertyNames(Object(orders[0])).length !== 0 && (
							<React.Fragment>
								<div>
									<label className='percent45 back_f8 pd5'>ORDER ID MT123</label>
									<label
										className='percent45 back_f8 pd5'
										style={{ color: "#41ad49", marginLeft: "3%" }}
									>
										<FaCheck style={{ marginRight: 10, color: "#41ad49", marginTop: -5 }} />
										{orders[0].status}
									</label>
								</div>
								<div style={{ fontSize: 16 }}>
									<label className='may9'>
										{this.getMonth(orders[0])}
										<br />
										{this.getDate(orders[0])}
									</label>
									<label className='total'>
										<span style={{ color: "#f26522" }}>${orders[0].totalCost}</span>
										<br />
										TOTAL
									</label>
									<label className='items'>
										<span style={{ color: "#004a80" }}>{orders[0].itemsCount}</span>
										<br />
										ITEMS
									</label>
									<label className='shopper' style={{ position: "relative" }}>
										<img
											src={shopper_png}
											alt=''
											style={{
												position: "absolute",
												marginLeft: "-40%",
												paddingTop: 4
											}}
										/>

										<div style={{ marginLeft: "20%" }}>
											<span style={{ fontWeight: "bold" }}>DAVID</span>
											<br />
											SHOPPER
										</div>
									</label>
								</div>
								<div>
									<button
										onClick={this.handleClick}
										className='searchBtn'
										style={{
											width: "40%",
											height: 30,
											fontWeight: "bold",
											marginBottom: 0
										}}
									>
										View
									</button>
								</div>
							</React.Fragment>
						)}
						{isViewClicked &&
							orders.map((order, idx) => {
								return (
									Object.getOwnPropertyNames(Object(order)).length !== 0 && (
										<React.Fragment key={idx}>
												<div>
													<label className='percent45 back_f8 pd5'>ORDER ID MT123</label>
													<label
														className='percent45 back_f8 pd5'
														style={{ color: "#41ad49", marginLeft: "3%" }}
													>
														<FaCheck
															style={{ marginRight: 10, color: "#41ad49", marginTop: -5 }}
														/>
														{order.status}
													</label>
												</div>
												<div style={{ fontSize: 16 }}>
													<label className='may9'>
														{this.getMonth(order)}
														<br />
														{this.getDate(order)}
													</label>
													<label className='total'>
														<span style={{ color: "#f26522" }}>${order.totalCost}</span>
														<br />
														TOTAL
													</label>
													<label className='items'>
														<span style={{ color: "#004a80" }}>{order.itemsCount}</span>
														<br />
														ITEMS
													</label>
													<label className='shopper' style={{ position: "relative" }}>
														<img
															src={shopper_png}
															alt=''
															style={{
																position: "absolute",
																marginLeft: "-40%",
																paddingTop: 4
															}}
														/>

														<div style={{ marginLeft: "20%" }}>
															<span style={{ fontWeight: "bold" }}>DAVID</span>
															<br />
															SHOPPER
														</div>
													</label>
												</div>
												{this.state.reorderStatus[idx] && 
													<img src={this.state.orderItems[idx].items[0][0].productImgUrl} width={80} height={80} alt='' />
													}
												<div style={{ textAlign: "right", marginRight: 10 }}>
													{this.state.reorderStatus[idx]?
														<button
														onClick={this.handleReorder}
														className='searchBtn'
														style={{
															width: "35%",
															height: 30,
															fontWeight: "bold",
															marginBottom: 0
														}}
														value={idx}
														>
														..less
														</button>:
														<button
														onClick={this.handleReorder}
														className='searchBtn'
														style={{
															width: "35%",
															height: 30,
															fontWeight: "bold",
															marginBottom: 0
														}}
														value={idx}
													>
														View detail
													</button>}
												</div>
										</React.Fragment>
									)
								);
							})}

						<div style={{ border: "1px solid #ededed", width: "95%", marginTop: 10 }} />
						<h4>About Me</h4>
						<div style={{ height: 175, fontSize: 12, display: "flex" }}>
							<label
								style={{
									position: "relative",
									width: "30%",
									padding: 4,
									marginLeft: "3%",
									boxShadow: "0px 2px 2px 1px #e0e0e0"
								}}
							>
								{this.state.editname ? (
									<a
										style={{ color: "#379fe0", fontSize: 12, position: "absolute", marginLeft: 45 }}
										onClick={this.saveName}
									>
										<FaSave />
										Save
									</a>
								) : (
									<a
										style={{ color: "#379fe0", fontSize: 12, position: "absolute", marginLeft: 45 }}
										onClick={this.editName}
									>
										<FaPencilAlt />
										Edit
									</a>
								)}

								<img alt='' width='50' height='50' src={image_1} style={{ marginTop: 10 }} />
								<div>Main User</div>
								<div style={{ background: "#f8f8f8", padding: 5 }}>
									{/* {this.state.editname ? } */}
									{this.state.editname ? (
										<input
											type='text'
											style={{ marginTop: "20%", width: "100%" }}
											value={this.state.name}
											onChange={this.handleNameChange}
										/>
									) : (
										<p style={{ marginTop: "20%" }}>{this.state.name}</p>
									)}
								</div>
							</label>
							<label
								style={{
									position: "relative",
									width: "30%",
									padding: 4,
									marginLeft: "2%",
									boxShadow: "0px 2px 2px 1px #e0e0e0"
								}}
							>
								{this.state.editaddress ? (
									<a
										style={{ color: "#379fe0", fontSize: 12, position: "absolute", marginLeft: 45 }}
										onClick={this.saveAddress}
									>
										<FaSave />
										Save
									</a>
								) : (
									<a
										style={{ color: "#379fe0", fontSize: 12, position: "absolute", marginLeft: 45 }}
										onClick={this.editAddress}
									>
										<FaPencilAlt />
										Edit
									</a>
								)}

								<img alt='' width='50' height='50' src={image_2} style={{ marginTop: 10 }} />
								<div>Address & Contract</div>

								{this.state.editaddress ? (
									<input
										type='text'
										style={{ marginTop: "20%", width: "100%" }}
										value={this.state.address}
										onChange={this.handleAddressChange}
									/>
								) : (
									<div style={{ background: "#f8f8f8", padding: 5, marginTop: "20%" }}>
										{this.state.address}
									</div>
								)}
							</label>
							<label
								style={{
									position: "relative",
									width: "30%",
									padding: 4,
									marginLeft: "2%",
									boxShadow: "0px 2px 2px 1px #e0e0e0"
								}}
							>
								{this.state.editemail ? (
									<a
										style={{ color: "#379fe0", fontSize: 12, position: "absolute", marginLeft: 45 }}
										onClick={this.saveEmail}
									>
										<FaSave />
										Save
									</a>
								) : (
									<a
										style={{ color: "#379fe0", fontSize: 12, position: "absolute", marginLeft: 45 }}
										onClick={this.editEmail}
									>
										<FaPencilAlt />
										Edit
									</a>
								)}

								<img alt='' width='50' height='50' src={image_3} style={{ marginTop: 10 }} />
								<div>Log in</div>

								{this.state.editemail ? (
									<input
										type='text'
										style={{ marginTop: "20%", width: "100%" }}
										value={this.state.email}
										onChange={this.handleEmailChange}
									/>
								) : (
									<div style={{ background: "#f8f8f8", padding: 5, marginTop: "20%" }}>
										{this.state.email}
									</div>
								)}
							</label>
						</div>
					</div>
				</React.Fragment>
			</div>
		);
	}
}

export default Profile;
