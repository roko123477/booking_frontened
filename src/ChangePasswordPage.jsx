import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";
import styles from "./pages/LoginPage.module.css";
import { UserContext } from "./UserContext";

const ChangePasswordPage = () => {
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewPass] = useState("");
  const { ready, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const changepass = async (e) => {
    e.preventDefault();
    if (user) {
      const { data } = await axios.post(`/changepass`, { oldpass, newpass,id:user._id });
      console.log(data);
      if(!data){
        alert("old password is invalid");
        setOldpass("");
        setNewPass("");
      }
      else{
        console.log(data);
        setRedirect(true);
      }
    }
  };
  if(redirect){
    return <Navigate to={"/"} />;
  }
  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Password Change</h4>
              <span className="py-2 text-xl w-2/3 text-center text-gray-500">
                You are about to change your password
              </span>
            </div>

            <form className="pt-20">
              <div className="textbox flex flex-col items-center gap-7">
                <div className="input text-center">
                  <span className="py-4 text-sm text-left text-gray-500">
                    Enter your previous password as well as your new password
                  </span>
                  <input
                    className={styles.textbox}
                    value={oldpass}
                    onChange={(e) => setOldpass(e.target.value)}
                    type="text"
                    placeholder="Old Password"
                  />
                  <input
                    className={styles.textbox}
                    value={newpass}
                    onChange={(e) => setNewPass(e.target.value)}
                    type="text"
                    placeholder="New Password"
                  />
                </div>

                <button
                  onClick={changepass}
                  className={styles.btn}
                  type="submit"
                >
                  Change Password
                </button>
              </div>

              <div className="text-center py-4 my-2">
                <span className="text-gray-500">
                  Don't want to change password?{" "}
                  <Link
                    to={"/"}
                    className="text-white bg-gray-500 p-2 rounded-2xl hover:bg-primary"
                  >
                    Back to Home
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
