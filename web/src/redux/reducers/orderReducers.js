const initState = {
	orders: [],
	editError: null
};

const orderReducers = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_DATA':
			console.log('Add Data', action.order);
			return {
				...state,
				orders: [...state.orders, action.order]
			};
		case 'DELETE_ITEM':
			return (state, action) => ({
				...state,
				orders: state.orders.filter(order => action.payload !== order)
			});
		case 'CREATE_ORDER':
			console.log('Created Order', action.order);
			return state;
		case 'CREATE_ORDER_ERROR':
			console.log('Create Order Error', action.err);
			break;
		case 'CANCEL_ORDER_SUCCESS':
			console.log('Cancel Order Success');
			return {
				...state,
				editError: null
			};
		case 'CANCEL_ORDER_ERROR':
			console.log('Cancle Order Failed');
			return {
				...state,
				editError: 'Edit Order Failed'
			};
		case 'REMOVE_ORDER':
			console.log('Deleting Order Success', action.id);
			return state;
		case 'REMOVE_ORDER_ERROR':
			console.log('Deleting Order Error', action.error);
			//    return state.filter(({ id }) => id !== action.id);
			break;
		default:
			return state;
	}
};

export default orderReducers;
