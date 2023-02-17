import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BookingDates from "../BookingDates";
import Header from "../Header";
import AddressLink from "./../AddressLink";
import PlaceGallery from "./../PlaceGallery";

const BookingPage = () => {
  const [booking, setBooking] = useState(null);
  const[redirect,setRedirect]=useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  const handleClick = async() => {
    const response=await axios.delete(`/booking/delete/${id}`,);

    if(response.data){
      setRedirect(true);
    }
  }
  console.log(redirect);
  if(redirect){
    return <Navigate to={"/account/bookings"} />
  }
  return (
    <div className="py-4">
      <Header />
      <div className="container mx-auto">
        <div className="my-8">
          <Link to={"/account/bookings"} className="text-3xl">
            {booking.place.title}
          </Link>
          <AddressLink className="my-4  block">
            {booking.place.address}
          </AddressLink>
          <div onClick={handleClick} className="">
          <span className="w-60 mx-2 flex bg-gray-200 rounded-2xl text-2xl p-2 m-2 cursor-pointer">
            Cancel Booking
            <button
              // onClick={handleleClick(place._id)}
              className="cursor-pointer   text-white bg-primary  rounded-2xl py-1 px-1 mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </span>
        </div>
          <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            <div className="">
              <h2 className="text-2xl mb-4">Your booking information</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="bg-primary py-7 px-10 text-white rounded-2xl">
              <div className="">Total Price</div>
              <div className="text-2xl"> &#8377;{booking.price}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place} />
          <div className="bg-gray-200  mt-3 rounded-2xl px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {booking.place.extraInfo.substring(0,700)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
