import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from "react-select";
import Swal from "sweetalert2";
import {addProductCarrito} from '../redux/actions/actions'


const Card = ({shoe}) => {
  const dispatch = useDispatch()

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
        position: 'top-center',
        icon: 'error',
        title: 'Add size',
        showConfirmButton: false,
        timer: 3000
      })
      
    }else{
      dispatch(addProductCarrito(shoeToCart))
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your shoe add to cart',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  return (
    <div className="w-52 bg-black">
      <div className="max-w-2xl py-2 px-2 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-2">
        <div className="">
          <Link to={`/products/${shoe._id}`}>
          <div className="group relative cursor-pointer ">
            <div className="overflow-hidde group-hover:scale-105">
              <img
                src={shoe.image}
                alt={shoe.name}
                className="object-contain h-38 w-52 bg-black rounded-lg"
              />
            </div>
            <div className="mt-1 flex justify-between">
              <div>
                <p className="mt-1 text-sm text-white uppercase">{shoe.brand}</p>
                <h3 className="text-sm text-bold text-[#00ff01] capitalize">{shoe.name}</h3>
                 <p className="my-1 text-md text-white">{shoe.onSale ? <><span class="bg-red-500  text-white font-medium border border-red-700 rounded">ON SALE</span> ${shoe.price} </>: `$${shoe.price}` }</p>
              </div>             
            </div>
          </div>
          </Link>
          <div className='mt-1 flex flex-row mx-auto items-center justify-between'>
            <button className="p-1.5 text-md" onClick={toCart}>BUY ME!</button>
            <Select options={options} placeholder="size" onChange={selectSize}/>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Card