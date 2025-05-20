import React from "react";

const AuthLayout = () => {
  return (
    <div>
      <div className="bg-base-200 shadow-md">
        <Header></Header>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
