import React, { useContext } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";

const SignIn = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);

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
      .then((data) => {
        console.log(data);
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
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
    <div className="hero bg-base-200 min-h-screen p-3 pt-24">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
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
            <input
              name="password"
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            <button className="btn btn-primary w-full mt-4">Sign In</button>
          </form>
          <div className="divider divider-primary">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full btn btn-outline btn-primary"
          >
            <FcGoogle size={22} /> Sign In With Google
          </button>
        </div>
        <div className="divider-primary divider mb-5 "></div>
        <p className="text-center mb-5">
          New Here?{" "}
          <Link className="text-primary hover:font-bold" to="/auth/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
