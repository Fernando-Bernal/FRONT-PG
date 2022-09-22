import React, {useState} from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getShoes } from '../redux/actions/actions';

function Catalog(){
  const dispatch = useDispatch()

  let shoes = useSelector(state => state.filter);

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(()=>{
    if(shoes.length){
        setCurrentPage(0)
    }
  },[shoes])

  const prevPage = ()=>{
    if(currentPage < 7){
        setCurrentPage(0)
    }else{
        setCurrentPage(currentPage - 6)
    }
  }

  const nextPage = ()=>{
    if(shoes.length <= currentPage + 6){
        setCurrentPage(currentPage)
    }else{
        setCurrentPage(currentPage + 6)
    }
  }

  const shoesPage = shoes.slice(currentPage, currentPage + 6)

  useEffect(()=>{
    dispatch(getShoes())
  },[dispatch])

  return (
    <div className="bg-black">
      <div className='m-2 flex justify-center items-center pt-10'>
        {currentPage === 0 ? null :
        <div><button onClick={prevPage}>
          Previous
        </button></div>}
        <div className="text-[#00ff01] text-3xl font-semibold text-center pb-2 mx-5">COLLECTION</div>
        <div><button onClick={nextPage}>
        Next
      </button></div>
      </div>
      <div className="container pb-2">
          <div className="grid grid-cols-6 gap-y-2 gap-x-2 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-2">
            {shoesPage.map(e => 
              <Card 
                key= {e._id} 
                id = {e._id}
                shoe= {e}
              />
            )}
          </div>
      </div>
    </div>
  )
}

export default Catalog;