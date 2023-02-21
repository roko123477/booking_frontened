import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BookingDates from "../BookingDates";
import Header from "../Header";
import AddressLink from "./../AddressLink";
import PlaceGallery from "./../PlaceGallery";

const BookingPage = () => {
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
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
  const handleClick = async () => {
    const response = await axios.delete(`/booking/delete/${id}`);

    if (response.data) {
      setRedirect(true);
    }
  };
  //console.log(redirect);
  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
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
            <span className="w-60 mx-2 flex bg-gray-500 rounded-2xl text-2xl text-white p-2 m-2 cursor-pointer">
              Cancel Booking
              <button
                // onClick={handleleClick(place._id)}
                className="cursor-pointer   text-white bg-primary  rounded-2xl py-1 px-1 mx-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
          <div className="bg-gray-500 text-white p-6 my-6 rounded-2xl flex items-center justify-between">
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
          <div className="bg-gray-500  mt-3 rounded-2xl px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl text-white">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-white leading-5">
              {booking.place.extraInfo.substring(0, 700)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
