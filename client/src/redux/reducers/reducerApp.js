import {
    GET_SHOES,
    GET_SHOE,
    GET_ONSALE,
    GET_BY_NAME,
    GET_BRANDS,
    GET_BY_BRAND,
    GET_BY_CATALOG_BRAND,
    POST_USER,
    GET_LESS_PRICE,
    GET_MORE_PRICE,
    GET_BY_COLOR,
    CLEAN_SHOE,
    ////////////////////////////
    ADD_PRODUCT_CARRITO, 
    DELETE_PRODUCT_CARRITO, 
    INCREMENT_TOTAL, 
    DECREMENT_TOTAL, 
    RESET_TOTAL, 
    INCREMENT_QUANTITY, 
    DECREMENT_QUANTITY, 
    CLEAN_CART,
    /////////////////////////////
    GET_USERS,
    GET_CLIENTS,
    GET_ORDER_CLIENT,
    DELETE_SHOE,
    MODIF_SHOE,
    CREATE_SIZE,
    DELETE_BRAND,
    /////////////////////////////
    GET_REVIEWS,
    GET_EXACT_REVIEW,
    POST_REVIEW,
    EDIT_REVIEW,
    CLEAN_REVIEWS,
    /////////////////////////////
    GET_FAVORITES,
    /////////////////////////////
    GET_USER_ORDERS,
    GET_ORDER_ID
} from '../actions/actions'

const initialState = {
    shoes: [],
    shoe: [],
    allShoes: [],
    onSale: [],
    filter:[],
    brands:[],
    name: [],
    catalogBrand: [],
    cart:[],
    favorites: [],
    review: {},
    shoeReviews: [],
    productosCarrito: (JSON.parse(localStorage.getItem('carrito')) === null) ? [] : JSON.parse(localStorage.getItem('carrito')),
    totalCarrito: 0,
    users:[],
    clients:[],
    order:[],
    orders: [],
    userOrders: [],
    orderId: {}
}

export function reducerApp(state = initialState, action){

    switch (action.type) {
      case GET_SHOES:
        return {
          ...state,
          allShoes: action.payload,
          shoes: action.payload.map((e) => ({
            ...e,
            quantity: 0
          })),
          filter: action.payload.map((e) => ({...e, stock:e.stock.map( el => ({...el, quantity:0}))})),
        };
      case GET_SHOE:
        return {
          ...state,
          shoe: {
            ...action.payload[0],
            stock:action.payload[0].stock.map( el => ({...el, quantity:0}))
          },
        };
        case GET_ONSALE:
      return {
        ...state,
        onSale: action.payload,
      };
      case GET_BRANDS:
        return {
          ...state,
          brands: action.payload,
        };
      case GET_BY_CATALOG_BRAND:
        return {
          ...state,
          catalogBrand: action.payload.map((e) => ({...e, stock:e.stock.map( el => ({...el, quantity:0}))})),
        };
      case GET_BY_NAME:
        return {
          ...state,
          name: action.payload,
        };
      case GET_BY_BRAND:
        return {
          ...state,
          filter: [...state.shoes].filter((e) =>
            e.brand?.includes(action.payload)
          ),
        };
      case GET_MORE_PRICE:
        return {
          ...state,
          catalogBrand: [...state.catalogBrand]
            .sort(function (a, b) {
              return (
                parseInt(b.price) -
                parseInt(a.price)
              );
            }),
        };
      case GET_LESS_PRICE:
        return {
          ...state,
          catalogBrand: [...state.catalogBrand]
            .sort(function (a, b) {
              return (
                parseInt(a.price) -
                parseInt(b.price)
              );
            }),
        };
      case GET_BY_COLOR:
        return{
          ...state, 
          catalogBrand: [...state.catalogBrand].filter(e => e.color === action.payload)
        }
      case POST_USER:
        return {
          ...state,
        };
      case CLEAN_SHOE:
        return{
          ...state,
          shoe: []
        }
    //////////////////////////////////////////////////////////////////////////////////////////
      case ADD_PRODUCT_CARRITO:
          return{
            ...state,
            productosCarrito: state.productosCarrito.concat(action.payload)
          };

      case DELETE_PRODUCT_CARRITO:
        return {
          ...state,
          productosCarrito: (state.productosCarrito = JSON.parse(
            localStorage.getItem("carrito")
          )),
        };
      case CLEAN_CART:
        return {
          ...state,
          productosCarrito: [],
        };
      case INCREMENT_TOTAL:
        return {
          ...state,
          totalCarrito: state.totalCarrito + action.payload,
          
        };
      case DECREMENT_TOTAL:
        return {
          ...state,
          totalCarrito: state.totalCarrito - action.payload,
        };
      case RESET_TOTAL:
        return {
          ...state,
          totalCarrito: 0,
        };
      case INCREMENT_QUANTITY:
        let productIncrement = state.productosCarrito.find(
          (e) => e._id === action.payload
        );
        let quantity = productIncrement.quantity + 1;
        productIncrement = { ...productIncrement, quantity: quantity };
        return {
          ...state,
          productosCarrito: state.productosCarrito.map((e) => {
            if (e._id === action.payload) return productIncrement;
            else return e;
          }),
        };
      case DECREMENT_QUANTITY:
        let productDecrement = state.productosCarrito.find(
          (e) => e._id === action.payload
        );
        let cantidad = productDecrement.quantity - 1;
        productDecrement = { ...productDecrement, quantity: cantidad };
        return {
          ...state,
          productosCarrito: state.productosCarrito.map((e) => {
            if (e._id === action.payload) return productDecrement;
            else return e;
          }),
        };
      /////////////////////////////////////////////////////////////////////////////////////////////////
      case GET_USERS:
        return {
          ...state,
          users: action.payload,
        };
      case GET_CLIENTS:
        return {
          ...state,
          clients: action.payload,
        };
        case GET_ORDER_CLIENT:
          return{
            ...state, 
            order: [...state.clients].filter(e => e.idPayment === action.payload)
          }
        case DELETE_SHOE:
          return{
            ...state, 
            shoes: [...state.shoes].filter(e => e._id !== action.payload)
          }
        case MODIF_SHOE:
          return{
            ...state, 
            shoes: [...state.shoes].filter(e => e._id === action.payload)
          }
        case CREATE_SIZE:
          return{
            ...state, 
            shoes: [...state.shoes].filter(e => e._id === action.payload)
          }
        case DELETE_BRAND:
          return{
            ...state, 
            brands: [...state.brands].filter(e => e._id !== action.payload)
          }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        case GET_REVIEWS:
          return{
            ...state,
            shoeReviews: action.payload
          }
        case GET_EXACT_REVIEW:
          return{
            ...state,
            myReview: action.payload
          }
          case POST_REVIEW:
          return {
            ...state,
            review: action.payload
          };
          case EDIT_REVIEW:
            return{
              ...state,
              review: {...state.review, ...action.payload}
            }
          case CLEAN_REVIEWS:
          return{
            ...state,
            review: {},
            shoeReviews: []
          }
        ////////////////////////////////////////////////////////////
          case GET_FAVORITES:
           const concatShoesFavs = (shoes, favs) => {
            const favShoes = [];
            for (let i = 0; i < shoes.length; i++) {
              const shoe = shoes[i];
              for (let j = 0; j < favs.length; j++) {
                const fav = favs[j];
                if (shoe._id === fav.shoeId) {
                 favShoes.push(shoe);
                }
              }
            }
            return favShoes;
          };
           return{
             ...state,
             favorites: concatShoesFavs(state.shoes, action.payload)
           }
          //////////////////////////////////////////////////////////
          case GET_USER_ORDERS:
           return{
            ...state,
            userOrders: action.payload
           }
          
          case GET_ORDER_ID:
           return{
            ...state,
            orderId: action.payload
           }
      default:
        return state;
    }
}

export default reducerApp;