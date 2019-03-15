import React, { PureComponent } from "react";
import "./cartHeader.css";

class CartHeader extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			prevCartProductsCount: 0,
			animateCart: false,
			isCartOpened: false,
			id: 0
		};
	}

	resetCartAnimation = () => {
		setTimeout(() => this.setState({ animateCart: false }), 550);
	};

	componentDidUpdate() {
		if (this.state.id !== this.props.idToRemove._id) {
			this.setState({ id: this.props.idToRemove._id });
			this.props.handleRemoveFromCart(this.props.idToRemove);
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.productsCount !== state.prevCartProductsCount) {
			return {
				prevCartProductsCount: props.productsCount,
				animateCart: true
			};
		}

		return null;
	}

	goToCart = e => {
		e.preventDefault();

		this.props.handleTriggerCartModal(this.props.cartProducts);
	};

	render() {
		if (this.state.animateCart) this.resetCartAnimation();
		return (
			<div className='header_nav_right_cart_items_container' onClick={this.goToCart}>
				<div
					className={`header_nav_right_cart_items_count_container ${
						this.state.animateCart ? "header_nav_right_cart_items_count_container_animated" : ""
					}`}
				>
					<span
						className={
							this.props.productsCount <= 9
								? `header_nav_right_cart_items_count_single_digit`
								: `header_nav_right_cart_items_count_double_digits`
						}
					>
						{this.props.productsCount <= 9
							? this.props.productsCount > 0
								? this.props.productsCount
								: ""
							: "9+"}
					</span>
				</div>
				<div className='header_nav_right_cart_img_container'>
					<img
						className='header_nav_right_cart_img'
						src='https://pngimage.net/wp-content/uploads/2018/05/cart-icon-white-png-6.png'
						alt='cart'
					/>
				</div>
			</div>
		);
	}
}

export default CartHeader;
