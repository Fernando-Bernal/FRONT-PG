import { Link } from "react-router-dom";
import { GiConverseShoe } from "react-icons/gi";

function clients({ clients }) {
    return (
      <>
      
        <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
          <td className="px-4 py-3">
            <div className="flex items-center text-sm">
              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  alt=""
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 rounded-full shadow-inner"
                  aria-hidden="true"
                ></div>
              </div>
              <div>
                <p className="font-semibold">{clients.email}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {clients.idUser}
                </p>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-sm">pm_1Lhy4qFNV3brqOrQsCdHHSJz</td>
          <td className="px-4 py-3 text-sm">$775.45</td>
          <td className="px-4 py-3 text-sm">{clients.createdAt}</td>
          <td className="px-4 py-3 text-sm">Pending</td>
          <td className="px-4 py-3 text-sm"><Link to={'/orders'}><GiConverseShoe/><GiConverseShoe/></Link></td>
        </tr>
      </>
    );
  }
  
  export default clients;