import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

function Orders() {

  const order = useSelector((state)=> state.order)

  return (
    <div>
      <div className="py-40 text-white">
        <div className="mx-auto max-w-2xl md:w-3/4 border border-[#00ff01] rounded-lg">
          <p className="flex items-center text-2xl font-bold justify-center text-[#00ff01] my-2">ORDER</p>
          <p className="flex items-center text-xs font-semibold justify-center">Stripe: {order[0].idPayment}</p>
          <p className="flex items-center text-xs font-semibold justify-center">Client: {order[0].email}</p>
          <div className='text-center'>
            <table className="w-full mt-2">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-[#00ff01] uppercase border-b border-[#00ff01]">
                  <th className="px-4 py-3">shoes</th>
                  <th className="px-4 py-3">quantity</th>
                  <th className="px-4 py-3">size</th>
                  <th className="px-4 py-3">price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00ff01]">
                {order[0]?.shoe.map(e => 
                <tr className="text-white">
                <td className="px-4 py-2">
                <div className="flex items-center text-sm">
                  <img
                  className="w-12 h-12 object-contain"
                  src={e.image}
                  alt=""
                  loading="lazy"
                  />
                  <p className="font-bold text-center ml-4 capitalize">{e.name}</p>
                </div>
                </td>
                <td className="px-4 py-3 text-sm">{e.quantity}</td>
                <td className="px-4 py-3 text-sm">{e.size}</td>
                <td className="px-4 py-3 text-sm">{e.price}</td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to='/admin'><button className="py-3 w-64 text-xl rounded-2xl mx-1">
            Back to Admin
          </button></Link>
        </div>
      </div>
    </div>
  );
}



export default Orders;
