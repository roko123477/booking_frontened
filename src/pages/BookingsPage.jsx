import React, { useState } from "react";
import AccountNav from "../AccountNav";
import { useEffect } from "react";

import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
import Header from "../Header";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [dupbookings, setDupBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
      setDupBookings(response.data);
    });
  }, []);

  const handlePlaces = (place)=>{
    if(place==""){
      setBookings(dupbookings);
    }
    else{
   // console.log(place);
    const newBook=dupbookings.filter(thisplace => thisplace.place.title.toLowerCase().includes(place.toLowerCase()));
    setBookings(newBook);
    }
  }
  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header getPlaces={handlePlaces} searchBy={"Search By Title"}/>

      <div className="container mx-auto">
        <AccountNav />
        <div className="">
          {bookings?.length > 0 &&
            bookings.map((booking, i) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-10 bg-gray-100 rounded-2xl overflow-hidden"
                key={i}
              >
                <div className="w-48">
                  <PlaceImg
                    place={booking.place}
                    className="mx-2 rounded-xl my-2"
                  />
                </div>
                <div className="py-3 grow pr-3">
                  <h2 className="text-xl">{booking.place.title}</h2>

                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-4 text-gray-500"
                    />
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-2xl">
                        Total price: &#8377;{booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
