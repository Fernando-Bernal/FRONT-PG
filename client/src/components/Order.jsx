import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrderId } from '../redux/actions/actions';
import { useParams } from "react-router-dom";

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
  <div className='text-white'>
   <hr className='border border-[#00ff01]' />
   <h2 className="text-center pt-4 font-bold text-lg">ORDER: {orderId.idPayment}</h2>
   <div className="w-full items-center p-4 columns-2">
   </div>
   <div className='text-center'>
     <h3 className='mb-3 font-bold'>SHOE</h3>
     {orderId.shoe?.map(shoe => <><p>NAME: {shoe.name}</p>
     <p>QUANTITY: {shoe.quantity}</p>
     <p>PRICE: {shoe.price}</p>
     <p>SIZE: {shoe.size}</p>
     </>)}
    </div>
    <div className='text-center'>
     <h3 className='mb-3 font-bold'>Status</h3>
     <p>{orderId.status}</p>
     <h3 className='mb-3 font-bold'>Date</h3>
     <p>{orderId.date?.slice(0,10)}</p>
    </div>
    <div className='text-center'>
     <h3 className='mb-3 font-bold'>Total</h3>
     <p>{orderId.amount}</p>
    </div>
   </div>
 )
}

export default Order