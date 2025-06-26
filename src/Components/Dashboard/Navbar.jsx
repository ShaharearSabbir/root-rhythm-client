import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import BrandLogo from "../Shared/BrandLogo";
import ThemeToggle from "../Shared/ThemeToggle";
import { Link } from "react-router";
import { FaHamburger, FaHome } from "react-icons/fa";
import HeaderPopup from "../Header/HeaderPopup";
import NavImage from "../Shared/NavImage";
import { BiMenu } from "react-icons/bi";

const Navbar = ({ setShowSide }) => {
  const { user } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setShowPopup((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup, popupRef]);

  return (
    <div className="bg-base-100 shadow fixed w-full z-100 top-0">
      <div className="navbar lg:w-11/12 mx-auto flex justify-between">
        <div className="flex">
          <button
            className="inline lg:hidden"
            onClick={() => setShowSide((prev) => !prev)}
          >
            <BiMenu size={35} />
          </button>
          <BrandLogo />
        </div>
        <div className="flex items-center gap-5">
          <Link to="/" className="btn btn-primary">
            <FaHome /> <span className="hidden md:inline">Home</span>
          </Link>
          <div className="flex gap-3 relative">
            <NavImage photoURL={user.photoURL} setShowPopup={setShowPopup} />
            {showPopup && (
              <div
                className="absolute w-30 top-14 right-10 z-10"
                ref={popupRef}
              >
                <HeaderPopup />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
