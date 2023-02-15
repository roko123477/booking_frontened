import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingDates from "../BookingDates";
import Header from "../Header";
import AddressLink from "./../AddressLink";
import PlaceGallery from "./../PlaceGallery";

const BookingPage = () => {
  const [booking, setBooking] = useState(null);
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
  return (
    <div className="py-4">
      <Header />
      <div className="container mx-auto">
        <div className="my-8">
          <Link to={"/account/bookings"} className="text-3xl">
            {booking.place.title}
          </Link>
          <AddressLink className="my-2 block">
            {booking.place.address}
          </AddressLink>
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
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
