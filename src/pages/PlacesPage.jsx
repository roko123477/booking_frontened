import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import Header from "../Header";
import PlaceImg from "../PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [dupplaces, setDupPlaces] = useState([]);
  //  console.log(places);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
      setDupPlaces(data);
    });
  }, []);
  const handlePlaces = (place)=>{
    if(place==""){
      setPlaces(dupplaces);
    }
    else{
   // console.log(place);
    const newPlace=dupplaces.filter(thisplace => thisplace.title.toLowerCase().includes(place.toLowerCase()));
    setPlaces(newPlace);
    }
  }
//img
  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header getPlaces={handlePlaces} searchBy={"Search By Title"}/>
      <div>
        <AccountNav />

        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 &&
            places.map((place, i) => (
              <Link
                to={"/account/places/" + place._id}
                key={i}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-3 mx-auto container"
              >
                <div className="flex w-32 h-32 bg-gray-300 rounded-2xl grow shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-2xl text">{place.title}</h2>
                  <p className="text-lg mt-2 text-gray-800">{place.description}</p>
                </div>
              </Link>
            ))}
          {/* {places.length > 0 &&
            places.map((place, i) => (
              <>
                <div className="relative left-full -mx-6">
                  
                </div>
              </>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
