import { users } from '../../firebase';
import { 
  GET_LOADING, 
  GET_USER_BYUSERNAME,
  GET_ERROR
} from './users.actionType';

const GetLoading = () => ({
  type: GET_LOADING,
});

const GetError = (payload) => ({
  type: GET_ERROR,
});

const GetUserByUsername = (payload) => ({
  type: GET_USER_BYUSERNAME,
  payload: payload,
});

export function CreateUser(payload) {
  return dispatch => {
    dispatch(GetLoading())
    try {
      // console.log('actions CreateUser', payload)
      users.add({
        ...payload,
        createdAt: new Date(Date.now()).toLocaleString(),
        updatedAt: ''
      })
    } catch (err) {
      dispatch(GetError(err))
    }
  }
};

export function ReadUserByUsername(username, password) {
  // console.log('ReadUserByUsername username, password', username, password)
  return dispatch => {
    dispatch(GetLoading())
    users.get()
    .then(QuerySnapshot => {
      // console.log('ReadUserByUsername QuerySnapshot', QuerySnapshot)
      let result = {}
      QuerySnapshot.forEach(currentItem => {
        let data = currentItem.data()
        // console.log('ReadUserByUsername data', data)
        if (data.username === username && data.password === password) {
          result = {
            ...data,
            id: currentItem.id
          }
        }
      })
      // console.log('ReadUserByUsername result', result)
      dispatch(GetUserByUsername(result))
    })
    .catch(err => {
      dispatch(GetError(err))
    })
  }
};
