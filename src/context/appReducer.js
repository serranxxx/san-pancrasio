import { types } from "./types";


export const AppReducer = (state = {}, action) => {

    switch (action.type) {
        case types.setNewItem:
            return {
                ...state,
                items: action.payload
            }

        default:
            break;
    }
}
