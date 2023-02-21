import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AccountNav from "./AccountNav";
import Header from "./Header";
import styles from "./pages/LoginPage.module.css";
import { UserContext } from "./UserContext";

const PasswordChange = () => {
  const { ready, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [otp, setOtp] = useState("");
  //const [id, setId] = useState("");

  // useEffect(() => {
  //   if (user && ready1) {
  //     setId(user._id);
  //   }
  // }, [user]);
 // console.log(id);
  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(`/verifyotp`, { params: { otp } });

    if (data) {

      setRedirect(true);
    } else {
      alert("invalid otp try again");
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (user) {
      axios.get(`/generateotp/${user._id}`).then((response) => {
        if(response){
          alert("otp generated successfully check your inbox");
        }
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/password"} />;
  }

  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header />
      <div>
        <AccountNav/>
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>
              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Password Change</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                  Click on generate OTP
                </span>
              </div>

              <form className="pt-20">
                <div className="textbox flex flex-col items-center gap-6">
                  <div className="input text-center">
                    <span className="py-4 text-sm text-left text-gray-500">
                      Enter 6 digit OTP sent to your email address
                    </span>
                    <input
                      className={styles.textbox}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type="text"
                      placeholder="OTP"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className={styles.btn}
                    type="submit"
                  >
                    Validate OTP
                  </button>
                </div>

                <div className="text-center py-4">
                  <span className="text-gray-500">
                    Can't Get OTP?{" "}
                    <button
                      onClick={sendOtp}
                      className="text-white bg-gray-500 p-2 rounded-2xl hover:bg-primary"
                    >
                      Generate OTP
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

export default PasswordChange;
