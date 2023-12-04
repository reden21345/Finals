import axios from 'axios';

import {
    ALL_COFFEES_REQUEST,
    ALL_COFFEES_SUCCESS,
    ALL_COFFEES_FAIL,
    ADMIN_COFFEES_REQUEST,
    ADMIN_COFFEES_SUCCESS,
    ADMIN_COFFEES_FAIL,
    COFFEE_DETAILS_REQUEST,
    COFFEE_DETAILS_SUCCESS,
    COFFEE_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/coffeeConstants'

// Get All Coffees
export const getCoffees = (keyword = '', currentPage = 1, price, category, rating=0) => async (dispatch) => {
    try {

        dispatch({type: ALL_COFFEES_REQUEST});

        let link = `/api/v1/coffees?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if(category) {
            link = `/api/v1/coffees?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
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

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminCoffees = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_COFFEES_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/coffees`)

        dispatch({
            type: ADMIN_COFFEES_SUCCESS,
            payload: data.coffees
        })

    } catch (error) {

        dispatch({
            type: ADMIN_COFFEES_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors 
export const ClearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}