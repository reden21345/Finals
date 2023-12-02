import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/coffee/${id}`)

    dispatch({
        type:   ADD_TO_CART,
        payload: {
            coffee: data.coffee._id,
            name: data.coffee.name,
            price: data.coffee.price,
            image: data.coffee.images[0].url,
            stock: data.coffee.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}