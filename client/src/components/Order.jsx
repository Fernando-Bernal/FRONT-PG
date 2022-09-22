import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrderId } from '../redux/actions/actions';
import { useParams } from "react-router-dom";
import NavBar from './NavBar';
import { Link } from 'react-router-dom'

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
  <div className='text-white mt-44 border border-[#00ff01] w-[700px] ml-[620px]'>
    <h2 className="text-center font-bold text-lg text-[#00ff01] mt-2">ORDER</h2>
    <h2 className="text-center font-bold text-lg">{orderId.idPayment}</h2>
    <hr className='border border-[#00ff01] my-2'/>
    <div className='text-center'>
      <h2 className="text-center font-bold text-lg text-[#00ff01]">DETAIL</h2>
      <table className="w-full">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-[#00ff01] uppercase border-b border-[#00ff01]">
            <th className="px-4 py-3">shoes</th>
            <th className="px-4 py-3">quantity</th>
            <th className="px-4 py-3">size</th>
            <th className="px-4 py-3">price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#00ff01] border-b border-[#00ff01]">
        {orderId.shoe?.map(shoe => 
          <tr className="text-white">
            <td className="px-4 py-2">
            <div className="flex items-center text-sm">
              <img
                className="w-12 h-12 object-contain"
                src={shoe.image}
                alt=""
                loading="lazy"
              />
              <Link to={`/products/${shoe._id}`} className='hover:scale-105'><p className="font-bold ml-2 capitalize">{shoe.name}</p></Link>
            </div>
            </td>
            <td className="px-4 py-3 text-sm">{shoe.quantity}</td>
            <td className="px-4 py-3 text-sm">{shoe.size}</td>
            <td className="px-4 py-3 text-sm">{shoe.price}</td>
            </tr>
        )}
        </tbody>
      </table>
    </div>
    <div className='flex my-2 h-16 items-center justify-center'>
      <h3 className='font-bold text-[#00ff01]'>Status:</h3>
      <p className='ml-2 mr-8'>{orderId.status}</p>
      <h3 className='font-bold text-[#00ff01]'>Date:</h3>
      <p className='ml-2 mr-8'>{orderId.date?.slice(0,10)}</p>
      <h3 className='font-bold text-[#00ff01]'>Total:</h3>
      <p className='ml-2'>${orderId?.amount/100}</p>
    </div>
  </div>
  <div className='flex justify-center mt-4'>
    <Link to='/account'><button className='h-[60px] w-[160px] py-4 mx-6'>Back Account</button></Link>
    <Link to='/'><button className='h-[60px] w-[160px] py-4 mx-6'>Back Home</button></Link>
    <Link to='/contactUs'><button className='h-[60px] w-[160px] py-4 mx-6'>Some Problem?</button></Link>
  </div>
  </>
  )
}






export default Order