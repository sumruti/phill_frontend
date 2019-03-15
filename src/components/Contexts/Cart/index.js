import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();

class CartContextProvider extends Component {
	state = {
		cartProductsCount: 0,
		cartProducts: []
	};

	handleAddToCart = productId => {
		// if (productId.price.includes("lb")) {
		// 	productId["qty"] = 100;
		// } else {
		// 	productId["qty"] = 1;
		// }
		productId["qty"] = 1;

		this.setState({
			cartProductsCount: this.state.cartProductsCount + 1,
			cartProducts: [...this.state.cartProducts, productId]
		});
	};

	handleQty = (id, qty) => {
		console.log(id);
		console.log(qty);
	};

	handleRemoveFromCart = productId => {
		this.state.cartProducts.map(product => {
			if (product._id === productId._id) {
				this.setState({
					cartProductsCount: this.state.cartProductsCount - 1
				});
			}
		});
		this.setState({
			cartProducts: this.state.cartProducts.filter(product => product._id !== productId._id)
		});
	};

	render() {
		return (
			<Provider
				value={{
					handleQty: this.handleQty,
					cartProductsCount: this.state.cartProductsCount,
					cartProducts: this.state.cartProducts,
					handleAddToCart: this.handleAddToCart,
					handleRemoveFromCart: this.handleRemoveFromCart
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { CartContextProvider };

const CartContextConsumer = Consumer;
export default CartContextConsumer;
