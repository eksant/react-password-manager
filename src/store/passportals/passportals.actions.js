import { passportals } from '../../firebase';
import { 
  GET_LOADING, 
  GET_PASSPORTALS, 
  GET_PASSPORTAL_BYID,
  GET_ERROR
} from './passportals.actionType';

const GetLoading = () => ({
  type: GET_LOADING,
});

const GetError = (payload) => ({
  type: GET_ERROR,
});

const GetPassportals = (payload) => ({
  type: GET_PASSPORTALS,
  payload: payload,
});

const GetPassportalById = (payload) => ({
  type: GET_PASSPORTAL_BYID,
  payload: payload,
});

export function CreatePassportal(payload) {
  return dispatch => {
    dispatch(GetLoading())
    try {
      // console.log('actions CreatePassportal', payload)
      passportals.add({
        ...payload,
        userId: localStorage.getItem('userid'),
        createdAt: new Date(Date.now()).toLocaleString(),
        updatedAt: ''
      })
    } catch (err) {
      dispatch(GetError(err))
    }
  }
};

export function ReadPassportals() {
  return dispatch => {
    dispatch(GetLoading())
    passportals.get()
    .then(QuerySnapshot => {
      // console.log('QuerySnapshot', QuerySnapshot)
      let result = [];
      QuerySnapshot.forEach(currentItem => {
        let data = currentItem.data()
        // console.log('QuerySnapshot data', data)
        if (data.userId === localStorage.getItem('userid')) {
          result.push({
            ...currentItem.data(),
            id: currentItem.id
          })
        }
      })
      // console.log('actions ReadPassportals', result)
      dispatch(GetPassportals(result))
    })
    .catch(err => {
      dispatch(GetError(err))
    })
  }
};

export function ReadPassportalById(id) {
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

export function UpdatePassportal(id, payload) {
  return dispatch => {
    dispatch(GetLoading())
    try {
      passportals.doc(id).set(payload)
    } catch (err) {
      dispatch(GetError(err))
    }
  }
}

export function DeletePassportal(id) {
  return dispatch => {
    dispatch(GetLoading())
    try {
      passportals.doc(id).delete()
    } catch (err) {
      dispatch(GetError(err))
    }
  }
}
