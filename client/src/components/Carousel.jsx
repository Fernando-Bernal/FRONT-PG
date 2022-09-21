import React, { useState, useEffect } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOnSale } from "../redux/actions/actions";
import Banner from "../images/winter_sale.png"

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const dispatch = useDispatch();
  const onSale = useSelector((state)=> state.onSale);
  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };
  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };
  const onSaleShoes = (onSale) => {
    let counter = 0;
    let priceShoes = onSale.sort(function (a, b) {
      return parseInt(a.price) - parseInt(b.price);
    });
    let shoes = [];
    while (counter < onSale.length) {
      shoes.push(priceShoes[counter]);
      counter = counter + 1;
    }
    return shoes;
  };

  let saleShoes = onSaleShoes(onSale);
  let length = saleShoes.length;

  useEffect(() => {
    dispatch(getOnSale())
  }, [dispatch])

  return (
    <div>
      <h1 className="text-[#00ff01] flex justify-center items-center bg-black py-4 font-bold text-3xl">
        Big Sale!!!
      </h1>
      <div className="px-4 pt-2 pb-2 relative flex justify-center items-center bg-black">
        {length > 0 ?<><BsArrowLeftSquareFill
          onClick={prevSlide}
          className="absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer left-12 hover:opacity-60"
        />
        <BsArrowRightSquareFill
          onClick={nextSlide}
          className="absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer right-12 hover:opacity-60"
        />
        </> : null}
        {length > 0
          ? saleShoes.map((shoe, index) => (
              <div className={index === slide ? "opacity-100" : "opacity-0"}>
                {index === slide && (
                  <Link to={`/products/${shoe._id}`}>
                    <img
                      className="rounded-lg object-fill h-[400px] w-[700px] cursor-pointer hover:opacity-60"
                      src={shoe.image}
                      alt="x"
                    />
                  </Link>
                )}
              </div>
            ))
          : <img alt = "img not found" src = {Banner} className='h-[400px] w-[700px]'/>}
      </div>
    </div>
  );
};

export default Carousel;