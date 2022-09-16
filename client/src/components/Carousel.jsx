import React, {useState} from 'react'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'

const sliderImg = [
  {
    url: 'http://desempacados.com/wp-content/uploads/2016/01/sneaker-coleccion-basicos-desempacados.jpg'
  },
  {
    url: 'https://i.pinimg.com/474x/31/c4/d4/31c4d4f33c4836088956fcf9c3960d79.jpg'
  },
  {
    url: 'https://www.allcitycanvas.com/wp-content/uploads/2018/12/Air-Jordan-Union-1200-1.jpg'
  }
]

const Carousel = () => {
  const [slide, setSlide] = useState(0)
  const length = sliderImg.length

  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1)
  }
  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide -1)
  }
  
  return (
    <div>
    <h1 className='text-[#00ff01] flex justify-center items-center bg-black py-4 font-bold text-xl'>New Arrivals!</h1>
    <div className='px-4 pt-2 pb-2 relative flex justify-center items-center bg-black'>
      <BsArrowLeftSquareFill onClick={prevSlide} className='absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer left-12 hover:opacity-60'/>
      <BsArrowRightSquareFill onClick={nextSlide} className='absolute top-[50%] text-4xl text-[#00ff01] cursor-pointer right-12 hover:opacity-60'/>
      {sliderImg.map((item, index) => (
        <div className={index === slide ? 'opacity-100' : 'opacity-0'} key={item.url}>
          {index === slide && (<img className='rounded-lg object-cover h-[400px] w-[1000px] cursor-pointer hover:opacity-60' src={item.url} alt="x" />)}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Carousel