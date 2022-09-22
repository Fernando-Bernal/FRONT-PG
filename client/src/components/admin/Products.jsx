import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { MdLocalOffer, MdCreateNewFolder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteShoe, modifShoe, getShoes, createSize } from "../../redux/actions/actions";

function Products({ products }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete shoe!'
  }).then(async(result) => {
    if (result.isConfirmed) { 
        dispatch(deleteShoe(products._id));
        await axios.delete(
          `https://sneakers-back-end.herokuapp.com/shoes/${products._id}`
        );
      Swal.fire(
        'Deleted!',
        'Your shoe has been deleted.',
        'success'
      )
    }
  })
}

const handleOnSale = async()=>{
  const { data } = await axios.put(
    `https://sneakers-back-end.herokuapp.com/admin/onsale/${products._id}`,
    {
      onSale: products.onSale === true ? false : true
    }
    );
    dispatch(getShoes())
  }
  

  return (
    <>
      <tr className="bg-gray-50 text-gray-700">
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
        <td className="px-4 py-3 text-sm uppercase">{products.brand}</td>
        <td className="px-4 py-3 text-sm capitalize">{products.onSale.toString()}</td>
        <td className="px-4 py-3 text-sm">
          <Link to={"/modifshoe"}>
            <button onClick={()=>dispatch(modifShoe(products._id))} className="w-8 h-8">
              <AiTwotoneEdit />
            </button>
          </Link>
        </td>
        <td className="px-4 py-3 text-sm">
          <Link to={"/createsize"}>
            <button onClick={()=>dispatch(createSize(products._id))} className="w-8 h-8">
              <MdCreateNewFolder />
            </button>
          </Link>
        </td>
        <td className="px-4 py-3 text-sm">
          <button onClick={handleOnSale} className="w-8 h-8">
            <MdLocalOffer />
          </button>
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

export default Products;
