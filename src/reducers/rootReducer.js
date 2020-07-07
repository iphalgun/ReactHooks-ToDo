import * as actionTypes from './actions';

const initialState = {
    notes: [],
    input: '',
    error: null
}

const rootReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case actionTypes.HANDLE_SUBMIT:
            return {
      //          ...state,
        //        notes : {
          //          ...state.notes,
            //        [action.notesName]:
              //  }
            }
        case actionTypes.DELETE_USERS:
              const updatedArray = state.notes.filter(note => note.id !== action.id);
            return {
                ...state,
                notes: updatedArray
            }
        case actionTypes.RECEIVE_USERS:
               console.log("it works")
            return {
              //...state,
              //notes: action.payload.data
            }
        case actionTypes.FETCH_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              items: []
            }
        case actionTypes.FETCH_ERROR:
            return {
              ...state,
              pending: false,
              error: action.error
            }
        default:
            return state;
    }
}

export default rootReducer;