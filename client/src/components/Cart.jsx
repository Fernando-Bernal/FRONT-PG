import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { limpiarCarrito, resetTotal } from "../redux/actions/actions";
import { AiFillDelete } from "react-icons/ai";
import CardCarrito from "./CardCarrito";
import NavBar from "./NavBar";
import Checkout from "./Checkout";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productosCarrito);
  const subTotal = useSelector((state=> state.totalCarrito));

  useEffect(() => {
    
    return () => dispatch(resetTotal());  
  },[]);

  return (
    <div>
      <NavBar />
      <div>
        <div className="py-12">
          <div className="max-w-md mx-auto bg-[#0E1011] shadow-lg rounded-lg  md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium text-white">Shopping Cart</h1>
                    <div className="flex justify-between items-center mt-6 pt-6">
                      {products?.length === 0 ? (
                        <div>
                          {dispatch(resetTotal()) && <h1 className="text-white">No has agregado productos al carrito... </h1>}
                        </div>
                      ) : (
                        <div>
                          
                              {products && products?.map((e) => (
                                <CardCarrito key={e._id} shoe={e} />
                              ))}
                            
                    <div className="flex items-center justify-end">
                      <button className="flex flex-row items-center h-8" onClick={()=>dispatch(limpiarCarrito())}><AiFillDelete/> <AiFillDelete/> <AiFillDelete/></button>
                    </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-6 border-t">
                      <div className="flex items-center">
                        <Link to={`/`}>
                          <span className="text-md  font-medium text-blue-500">
                            Continue Shopping
                          </span>
                        </Link>
                      </div>

                      <div className="flex justify-center items-end">
                        <span className="text-sm font-medium text-gray-400 mr-1">
                          Subtotal:
                        </span>
                        <span className="text-lg font-bold text-white">
                          ${subTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Checkout products={products} subTotal={subTotal}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
