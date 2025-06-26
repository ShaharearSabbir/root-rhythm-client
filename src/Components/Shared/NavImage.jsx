import React from "react";

const NavImage = ({ photoURL, setShowPopup }) => {
  return (
    <div className="cursor-pointer rounded-full border-2 border-primary hover:border-secondary">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={photoURL}
        alt=""
        onClick={() => setShowPopup((prev) => !prev)}
      />
    </div>
  );
};

export default NavImage;
