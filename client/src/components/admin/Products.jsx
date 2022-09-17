import { Link } from "react-router-dom";
import axios from "axios";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";

function Products({ products }) {


    const handleDelete = async()=>{
         await axios.delete(`https://sneakers-back-end.herokuapp.com/shoes/${products._id}`)
    }
 

    return (
      <>
        <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
          <td className="px-4 py-3">
            <div className="flex items-center text-sm">
              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img
                  className="w-12 h-12 object-contain rounded"
                  src={products.image}
                  alt=""
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 rounded-full shadow-inner"
                  aria-hidden="true"
                ></div>
              </div>
              <div>
                <p className="font-bold">{products.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {products._id}
                </p>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-sm">{products.brand}</td>
          <td className="px-4 py-3 text-sm"><button className="w-8 h-8"><AiTwotoneEdit/></button></td>
          <td className="px-4 py-3 text-sm"><button onClick={handleDelete} className="w-8 h-8"><AiFillDelete/></button></td>
          {/* <td className="px-4 py-3 text-sm">Pending</td>
          <td className="px-4 py-3 text-sm"><Link to={'/orders'}>a</Link></td> */}
        </tr>
      </>
    );
  }
  
  export default Products;
