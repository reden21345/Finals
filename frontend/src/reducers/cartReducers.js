import { ADD_TO_CART, 
    REMOVE_ITEM_CART, 
    SAVE_SHIPPING_INFO 
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
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
        
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.coffee !== action.payload)
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state;
    }    
}