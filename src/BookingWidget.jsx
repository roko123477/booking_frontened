import React, { useContext, useEffect } from "react";
//import PropTypes from "prop-types";
//import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
//import { differenceInCalendarDays } from "date-fns";
//import { format } from "date-fns";

import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
// import Isauthor from "./Isauthor";

const BookingWidget = ({ place }) => {
  // let dateBetween = true;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookings, setBookings] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  // const [redirect, setRedirect] = useState("");
  // const [dateBetween, setDateBetween] = useState(false);
  const [numberOfNights, setNumberofnights] = useState(1000000000);
  //  let numberOfNights = 0;
  //  if (checkIn && checkOut) {
  //   numberOfNights=(
  //      differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  //    );

  //  console.log(numberOfNights);
  //}
  const { user } = useContext(UserContext);
  const isAuthor = JSON.stringify(user._id) === JSON.stringify(place.owner);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      axios
        .post("/check-same-date", {
          checkIn,
          checkOut,
          userId: user._id,
          placeId: place._id,
        })
        .then((response) => {
          console.log(response);
          setNumberofnights(response.data.noofnights);
        })
        .catch((err) => console.log(err));
    }
  }, [checkOut, checkIn]);

  const bookThisPlace = async () => {
    // else {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone: mobile,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/booking", data);
    // console.log(response);
    window.location.href = response.data.url;
    // }

    //  console.log(dateBetween);
  };
  // console.log(numberOfNights);
  if (isAuthor) {
    return <Navigate to={"/isauthor"} />;
  }
  // if (redirect) {
  //   return <Navigate to={redirect} />;
  // }
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: &#8377;{place.price} / per night
      </div>
      <div className="bg-primary text-center mt-2 rounded-2xl mx-12 text-white">
        Pick a date range to book
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label htmlFor="">Check In:</label>
            <input
              className="cursor-pointer"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label htmlFor="">Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="">Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && numberOfNights !== 1000000000 && (
          <div className="py-3 px-4 border-t">
            <label htmlFor="">Your Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
            />
            <label htmlFor="">Phone Number:</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>
      {numberOfNights <= 0 && (
        <span className="bg-primary text-white py-2 px-1 my-3 rounded-xl">
          you have already booked between these dates
        </span>
      )}
      {numberOfNights > 0 && numberOfNights !== 1000000000 && (
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
          {numberOfNights > 0 && (
            <>
              <span> for &#8377;{numberOfNights * place.price}</span>
            </>
          )}
        </button>
        //  </StripeCheckout>
      )}
    </div>
  );
};

export default BookingWidget;
