import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { CoffeesReducer, CoffeeDetailsReducer } from './reducers/coffeeReducers'

const reducer = combineReducers({
    coffees: CoffeesReducer,
    coffeeDetails: CoffeeDetailsReducer
});


let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;   