import {
  FETCH_EQUATIONS_REQUEST,
  FETCH_EQUATIONS_SUCCESS,
  FETCH_EQUATIONS_ERROR,
  ADD_EQUATION,
  DELETE_EQUATION_SUCCESS
} from '../actions/equation';

const initialState = {
  loading: false,
  equations: [],
  error: null,
  equationToAdd: {}
}


export default function(state = initialState, action){
  switch(action.type){
    case FETCH_EQUATIONS_REQUEST:
      return Object.assign({}, state, {loading: true});
    case FETCH_EQUATIONS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        equations: action.equations
      });
    case FETCH_EQUATIONS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case ADD_EQUATION: return Object.assign({}, state, {equationToAdd: action.equation});
    case DELETE_EQUATION_SUCCESS:
      return action.id;
    default:
      return state
  }
}
