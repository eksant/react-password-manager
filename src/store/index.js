import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import passportalReducers from './passportals/passportals.reducers';
import userReducers from './users/users.reducers';

const reducers = combineReducers({
  passportals: passportalReducers,
  users: userReducers,
});

const store = createStore(
  reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;