import React, { useContext, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.message || "Sign-in failed",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Signed in with Google",
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.error("Google Sign-In Error:", err);
        Toast.fire({
          icon: "error",
          title: "Google Sign-In Failed",
        });
      });
  };

  return (
    <div className="hero min-h-screen p-3 pt-24 ">
      <Helmet>
        <title>Sign In | Root Rhythm</title>
      </Helmet>
      <div className="card w-full max-w-md motion-translate-y-in-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Sign In Now!</h1>
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "password" : "text"}
                className="input w-full"
                placeholder="Password"
              />
              <button
                className="absolute right-2 top-2 z-10"
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <IoEyeSharp size={23} /> : <FaEyeSlash size={23} />}
              </button>
            </div>
            <button className="btn btn-primary w-full mt-4">Sign In</button>
          </form>
          <div className="divider divider-primary">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full btn btn-outline btn-primary"
          >
            <FcGoogle size={22} /> Sign In With Google
          </button>
          <div className="divider-primary divider mb-5 "></div>
        </div>

        <p className="text-center mb-5">
          New Here?{" "}
          <Link className="text-primary hover:text-secondary" to="/auth/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
