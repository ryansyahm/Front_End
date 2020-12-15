import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import {
	deleteCartAction,
	getCartByIdAction,
	checkOutAction,
	increaseQtyAction,
	decreaseQtyAction,
} from "../redux/action";
import { Redirect } from "react-router-dom";

class CartPage extends Component {
	state = {
		redirectHome: false,
	};

	componentDidMount() {
		const { getCartByIdAction, userID } = this.props;
		getCartByIdAction(userID);
	}

	componentDidUpdate(prevProps) {
		const { userID, getCartByIdAction } = this.props;
		if (prevProps.userID !== userID) {
			getCartByIdAction(userID);
		}
	}

	deleteCart = (id) => {
		const { deleteCartAction, userID } = this.props;
		deleteCartAction(id, userID);
	};

	renderGrandTotal = () => {
		const { cartList } = this.props;
		let output = 0;
		// for (let i = 0; i < cartList.length; i++){
		// 	output += cartList[i].qty * cartList[i].price
		// }
		cartList.forEach((val) => {
			output += val.qty * val.price;
		});
		return output;
	};

	addQty = (id, qty) => {
		const { increaseQtyAction, userID } = this.props;
		increaseQtyAction(id, qty, userID);
	};
	subQty = (id, qty) => {
		const { decreaseQtyAction, userID } = this.props;
		decreaseQtyAction(id, qty, userID);
	};

	subQty;

	renderCheckout = () => {
		const { cartList, userID, checkOutAction } = this.props;
		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();

		const checkOutData = {
			date: `${day}-${month}-${year}`,
			total: this.renderGrandTotal(),
			items: cartList,
			userID: userID,
		};
		checkOutAction(checkOutData);
		this.setState({
			redirectHome: !this.state.redirectHome,
		});
	};

	renderTableBody = () => {
		return this.props.cartList.map((val, index) => {
			return (
				<tr>
					<th>{index + 1}</th>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt={`${val.image}.jpg`} height="150px"></img>
					</td>
					<td>
						<Button
							onClick={() => this.subQty(val.id, val.qty)}
							disabled={val.qty === 1}
						>
							-
						</Button>
						<span className="mx-2">{val.qty}</span>
						<Button onClick={() => this.addQty(val.id, val.qty)}>+</Button>
					</td>
					<td>Rp.{(val.qty * val.price).toLocaleString()}</td>
					<td>
						<Button onClick={() => this.deleteCart(val.id)}>Delete</Button>
					</td>
				</tr>
			);
		});
	};

	render() {
		const { redirectHome } = this.state;
		const { cartList } = this.props;
		if (redirectHome) {
			return <Redirect to="/" />;
		} else if (cartList.length === 0) {
			return (
				<div>
					<div>Cart is Empty</div>
				</div>
			);
		}
		return (
			<Table dark>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Image</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{this.renderTableBody()}</tbody>
				<tfoot>
					<tr>
						<td> </td>
						<td> </td>
						<td> </td>
						<td>Grand Total</td>
						<td>{this.renderGrandTotal().toLocaleString()}</td>
						<td>
							<Button onClick={() => this.renderCheckout()}>Check Out</Button>
						</td>
					</tr>
				</tfoot>
			</Table>
		);
	}
}

const mapStatetoProps = ({ user, cart, products }) => {
	return {
		userID: user.id,
		cartList: cart.cart,
		products: products.productList,
	};
};

export default connect(mapStatetoProps, {
	getCartByIdAction,
	deleteCartAction,
	checkOutAction,
	increaseQtyAction,
	decreaseQtyAction,
})(CartPage);
