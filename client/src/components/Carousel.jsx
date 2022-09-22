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
      <div className="px-4 pt-2 pb-2 relative flex justify-center items-center bg-black">
        {length > 0 ?<><BsArrowLeftSquareFill
          onClick={prevSlide}
          className="absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer left-[15%] hover:opacity-60 z-40"
        />
        <BsArrowRightSquareFill
          onClick={nextSlide}
          className="absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer right-[15%] hover:opacity-60 z-40"
        />
        </> : null}
        {length > 0
          ? saleShoes.map((shoe, index) => (
              <div className='relative mt-10'>
                {index === slide && (
                  <Link to={`/products/${shoe._id}`}>
                    <p className="z-40 absolute bottom-0 capitalize font-semibold text-xl">{shoe.name}</p>
                    <p className="z-40 absolute top-0 right-10 uppercase font-bold">{shoe.brand}</p>
                    <p className="z-40 absolute top-10 right-10 uppercase font-bold text-red-600 text-2xl">SALE ${shoe.price}</p>
                    <img
                      className="rounded-lg object-fill h-[400px] w-[700px] cursor-pointer transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
                      src={shoe.image}
                      alt={shoe.name}
                    />
                  </Link>
                )}
              </div>
            ))
          : <img alt = "Winter sale banner" src = {Banner} className='h-[400px] w-[700px]'/>}
      </div>
    </div>
  );
};

export default Carousel;