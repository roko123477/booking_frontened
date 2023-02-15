import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from "./UserContext";


const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const[redirect,setRedirect] = useState("");
  const{user}=useContext(UserContext);

  useEffect(()=>{
    if(user){
      setName(user.name);
    }
  },[user]) 

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const bookThisPlace=async()=>{
    const data={checkIn,checkOut,numberOfGuests,name,phone:mobile,place:place._id,price:(numberOfNights*place.price),}
    const response=await axios.post('/booking',data);
    const bookingId=response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if(redirect){
    return <Navigate to={redirect} />
  }
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: &#8377;{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label htmlFor="">Check In:</label>
            <input
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
        {numberOfNights > 0 && (
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

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <>
            <span> &#8377;{numberOfNights * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
