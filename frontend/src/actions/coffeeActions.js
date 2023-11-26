import axios from 'axios';

import {
    ALL_COFFEES_REQUEST,
    ALL_COFFEES_SUCCESS,
    ALL_COFFEES_FAIL,
    CLEAR_ERRORS
} from '../constants/coffeeConstants'

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

// Clear Errors 
export const ClearErrors = () => async (disptach) => {
    disptach({
        type: CLEAR_ERRORS
    })
}