import { users } from '../../firebase';
import { 
  GET_LOADING, 
  GET_USERS,
  GET_ERROR
} from './users.actionType';

const GetLoading = () => ({
  type: GET_LOADING,
});

const GetError = (payload) => ({
  type: GET_ERROR,
});

const GetUserByUsername = (payload) => ({
  type: GET_PASSPORTAL_BYID,
  payload: payload,
});

export function CreateUser(payload) {
  return dispatch => {
    dispatch(GetLoading())
    try {
      // console.log('actions CreatePassportal', payload)
      passportals.add({
        ...payload,
        createdAt: new Date(Date.now()).toLocaleString(),
        updatedAt: ''
      })
    } catch (err) {
      dispatch(GetError(err))
    }
  }
};

export function ReadUserByUsername(username) {
  return dispatch => {
    // console.log('ReadPassportalById', id)
    dispatch(GetLoading())
    passportals.get()
    .then(QuerySnapshot => {
      // console.log('ReadPassportalById QuerySnapshot', QuerySnapshot)
      let result = {}
      QuerySnapshot.forEach(currentItem => {
        // console.log('ReadPassportalById currentItem', currentItem.id)
        if (currentItem.id === id) {
          result = {
            ...currentItem.data(),
            id: currentItem.id
          }
        }
      })
      // console.log('ReadPassportalById result', result)
      dispatch(GetPassportalById(result))
    })
    .catch(err => {
      dispatch(GetError(err))
    })
  }
};
