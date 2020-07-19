import * as actionTypes from './actions';

const initialState = {
    notes: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type)
    {
            case actionTypes.POST_USERS:
            return {
                ...state,
                notes:[...state.notes, action.payload.entry]
            }

        case actionTypes.DELETE_USERS:
              const updatedArray = state.notes.filter(notes => notes.id !== action.payload.id);
            return {
                ...state,
                notes: updatedArray
            }


        case actionTypes.EDIT_USERS:
            const updatedUsers = state.notes.map(note => {
            if (note.id === action.payload.id) {
                return action.payload;
            }
            else
            {
                return note;
            }});
            return {
                ...state,
                notes: updatedUsers
            };


        case actionTypes.RECEIVE_USERS:
            return {
                ...state,
                notes: action.payload.data   
            }


        case actionTypes.FETCH_FAILURE:
            return {
              ...state,
              error: action.payload.error,
              notes: []
            }
        default:
            return state;
    }
}

export default rootReducer;
