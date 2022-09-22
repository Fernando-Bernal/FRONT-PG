import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  getShoes,
} from "../redux/actions/actions";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import Card from "./Card";

function Favorites() {
  const dispatch = useDispatch();
  const idUser = UserAuth()?.user?.uid;
  let favorites = useSelector((state) => state.favorites);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getShoes());
    dispatch(getFavorites(idUser));
  }, []);

  useEffect(() => {
    if (favorites.length) {
      setCurrentPage(0);
    }
  }, [favorites]);

  const prevPage = () => {
    if (currentPage < 10) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 8);
    }
  };

  const nextPage = () => {
    if (favorites.length <= currentPage + 8) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 8);
    }
  };

  const favoritesPage = favorites.slice(currentPage, currentPage + 8);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center bg-black">
        <span className="text-[#00ff01] text-3xl font-semibold text-center py-2 mx-auto uppercase">
          MY FAVORITES!
        </span>
        <div className="">
          <div className="grid grid-cols-4 gap-y-2 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
            {favoritesPage?.map((e) => (
              <Card key={e._id} id={e._id} shoe={e} />
            ))}
          </div>
        </div>
        <div className="m-4">
          <button className="mx-2" onClick={prevPage}>
            Previous
          </button>
          <button className="mx-2" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Favorites;
