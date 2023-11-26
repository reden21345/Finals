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
export const getCoffees = () => async (disptach) => {
    try {

        disptach({type: ALL_COFFEES_REQUEST});

        const { data } = await axios.get('/api/v1/coffees');

        console.log(data);

        disptach({
            type: ALL_COFFEES_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        console.log(error);
        disptach({
            type: ALL_COFFEES_FAIL,
            payload: error.response.data.message
        });
    }
}

// Get Coffee Details
export const getCoffeeDetails = (id) => async (disptach) => {
    try {

        disptach({type: COFFEE_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/v1/coffee/${id}`);

        disptach({
            type: COFFEE_DETAILS_SUCCESS,
            payload: data.coffee
        });
        
    } catch (error) {
        console.log(error);
        disptach({
            type: COFFEE_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

// Clear Errors 
export const ClearErrors = () => async (disptach) => {
    disptach({
        type: CLEAR_ERRORS
    })
}