const initState = {
	orders: []
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
		case 'REMOVE_ORDER':
			console.log('Deleting Order Success', action.idItem);
			return state;
		case 'REMOVE_ERROR':
			console.log('Deleting Order Error', action.err);
			//    return state.filter(({ id }) => id !== action.id);
			break;
		default:
			return state;
	}
};

export default orderReducers;
