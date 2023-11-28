import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { CoffeesReducer, CoffeeDetailsReducer } from './reducers/coffeeReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers';

const reducer = combineReducers({
    coffees: CoffeesReducer,
    coffeeDetails: CoffeeDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
});


let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;