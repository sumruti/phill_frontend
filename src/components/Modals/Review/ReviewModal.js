import React, { PureComponent } from "react";
import "./ReviewModal.css";
import item_image from "./images/item.png";
import { FaCheck, FaPencilAlt, FaSave, FaLeaf } from "react-icons/fa";

import { _STRINGS } from "../../../utils/_globals";
import Deal from "./Deal";
import axios from "axios";

const { _DEAL_DETAILS_MODAL_HEADER_NAME_PREFIX, _DEAL_PRODUCT_DETAILS_BUTTON_NAME } = _STRINGS;
const backend_url1 = "https://magictabbackend.herokuapp.com/";
const backend_url = "http://localhost:5000/";
class ReviewModal extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editQuantity: false,
			approx_tax: 3,
			delivery_fee: 0,
			approx_subtotal: 0,
			quantity: 3,
			editins: false,
			DeliveryInstructions: "", 
			Schdule: "", 
			editschedule: false, 
			unavailable: false	
		};
	}
	editQuantity = e => {
		e.preventDefault();
		this.setState({
			editQuantity: true
		});
	};

	saveQuantity = e => {
		e.preventDefault();
		this.setState({
			editQuantity: false
		});
	};

	handleQtyChange = e => {
		this.setState({ quantity: e.target.value });
	};

	handleCheckout = (totalCost, itemsCount) => {

		
	
		if (this.props.login) {
			console.log(this.props);
			axios
				.post(`${backend_url}api/order/addOrder`, {
					orderItems: this.props.details,
					email: this.props.email,
					totalCost: totalCost,
					itemsCount: itemsCount,
					orderWindow: this.state.Schdule,
					user:this.props.user
				})
				.then(res => {
					if (res.data.success) {
						this.props.didOrder();
						this.props.handleClose();
						this.props.GoToProfile();
					}
				});
		} else {
			this.props.handleClose();
			this.props.requireLogin();
		}
	};

	editIns = e => {
		e.preventDefault();
		this.setState({
			editins: true
		});
	};

	editSche = e => {
		e.preventDefault();
		this.setState({
			editschedule: true
		});
	}


	saveIns = e => {
		this.setState({
			editins: false
		});
	};

	saveSche = e => {
		this.setState({
			editschedule: false
		});
	};

	handleInsChange = e => {
		this.setState({
			DeliveryInstructions: e.target.value
		});
	};

	handleScheduleChange = e => {
		var temp = e.target.value;
		axios
			.get(`${backend_url}api/checkAvailable`, {params: {
				window: e.target.value
			}})
			.then(res => {
				console.log(res.data);
				if (res.data.status === true){
					this.setState({
						Schdule: temp, 
						unavailable: false
					})
				}	
				else if (res.data.status === false){
					this.setState({
						unavailable: true
					})
				}
			})
		
	}

	componentDidMount() {
		console.log(this.props.details);
		axios
			.get(`${backend_url}api/getWindowStatus`)
			.then(res => {
				console.log(res.data, "yahoooooooooooo");
				if (res.data.index===0){
					this.setState({
						Schdule: "Today 8 a.m : 10 a.m"
					});
				}else if (res.data.index===1){
					this.setState({
						Schdule: "Today 10 a.m : 12 p.m"
					});
				}else if (res.data.index===2){
					this.setState({
						Schdule: "Today 12 p.m : 2 p.m"
					});
				}else if (res.data.index===3){
					this.setState({
						Schdule: "Today 2 p.m : 4 p.m"
					});
				}else if (res.data.index===4){
					this.setState({
						Schdule: "Today 4 p.m : 6 p.m"
					});
				}else if (res.data.index===5){
					this.setState({
						Schdule: "Today 6 p.m : 8 p.m"
					});
				}else if (res.data.index===6){
					this.setState({
						Schdule: "Today 8 p.m : 10 p.m"
					});
				}else if (res.data.index===7){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}else if (res.data.index===8){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}else if (res.data.index===9){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}else if (res.data.index===10){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}else if (res.data.index===11){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}else if (res.data.index===12){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}else if (res.data.index===13){
					this.setState({
						Schdule: "Tomorrow 8 p.m : 10 p.m"
					});
				}
			});

		this.setState({
			DeliveryInstructions: this.props.user.DeliveryInstructions
		});
	}

	componentWillReceiveProps(nextprops) {
		this.setState({
			DeliveryInstructions: nextprops.user.DeliveryInstructions
		});
	}

	render() {
		const { details, handleClose, handleReview, handleQty } = this.props;
		var cost = 0;
		var store_count = 0;
		Object.size = function(obj) {
			var size = 0,
				key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		};

		// Get the size of an object
		var size = Object.size(details);
		var deal_array = [];
		var temp_tax = 0;

		for (var i = 0; i < size; i++) {
			var flag = false;
			for (var k = 0; k < deal_array.length; k++) {
				if (deal_array[k][0] !== undefined && deal_array[k][0] === details[i].store.name) {
					deal_array[k].push(details[i]);
					flag = true;
				}
			}
			if (flag === false) {
				var newStore = [];
				newStore[0] = details[i].store.name;
				deal_array.push(newStore);
				//deal_array[deal_array.length] = [];
				deal_array[deal_array.length - 1].push(details[i]);
			}
			cost = parseFloat(cost);
			cost += Number(details[i].totalCost);
			cost = cost.toFixed(2);
			if(details[i].category_id.name !== "Food"){
				temp_tax = parseFloat(temp_tax);
				temp_tax +=  Number(details[i].totalCost) * 0.15;
				temp_tax = temp_tax.toFixed(2);
			}
		}
		
		store_count = deal_array.length;
		var approx_total = Number(cost) + Number(this.state.delivery_fee) + Number(temp_tax);
		approx_total = parseFloat(approx_total).toFixed(2);

		return (
			<div className='cart_modal_blanket'>
				<div className='cart_modal_container'>
					<div className='cart_modal_header'>
						<div className='cart_modal_header_store_name'>
							<div>Review your Order</div>
						</div>
						<button className='cart_modal_header_close_btn' onClick={handleClose}>
							x
						</button>
					</div>
					<div className='total_header'>
						<div className='d-flex font-22 color1 p-10'>
							<div>
								<strong style={{ fontSize: 16 }}>APPROXIMATE&nbsp;TOTAL</strong>
							</div>
							<div style={{ width: "100%", textAlign: "right" }}>
								<strong style={{ position: "absolute", fontSize: 16, color: "#f26522" }}>$</strong>
								<strong style={{ paddingLeft: 10, color: "#f26522" }}>{approx_total}</strong>
							</div>
						</div>
						<button className='checkoutBtn' onClick={this.handleCheckout.bind(this, approx_total, size)}>
							Checkout
						</button>
					</div>
					<div className='field '>
						<div className='bill font-14'>
							<div className='d-flex'>
								<div>Stores</div>
								<div className='show-item'>{store_count}</div>
							</div>
							<div className='d-flex'>
								<div>items</div>
								<div className='show-item'>{size}</div>
							</div>
							<div className='d-flex'>
								<div>Approx&nbsp;Subtotal</div>
								<div className='show-item'>${cost}</div>
							</div>
							<div className='d-flex'>
								<div>Delivery&nbsp;Fee</div>
								<div className='show-item'>${this.state.delivery_fee}</div>
							</div>
							<div className='d-flex'>
								<div>Approx&nbsp;Tax</div>
								<div className='show-item'>${temp_tax}</div>
							</div>
						</div>
						<div className='address font-14'>
							<div>DELIVERY&nbsp;ADDRESS</div>
							<div style={{ color: "#400d60" }}>
								{this.props.login?<strong>{this.props.user.Firstname} {this.props.user.Lastname}</strong>:<strong></strong>}
								<br />	
								{this.props.login?<strong>{this.props.user.address}</strong>:<strong></strong>}
								<br />
								{/* <strong>514-688-8840</strong> */}
							</div>
						</div>
						<div className='schedule_method d-flex font-14'>
							<div className='schedule'>
							{this.state.editschedule ? (
								<a
									className="show-item"
									onClick={this.saveSche}
								>
									<FaSave />
									Save
								</a>
							) : (
								<a
									className="show-item"
									onClick={this.editSche}
								>
									<FaPencilAlt />
									Edit
								</a>
							)}
								<div>DELIVERY SCHEDULE</div>
								<div style={{ color: "#400d60" }}>
									{this.props.login?
										(this.state.editschedule?
											<select
												style={{ width: "112%" }}
												onChange={this.handleScheduleChange}
												value = {this.state.Schdule}>
												<option value={"Today 8 a.m : 10 a.m"}>Today 8 a.m : 10 a.m</option>
												<option value={"Today 10 a.m : 12 p.m"}>Today 10 a.m : 12 p.m</option>
												<option value={"Today 12 p.m : 2 p.m"}>Today 12 p.m : 2 p.m</option>
												<option value={"Today 2 p.m : 4 p.m"}>Today 2 p.m : 4 p.m</option>
												<option value={"Today 4 p.m : 6 p.m"}>Today 4 p.m : 6 p.m</option>
												<option value={"Today 6 p.m : 8 p.m"}>Today 6 p.m : 8 p.m</option>
												<option value={"Today 8 p.m : 10 p.m"}>Today 8 p.m : 10 p.m</option>
												<option value={"Tomorrow 8 a.m : 10 a.m"}>Tomorrow 8 a.m : 10 a.m</option>
												<option value={"Tomorrow 10 a.m : 12 p.m"}>Tomorrow 10 a.m : 12 p.m</option>
												<option value={"Tomorrow 12 p.m : 2 p.m"}>Tomorrow 12 p.m : 2 p.m</option>
												<option value={"Tomorrow 2 p.m : 4 p.m"}>Tomorrow 2 p.m : 4 p.m</option>
												<option value={"Tomorrow 4 p.m : 6 p.m"}>Tomorrow 4 p.m : 6 p.m</option>
												<option value={"Tomorrow 6 p.m : 8 p.m"}>Tomorrow 6 p.m : 8 p.m</option>
												<option value={"Tomorrow 8 p.m : 10 p.m"}>Tomorrow 8 p.m : 10 p.m</option>
												
											</select> :
											<strong>{this.state.Schdule}
											</strong>):
										<strong></strong>}
								</div>
								{this.state.unavailable?<span style={{color: "#000", width: 100}}>"This time is unavaiable.</span>:
									<span></span>}
								<button className='scheduleBtn'>Change Schedule</button>
							</div>
							<div className='divider' />
							<div className='method'>
								<div style={{ marginTop: 20 }}>PAYMENT METHOD</div>
								<div style={{ color: "#400d60" }}>
									<strong>UPON DELIVERY</strong>
								</div>
							</div>
						</div>
						<div className='address font-14'>
							{this.state.editins ? (
								<a
									className="show-item"
									onClick={this.saveIns}
								>
									<FaSave />	
									Save
								</a>
							) : (
								<a
									className="show-item"
									onClick={this.editIns}
								>
									<FaPencilAlt />
									Edit
								</a>
							)}
							<div>DELIVERY&nbsp;INSTRUCTIONS</div>
							<div style={{ color: "#400d60" }}>
								{this.props.login?
									(this.state.editins?
										<input
											type='text'
											style={{ width: "50%" }}
											value={this.state.DeliveryInstructions}
											onChange={this.handleInsChange}
										/>:
										<strong>{this.state.DeliveryInstructions}
										</strong>):
									<strong></strong>}
							</div>
						</div>
						<div className='bill font-14' style={{ marginTop: 30 }}>
							<div style={{ textAlign: "center" }}>
								<strong>ITEM DETAILS</strong>
							</div>
						</div>
						{deal_array.map((deal, idx) => {
							return (
								<div key={idx} className='items_per_store' id={idx}>
									<div className='d-flex font-20'>
										<div className='store_name'>{deal[0]}</div>
										<div className='show-item font-18'>{deal.length - 1}</div>
									</div>
									<div className='font-16 d-flex backColor2'>
										<div style={{ width: "80%", textAlign: "center" }}>Item</div>
										<div style={{ width: "20%", textAlign: "center" }}>Price</div>
									</div>
									{deal
										.filter(function(subdeal) {
											if (typeof subdeal === "string") {
												return false; // skip
											}
											return true;
										})
										.map((subdeal, sub_idx) => {
											return (
												<Deal
													key={sub_idx}
													subdeal={subdeal}
													sub_idx={sub_idx}
													handleQty={handleQty}
												/>
											);
										})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default ReviewModal;
