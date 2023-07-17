import { useReducer } from "react";
import { types } from "./types";
import { AppReducer } from "./appReducer";
import { appContext } from "./appContext";




const init = () => {

    let items = JSON.parse(localStorage.getItem('items'))
    if (!items) {
        items = [{
            id: 'AB-123',
            name: 'Producto de ejemplo',
            productPrice: 100,
            porcentage: 15,
            profit: (100* (15 / 100)).toFixed(2),
            customerPrice: ((100 * (15/ 100)) + 100).toFixed(2),
            unity: 'Kg',
            minAmount: 15,
            amount: 14,
            purchaseCosto: 14 >= 15 ? '0.00' : ((15 - 14) * 100).toFixed(2),
            state: 15 >= 14 ? true : false

        }]
    }
    return {
        items: items,
        
    }
}

export const AppProvider = ({ children }) => {


    const [state, dispatch] = useReducer(AppReducer, {}, init)


    const setItems = (items = []) => {
        const allItems = items
        const action = {
            type: types.setNewItem,
            payload: allItems
        }
        localStorage.setItem('items', JSON.stringify(allItems))
        dispatch(action)
    }



    return (
        <appContext.Provider  value={{
            ...state,
            setItems,
        }}>
            {children}
        </appContext.Provider >
    )
}
