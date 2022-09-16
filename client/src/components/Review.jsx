import React, {useState, useEffect} from "react";
import { UserAuth } from "../context/AuthContext"
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { postReview, getExactReview, getReviews } from '../redux/actions/actions';
import Swal from "sweetalert2";

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <div className="">
    <FaStar color={selected ? "yellow" : "grey"} onClick={onSelect} />
  </div>
);


const Review = (props) => {
    const userId = UserAuth()?.user?.uid
    const shoeId = props.id
    const [review, setReview] = useState('')

    const dispatch = useDispatch()
    const totalStars = 5 
    const [selectedStars, setSelectedStars] = useState(0);

    const rating = selectedStars

    const handleSubmit =  (e) => {
      e.preventDefault();
      review.length > 5 && rating !== 0
        ?  dispatch(postReview(userId, review, rating, shoeId)) &&
        Swal.fire({
          icon: 'success',
          title: 'Review created!',
          showConfirmButton: false,
          timer: 2000
        })  
        : Swal.fire({
          icon: 'error',
          title: 'Already reviewed!',
          showConfirmButton: false,
          timer: 2000
          })
    };

    const shoeReview = useSelector((state) => state.review)
    const shoeReviews = useSelector((state) => state.reviews)
    useEffect( () => {
      dispatch(getExactReview(shoeId, userId))
      dispatch(getReviews(shoeId))
      dispatch(postReview(userId, review, rating, shoeId))
    }, [dispatch])
    
    

  return (
  <>
  <div>
  <div className="flex flex-row pt-8 ">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p className="text-white flex flex-row text-xs font-light pt-1 pl-2">
        {selectedStars} of {totalStars} stars
      </p>
    </div>


    
  </div>
    {/* ////////////////////////////////////////////////////// */}
    <div className="container">
      <div className="row">
        <div className=" text-white col-12">
          <h2>Reviews</h2>
          <div>
            <h3>My review: </h3>
            {shoeReview ?
            <p className=" text-white" >- {shoeReview.review}</p>
            : null}
            </div>
          <h1>Add Review</h1>
          <form >
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control text-black"
                id="description"
                name="description"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <h3>ALL REVIEWS </h3>
            { shoeReviews ?
            shoeReviews.map(r =>
              <div>
            <p>USER: {r.idUser}</p>
            <p className=" text-white">REVIEW: {r.review}</p>
            <p>RATING: {r.rating} out of 5 starts</p>
            </div> 
            ):
            null
            }
            
           
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Review;
