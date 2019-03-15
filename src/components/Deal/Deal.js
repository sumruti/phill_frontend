import React, { PureComponent } from "react";
import moment from "moment";
import CartContextConsumer from "../Contexts/Cart";

import "./Deal.css";

import { _STRINGS, _ENGLISH_MONTH_NAMES } from "../../utils/_globals";

const {
	_DEAL_EXPIRATION_PREFIX,
	_DEAL_EXPIRATION_START_END_SEPARATOR,
	_DEAL_ADD_TO_CART_BUTTON_NAME,
	_DEAL_REMOVE_FROM_CART_BUTTON_NAME,
	_DEAL_PRODUCT_DETAILS_BUTTON_NAME
} = _STRINGS;

class Deal extends PureComponent {
	state = {
		animateAddToCardBtn: false,
		isAddedToCart: false
	};

	toggleAddToCartStates = () => {
		this.setState({
			animateAddToCardBtn: !this.state.animateAddToCardBtn,
			isAddedToCart: !this.state.isAddedToCart
		});

		// Reset state so that our button can stay animated
		setTimeout(() => this.setState({ animateAddToCardBtn: false }), 300);
	};

	handleAddToCartClick = cb => {
		this.toggleAddToCartStates();

		cb(this.props.deal);
	};

	handleProductDetailsButtonClick = e => {
		e.preventDefault();

		const productDetails = {
			storeName: this.props.deal.store.name,
			productName: this.props.deal.product,
			productDetails: this.props.deal.desc,
			productImgUrl: this.props.deal.productImgUrl
		};

		this.props.handleTriggerDetailsModal(productDetails);
	};

	componentDidMount() {
		this.setState({
			animateAddToCardBtn: false
		});
	}

	componentWillReceiveProps(nextprops) {
		if (nextprops.idToRemove._id === this.props.deal._id) {
			this.setState({
				animateAddToCardBtn: false,
				isAddedToCart: false
			});
		}
		if (nextprops.orderflag === true) {
			//initializeCart();
		}
	}

	render() {
		const {
			expirationInfo: { startDate, endDate },
			deal
		} = this.props;
		var cost = "";
		if (this.props.deal.price.match(/[+-]?\d+(\.\d+)?/g) !== null) {
			var float = this.props.deal.price.match(/[+-]?\d+(\.\d+)?/g).map(function(v) {
				return parseFloat(v);
			});
			cost = float[0];
		}

		const {
			_id,
			store,
			product,
			productImgUrl,
			validateDate,
			price
			// priceInfo: { price, currency }
		} = deal;
		return (
			<CartContextConsumer>
				{({ handleAddToCart, handleRemoveFromCart, initializeCart }) => {
					return (
						<div className='card deal_container'>
							<div className='card-body deal'>
								<div className='card-title'>
									<h2 className='deal_store'>{store.name}</h2>
								</div>
								<div className='card-title'>
									<h4 className='deal_product'>{product.toUpperCase()}</h4>
								</div>
								<div className='deal_img_price_container'>
									<img
										className='card-img-top deal_product_img'
										src={productImgUrl}
										alt='Deal product'
									/>

									{/* <div className='deal_price_container'>
										<span className='deal_price'>{`${currency}${price}`}</span>
									</div> */}
									<div className='deal_price_container'>
										<span className='deal_price'>$&nbsp;{cost}</span>
									</div>
								</div>
								<div className='deal_action_btns_container'>
									{!this.state.isAddedToCart ? (
										<button
											className={`btn deal_add_to_cart_btn ${
												this.state.animateAddToCardBtn
													? "deal_add_to_cart_btn_animated_background_color deal_add_to_cart_btn_animated_color"
													: ""
											}`}
											onClick={() => {
												this.handleAddToCartClick(handleAddToCart);
												this.props.addToDealsQty(_id);
											}}
										>
											{_DEAL_ADD_TO_CART_BUTTON_NAME}
										</button>
									) : (
										<button
											className={`btn deal_remove_from_cart_btn ${
												this.state.animateAddToCardBtn
													? "deal_remove_from_cart_btn_animated_background_color deal_remove_from_cart_btn_animated_color"
													: ""
											}`}
											onClick={() => this.handleAddToCartClick(handleRemoveFromCart)}
										>
											{_DEAL_REMOVE_FROM_CART_BUTTON_NAME}
										</button>
									)}
									<span
										className='btn deal_product_details_btn'
										onClick={this.handleProductDetailsButtonClick}
									>
										{_DEAL_PRODUCT_DETAILS_BUTTON_NAME}
									</span>
								</div>
								<div className='card-text deal_expiration'>
									{/* {`${_DEAL_EXPIRATION_PREFIX} ${
										_ENGLISH_MONTH_NAMES[moment(startDate).month()]
									} ${moment(startDate).date()} ${_DEAL_EXPIRATION_START_END_SEPARATOR} ${
										_ENGLISH_MONTH_NAMES[moment(endDate).month()]
									} ${moment(endDate).date()}`} */}
									{validateDate}
								</div>
							</div>
						</div>
					);
				}}
			</CartContextConsumer>
		);
	}
}

export default Deal;
