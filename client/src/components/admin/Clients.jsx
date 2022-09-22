import { Link } from "react-router-dom";
import axios from "axios";
import { GiConverseShoe } from "react-icons/gi";
import { AiTwotoneEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getClients, getOrderClient } from "../../redux/actions/actions";

function Clients({ clients }) {
  const dispatch = useDispatch();

  
  const handleStatus = async()=>{
      const { data } = await axios.put(
      `https://sneakers-back-end.herokuapp.com/cart/order/${clients.idPayment}`,
      {
        status: clients.status === "Pending" ? "Received" : "Pending"
      }
      );
      dispatch(getClients())
    }

  return (
    <>
      <tr className="bg-gray-50 text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{clients.email}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {clients._id}
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{clients.idPayment}</td>
        <td className="px-4 py-3 text-sm">$ {clients.amount / 100}</td>
        <td className="px-4 py-3 text-sm">{clients?.date.slice(0,10)}</td>
        <td className="px-4 py-3 text-sm">
          <Link to={"/orders"}>
            <button className="w-8 h-8" onClick={() => dispatch(getOrderClient(clients.idPayment))}>
              <GiConverseShoe />
            </button>
          </Link>
        </td>
        <td className="px-4 py-3 text-sm">{clients.status}</td>
        <td className="px-4 py-3 text-sm">
            <button className="w-8 h-8" onClick={handleStatus}>
              <AiTwotoneEdit />
            </button>
        </td>
      </tr>
    </>
  );
}

export default Clients;
