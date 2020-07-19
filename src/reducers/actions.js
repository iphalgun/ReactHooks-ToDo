export const RECEIVE_USERS = 'RECEIVE_USERS';
export const DELETE_USERS = 'DELETE_USERS';
export const FETCH_FAILURE= 'FETCH_FAILURE';
export const POST_USERS= 'POST_USERS';
export const EDIT_USERS='EDIT_USERS';

  export const postUsers = entry => ({
    type: POST_USERS,
    payload: {entry}
  });
  
  export const receiveUsers = data => ({
    type: RECEIVE_USERS,
    payload: {data}
  });

  export const deleteUsers = id => ({
    type: DELETE_USERS,
    payload: {id}
  });

  export const fetchFailure = error => ({
    type: FETCH_FAILURE,
    payload: { error }
  });

  export const editUsers = users => ({
      type: EDIT_USERS,
      payload: users
  });
  
  export function fetchItems() {
    return dispatch => {
        fetch('https://tododemo-5d7d3.firebaseio.com/notes.json')
        .then(response => response.json())
        .then(responseData => {
          const loadedEntry=[];
          for(const key in responseData)
          {
              loadedEntry.push({
                  id: key,
                  message:responseData[key].name
              });
          }
          dispatch(receiveUsers(loadedEntry))
      }).catch(error => {
            dispatch(fetchFailure(error));
        })
    }
}


export function deleteProducts(id) {
  return dispatch => {
    fetch(`https://tododemo-5d7d3.firebaseio.com/notes/${id}.json`,{
      method:'DELETE',
  }).then(response=>{
    dispatch(deleteUsers(id))
  }).catch(error => {
    dispatch(fetchFailure(error));
  });
  }
}


export function saveProducts(entry) {
  return dispatch => {
    fetch('https://tododemo-5d7d3.firebaseio.com/notes.json',{
        method:'POST',
        body: JSON.stringify(entry),
        headers:{'Content-type':'application/json'}
    }).then(response=>{
        return response.json();
    }).then(responseData=>{
        dispatch(postUsers(entry))
    });
  }
};


export function editProducts(id, message) {
return dispatch => {
 const data = { id, message }
  fetch(`https://tododemo-5d7d3.firebaseio.com/notes/${id}.json`,{
  method: 'PUT', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name: message}),
})
.then(response => response.json())
.then(message => {
  dispatch(editUsers(data));
}).catch(error => {
  dispatch(fetchFailure(error));
});
}
};
