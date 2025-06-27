import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const NavImage = ({ setShowPopup }) => {
  const { user } = useContext(AuthContext);
  console.log(user.photoURL);
  return (
    <div className="cursor-pointer rounded-full border-2 border-base-300 hover:border-primary">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={user.photoURL}
        alt=""
        onClick={() => setShowPopup((prev) => !prev)}
      />
    </div>
  );
};

export default NavImage;
