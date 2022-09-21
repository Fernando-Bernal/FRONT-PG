import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrderId } from '../redux/actions/actions';
import { useParams } from "react-router-dom";
import NavBar from './NavBar';

function Order() {
  const orderId = useSelector(state => state.orderId)
  let params = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderId(params?.idPayment))
    return () => {
    dispatch(getOrderId())
  }
  }, [])

  return (
  <>
  <NavBar/>
  <div className='text-white mt-44 border border-[#00ff01] w-[700px] ml-[570px]'>
    <h2 className="text-center font-bold text-lg text-[#00ff01] mt-2">ORDER</h2>
    <h2 className="text-center font-bold text-lg">{orderId.idPayment}</h2>
    <hr className='border border-[#00ff01] my-2'/>
    <div className='text-center'>
      <h2 className="text-center font-bold text-lg text-[#00ff01]">DETAIL</h2>
      <h3 className='mb-3 font-bold my-2'>SHOES</h3>
      {orderId.shoe?.map(shoe => <><p className='capitalize'>Name: {shoe.name}</p>
      <p>Quantity: {shoe.quantity}</p>
      <p>Price: {shoe.price}</p>
      <p>Size: {shoe.size}</p>
      </>)}
    </div>
    <div className='text-center'>
      <h3 className='mt-3 mb-1 font-bold'>Status</h3>
      <p>{orderId.status}</p>
      <h3 className='mb-1 font-bold mt-4'>Date</h3>
      <p>{orderId.date?.slice(0,10)}</p>
    </div>
    <div className='text-center'>
      <h3 className='mb-1 mt-4 font-bold'>Total</h3>
      <p className='mb-4'>{orderId.amount}</p>
    </div>
    </div>
    </>
  )
}

export default Order