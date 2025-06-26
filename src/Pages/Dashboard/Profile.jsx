import React, { use } from "react";
import { AuthContext } from "../../Components/Context/AuthContext";
import PageHeader from "../../Components/Shared/PageHeader";

const Profile = () => {
  const { user } = use(AuthContext);
  console.log(user);
  return (
    <div className="card w-full max-w-sm mx-auto duration-300">
      <div className="card-body p-6 text-center">
        {" "}
        {/* Centered text for simplicity */}
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="avatar">
            <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2 shadow-lg">
              <img
                src={user.photoURL}
                alt={`${name}'s avatar`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x150/CCCCCC/000000?text=Error";
                }}
              />
            </div>
          </div>
        </div>
        {/* Name */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {user.displayName || "User Name"}
        </h2>
        {/* Email */}
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          {user.email || "user@example.com"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
