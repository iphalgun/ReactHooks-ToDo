export const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
export const FETCH_ERROR = 'FETCH_ERROR';
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const DELETE_USERS = 'DELETE_USERS';
export const FETCH_FAILURE= 'FETCH_FAILURE';
  
  export const requestUsers = () => ({
     type: REQUEST_USERS
  });
  
  export const receiveUsers = data => ({
    type: RECEIVE_USERS,
    payload: {data}
  });

  export const deleteUsers = id => ({
    type: DELETE_USERS,
    payload: id
  });

  export const fetchFailure = error => ({
    type: FETCH_FAILURE,
    payload: { error }
  });
  
 export const requestUsersAction = () => { // container
    return async dispatch => {
      dispatch(requestUsers());
      const users = await (await fetch('./users.json'))
        .json()
        .then(
          json =>
            new Promise(resolve =>
              setTimeout(() => resolve(json), 2000)
            )
        );
      dispatch(receiveUsers(users));
    };
  };