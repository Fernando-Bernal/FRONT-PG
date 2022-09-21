import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { SiFirebase, SiStripe } from "react-icons/si";
import { GiRunningShoe } from "react-icons/gi";
import { IoIosCreate } from "react-icons/io";
import { getBrands, getClients, getShoes, getUsers } from '../../redux/actions/actions'
import Swal from "sweetalert2";
import Users from './Users'
import Clients from './Clients';
import Products from './Products';
import Brands from './Brands';

function Admin() {
    const dispatch = useDispatch()
    const users = useSelector((state)=> state.users)
    const clients = useSelector((state)=> state.clients)
    const products = useSelector((state)=> state.shoes)
    const brands = useSelector((state)=> state.brands)
    const {user, logout} = UserAuth()
    const navigate = useNavigate()
    const [superAdmin, superSetAdmin] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [currentPageClients, setCurrentPageClients] = useState(0)
    const [currentPageProducts, setCurrentPageProducts] = useState(0)
    const [currentPageBrands, setCurrentPageBrands] = useState(0)

    const userSuperAdmin = ()=>{
        if(user?.email === 'luismfalco8@gmail.com' && user?.uid === 'eAuEIixgTwfhUcz7hFOTTbOQQxY2' ||
            user?.email === 'marioelkamui@gmail.com' && user?.uid === 'mXfXQunp6gNgqnLrqpnPwHYcKEQ2'){
        superSetAdmin(true)
        }else{
        superSetAdmin(false)
        }
    }

    let clientsShoe = clients?.map(e=>e.shoe.length)
    let orders = clientsShoe?.reduce((pv,cv)=> pv + cv,0)

    let clientsAmount = clients.map(e=> e.amount/100)
    let sales = clientsAmount?.reduce((pv,cv)=> pv + cv,0)

    useEffect(()=>{
        if(users.length){
            setCurrentPage(0)
        }
    },[users])

    const prevPage = ()=>{
        if(currentPage < 5){
            setCurrentPage(0)
        }else{
            setCurrentPage(currentPage - 4)
        }
    }

    const nextPage = ()=>{
        if(users.length <= currentPage + 4){
            setCurrentPage(currentPage)
        }else{
            setCurrentPage(currentPage + 4)
        }
    }
    
    useEffect(()=>{
        if(clients.length){
            setCurrentPageClients(0)
        }
    },[clients])

    const prevPageClients = ()=>{
        if(currentPageClients < 5){
            setCurrentPageClients(0)
        }else{
            setCurrentPageClients(currentPageClients - 4)
        }
    }

    const nextPageClients = ()=>{
        if(clients.length <= currentPageClients + 4){
            setCurrentPageClients(currentPageClients)
        }else{
            setCurrentPageClients(currentPageClients + 4)
        }
    }

    useEffect(()=>{
        if(products.length){
            setCurrentPageProducts(0)
        }
        },[])
    
        const prevPageProducts = ()=>{
        if(currentPageProducts < 7){
            setCurrentPageProducts(0)
        }else{
            setCurrentPageProducts(currentPageProducts - 6)
        }
        }

        const nextPageProducts = ()=>{
        if(products.length <= currentPageProducts + 6){
            setCurrentPageProducts(currentPageProducts)
        }else{
            setCurrentPageProducts(currentPageProducts + 6)
        }
        }

        useEffect(()=>{
        if(brands.length){
            setCurrentPageBrands(0)
        }
        },[])
    
        const prevPageBrands = ()=>{
        if(currentPageBrands < 5){
            setCurrentPageBrands(0)
        }else{
            setCurrentPageBrands(currentPageBrands - 4)
        }
        }
    
        const nextPageBrands = ()=>{
        if(brands.length <= currentPageBrands + 4){
            setCurrentPageBrands(currentPageBrands)
        }else{
            setCurrentPageBrands(currentPageBrands + 4)
        }
        }

    const usersPage = users.slice(currentPage, currentPage + 4)
    const clientsPage = clients.slice(currentPageClients, currentPageClients + 4)
    const productsPage = products.slice(currentPageProducts, currentPageProducts + 6)
    const brandsPage = brands.slice(currentPageBrands, currentPageBrands + 4)

    const resultUsers =  usersPage.length + currentPage
    const resultClients =  clientsPage.length + currentPageClients
    const resultProducts =  productsPage.length + currentPageProducts
    const resultBrands =  brandsPage.length + currentPageBrands

    useEffect(()=>{
        userSuperAdmin()
        },[])

    useEffect(()=>{
        dispatch(getUsers())
        dispatch(getClients())
        dispatch(getShoes())
        dispatch(getBrands())
    },[])

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
            Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'You logout',
            showConfirmButton: false,
            timer: 3000
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    return ( 
        <div>
                {/*-- Header --*/}
                <div className="fixed w-full flex items-center justify-between bg-gray-800 h-14 text-white z-10">
                    <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
                    <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
                    <span className="hidden md:block">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center h-14 bg-blue-800 dark:bg-gray-800 header-right">
                    <ul className="flex items-center">
                        <li>
                        {superAdmin &&
                            <a href='https://stripe.com/es-us'>
                                <button className="flex items-center py-1 hover:text-blue-100 mr-4">
                                    <span className="inline-flex mr-1">
                                    <SiStripe/>
                                    </span>
                                    Stripe
                                </button>
                            </a>
                        }
                        </li>
                        <li>
                        {superAdmin &&
                            <a href='https://firebase.google.com/'>
                                <button className="flex items-center py-1 hover:text-blue-100">
                                    <span className="inline-flex mr-1">
                                    <SiFirebase/>
                                    </span>
                                    Firebase
                                </button>
                            </a>
                        }
                        </li>
                        <li>
                        <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
                        </li>
                        <li>
                        <button onClick={handleLogout} className="flex items-center mr-4 py-1 hover:text-blue-100">
                            <span className="inline-flex mr-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </span>
                            Logout
                        </button>
                        </li>
                    </ul>
                    </div>
                </div>
                {/*-- ./Header --*/}
                <div className="bg-opacity-50 py-40">
                <div className="container mx-auto max-w-4xl shadow-md md:w-3/4 border bg-green-800 rounded-lg">
                    {/*-- Statistics Cards --*/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                        <Link to={'/createshoes'}>
                            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                {/*<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>*/}
                                <GiRunningShoe className='stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out'/>
                                </div>
                                <div className="text-right">
                                <p className="text-2xl">Create shoes</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={'/createbrand'}>
                            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                                {/*<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>*/}
                                <IoIosCreate className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"/>
                                </div>
                                <div className="text-right">
                                <p className="text-2xl">Create brand</p>
                                </div>
                            </div>
                        </Link>
                    <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div className="text-right">
                        <p className="text-2xl">{orders}</p>
                        <p>Orders</p>
                        </div>
                    </div>
                    <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        </div>
                        <div className="text-right">
                        <p className="text-2xl">$ {sales}</p>
                        <p>Sales</p>
                        </div>
                    </div>
                    
                    </div>
                    {/*-- /Statistics Cards --*/}
                    
                    {/*-- Users Table --*/}
                    <div className="my-4 mx-4">
                            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                                <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th className="px-4 py-3">Users</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Admin</th>
                                        <th className="px-4 py-3">Disable</th>
                                        <th className="px-4 py-3">Enable</th>
                                        <th className="px-4 py-3">Admin</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {usersPage?.map(e =>  <Users 
                                                key={e._id}
                                                users={e}
                                            />)}
                                    </tbody>
                                </table>
                                </div>
                                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3"> Showing {resultUsers} of {users.length} </span>
                                <span className="col-span-2"></span>
                        {/*-- Pagination --*/}
                            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous" onClick={prevPage}>
                                        <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next" onClick={nextPage}>
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                </ul>
                                </nav>
                            </span>
                            </div>
                            </div>
                        </div>

                    {/*-- Clients Table --*/}
                    <div className="my-4 mx-4">
                            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                                <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th className="px-4 py-3">Clients</th>
                                        <th className="px-4 py-3">Stripe</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Order</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Edit</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {clientsPage?.map(e =>  <Clients 
                                                key={e._id}
                                                clients={e}
                                            />)}
                                    </tbody>
                                </table>
                                </div>
                                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3"> Showing {resultClients} of {clients.length} </span>
                                <span className="col-span-2"></span>
                        {/*-- Pagination --*/}
                            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous" onClick={prevPageClients}>
                                        <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next" onClick={nextPageClients}>
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                </ul>
                                </nav>
                            </span>
                            </div>
                            </div>
                        </div>

                    {/*-- Products Table --*/}
                    <div className="my-4 mx-4">
                            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                                <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th className="px-4 py-3">Products</th>
                                        <th className="px-4 py-3">brand</th>
                                        <th className="px-4 py-3">OnSale</th>
                                        <th className="px-4 py-3">edit</th>
                                        <th className="px-4 py-3">delete</th>
                                        <th className="px-4 py-3">onSale</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {productsPage?.map(e =>  <Products 
                                                key={e._id}
                                                products={e}
                                            />)}
                                    </tbody>
                                </table>
                                </div>
                                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3"> Showing {resultProducts} of {products.length} </span>
                                <span className="col-span-2"></span>
                        {/*-- Pagination --*/}
                            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous" onClick={prevPageProducts}>
                                        <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next" onClick={nextPageProducts}>
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                </ul>
                                </nav>
                            </span>
                            </div>
                            </div>
                        </div>

                    {/*-- Brands Table --*/}
                    <div className="my-4 mx-4">
                            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                                <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th className="px-4 py-3">Brands</th>
                                        <th className="px-4 py-3">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {brandsPage?.map(e =>  <Brands 
                                                key={e._id}
                                                brands={e}
                                            />)}
                                    </tbody>
                                </table>
                                </div>
                                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3"> Showing {resultBrands} of {brands.length} </span>
                                <span className="col-span-2"></span>
                        {/*-- Pagination --*/}
                            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous" onClick={prevPageBrands}>
                                        <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                    <li>
                                    <button className="px-3 py-1 mx-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next" onClick={nextPageBrands}>
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    </li>
                                </ul>
                                </nav>
                            </span>
                            </div>
                            </div>
                        </div>
                </div>
                </div>
        </div>
        );
}

export default Admin;