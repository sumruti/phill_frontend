import React, { PureComponent } from "react";
import "./CartModal.css";
import { FaCheck, FaPencilAlt, FaSave, FaRegTimesCircle } from "react-icons/fa";
class CartModal extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editQuantity: false,
			deal: this.props.subdeal,
			qty: this.props.subdeal.qty,
			cost: this.props.subdeal.totalCost
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
		this.props.handleQty(this.props.subdeal._id, this.state.qty);
	};

	handleQtyChange = e => {
		this.setState({ qty: e.target.value });
		var float = this.state.deal.price.match(/[+-]?\d+(\.\d+)?/g).map(function(v) {
			return parseFloat(v);
		});
		var cost = 0;
		cost = float[0] * e.target.value;
		cost = cost.toFixed(2);
		this.setState({ cost: cost });
	};

	removeItem = e => {
		this.setState({ qty: this.props.subdeal.qty });
	};

	render() {
		const { deal, cost } = this.state;
		const { subdeal, qty, totalCost } = this.props;
		return (
			<div className='item d-flex'>
				<div className='d-flex' style={{ width: "80%" }}>
					<img src={subdeal.productImgUrl} width={80} height={80} alt='' />
					<div className='font-16'>
						<div>{subdeal.product}</div>
						<div className='d-flex'>
							<p> Qty :&nbsp; </p>
							{this.state.editQuantity ? (
								<input
									type='number'
									style={{ width: "50px", height: 25 }}
									onChange={this.handleQtyChange}
								/>
							) : (
								<p>{qty}</p>
							)}
							<span className='font-14 pl-20'>
								{this.state.editQuantity ? (
									<a onClick={this.saveQuantity}>
										<FaSave />
									</a>
								) : (
									<a onClick={this.editQuantity}>
										<FaPencilAlt />
									</a>
								)}
							</span>
						</div>
					</div>
				</div>
				<div style={{ width: "20%", textAlign: "center" }}>
					<div style={{ marginTop: "50%" }}>${totalCost}</div>
				</div>

				<div
					style={{ width: "5%", textAlign: "center" }}
					onClick={() => {
						this.props.removeProduct(subdeal._id);
						this.removeItem(subdeal._id);
					}}
				>
					<FaRegTimesCircle />
				</div>
			</div>
		);
	}
}

export default CartModal;
