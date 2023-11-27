import axios from 'axios';

import {
    ALL_COFFEES_REQUEST,
    ALL_COFFEES_SUCCESS,
    ALL_COFFEES_FAIL,
    COFFEE_DETAILS_REQUEST,
    COFFEE_DETAILS_SUCCESS,
    COFFEE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/coffeeConstants'

// Get All Coffees
export const getCoffees = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {

        dispatch({type: ALL_COFFEES_REQUEST});

        let link = `/api/v1/coffees?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if(category) {
            link = `/api/v1/coffees?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }

        const { data } = await axios.get(link);

        console.log(link);

        dispatch({
            type: ALL_COFFEES_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: ALL_COFFEES_FAIL,
            payload: error.response.data.message
        });
    }
}

// Get Coffee Details
export const getCoffeeDetails = (id) => async (dispatch) => {
    try {

        dispatch({type: COFFEE_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/v1/coffee/${id}`);

        dispatch({
            type: COFFEE_DETAILS_SUCCESS,
            payload: data.coffee
        });
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: COFFEE_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Clear Errors 
export const ClearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}