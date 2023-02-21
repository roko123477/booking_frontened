import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
// import PlacesPage from "./PlacesPage";
import convertToBase64 from "../Convert";
import AccountNav from "../AccountNav";
import Header from "../Header";
import styles1 from "./ProfilePage.module.css";
import styles from "./LoginPage.module.css";
import extend from "./Profile.module.css";
import avatar from "../assets/profile.png";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);

  const [redirect, setRedirect] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setUserid] = useState("");

  const [phone, setPhone] = useState("");
  const [file, setFile] = useState();
  
  useEffect(() => {
    if (user) {
      setUserid(user._id);
      axios
        .get(`/getuserdetails/${user._id}`)
        .then((response) => {
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setEmail(response.data.email);
          setPhone(response.data.phonenumber);
          setFile(response.data.file);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);
  // let { subpage } = useParams();
  // if (subpage === undefined) {
  //   subpage = "profile";
  // }

  if (!ready) {
    return "Loading...";
  }

  

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
  //  console.log(firstname,lastname,email,file,phone,id);
    try {
      const {data} = await axios.put("/profileupdate",{
        firstname,lastname,email,file,phone,id
      });
      console.log(data);
      alert("Profile updated successfully")
    } catch (error) {
      console.log(error);
    }
    
    
  }
  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header />
      <div>
        <AccountNav />

        <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div
              className={`${styles.glass} ${extend.glass}`}
              style={{ width: "50%" }}
            >
              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Profile</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                  You can update the details.
                </span>
              </div>

              <form className="py-1">
                <div className="profile flex justify-center py-4">
                  <label htmlFor="profile">
                    <img
                      src={file || avatar}
                      className={`${styles.profile_img} ${extend.profile_img}`}
                      alt="avatar"
                    />
                  </label>
                  <input
                    type="file"
                    onChange={onUpload}
                    id="profile"
                    name="profile"
                  />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                  <div className="name flex w-3/4 gap-10">
                    <input
                      className={`${styles.textbox} ${extend.textbox}`}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstname}
                      placeholder="FirstName"
                    />
                    <input
                      className={`${styles.textbox} ${extend.textbox}`}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastname}
                      placeholder="LastName"
                    />
                  </div>

                  <div className="name flex w-3/4 gap-10">
                    <input
                      className={`${styles.textbox} ${extend.textbox}`}
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="Mobile No."
                    />
                    <input
                      className={`${styles.textbox} ${extend.textbox}`}
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Email*"
                    />
                  </div>

                  <button onClick={handleUpdate} className={styles.btn} type="submit">
                    Update
                  </button>
                </div>

                <div className="text-center py-4">
                  <span className="text-gray-500">
                    come back later{" "}
                    <button
                      onClick={logout}
                      className="text-white bg-gray-500 rounded-2xl p-2 hover:bg-primary"
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
