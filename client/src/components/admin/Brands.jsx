import axios from "axios";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteBrand } from "../../redux/actions/actions";

function Brands({ brands }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete brand!'
  }).then(async(result) => {
    if (result.isConfirmed) { 
        dispatch(deleteBrand(brands._id));
        await axios.delete(
          `https://sneakers-back-end.herokuapp.com/brands/${brands._id}`
        );
      Swal.fire(
        'Deleted!',
        'Your brand has been deleted.',
        'success'
      )
    }
  })
}
  

  return (
    <>
      <tr className="bg-gray-50 text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-bold uppercase">{brands.name}</p>
              <p className="text-xs text-gray-600">
                {brands._id}
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <button onClick={handleDelete} className="w-8 h-8">
            <AiFillDelete />
          </button>
        </td>
      </tr>
    </>
  );
}

export default Brands;
