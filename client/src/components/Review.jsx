import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  postReview,
  getReviews,
  cleanReviews,
  editReview,
  deleteReview,
} from "../redux/actions/actions";

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <div className="">
    <FaStar color={selected ? "yellow" : "grey"} onClick={onSelect} />
  </div>
);

const Review = (props) => {
  const idUser = UserAuth()?.user?.uid;
  const shoeId = props.id;
  const [review, setReview] = useState("");
  const [updateReview, setUpdateReview] = useState("");
  const [error, setError]= useState('')
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const totalStars = 5;
  const [selectedStars, setSelectedStars] = useState(1);
  const [editForm, setEditForm] = useState(false);

  const rating = selectedStars;

  const reviews = useSelector((state) => state.shoeReviews);

  useEffect(() => {
    dispatch(getReviews(shoeId));
    return () => {
      dispatch(cleanReviews());
    };
  }, [dispatch, shoeId]);

  useEffect(() => {
    review.length < 5 ? setError('Review must contain at least 5 characters.') : setError('')
    rating === 0 ? setError("Rating can't be 0") : setError('')
}, [review])  
  
  async function handleDelete(r) {
    await dispatch(deleteReview(r._id));
    window.location.reload();
  }

  async function handleEdit(r) {
    console.log();
    await dispatch(editReview(r._id, updateReview, rating));
    window.location.reload();
  }

  return (
    <>
      <div className="container ">
      <div>
        <div className=" text-white col-12 ">
        {idUser ?  
          <div className="mt-20 ">
            <h1>ADD REVIEW</h1>
            <div>
              <div className="flex flex-row py-4 ">
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
            <form onSubmit={() => dispatch(postReview(idUser, review, rating, shoeId))}>
              <div className="form-group">
              {error !== '' ? <p>ERROR: {error}</p> : null}
                <label className="flex flex-row">Description:</label>
                <textarea
                  type="text"
                  className="form-control text-black rounded-md h-[80px]"
                  id="description"
                  name="description"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Message"
                />
              </div>
              {error === '' ? <button type="submit" className='text-black border bg-[#00ff01] border-[#00ff01] mt-2'>SUBMIT</button> : <p>CHECK FOR ERRORS</p>}
            </form>
            </div>
            : <p> LOG IN TO REVIEW IT</p>
            }
          <h3 className="mt-7">ALL REVIEWS </h3>
          {reviews.length > 0 ? (
            reviews.map((r) => {
              return (
                <div className="w-[400px] mt-6 mb-5 rounded border border-[#00ff01]">
                  {editForm && r.idUser === idUser ? (
                    <form>
                      <div className="form-group flex flex-row">
                        <label htmlFor="descriptionUpdate">
                          Update description
                        </label>
                        <input
                          type="text"
                          className="form-control text-black rounded-md"
                          id="descriptionUpdate"
                          name="descriptionUpdate"
                          value={updateReview}
                          onChange={(e) => setUpdateReview(e.target.value)}
                        />
                        <p className="text-red-500 font-extrabold">
                          Don't forget to rate it
                        </p>
                      </div>
                      <div className='flex flex-row justify-evenly mt-2'>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(r)}
                        >
                          SEND EDIT
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => setEditForm(false)}
                        >
                          CANCEL EDIT
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      {r.idUser === idUser ? (
                        <h3>MY REVIEW</h3>
                      ) : (
                        <p> ANONYMOUS USER </p>
                      )}
                      <div className="lg:w-4/5 flex flex-wrap">
                        <p className=" text-white">REVIEW: {r.review}</p>
                      </div>
                      <p>RATING: {r.rating} out of 5 stars</p>
                      {r.idUser === idUser ? (
                        <div className="flex flex-row justify-evenly mt-2">
                          <button onClick={() => setEditForm(true)}>
                            EDIT
                          </button>
                          <button onClick={() => handleDelete(r)}>
                            DELETE
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>NO REVIEWS YET</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Review;
