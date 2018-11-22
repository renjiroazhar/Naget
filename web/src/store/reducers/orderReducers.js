const initState = {
    orders: [
        {id: '1', title: 'Yahoooo', content: 'Wadidaw'},
        {id: '2', title: 'Judul Kedua', content: 'PPPPPPP'},
        {id: '3', title: 'Judul Ketiga', content: 'HMMMMM'}
    ]
}

const orderReducers = (state = initState, action) => {
   switch (action.type) {
       case 'CREATE_ORDER':
           console.log('Created Order', action.order)
           return state;
        case 'CREATE_ORDER_ERROR':
           console.log('Create Order Error', action.err);
            break;
        case 'REMOVE_ORDER':
            console.log('Deleting Order Success', action.id);
            return state;
        case 'REMOVE_ERROR':
            console.log('Deleting Order Error', action.err);
        //    return state.filter(({ id }) => id !== action.id);
            break;
        default:
            return state;
   }
}

export default orderReducers;


