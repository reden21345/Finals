import { ADD_TO_CART } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.coffee === item.coffee)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.coffee === isItemExist.coffee ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        default:
            return state;
    }    
}