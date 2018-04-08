import { 
  GET_LOADING, 
  GET_PASSPORTALS, 
  GET_PASSPORTAL_BYID,
  GET_ERROR
} from './passportals.actionType';

const initialState = {
  loading: false,
  error: false,
  datas: [],
  data: {}
};

const reducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_PASSPORTALS:
      // console.log('reducers GET_PASSPORTALS: ', action.payload)
      return {
        ...state,
        datas: action.payload,
        data: {},
        loading: false,
      }
    case GET_PASSPORTAL_BYID:
      // console.log('reducers GET_PASSPORTAL_BYID: ', action.payload)
      return {
        ...state,
        datas: [],
        data: action.payload,
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