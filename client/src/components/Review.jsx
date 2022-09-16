import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  postReview,
  //getExactReview,
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
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const totalStars = 5;
  const [selectedStars, setSelectedStars] = useState(0);
  const [editForm, setEditForm] = useState(false);

  const rating = selectedStars;

  //const myShoeReview = useSelector((state) => state.myReview);
  const reviews = useSelector((state) => state.shoeReviews);

  useEffect(() => {
    //dispatch(getExactReview(shoeId, idUser));
    dispatch(getReviews(shoeId));
    return () => {
      dispatch(cleanReviews());
    };
  }, [dispatch, shoeId]);

  async function handleDelete(r) {
    await dispatch(deleteReview(r._id));
    navigate("/");
  }

  async function handleEdit(r) {
    console.log();
    await dispatch(editReview(r._id, updateReview, rating));
    navigate("/");
  }

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
      <div className="container">
        <div className="row">
          <div className=" text-white col-12">
            <h2>Reviews</h2>
            <div>
              <h1>Add Review</h1>
              <form
                onSubmit={() =>
                  dispatch(postReview(idUser, review, rating, shoeId))
                }
              >
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <h3>ALL REVIEWS </h3>
            {reviews.length > 0 ? (
              reviews.map((r) => {
                return (
                  <div>
                    {editForm && r.idUser === idUser ? (
                      <form>
                        <div className="form-group flex flex-row">
                          <label htmlFor="descriptionUpdate">
                            Update description
                          </label>
                          <input
                            type="text"
                            className="form-control text-black"
                            id="descriptionUpdate"
                            name="descriptionUpdate"
                            value={updateReview}
                            onChange={(e) => setUpdateReview(e.target.value)}
                          />
                          <p className="text-red-400">
                            Don't forget to rate it
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          
                          onClick={() => handleEdit(r)}
                        >
                          SEND EDIT
                        </button>
                      </form>
                    ) : (
                      <>
                        <p>USER: {r.idUser}</p>
                        <p className=" text-white">REVIEW: {r.review}</p>
                        <p>RATING: {r.rating} out of 5 starts</p>
                        {r.idUser === idUser ? (
                          <>
                            <button onClick={() => setEditForm(true)}>
                              EDIT
                            </button>
                            <button onClick={() => handleDelete(r)}>
                              DELETE
                            </button>
                          </>
                        ) : null}
                      </>
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