import React, { PureComponent } from "react";
import "./Home.css";

import Header from "../Header";
import SearchForm from "../SearchForm";
import Deals from "../Deals";
import axios from "axios";
import DealDetailsModal from "../Modals/DealDetails";
import SignupModal from "../Modals/SignupModal";
import SigninModal from "../Modals/SigninModal";
import { _STRINGS } from "../../utils/_globals";
import CartModal from "../Modals/Cart";
import ReviewModal from "../Modals/Review";
import CartContextConsumer from "../Contexts/Cart";

import API from "../../utils/api";

const { _STORE_NAME_TAG_IMAGE_ALT, _STORE_NAME_TAG_SHOP_ALL } = _STRINGS;
const backend_url1 = "https://magictabbackend.herokuapp.com/";
const backend_url = "https://phillapi.herokuapp.com/";
class Home extends PureComponent {
	state = {
		expirationInfo: {},
		allDeals: [],
		deals: [],
		searchTerm: "",
		showDealDetail: false,
		productDetails: {},
		currentStoreNameTag: _STORE_NAME_TAG_SHOP_ALL,
		currentSearchTerm: "",
		isCartOpened: false,
		isReviewOpened: false,
		dealsQty: [],
		productsWithQty: [],
		loginToOrder: false,
		registering: false,
		orderflag: false,
		idToRemove: { _id: -1 }
	};

	componentWillReceiveProps(nextprops) {
		this.setState({
			allDeals: nextprops.deals,
			deals: nextprops.deals
		});
	}

	componentDidMount() {
		this.setState({
			allDeals: this.props.deals,
			deals: this.props.deals
		});
	}

	filterStoreNameTagDealsByTerm = term => {
		if (term === _STORE_NAME_TAG_SHOP_ALL) return [...this.state.allDeals];

		return this.state.allDeals.filter(deal => deal["store"].name.toLowerCase().includes(term.toLowerCase()));
		// return this.state.allDeals.filter(deal => console.log(deal));
	};

	filterDealsByTerm = (source, term, dealsToSearch) => {
		// Because the user might have a store tag selected
		// Make sure to search in the store they've selected
		// const dealsToSearch = this.state.currentStoreNameTag === _STORE_NAME_TAG_SHOP_ALL ? this.state.allDeals : this.state.deals;

		if (source === "store") {
			return dealsToSearch.filter(deal => deal[source].name.toLowerCase().includes(term.toLowerCase()));
		}
		return dealsToSearch.filter(deal => deal[source].toLowerCase().includes(term.toLowerCase()));
	};

	filterDealsByPrice = (price, dealsToSearch) => {
		// Return the ones whose price is lower or equal
		return dealsToSearch.filter(deal => deal.priceInfo.price <= price);
	};

	handleSearch = searchTerm => {
		// filter deals for matching terms in: store, product, productDetails, and prices
		// TODO: Add brand when we add brand in the api
		let dealsToSearch = this.filterStoreNameTagDealsByTerm(this.state.currentStoreNameTag);

		if (!searchTerm.length) {
			this.setState({ deals: dealsToSearch });
		} else {
			let searchResults = [];
			if (isNaN(Number(searchTerm))) {
				const storeMatch = this.filterDealsByTerm("store", searchTerm, dealsToSearch);
				const productMatch = this.filterDealsByTerm("product", searchTerm, dealsToSearch);
				// const productDetailsMatch = this.filterDealsByTerm("productDetails", searchTerm, dealsToSearch);

				searchResults = [].concat(storeMatch).concat(productMatch);
				// .concat(productDetailsMatch);
			} else {
				searchResults = [].concat(this.filterDealsByPrice(Number(searchTerm), dealsToSearch));
			}

			this.setState({
				deals: searchResults
			});
		}
	};

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

	handleReview = e => {
		this.setState({ isReviewOpened: true });
	};

	handleTriggerCartModal = cartDetails => {
		this.setState({
			isCartOpened: true,
			cartDetails
		});
		this.handleSetQty(cartDetails, this.state.dealsQty);
	};

	handleTriggerDetailsModal = productDetails => {
		this.setState({
			showDealDetail: true,
			productDetails
		});
	};

	handleSetQty = (products, qtyInfo) => {
		var temp = [];
		for (const product of products) {
			for (const each of qtyInfo) {
				if (product._id === each.id) {
					product.qty = each.qty;
					var float = product.price.match(/[+-]?\d+(\.\d+)?/g).map(function(v) {
						return parseFloat(v);
					});
					// if (product.price.includes("lb")) {
					// 	product.totalCost = (float[0] * each.qty) / 100;
					// } else {
					// 	product.totalCost = float[0] * each.qty;
					// }
					product.totalCost = float[0] * each.qty;

					product.totalCost = product.totalCost.toFixed(2);

					temp.push(product);
					break;
				}
			}
			// if (product.price.includes("lb") && product.qty === 100 && !temp.includes(product)) {
			// 	var float = product.price.match(/[+-]?\d+(\.\d+)?/g).map(function(v) {
			// 		return parseFloat(v);
			// 	});
			// 	product.totalCost = float[0];
			// 	temp.push(product);
			// } else if (!product.price.includes("lb") && product.qty === 1 && !temp.includes(product)) {
			// 	var float = product.price.match(/[+-]?\d+(\.\d+)?/g).map(function(v) {
			// 		return parseFloat(v);
			// 	});
			// 	product.totalCost = float[0];
			// 	product.totalCost = product.totalCost.toFixed(2);
			// 	temp.push(product);
			// }

			if (product.qty === 1 && !temp.includes(product)) {
				var float = product.price.match(/[+-]?\d+(\.\d+)?/g).map(function(v) {
					return parseFloat(v);
				});
				product.totalCost = float[0];
				product.totalCost = product.totalCost.toFixed(2);
				temp.push(product);
			}
		}
		this.setState({ productsWithQty: temp });
	};

	removingFunc = (id, products) => {
		return products.filter(product => product._id !== id);
	};

	removeProduct = id => {
		var temp = this.state.productsWithQty;
		temp = this.removingFunc(id, temp);
		var obj = this.state.idToRemove;
		obj._id = id;
		this.setState({ productsWithQty: temp, idToRemove: obj });
	};

	handleCloseModal = () => {
		//e.preventDefault();
		this.setState({
			showDealDetail: false,
			productDetails: {},
			isCartOpened: false,
			isReviewOpened: false
		});
	};

	handleStoreNameTagClick = currentStoreNameTag => {
		this.setState({
			currentStoreNameTag:
				currentStoreNameTag !== _STORE_NAME_TAG_SHOP_ALL
					? currentStoreNameTag.toLowerCase()
					: _STORE_NAME_TAG_SHOP_ALL,
			// currentSearchTerm: ''
			deals: this.filterStoreNameTagDealsByTerm(currentStoreNameTag)
		});
	};

	renderStoreNameTags = () => {
		let storeNames = {};
		return (
			<div className='store_name_tags_container'>
				<div
					className={`store_name_tag_img_container store_name_shop_all_container ${this.state
						.currentStoreNameTag === _STORE_NAME_TAG_SHOP_ALL && "store_name_tag_img_container_selected"}`}
					onClick={() => this.handleStoreNameTagClick(_STORE_NAME_TAG_SHOP_ALL)}
				>
					<span className='store_name_shop_all'>{_STORE_NAME_TAG_SHOP_ALL}</span>
				</div>

				{this.state.allDeals.map((deal, idx) => {
					let storeName = deal.store.name;
					let storeLogoUrl = deal.store.logoUrl;
					if (!storeNames[storeName]) {
						storeNames[storeName] = 1;
						return (
							<div
								key={idx}
								className={`store_name_tag_img_container ${this.state.currentStoreNameTag ===
									storeName.toLowerCase() && "store_name_tag_img_container_selected"}`}
								style={{ backgroundImage: `url('${storeLogoUrl}')` }}
								onClick={() => this.handleStoreNameTagClick(storeName)}
							/>
						);
					} else {
						storeNames[storeName]++;
					}
				})}
			</div>
		);
	};

	addToDealsQty = e => {
		// this.setState({ dealsQty: [...this.state.dealsQty, { id: e, qty: 1 }] });
		// console.log(e);
	};
	handleQty = (id, qty) => {
		var temp = this.state.dealsQty;
		temp.map(e => {
			if (e.id === id) {
				var index = temp.indexOf(e);
				if (index > -1) {
					temp.splice(index, 1);
				}
			}
		});
		this.setState({ dealsQty: [...temp, { id: id, qty: qty }] });
		var th = this;
		setTimeout(function() {
			th.handleSetQty(th.state.cartDetails, th.state.dealsQty);
		}, 100);
	};

	requireLogin = () => {
		this.setState({
			loginToOrder: true
		});
	};

	handleClose = () => {
		this.setState({
			isReviewOpened: true,
			loginToOrder: false
		});
	};

	loggedin = email => {
		this.props.loggedin(email);
		this.setState({
			isReviewOpened: true
		});
	};

	registered = email => {
		this.props.registered(email);
		this.setState({
			isReviewOpened: true
		});
	};

	didOrder = () => {
		this.setState({
			orderflag: true
		});
	};

	render() {
		return (
			<React.Fragment>
				{this.state.registering && !this.props.login && this.state.loginToOrder && (
					<SignupModal
						handleClose={this.handleClose}
						registered={this.registered}
						SignIn={this.goToSignIn}
						ForOrder={true}
					/>
				)}

				{!this.state.registering && !this.props.login && this.state.loginToOrder && (
					<SigninModal
						handleClose={this.handleClose}
						loggedin={this.loggedin}
						signup={this.gotoSignUp}
						ForOrder={true}
					/>
				)}

				{this.state.isCartOpened && (
					<CartModal
						details={{ ...this.state.productsWithQty }}
						handleReview={this.handleReview}
						handleClose={this.handleCloseModal}
						saveQtToHome={this.saveQuantity}
						handleQty={this.handleQty}
						removeProduct={this.removeProduct}
					/>
				)}
				{this.state.isReviewOpened && (
					<ReviewModal
						details={{ ...this.state.productsWithQty }}
						handleClose={this.handleCloseModal}
						handleQty={this.handleQty}
						login={this.props.login}
						email={this.props.email}
						requireLogin={this.requireLogin}
						GoToProfile={this.props.GoToProfile}
						user={this.props.user}
						didOrder={this.didOrder}
					/>
				)}
				{this.state.showDealDetail && (
					<DealDetailsModal details={{ ...this.state.productDetails }} handleClose={this.handleCloseModal} />
				)}
				<div className='fixed_header_search'>
					<CartContextConsumer>
						{({ cartProductsCount, cartProducts, handleQty, handleRemoveFromCart }) => (
							<Header
								handleLangChange={this.props.handleLangChange}
								langs={this.props.langs}
								selectedLang={this.props.selectedLang}
								selectedTag='home'
								handleTriggerCartModal={this.handleTriggerCartModal}
								idToRemove={this.state.idToRemove}
								handleRemoveFromCart={handleRemoveFromCart}
							/>
						)}
					</CartContextConsumer>
					<div className='between_header_search_space_holder'>{this.renderStoreNameTags()}</div>
					<SearchForm handleSearch={this.handleSearch} />
				</div>
				<Deals
					expirationInfo={this.state.expirationInfo}
					deals={this.state.deals}
					handleTriggerDetailsModal={this.handleTriggerDetailsModal}
					orderflag={this.state.orderflag}
					addToDealsQty={this.addToDealsQty}
					idToRemove={this.state.idToRemove}
				/>
			</React.Fragment>
		);
	}
}

export default Home;
