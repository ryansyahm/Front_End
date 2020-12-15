import Axios from "axios";
import swal from "sweetalert";
import { api_url } from "../../helpers/api_url";

export const addToCartAction = (data) => {
	return (dispatch) => {
		Axios.post(`${api_url}/cart`, data)
			.then((res) => {
				console.log("Data Masuk");
				swal("Success!", "Product added to cart!", "success");
				dispatch({
					type: "ADD_TO_CART",
				});
			})
			.catch((err) => {
				console.log(err);
				swal(
					"Something Went Wrong!",
					"Please Contact an Administrator!",
					"error"
				);
			});
	};
};
export const getCartByIdAction = (id) => {
	return (dispatch) => {
		Axios.get(`${api_url}/cart?userID=${id}`)
			.then((res) => {
				dispatch({
					type: "FETCH_CART",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const deleteCartAction = (id, userID) => {
	return (dispatch) => {
		Axios.delete(`${api_url}/cart/${id}`)
			.then((res) => {
				dispatch(getCartByIdAction(userID));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const checkOutAction = (data, userID) => {
	return (dispatch) => {
		Axios.post(`${api_url}/transaction`, data)
			.then((res) => {
				data.items.forEach((val) => {
					Axios.delete(`${api_url}/cart/${val.id}`)
						.then((res) => {
							dispatch(getCartByIdAction(userID));
						})
						.catch((err) => {
							console.log(err);
						});
					swal("Success!", "Thanks for Shopping!", "success");
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const increaseQtyAction = (id, qty, userID) => {
	return (dispatch) => {
		Axios.patch(`${api_url}/cart/${id}`, {
			qty: qty + 1,
		})
			.then((res) => {
				dispatch(getCartByIdAction(userID));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const decreaseQtyAction = (id, qty, userID) => {
	return (dispatch) => {
		Axios.patch(`${api_url}/cart/${id}`, {
			qty: qty - 1,
		})
			.then((res) => {
				dispatch(getCartByIdAction(userID));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
