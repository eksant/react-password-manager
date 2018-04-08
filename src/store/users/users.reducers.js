import { 
  GET_LOADING, 
  GET_USERS, 
  GET_ERROR
} from './users.actionType';

const initialState = {
  loading: false,
  error: false,
  isLogin: false,
  user: {}
};

const reducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_USERS:
      // console.log('reducers GET_PASSPORTALS: ', action.payload)
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducers;