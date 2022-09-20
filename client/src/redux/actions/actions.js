import axios from 'axios'

export const GET_SHOES = 'GET_SHOES'
export const GET_SHOE = 'GET_SHOE'
export const GET_BRANDS = 'GET_BRANDS'
export const GET_BY_NAME = 'GET_BY_NAME'
export const GET_BY_BRAND = 'GET_BY_BRAND'
export const GET_BY_CATALOG_BRAND = 'GET_BY_CATALOG_BRAND'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_ONE_FROM_CART = 'ADD_ONE_FROM_CART'
export const POST_USER = 'POST_USER'
export const GET_MORE_PRICE = 'GET_MORE_PRICE'
export const GET_LESS_PRICE = 'GET_LESS_PRICE'
export const GET_BY_COLOR = 'GET_BY_COLOR'
export const CLEAN_SHOE = 'CLEAN_SHOE';
export const GET_ONSALE = 'GET_ONSALE'
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ADD_PRODUCT_CARRITO = 'ADD_PRODUCT_CARRITO';
export const DELETE_PRODUCT_CARRITO = 'DELETE_PRODUCT_CARRITO';
export const INCREMENT_TOTAL = 'INCREMENT_TOTAL';
export const DECREMENT_TOTAL = 'DECREMENT_TOTAL';
export const RESET_TOTAL = 'RESET_TOTAL';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const CLEAN_CART = 'CLEAN_CART';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_USERS = 'GET_USERS'
export const GET_CLIENTS = 'GET_CLIENTS'
export const GET_ORDER_CLIENT = 'GET_ORDER_CLIENT'
export const DELETE_SHOE = 'DELETE_SHOE'
export const MODIF_SHOE = 'MODIF_SHOE'
export const GET_ORDER_DETAIL = 'GET_ORDER_DETAIL'
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_REVIEWS = "GET_REVIEWS"
export const GET_EXACT_REVIEW = "GET_EXACT_REVIEW"
export const POST_REVIEW = "POST_REVIEW"
export const EDIT_REVIEW = "EDIT_REVIEW"
export const CLEAN_REVIEWS = "CLEAN_REVIEWS"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const DELETE_BRAND = 'DELETE_BRAND'


export const getShoes = () => (dispatch)=>{
    return axios('https://sneakers-back-end.herokuapp.com/shoes')
                    .then(res => dispatch({type: 'GET_SHOES', payload: res.data}))
}

export const getShoe = (id) => (dispatch)=>{
    return axios(`https://sneakers-back-end.herokuapp.com/shoes/${id}`)
                    .then(res => dispatch({type: 'GET_SHOE', payload: res.data}))
}

export const getOnSale = () => (dispatch)=>{
    return axios("http://localhost:3001/shoes/onSale")
        .then(res=> dispatch({type: "GET_ONSALE", payload: res.data}))
}

export const getBrands = () => (dispatch)=>{
    return axios(`https://sneakers-back-end.herokuapp.com/brands`)
                    .then(res => dispatch({type: 'GET_BRANDS', payload: res.data})) 
}

export const getByName = (name) => (dispatch)=>{
    return axios(`https://sneakers-back-end.herokuapp.com/shoes?name=${name}`)
                    .then(res => dispatch({type: 'GET_BY_NAME', payload: res.data})) 
}

export const getByCatalogBrand = (brand) => (dispatch)=>{
    return axios(`https://sneakers-back-end.herokuapp.com/shoes?brand=${brand}`)
                    .then(res => dispatch({type: 'GET_BY_CATALOG_BRAND', payload: res.data})) 
}

export const getByBrand = (brand) =>{
    return {
        type: 'GET_BY_BRAND',
        payload: brand
    } 
}

export const getMorePrice = () => {
    return {
            type: 'GET_MORE_PRICE'
    }   
}
export const getLessPrice = () => {
    return {
            type: 'GET_LESS_PRICE'
    }   
}

export const getByColor = (value) => {
    return {
        type: 'GET_BY_COLOR',
        payload: value
    }   
}

export function postUser(value) {
    return async function (dispatch) {
        const create = await axios.post(
            `https://sneakers-back-end.herokuapp.com/users`,
            value
        );
        return dispatch({
        type: "POST_USER",
        payload: create,
        });
    };
}

export function cleanShoe() {
    return {
        type: 'CLEAN_SHOE',
        payload: {}
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addProductCarrito = (data) => {
    localStorageCarrito(data, true)
    return { type: ADD_PRODUCT_CARRITO, payload: data }
}

export const deleteProductCarrito = (_id) => {
    let carritoProducts = getProductsCarrito();
    carritoProducts = carritoProducts.filter(e => e._id !== _id);
    localStorageCarrito(carritoProducts, false);
    return { type: DELETE_PRODUCT_CARRITO, payload: null }
}

export const incrementTotal = (data) => {
    return { type: INCREMENT_TOTAL, payload: data }
}

export const decrementTotal = (data) => {
    return { type: DECREMENT_TOTAL, payload: data }
}

export const resetTotal = () => {
    return { type: RESET_TOTAL, payload: 0 }
}

export const incrementeQuantity = (_id) => {
    return { type: INCREMENT_QUANTITY, payload: _id }
}

export const decrementeQuantity = (_id) => {
    return { type: DECREMENT_QUANTITY, payload: _id }
}

export const limpiarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify([]));
    return { type: CLEAN_CART, payload: null }
}

function getProductsCarrito() {
    let storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito === null) return storedCarrito = []
    else return JSON.parse(storedCarrito);
}

function localStorageCarrito(data, add) {
    if (add) {
        let listCarrito = getProductsCarrito();
        listCarrito.push(data)
        localStorage.setItem('carrito', JSON.stringify(listCarrito));
    } else {
        localStorage.setItem('carrito', JSON.stringify(data));
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const getUsers = () => (dispatch)=>{
    return axios('https://sneakers-back-end.herokuapp.com/users')
                    .then(res => dispatch({type: 'GET_USERS', payload: res.data}))
}

export const getClients = () => (dispatch)=>{
    return axios('https://sneakers-back-end.herokuapp.com/cart')
                    .then(res => dispatch({type: 'GET_CLIENTS', payload: res.data}))
}

export const getOrderClient = (order)=>{
    return {
        type: 'GET_ORDER_CLIENT',
        payload: order
    }
}

export const deleteShoe = (shoe)=>{
    return {
        type: 'DELETE_SHOE',
        payload: shoe
    }
}
export const modifShoe = (shoe)=>{
    return {
        type: 'MODIF_SHOE',
        payload: shoe
    }
}

export const getOrderDetail = (email) => (dispatch) => {
    return axios(`https://sneakers-back-end.herokuapp.com/users/email/${email}`)
        .then(res => dispatch({type: 'GET_ORDER_DETAIL', payload: res.data}))
}   
//////////////////////////////////////////////////////////////////////////////////////////////////////


export const getReviews = (shoeId) => (dispatch)=>{
    return axios(`http://localhost:3001/reviews/${shoeId}`)
        .then(res => dispatch({type: 'GET_REVIEWS', payload: res.data}))
}

export const getExactReview = (shoeId, idUser) => (dispatch) => {
    return axios(`http://localhost:3001/reviews/${shoeId}`, {idUser : idUser})
        .then(res => dispatch({type: 'GET_EXACT_REVIEW', payload: res.data}))
}

export function postReview(idUser, review, rating, shoeId) {
    return async function (dispatch) {
    const create = axios.post(`http://localhost:3001/reviews/${shoeId}`, { idUser: idUser, review: review, rating: rating })
        return dispatch({
        type: 'POST_REVIEW',
        payload: create,
        });
    };
}

export const editReview = (idReview, review, rating) => (dispatch) =>{
    return axios.put(`http://localhost:3001/reviews/exact/${idReview}`, {review, rating })
    .then(res => dispatch({type: 'EDIT_REVIEW', payload: res.data}))
}

export const deleteReview = (idReview) => (dispatch) => {
    return axios.delete(`http://localhost:3001/reviews/exact/${idReview}`)
    .then(res => dispatch({type: 'DELETE_REVIEW', payload: {}}))
}

export function cleanReviews() {
return {
    type: 'CLEAN_REVIEWS',
    payload: {}
}
}

export const deleteBrand = (brand)=>{
    return {
        type: 'DELETE_BRAND',
        payload: brand
    }
}
