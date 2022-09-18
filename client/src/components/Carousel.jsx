import React, { useState, useEffect } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const allShoes = useSelector((state) => state.allShoes);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };
  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };
  const expensiveShoes = (allShoes) => {
    let counter = 0;
    let allShoesDB = allShoes;
    let priceShoes = allShoesDB.sort(function (a, b) {
      return parseInt(b.price) - parseInt(a.price);
    });
    let shoes = [];
    while (counter < 5) {
      shoes.push(priceShoes[counter]);
      counter = counter + 1;
    }
    return shoes;
  };

  let expShoes = expensiveShoes(allShoes);
  let length = expShoes.length;
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 1500);
  }, []);
  
  return (
    <div>
      <h1 className="text-[#00ff01] flex justify-center items-center bg-black py-4 font-bold text-xl">
        The most wanted! ($Pricey$)
      </h1>
      <div className="px-4 pt-2 pb-2 relative flex justify-center items-center bg-black">
        <BsArrowLeftSquareFill
          onClick={prevSlide}
          className="absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer left-12 hover:opacity-60"
        />
        <BsArrowRightSquareFill
          onClick={nextSlide}
          className="absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer right-12 hover:opacity-60"
        />
        {isDisplayed
          ? expShoes.map((shoe, index) => (
              <div className={index === slide ? "opacity-100" : "opacity-0"}>
                {index === slide && (
                  <Link to={`/products/${shoe._id}`}>
                    <img
                      className="rounded-lg object-cover h-[400px] w-[1000px] cursor-pointer hover:opacity-60"
                      src={shoe.image}
                      alt="x"
                    />
                  </Link>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Carousel;