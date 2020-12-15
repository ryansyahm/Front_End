const INITIAL_STATE = {
	cart: [],
	transaction: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "FETCH_CART":
			return {
				...state,
				cart: action.payload,
			};
		case "ADD_TRANSACTION":
			return {
				...state,
				transaction: action.payload,
			};
		default:
			return state;
	}
};
