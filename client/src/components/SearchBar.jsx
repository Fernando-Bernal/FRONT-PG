import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../redux/actions/actions";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  const dispatch = useDispatch();
  let name = useSelector((state) => state.name);

  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    getByName(value);
  };

  useEffect(() => {
    dispatch(getByName(value.toLocaleLowerCase()));
  }, [dispatch, value]);

  return (
    <div>
      <div className="flex">
        <button className="mr-4 px-8 py-4 text-xl" onClick={() => setShow(!show)}>
          <AiOutlineSearch />
        </button>
      </div>
      <>
      {
            show? <div className="w-full h-full fixed bottom-0 right-0 z-50">
        <div
          className="bg-gray-800 opacity-60 w-full h-full"
          onClick={() => setShow(!show)}
        />
        <div className="w-64 fixed right-0 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full overflow-y-scroll scroll scroll-smooth">
          <div className="flex flex-col justify-between h-full">
            <div className="border-b mb-2 border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-bold md:text2xl text-base pl-3 text-gray-800">
                      Sneaker Paradise
                    </p>
                  </div>
                  <div
                    id="cross"
                    className=" text-gray-800"
                    onClick={() => setShow(!show)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="border-t pb-4 border-gray-800">
                <div className="flex justify-center w-full mb-4 px-6 py-8">
                  <div className="relative w-full">
                    
                    <input
                      className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500 pl-10 py-2"
                      type="text"
                      placeholder="Search..."
                      onChange={handleChange}
                    />
                    <div className="relative flex items-center">
                      <div>
                      {typeof name !== "string" ? (
                        value &&
                        name?.map((e) => {
                          return (
                            <div>
                            <section key={e.id}>
                              <ul>
                                <li>
                                  <Link to={`/products/${e._id}`}>
                                    <article className="inline-block p-2 cursos-pointer hover:scale-105 ease-in-out duration-200 hover:bg-[#00ff01]">
                                      <img
                                        src={e.image}
                                        alt=""
                                        className="w-12 h-12 object-contain"
                                      />
                                      <div>
                                        <h3 className="text-sm font-semibold capitalize">
                                          {e.name}
                                        </h3>
                                        <p className="text-xs text-black">
                                          ${e.price}
                                        </p>
                                      </div>
                                    </article>
                                  </Link>
                                </li>
                              </ul>
                            </section>
                            </div>
                            
                            
                          );
                        })
                      ) : (
                        <h1>{name}</h1>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>:<span></span>
        
        }
    </>
      
    </div>
  );
}

export default SearchBar;
