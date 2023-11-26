import {
    ALL_COFFEES_REQUEST,
    ALL_COFFEES_SUCCESS,
    ALL_COFFEES_FAIL,
    CLEAR_ERRORS
} from '../constants/coffeeConstants'


export const CoffeesReducer = (state = { coffees: [] }, action) => {
    switch(action.type) {

        case ALL_COFFEES_REQUEST:
            return {
                loading: true,
                coffees: []
            }

        case ALL_COFFEES_SUCCESS:
            return {
                loading: false,
                coffees: action.payload.coffees,
                coffeeCount: action.payload.coffeeCount
            }

        case ALL_COFFEES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}