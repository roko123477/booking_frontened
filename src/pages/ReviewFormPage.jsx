import { Rate, Button, Modal } from "antd";
import axios from "axios";
import { useContext } from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
import { UserContext } from "../UserContext";

// import { Link } from 'react-router-dom';
const ReviewFormPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  //.5<==less value but >.5==>.5 value until next no crosses
  const [value, setValue] = useState(2.999);
  const [staticvalue, setStaticValue] = useState(0);
  const [noofusers, setNoOfUsers] = useState(0);
  const [review, setReview] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user);

  useEffect(() => {
    axios.post("/getavgstarvalues", { id }).then(({ data }) => {
   //   console.log(data.avg);
      setStaticValue(data.avg);
      setNoOfUsers(data.users);
    });
  }, [id, staticvalue]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (e) => {
    e.preventDefault();
    console.log(value, review, id, user._id);
    const { data } = await axios.post("/reviews", {
      starValue: value,
      review,
      placeId: id,
      userId: user._id,
    });
    
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setReview("");
      setValue(2.5);
      setConfirmLoading(false);
      window.location.reload();
    }, 2000);
    
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
 // console.log(user);
  return (
    <div className="flex items-center gap-2 text-white">
      {staticvalue!==0 && (
      <Rate
        allowHalf={true}
        disabled
        style={{ fontSize: "10px", color: "white" }}
        onChange={setStaticValue}
        value={staticvalue}
      />
      )}
      {noofusers>0 &&(
        <>
      ({noofusers} user {noofusers===1?"review":"reviews"})
      <button
        onClick={showModal}
        className="underline inline-flex bg-transparent text-white"
        to={"/"}
      >
       
        Write a review
      </button>
      </> )}
      {noofusers===0 && <button
        onClick={showModal}
        className="underline inline-flex bg-transparent text-white"
        to={"/"}
      >
       
        Write your first review
      </button>}
      <Modal
        title="Submit your review"
        open={open}
        onOk={handleOk}
        okText={"submit"}
        okButtonProps={{ ghost: true }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <Rate
            style={{ fontSize: "40px" }}
            tooltips={desc}
            onChange={setValue}
            value={value}
            allowHalf={true}
          />

          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="How is the place, what is famous here"
            id="description"
          ></textarea>
        </form>
      </Modal>
    </div>
  );
};
export default ReviewFormPage;
