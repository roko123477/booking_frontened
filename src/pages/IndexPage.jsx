import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Header from "../Header";
 import { useContext } from "react";
import { UserContext } from "../UserContext";

const IndexPage = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [duplicatePlaces, setDuptPlaces] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
      setDuptPlaces(response.data);
    });
  }, []);
  const handlePlaces = (place) => {
    if (place == "") {
      setPlaces(duplicatePlaces);
    } else {
      // console.log(place);
      const newPlace = duplicatePlaces.filter((thisplace) =>
        thisplace.address.toLowerCase().includes(place.toLowerCase())
      );
      setPlaces(newPlace);
    }
  };
  
  const handleClick=(id)=>{
    console.log(user);
    if(user){
      navigate (`/place/${id}`); 
    }
    else{
      navigate (`/login`); 
    }
  }
  return (
    <div className="py-4">
      <Header getPlaces={handlePlaces} searchBy={"Search By Places"} />
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {places.length > 0 &&
          places.map((place, i) => (
            <div onClick={()=>handleClick(place._id)} className="cursor-pointer" key={i}>
              <div className="bg-gray-300 mb-2 rounded-2xl flex">
                {/* //swiper */}
                <Swiper
                  // style={{to={"/place/" + place._id} 
                  //   "--swiper-navigation-color": "#d7f3fa",
                  //   "--swiper-navigation-size": "25px",
                  //   "--swiper-pagination-color": "#d7f3fa",
                  //   "--swiper-pagination-bullet-inactive-color": "#999999",
                  //   "--swiper-pagination-bullet-inactive-opacity": "1",
                  // }}
                  className="swiperjs-container"
                  spaceBetween={30}
                  speed={1000}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                >
                  {place.photos &&
                    place.photos.map((photo, i) => (
                      <SwiperSlide key={i}>
                        <img
                          className="rounded-2xl object-cover aspect-square"
                          src={photo.url}
                          alt=""
                        />
                      </SwiperSlide>
                    ))}
                  {/* //end */}
                </Swiper>
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="">
                <span className="font-bold">₹{place.price}</span> per night
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;
