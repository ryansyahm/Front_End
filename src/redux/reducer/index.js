import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

export default combineReducers({
	user: userReducer,
	products: productReducer,
	cart: cartReducer,
});
