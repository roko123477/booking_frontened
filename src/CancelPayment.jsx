import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CancelPayment = () => {
  const [placeId, setPlaceId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  const handleClick = async () => {
    const { data } = await axios.get(`/booking/${id}`);
    setPlaceId(data.placeId);
    setRedirect(true);
  };
  if (redirect) {
    return (<Navigate to={`/place/${placeId}`} />);
  }
  return (
    <div>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Sorry, your payment was unsuccessful
                </h1>
                <p className="my-10 text-gray-800">
                  Go Back to your booking place
                </p>
                <button
                  onClick={handleClick}
                  className="sm:w-xl lg:w-auto -my-96 border rounded md py-4 px-8 text-center bg-primary text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 my-2"
                >
                  Take me there!
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
