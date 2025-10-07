import { use } from "react";
import {Type} from "./action.type";

export const initialState={
    basket:[],
    user:null
}
export const reducer=(state,action)=>{
    switch(action.type){
        case Type.ADD_TO_BASKET:
            //check if the item already exists in the basket
            const existItem = state.basket.find((item) => item.id === action.item.id);
            if (existItem) {
                // If the item exists, increase its quantity
                return {
                    ...state,
                    basket: state.basket.map((item) =>
                        item.id === action.item.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                // If the item doesn't exist, add it to the basket with quantity 1
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, quantity: 1 }],
                };
            }

        case Type.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.payload);
            if (index >= 0) {
                if (state.basket[index].quantity > 1) {
                    return {
                        ...state,
                        basket: state.basket.map((item, i) =>
                            i === index ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    };
                } else {
                    return {
                        ...state,
                        basket: [
                            ...state.basket.slice(0, index),
                            ...state.basket.slice(index + 1)
                        ],
                    };
                }
            }
            return state;
        case Type.EMPTY_BASKET:
            return {
                ...state,
                basket: [],
            };
        case Type.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}