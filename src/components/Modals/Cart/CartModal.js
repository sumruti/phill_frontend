import React, { PureComponent } from "react";
import "./CartModal.css";
import item_image from "./images/item.png";
import { FaCheck, FaPencilAlt, FaSave } from "react-icons/fa";

import { _STRINGS } from "../../../utils/_globals";
import Deal from "./Deal";

const { _DEAL_DETAILS_MODAL_HEADER_NAME_PREFIX, _DEAL_PRODUCT_DETAILS_BUTTON_NAME } = _STRINGS;
class CartModal extends PureComponent {
	state = {
		editQuantity: false,
		quantity: 3
	};

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

	render() {
		const { details, handleClose, handleReview, handleQty } = this.props;
		var cost = 0;
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
		}
		return (
			<div className='cart_modal_blanket'>
				<div className='cart_modal_container'>
					<div className='cart_modal_header'>
						<div className='cart_modal_header_store_name'>
							<div>My Shopping Cart</div>
						</div>
						<button className='cart_modal_header_close_btn' onClick={handleClose}>
							x
						</button>
					</div>
					<div className='total_header'>
						<div className='d-flex font-20'>
							<div>
								<strong>John's cart</strong>
							</div>
							<div className='show_item font-18'>
								<strong>{size}</strong> Items
							</div>
						</div>
						<div className='d-flex font-22 color1 p-10'>
							<div>
								<strong style={{ position: "absolute", fontSize: 16, color: "#f26522" }}>$</strong>
								<strong style={{ paddingLeft: 10, color: "#f26522" }}>{cost}</strong>
							</div>
							<div className='show_item' style={{ marginTop: -3 }}>
								<button className='placeOrderBtn' onClick={handleReview}>
									Place order
								</button>
							</div>
						</div>
					</div>
					<div className='field'>
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
													qty={subdeal.qty}
													totalCost={subdeal.totalCost}
													sub_idx={sub_idx}
													handleQty={handleQty}
													removeProduct={this.props.removeProduct}
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

export default CartModal;
