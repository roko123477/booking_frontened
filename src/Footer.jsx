import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";

const Footer = () => {
    const [noofuser, SetNoofuser] = useState(0);
  useEffect(() => {
    axios
      .get("/countnumberofusers")
      .then((response) => SetNoofuser(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="footer-1 bg-gray-700 pt-3 md:pt-5">
      <div className="container px-2 mx-auto">
        <div className="md:flex md:flex-wrap md:-mx-4 py-4 md:pb-12">
          <div className="footer-info lg:w-1/3 md:px-4">
            <h4 className="text-white text-2xl mb-4">
              {noofuser} users are using PiBook websites to find their best destination
              place.
            </h4>
            <p className="text-gray-400">
              We have carefully crafted to suit to everyone's need.
            </p>
            <div className="mt-4">
              <div className="flex">
                <Link
                  to={"https://www.facebook.com/rohit.koner.353"}
                  className="bg-facebook py-3 px-3 text-white rounded mt-2 transition-colors duration-300"
                >
                  <span className="">
                    <FaFacebookF />
                  </span>
                </Link>
              </div>
              <div className="flex">
                <Link
                  to={"https://www.linkedin.com/in/rohit-koner-7a21961a0/"}
                  className="bg-twitter py-3 px-3 text-white rounded mt-2 transition-colors duration-300"
                >
                  <span className="">
                    <FaLinkedinIn />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-12 lg:mt-0">
            <div className="sm:flex">
              <div className="sm:flex-1">
                <h6 className="text-base font-medium text-white uppercase mb-2">
                  About
                </h6>
                <div>
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Company
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Culture
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Careers
                  </a>
                </div>
              </div>
              <div className="sm:flex-1 mt-4 sm:mt-0">
                <h6 className="text-base font-medium text-white uppercase mb-2">
                  What we offer
                </h6>
                <div>
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Places
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Resources
                  </a>
                  
                  <a
                    href="#"
                    className="text-gray-400 py-1 block hover:underline"
                  >
                    Tutorials
                  </a>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
            <h5 className="text-lg text-white font-medium mb-4">
              Explore our site
            </h5>
            <Link
              to={"/"}
              className="bg-primary text-white hover:bg-primary rounded py-2 px-6 md:px-12 transition-colors duration-300"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-solid border-gray-900 mt-4 py-4">
        <div className="container px-4 mx-auto">
          <div className="md:flex md:-mx-4 md:items-center">
            <Link
              to={"/"}
              className="md:flex-1 md:px-4 text-center md:text-left"
            >
              <p className="text-white text-xl">
                &copy; <strong>PiBook</strong>
              </p>
            </Link>
            <div className="md:flex-1 md:px-4 text-center md:text-right">
              <a
                href="#"
                className="py-2 px-4 text-white inline-block hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="py-2 px-4 text-white inline-block hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
