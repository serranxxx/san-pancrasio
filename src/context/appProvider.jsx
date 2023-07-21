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
            profit: (100 * (15 / 100)).toFixed(2),
            customerPrice: ((100 * (15 / 100)) + 100).toFixed(2),
            unity: 'Kg',
            minAmount: 15,
            amount: 14,
            purchaseCosto: 14 >= 15 ? '0.00' : ((15 - 14) * 100).toFixed(2),
            state: 15 >= 14 ? true : false

        }]
    }

    let sales = JSON.parse(localStorage.getItem('sales'))
    if (!sales) {
        sales = [{
            date: '2023-05-05',
            saleId: '1234',
            id: 'AB-123',
            quantity: 1,
            unity: 'kg',
            name: 'Producto de ejemplo',
            profit: 10,
            customerPrice: 110,
            stateOfsale: true,
            simpleCustomerPrice: 100

        }]
    }
    return {
        items: items,
        totalSales: sales,
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

    const setIds = (ids = []) => {
        const itemIds = ids
        const action = {
            type: types.itemIds,
            payload: itemIds
        }
        localStorage.setItem('itemIds', JSON.stringify(itemIds))
        dispatch(action)
    }

    const setTotalsales = (sales = []) => {
        const Sales = sales
        const action = {
            type: types.setSales,
            payload: Sales
        }
        localStorage.setItem('sales', JSON.stringify(Sales))
        dispatch(action)
    }



    return (
        <appContext.Provider value={{
            ...state,
            setItems,
            setIds,
            setTotalsales,
        }}>
            {children}
        </appContext.Provider >
    )
}
