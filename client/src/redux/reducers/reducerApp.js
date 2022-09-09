import {
    GET_SHOES,
    GET_SHOE,
    GET_BY_NAME,
    GET_BRANDS,
    GET_BY_BRAND,
    GET_BY_CATALOG_BRAND,
    ////////////////////////////
    ADD_PRODUCT_CARRITO, 
    DELETE_PRODUCT_CARRITO, 
    INCREMENT_TOTAL, 
    DECREMENT_TOTAL, 
    RESET_TOTAL, 
    INCREMENT_QUANTITY, 
    DECREMENT_QUANTITY, 
    CLEAN_CART
} from '../actions/actions'

const initialState = {
    shoes: [],
    shoe: [],
    filter:[],
    brands:[],
    name: [],
    catalogBrand: [],
    cart:[],
    productosCarrito: (JSON.parse(localStorage.getItem('carrito')) === null) ? [] : JSON.parse(localStorage.getItem('carrito')),
    totalCarrito: 0
}

export function reducerApp(state = initialState, action){

    switch(action.type){
        case GET_SHOES:
            return{
                ...state, 
                shoes: action.payload.map(e =>({...e, quantity:0, price:parseInt(e.price)})),
                filter: action.payload.map(e =>({...e, quantity:0, price:parseInt(e.price)}))
            }
        case GET_SHOE:
            return{
                ...state, 
                shoe: {...action.payload[0], quantity:0, price:parseInt(action.payload[0].price)}
            }
        case GET_BRANDS:
            return{
                ...state, 
                brands: action.payload
            }
        case GET_BY_CATALOG_BRAND:
            return{
                ...state, 
                catalogBrand: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state, 
                name: action.payload
            }
        case GET_BY_BRAND:
            return{
                ...state, 
                filter: [...state.shoes].filter(e => e.brand?.includes(action.payload))
            }
    //////////////////////////////////////////////////////////////////////////////////////////
        case ADD_PRODUCT_CARRITO:
            return {
                ...state,
                productosCarrito: state.productosCarrito.concat(action.payload)
            }
        case DELETE_PRODUCT_CARRITO:
            return {
                ...state,
                productosCarrito: state.productosCarrito = JSON.parse(localStorage.getItem('carrito'))
            }
        case CLEAN_CART:
            return {
                ...state,
                productosCarrito: []
            }
        case INCREMENT_TOTAL:
            return {
                ...state,
                totalCarrito: state.totalCarrito + action.payload
            }
        case DECREMENT_TOTAL:
            return {
                ...state,
                totalCarrito: state.totalCarrito - action.payload
            }
        case RESET_TOTAL:
            return {
                ...state,
                totalCarrito: 0
            }
        case INCREMENT_QUANTITY:
            let productIncrement = state.productosCarrito.find(e => e._id === action.payload);
            let quantity = productIncrement.quantity + 1
            productIncrement = { ...productIncrement, quantity: quantity }
            return {
                ...state,
                productosCarrito: state.productosCarrito.map(e => {
                    if (e._id === action.payload) return productIncrement
                    else return e
                })
            }
        case DECREMENT_QUANTITY:
            let productDecrement = state.productosCarrito.find(e => e._id === action.payload);
            let cantidad = productDecrement.quantity - 1;
            productDecrement = { ...productDecrement, quantity: cantidad }
            return {
                ...state,
                productosCarrito: state.productosCarrito.map(e => {
                    if (e._id === action.payload) return productDecrement
                    else return e
                })
            }
    /////////////////////////////////////////////////////////////////////////////////////////////////        
        
        default: return state
    }
}

export default reducerApp;