import React, { Component } from "react";
import queryString from "querystring";
import { connect } from "react-redux";
import { fetchProductByIdAction, addToCartAction } from "../redux/action";
import { Button } from "reactstrap";
import Fade from "react-reveal/Fade";
// import swal from "sweetalert";

class ProductDetail extends Component {
	state = {
		data: {},
		qtySelected: 1,
	};

	componentDidMount() {
		const { fetchProductByIdAction } = this.props;
		const productID = queryString.parse(this.props.location.search)["?id"];
		// const ProductID = this.props.location.search.split("=")[1];
		fetchProductByIdAction(productID);
	}

	increaseQty = () => {
		this.setState({
			qtySelected: this.state.qtySelected + 1,
		});
	};

	decreaseQty = () => {
		this.setState({
			qtySelected: this.state.qtySelected - 1,
		});
	};

	addToCart = () => {
		const { productById, userID } = this.props;
		const { qtySelected } = this.state;
		const { name, price, image } = productById;
		const dataCart = {
			name,
			qty: qtySelected,
			price,
			userID,
			image,
		};
		this.props.addToCartAction(dataCart);
	};

	render() {
		const { name, price, stock, image } = this.props.productById;
		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<div>
							<Fade bottom>
								<img src={image} alt={`${name}.jpg`} height="300px" />
							</Fade>
						</div>
					</div>
					<div className="col-8">
						<div>
							<h1>{name}</h1>
						</div>
						<div>
							<h4>Rp. {price ? price.toLocaleString() : null}</h4>
						</div>
						<div>Available: {stock}</div>
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ipsa
							quod, ut autem sit at voluptatem doloremque voluptate reiciendis
							suscipit eaque pariatur perspiciatis enim asperiores deleniti eum
							dolores exercitationem nemo.
						</div>
						<div>
							<Button
								color="info"
								onClick={this.decreaseQty}
								disabled={this.state.qtySelected === 1}
							>
								-
							</Button>
							<span className="mx-2">{this.state.qtySelected}</span>
							<Button
								color="info"
								onClick={this.increaseQty}
								disabled={this.state.qtySelected === stock}
							>
								+
							</Button>
						</div>
						<div>
							<Button onClick={this.addToCart} color="info">
								Add to Cart
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		productById: state.products.productById,
		userID: state.user.id,
	};
};

export default connect(mapStatetoProps, {
	fetchProductByIdAction,
	addToCartAction,
})(ProductDetail);
