import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOnSale } from '../redux/actions/actions';
import NavBar from './NavBar';
import Card from './Card';

function OnSale() {
  const dispatch = useDispatch();

  let onSale = useSelector((state) => state.onSale);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (onSale.length) {
      setCurrentPage(0);
    }
  }, [onSale]);

  const prevPage = () => {
    if (currentPage < 10) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 8);
    }
  };

  const nextPage = () => {
    if (onSale.length <= currentPage + 8) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 8);
    }
  };

  const onSalePage = onSale.slice(currentPage, currentPage + 8);

  useEffect(() => {
    dispatch(getOnSale());
  }, [dispatch]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center bg-black">
        <span className="text-[#00ff01] text-3xl font-semibold text-center py-2 mx-auto uppercase">
          ON SALE!
        </span>
        <div className="">
          <div className="grid grid-cols-4 gap-y-2 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
            {onSalePage?.map((e) => (
              <Card key={e._id} id={e._id} shoe={e} />
            ))}
          </div>
        </div>
        <div className="m-4">
          <button className="mx-2" onClick={prevPage}>Previous</button>
          <button className="mx-2" onClick={nextPage}>Next</button>
        </div>
      </div>
    </>
  );
}

export default OnSale