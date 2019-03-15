import axios from "axios";

const API = {
	getAllDeals: async () => {
		// TODO call to API
		// Returns an object
		// - expirationInfo: {startDate, endDate}
		// - deals: [deals]
		// Each deal is an object of:
		// - store
		// - product
		// - imgUrl
		// - priceInfo:{price, currency}
		await axios.get("/api/deals/getAllDeals").then(res => {
			if (res.data.length === 0) {
				// this.setState({ merchants: "no result" });
			} else {
				// this.setState({
				// 	merchants: res.data.map(merchant => {
				// 		return { value: merchant._id, name: merchant.name };
				// 	})
				// });
				// this.setState({ selectedMerchantId: this.state.merchants[0].value });
				return res;
			}
		});
		// return new Promise((resolve, reject) =>
		// 	resolve({
		// 		expirationInfo: {
		// 			startDate: 1544899509408,
		// 			endDate: 1545504309408
		// 		},
		// 		deals: [
		// 			{
		// 				id: 1,
		// 				store: {
		// 					name: "metro",
		// 					logoUrl: "https://metro.ca/images/shared/small/favicon/favicon--source.png"
		// 				},
		// 				product: "Yogourt Yoplait",
		// 				productImgUrl:
		// 					"https://res.cloudinary.com/yoplait/image/fetch/q_auto,f_auto/https://www.yoplait.com/wp-content/uploads/2018/01/Webp.net-resizeimage-39.png",
		// 				priceInfo: {
		// 					price: 1.88,
		// 					currency: "$"
		// 				},
		// 				productDetails:
		// 					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		// 			},
		// 			{
		// 				id: 2,
		// 				store: {
		// 					name: "Walmart",
		// 					logoUrl:
		// 						"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2000px-Walmart_logo.svg.png"
		// 				},
		// 				product: "Roast Beef",
		// 				productImgUrl:
		// 					"https://i1.wp.com/girlmeetsparty.com/wp-content/uploads/2017/10/Roast-Beef.png?ssl=1",
		// 				priceInfo: {
		// 					price: 4.32,
		// 					currency: "$"
		// 				},
		// 				productDetails:
		// 					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		// 			},
		// 			{
		// 				id: 3,
		// 				store: {
		// 					name: "Shaws",
		// 					logoUrl: "http://www.seeklogovector.com/wp-content/uploads/2018/05/shaws-logo-vector.png"
		// 				},
		// 				product: "Condiments",
		// 				productImgUrl:
		// 					"https://png.pngtree.com/element_origin_min_pic/16/11/30/17e99fb331de6799018af5e86b07eee1.jpg",
		// 				priceInfo: {
		// 					price: 3.27,
		// 					currency: "$"
		// 				},
		// 				productDetails:
		// 					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		// 			},
		// 			{
		// 				id: 4,
		// 				store: {
		// 					name: "Market Basket",
		// 					logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Market_Basket_Logo.png"
		// 				},
		// 				product: "Basmati rice",
		// 				productImgUrl:
		// 					"http://sugamsauda.com/image/data/LUCKNOW/GROCERY/RICE/India%20Gate%20Mini%20Mogra%20Rice%2010kg.png",
		// 				priceInfo: {
		// 					price: 5.1,
		// 					currency: "$"
		// 				},
		// 				productDetails:
		// 					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		// 			},
		// 			{
		// 				id: 5,
		// 				store: {
		// 					name: "metro",
		// 					logoUrl: "https://metro.ca/images/shared/small/favicon/favicon--source.png"
		// 				},
		// 				product: "Cherubs tomatoes",
		// 				productImgUrl:
		// 					"https://1aswz6617n62bekj52vicjtb-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/Cherub-10-5oz-MPv2.png",
		// 				priceInfo: {
		// 					price: 2.81,
		// 					currency: "$"
		// 				},
		// 				productDetails:
		// 					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		// 			}
		// 		]
		// 	})
		// );
	}
};

export default API;
