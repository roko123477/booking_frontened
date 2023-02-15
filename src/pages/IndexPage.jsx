import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";


const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [duplicatePlaces, setDuptPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
      setDuptPlaces(response.data);
    });
  }, []);
  const handlePlaces = (place) => {
    if(place==""){
      setPlaces(duplicatePlaces);
    }
    else{
   // console.log(place);
    const newPlace=duplicatePlaces.filter(thisplace => thisplace.address.toLowerCase().includes(place.toLowerCase()));
    setPlaces(newPlace);
    }
  }
  return (
    <div className="py-4">
      <Header getPlaces={handlePlaces} searchBy={"Search By Address"}/>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {places.length > 0 &&
          places.map((place, i) => (
            <Link to={"/place/" + place._id} className="" key={i}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">₹{place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;
