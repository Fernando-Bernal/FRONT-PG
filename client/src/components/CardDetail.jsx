import React, { useEffect, useState } from 'react'
import { analytics } from '../firebase';
import {logEvent } from 'firebase/analytics'
import {MdFavorite} from 'react-icons/md'
import { IoMdHeartDislike }from 'react-icons/io'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { UserAuth } from "../context/AuthContext";
import Select from "react-select";
import Swal from "sweetalert2";
import { getShoe, addProductCarrito, cleanShoe, postFavorite, deleteFavorite, getFavorites } from '../redux/actions/actions';
import NavBar from './NavBar';
import Review from './Review';

const CardDetail = () => {
    const dispatch = useDispatch()
    const shoe = useSelector((state) => state.shoe)
    const shoeId = shoe?._id
    const favorites = useSelector((state) => state.favorites)
    const idUser = UserAuth()?.user?.uid;
    let { id } = useParams()
    const [shoeToCart, setShoeToCart] = useState({
      _id:'',
      name:'',
      image:'',
      quantity:0,
      price:null,
      size:null,
    })

    const options = shoe.stock?.map(e => ({value:e._id, label:e.size}))

    const selectSize = (e)=>{
      setShoeToCart({
        _id:shoe._id,
        name: shoe.name,
        image:shoe.image,
        quantity:1,
        price:shoe.price,
        size:e.label
      })
    }

    const toCart = (e)=>{
      if(shoeToCart.quantity === 0){
        e.preventDefault()
        Swal.fire({
          icon: 'error',
          title: 'Add size',
          showConfirmButton: false,
          timer: 3000
        })
        
      }else{
        dispatch(addProductCarrito(shoeToCart))
        Swal.fire({
          icon: 'success',
          title: 'Your shoe add to cart',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

    useEffect(() => {
      dispatch(getFavorites(idUser))
    }, [favorites])

    useEffect(()=>{
      dispatch(getFavorites(idUser))
      logEvent(analytics, 'shoe', {
        id: `${shoe._id}`,
        brand: `${shoe.brand}`,
        name: `${shoe.name}`
      })
    }, [])

    useEffect(() => {
      dispatch(getShoe(id));
      return () => {
        dispatch(cleanShoe())
    }
  }, [dispatch, id])

  const addFavorite = () => {
    dispatch(postFavorite(idUser, shoeId))
    Swal.fire({
      icon: 'success',
      title: 'Shoe added to Favorites',
      showConfirmButton: false,
      timer: 2000
    })
  }

  const removeFavorite = () => {
    dispatch(deleteFavorite(idUser, shoeId))
    Swal.fire({
      icon: 'success',
      title: 'Shoe removed from Favorites',
      showConfirmButton: false,
      timer: 2000
    })
  }

  return (
    <>
    <NavBar/>
    {shoe.name ?
    <div className="">
      <div className="px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img className="lg:w-1/3 w-auto h-auto rounded-lg" src={shoe.image} alt={shoe.name}/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-[#00ff01] text-3xl font-md mb-1 capitalize">{shoe.name}</h1>
              <h2 className="text-sm uppercase text-white">{shoe.brand}</h2>
                <div className="flex mb-4">
        </div>
        <p className='text-white'>{shoe.description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 mb-5">
          <div className="flex">
            <span className="mr-3 text-white">{shoe.color}</span>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <Select options={options} placeholder="Select size" onChange={selectSize}/>
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <span className="title-font font-medium text-2xl text-white">${shoe.price}</span>
        <Link to="/">
            <button className="border py-2 px-6">BACK HOME</button>
        </Link>
          <Link to={`/cart`}> 
            <button className="flex ml-auto border py-2 px-6" onClick={toCart}>BUY ME!</button>
          </Link>
          {favorites.length > 0 && favorites.find(shoe => shoe._id === shoeId) ?
            null
          : <button className="rounded-full w-10 h-10 border inline-flex items-center justify-center ml-4" onClick={addFavorite}>
          <MdFavorite/>
        </button>
          }
        {favorites.length > 0 && favorites.find(shoe => shoe._id === shoeId) ?
        <button className="rounded-full w-10 h-10 border inline-flex items-center justify-center ml-4 bg-[#e04747] border-[#de3030]" onClick={removeFavorite}>
        <IoMdHeartDislike/>
        </button>
        : null        
        }
        </div>
      </div>
      <Review id={id}/>
    </div>
  </div>
</div>
  : <h1 className="text-white text-center text-3xl mt-80"> LOADING...</h1>}
</>
  )
}

export default CardDetail