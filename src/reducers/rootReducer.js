import * as actionTypes from './actions';

const initialState = {
    notes: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type)
    {
            case actionTypes.POST_USERS:
              console.log(action.payload.entry)
            return {
                ...state,
                notes:[...state.notes, action.payload.entry]
            }

        case actionTypes.DELETE_USERS:
              console.log(action.payload.id)
              const updatedArray = state.notes.filter(notes => notes.id !== action.payload.id);
            return {
                ...state,
                notes: updatedArray
            }

        case actionTypes.RECEIVE_USERS:
               console.log(action.payload.data)
            return {
                ...state,
                notes: action.payload.data   
            }

        case actionTypes.FETCH_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              notes: []
            }
        default:
            return state;
    }
}

export default rootReducer;