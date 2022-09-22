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
      <tr className="bg-gray-50">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{users.email}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {users.idUser}
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{users?.createdAt.slice(0,10)}</td>
        <td className="px-4 py-3 text-sm">{users.status}</td>
        <td className="px-4 py-3 text-sm capitalize">{users.manager.toString()}</td>
        <td className="px-4 py-3 text-sm"><button className="w-8 h-8" onClick={handleStatusDisable}><FaUserAltSlash/></button></td>
        <td className="px-4 py-3 text-sm"><button className="w-8 h-8" onClick={handleStatusEnable}><FaUserAlt/></button></td>
        <td className="px-4 py-3 text-sm"><button className="w-8 h-8" onClick={handleManager}><FaUsersCog/></button></td>
      </tr>
    </>
  );
}

export default Users;
