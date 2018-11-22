export const removeProject = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {      
        const firestore = getFirestore();
        const dataAll = firestore.collection('projects').doc(id);
        
        dataAll.delete().then(() => {
            dispatch({ type: 'REMOVE_PROJECT', id });
            firestore.onSnapshot('projects'); 
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
    }
};


export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // Make async call to database
        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...project,
            authorFirstName: 'Arif',
            authorLastName: 'Widianto',
            authorId: 12345,
            createdAt: new Date()
         }).then(() => {
           
        dispatch({ type: 'CREATE_PROJECT', project }) 
         }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err });
         })
    }
}
