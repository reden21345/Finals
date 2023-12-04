import {
    ALL_COFFEES_REQUEST,
    ALL_COFFEES_SUCCESS,
    ALL_COFFEES_FAIL,
    ADMIN_COFFEES_REQUEST,
    ADMIN_COFFEES_SUCCESS,
    ADMIN_COFFEES_FAIL,
    NEW_COFFEE_REQUEST,
    NEW_COFFEE_SUCCESS,
    NEW_COFFEE_RESET,
    NEW_COFFEE_FAIL,
    DELETE_COFFEE_REQUEST,
    DELETE_COFFEE_SUCCESS,
    DELETE_COFFEE_RESET,
    DELETE_COFFEE_FAIL,
    UPDATE_COFFEE_REQUEST,
    UPDATE_COFFEE_SUCCESS,
    UPDATE_COFFEE_RESET,
    UPDATE_COFFEE_FAIL,
    COFFEE_DETAILS_REQUEST,
    COFFEE_DETAILS_SUCCESS,
    COFFEE_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/coffeeConstants'


export const CoffeesReducer = (state = { coffees: [] }, action) => {
    switch(action.type) {

        case ALL_COFFEES_REQUEST:
        case ADMIN_COFFEES_REQUEST:
            return {
                loading: true,
                coffees: []
            }

        case ALL_COFFEES_SUCCESS:
            return {
                loading: false,
                coffees: action.payload.coffees,
                coffeeCount: action.payload.coffeeCount,
                resPerPage: action.payload.resPerPage,
                filteredCoffeesCount: action.payload.filteredCoffeesCount
            }

        case ADMIN_COFFEES_SUCCESS:
            return {
                loading: false,
                coffees: action.payload 
            }

        case ALL_COFFEES_FAIL:
        case ADMIN_COFFEES_FAIL:
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

export const newCoffeeReducer = (state = { coffee: {} }, action) => {
    switch (action.type) {

        case NEW_COFFEE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_COFFEE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                coffee: action.payload.coffee
            }

        case NEW_COFFEE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_COFFEE_RESET:
            return {
                ...state,
                success: false
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

export const coffeeReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_COFFEE_REQUEST:
        case UPDATE_COFFEE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_COFFEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_COFFEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_COFFEE_FAIL:
        case UPDATE_COFFEE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_COFFEE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_COFFEE_RESET:
            return {
                ...state,
                isUpdated: false
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
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

export const coffeeReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
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

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
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