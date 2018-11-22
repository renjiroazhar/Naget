const initState = {
    projects: [
        {id: '1', title: 'Yahoooo', content: 'Wadidaw'},
        {id: '2', title: 'Judul Kedua', content: 'PPPPPPP'},
        {id: '3', title: 'Judul Ketiga', content: 'HMMMMM'}
    ]
}

const projectReducers = (state = initState, action) => {
   switch (action.type) {
       case 'CREATE_PROJECT':
           console.log('Created Project', action.project)
           return state;
        case 'CREATE_PROJECT_ERROR':
           console.log('Create Project Error', action.err);
            break;
        case 'REMOVE_PROJECT':
            console.log('Deleting Project Success', action.id);
            return state;
        case 'REMOVE_ERROR':
            console.log('Deleting Project Error', action.err);
        //    return state.filter(({ id }) => id !== action.id);
            break;
        default:
            return state;
   }
}

export default projectReducers;


