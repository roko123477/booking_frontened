import axios from "axios";
import { Rate } from "antd";
import { slice } from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/profile.png";
import { UserContext } from "../UserContext";
const ReviewPages = () => {
  const { id } = useParams();
  const [review, setReviews] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);

  const { user } = useContext(UserContext);
  const reviews = slice(review, 0, index);

  const loadLess = () => {
    if (index >= 6) {
      setIndex(index - 6);
      console.log(index);
    }

    
    if (index < review.length) {
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }
  };
  const loadMore = () => {
    setIndex(index + 6);
     
    if (index >= review.length) {
      
      setIsCompleted(true);
      setIndex(index - 6);
    } else {
      setIsCompleted(false);
    }
  };
 
  
  useEffect(() => {
    if (id) {
      //  console.log(id);
      axios.post("/allreviews", { id }).then(({ data }) => {
        setReviews(data);
      });
    }
  }, [id]);
  // if(reviews.length>0){
  //   console.log(reviews);
  // }
  
  useEffect(() => {
   // console.log(index,review.length);
    if(review.length>0 && index>=review.length){
      setIsCompleted(true);
     // setIndex(index - 6);
    }
    if(index<=6)setIsCompleted(false);
  },[index])
  console.log(isCompleted);
  const handleDeleteReview = async (reviewId) => {
    axios
      .delete("/deletereview", { data: { reviewId } })
      .then(({ data }) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  console.log(review.length);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {reviews.length > 0 && (
          <h1 className="text-3xl underline font-medium title-font text-black mb-12 text-center">
            Reviews
          </h1>
        )}
        {reviews.length === 0 && (
          <h1 className="text-3xl underline font-medium title-font text-black mb-12 text-center">
            No Reviews to Show
          </h1>
        )}
        <div className="flex flex-wrap -m-6">
          {reviews.length > 0 &&
            reviews.map((rev, i) => (
              <div key={i} className="p-4 md:w-1/2 lg:w-1/3 w-full">
                <div className="h-full relative bg-white p-4 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-gray-500 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <Rate
                    allowHalf={true}
                    disabled
                    style={{ fontSize: "30px", color: "#3792cb" }}
                    defaultValue={rev.starValue}
                  />
                  <p className="leading-relaxed mb-6 text-xl">{rev.review}</p>
                  <a className="inline-flex items-center">
                    <img
                      src={rev.owner.file || avatar}
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />

                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">
                        By {rev.owner.firstname} {rev.owner.lastname}
                      </span>
                    </span>
                  </a>

                  {rev.owner._id === user._id && (
                    <button
                      onClick={() => handleDeleteReview(rev._id)}
                      className="bg-gray-100 inline-block rounded-2xl absolute bottom-0 right-0 mx-3 my-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#3792cb"
                        className="w-7 h-7"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}

                  {/*  */}
                </div>
              </div>
            ))}
        </div>
        {reviews.length !== 0 &&(
          <div className="flex flex-col text-white items-center my-8">
          {isCompleted ? (
            <button
              onClick={loadLess}
              type="button"
              className="bg-gray-500 flex gap-2 rounded-2xl p-2 text-white"
            >
              Load less{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={loadMore}
              type="button"
              className="bg-gray-500 flex gap-2 rounded-2xl p-2 text-white"
            >
              Load More{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
              </svg>
            </button>
          )}
        </div>
        )}
        
      </div>
    </section>
  );
};

export default ReviewPages;
