import React, { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import Header from "../Header";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl text-black mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-800 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkOut,
      checkIn,
      maxGuests,
      price,
    };
    if (id) {
      //FIXME:update place

      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //FIXME:new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  };
  
  const handleClick = async () => {
      const {data} = await axios.delete(`/user-places/delete/${id}`);
      if(data){
        setRedirect(true);
      }
    };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header />
      <div className="md:container md:mx-auto px-10">
        <AccountNav />
        {id && (<div onClick={handleClick} className="-mx-5">
          <span className="w-60 mx-2 flex bg-gray-500 rounded-2xl text-2xl p-2 m-2 cursor-pointer text-white">
            Delete this place
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
        </div>)}
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title, for example: My lovely apt"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          />
          {preInput("Photos", "more = better")}

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "description of the place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {preInput("Perks", "select all the perks of your place")}
          <Perks selected={perks} onChange={setPerks} />
          {preInput("Extra info", "house rules, etc")}
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          {preInput(
            "Check in&out times",
            "add check in and out times, remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                placeholder="11"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PlacesFormPage;
