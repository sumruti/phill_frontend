import React, { Component } from "react";
import "./Header.css";
import UserProfile from "../UserProfile";
import LangPicker from "../LangPicker";
import CartContextConsumer from "../Contexts/Cart";
import CartHeader from "../CartHeader";
import { FaUserCircle, FaSearch } from "react-icons/fa";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0
		};
	}
	componentDidUpdate() {
		if (this.state.id !== this.props.idToRemove._id) {
			this.setState({ id: this.props.idToRemove._id });
			this.props.handleRemoveFromCart(this.props.idToRemove);
		}
	}

	render() {
		const {
			handleLangChange,
			langs,
			handleTriggerCartModal,
			selectedLang,
			doRenderSearch,
			renderSearch,
			toggleReg,
			selectedTag,
			name,
			idToRemove,
			reOrders
		} = this.props;
		console.log(reOrders);
		return (
			<div className='header'>
				<div className='header_nav'>
					<div className='header_nav_left_right' style={{ padding: 0 }}>
						<div className='header_nav_left'>
							<LangPicker handleLangChange={handleLangChange} langs={langs} selectedLang={selectedLang} />

							<div className='lang_picker_user_profile_separator' />
							{selectedTag === "profile" && (
								<div className='user_name'>
									<span>
										<FaUserCircle />
									</span>
									<span style={{ marginLeft: 10 }}>Hello {name}</span>
								</div>
							)}
							{doRenderSearch && renderSearch()}
						</div>
						{selectedTag == "home" && (
							<div className='header_nav_right'>
								<CartContextConsumer>
									{({ cartProductsCount, cartProducts, handleQty, handleRemoveFromCart }) => (
										<CartHeader
											handleQty={handleQty}
											handleTriggerCartModal={handleTriggerCartModal}
											productsCount={cartProductsCount}
											cartProducts={cartProducts}
											idToRemove={idToRemove}
											handleRemoveFromCart={handleRemoveFromCart}
										/>
									)}
								</CartContextConsumer>
							</div>
						)}
					</div>
					{selectedTag == "home" && <h1 className='header_home'>Home</h1>}
					{selectedTag == "profile" && (
						<React.Fragment>
							<h1 className='header_home' style={{ marginBottom: 10 }}>
								Profile
							</h1>
							<div style={{ textAlign: "center" }}>
								<input
									placeholder='Search for an order'
									style={{ width: "70%", height: 35, padding: 10 }}
								/>
								<button className='searchBtn' style={{ marginLeft: -5, height: 36, width: 50 }}>
									<FaSearch style={{ color: "white" }} />
								</button>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default Header;
