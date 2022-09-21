import { FaUserAltSlash, FaUserAlt, FaUsersCog } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/actions";

function Users({ users }) {
  const dispatch = useDispatch()

  const handleStatusDisable = async()=>{
    const { data } = await axios.put(
      `https://sneakers-back-end.herokuapp.com/users/${users._id}`,
      {
        status: "Disabled"
      }
      );
    dispatch(getUsers())
  }

  const handleStatusEnable = async()=>{
    const { data } = await axios.put(
      `https://sneakers-back-end.herokuapp.com/users/${users._id}`,
      {
        status: "Enabled"
      }
    );
    dispatch(getUsers())
  }

  const handleManager = async()=>{
    const { data } = await axios.put(
      `https://sneakers-back-end.herokuapp.com/users/${users._id}`,
      {
        manager: users.manager === true ? false : true
      }
    );
    dispatch(getUsers())
  }

  return (
    <>
      <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            {/* <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
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
            </div> */}
            <div>
              <p className="font-semibold">{users.email}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {users.idUser}
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{users.createdAt}</td>
        <td className="px-4 py-3 text-sm">{users.status}</td>
        <td className="px-4 py-3 text-sm">{users.manager.toString()}</td>
        <td className="px-4 py-3 text-sm"><button className="w-8 h-8" onClick={handleStatusDisable}><FaUserAltSlash/></button></td>
        <td className="px-4 py-3 text-sm"><button className="w-8 h-8" onClick={handleStatusEnable}><FaUserAlt/></button></td>
        <td className="px-4 py-3 text-sm"><button className="w-8 h-8" onClick={handleManager}><FaUsersCog/></button></td>
      </tr>
    </>
  );
}

export default Users;
