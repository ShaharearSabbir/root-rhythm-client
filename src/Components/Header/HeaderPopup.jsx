import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Toast } from "../../util/utils";
import { MdLogout } from "react-icons/md";
import ThemeToggle from "../Shared/ThemeToggle";
import { Link } from "react-router";

const HeaderPopup = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
      Toast.fire({
        icon: "warning",
        title: "Signed out successfully",
      });
    });
  };
  return (
    <div className="bg-primary text-white p-5 w-40 rounded space-y-3">
      <Link className="inline-block hover:font-bold" to="/dashboard/profile">
        Dashboard
      </Link>
      <div className="flex items-center gap-2">
        <p>Theme:</p>
        <ThemeToggle />
      </div>
      <button onClick={handleSignOut} className="hover:font-bold">
        Sign Out
        <MdLogout size={20} className="hidden md:inline ml-2" />
      </button>
    </div>
  );
};

export default HeaderPopup;
