import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { analytics } from '../firebase';
import {logEvent } from 'firebase/analytics';
import Select from "react-select";
import { getByCatalogBrand, getByColor, getLessPrice, getMorePrice } from "../redux/actions/actions";
import { useParams } from "react-router-dom";
import Card from "./Card";
import NavBar from "./NavBar";

function CatalogBrand() {
  const dispatch = useDispatch();

  let { brand } = useParams();

  let catalogBrand = useSelector((state) => state.catalogBrand);

  const [currentPage, setCurrentPage] = useState(0);

  const find = (e)=>{
    dispatch(getByColor(e.label)) 
  }

const options = catalogBrand.map(e => ({value:e._id, label:e.color}))
;

  useEffect(() => {
    if (catalogBrand.length) {
      setCurrentPage(0);
    }
  }, [catalogBrand]);

  const prevPage = () => {
    if (currentPage < 29) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 28);
    }
  };

  const nextPage = () => {
    if (catalogBrand.length <= currentPage + 28) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 28);
    }
  };

  const catalogBrandPage = catalogBrand.slice(currentPage, currentPage + 28);

  useEffect(()=>{
    logEvent(analytics,`${brand} |S.P|`)
  },[])

  useEffect(() => {
    dispatch(getByCatalogBrand(brand));
  }, [dispatch, brand]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center bg-black">
        <span className="text-[#00ff01] text-3xl font-semibold text-center py-2 mx-auto uppercase">
          {catalogBrandPage[0]?.brand}
        </span>
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <Select options={options} placeholder="Select Option"  onChange={find}/>
          </div>
          <button className='mx-2'  onClick={() => dispatch(getMorePrice())}> Price $$$ </button>
          <button className='mx-2'  onClick={() => dispatch(getLessPrice())}> Price $ </button>
          <button className='mx-2'  onClick={() => dispatch(getByCatalogBrand(brand))}> All models </button>
        </div>
        <div className="">
          <div className="grid grid-cols-4 gap-y-2 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
            {catalogBrandPage?.map((e) => (
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

export default CatalogBrand;
