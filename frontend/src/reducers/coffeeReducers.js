import {
    ALL_COFFEES_REQUEST,
    ALL_COFFEES_SUCCESS,
    ALL_COFFEES_FAIL,
    COFFEE_DETAILS_REQUEST,
    COFFEE_DETAILS_SUCCESS,
    COFFEE_DETAILS_FAIL,
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
                coffeeCount: action.payload.coffeeCount,
                resPerPage: action.payload.resPerPage
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

export const CoffeeDetailsReducer = (state = { coffee: {} }, action) => {
    switch (action.type) {

        case COFFEE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case COFFEE_DETAILS_SUCCESS:
            return {
                loading: false,
                coffee: action.payload
            }

        case COFFEE_DETAILS_FAIL:
            return {
                ...state,
               error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                    error: null
        }

        default:
            return state
    }
}