import { types } from "./types";


export const AppReducer = (state = {}, action) => {

    switch (action.type) {
        case types.setNewItem:
            return {
                ...state,
                items: action.payload
            }

        case types.itemIds:
            return {
                ...state,
                itemIds: action.payload
            }

        case types.setSales:
            return {
                ...state,
                totalSales: action.payload
            }

        default:
            break;
    }
}
