import React, { useContext, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploaded, setUploaded] = useState(false);
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

  const handleImageUpload = (e) => {
    setLoader(true);
    const image = e.target.files[0];

    if (!image) {
      setLoader(false);
      Toast.fire({
        icon: "error",
        title: "No image selected!",
      });
      return;
    }

    const apiKey = import.meta.env.VITE_imgBBKey;
    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", image);

    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPhotoURL(data.data.url);
          setUploaded(true);
          Toast.fire({
            icon: "success",
            title: "Image uploaded successfully!",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Upload failed. Try again!",
          });
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error("Upload Error:", err);
        Toast.fire({
          icon: "error",
          title: "Something went wrong during upload.",
        });
        setLoader(false);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setUploaded(false);
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries()
    );

    delete userProfile.image;
    userProfile.photoURL = photoURL;

    createUser(email, password)
      .then((userCredential) => {
        userProfile.email = email;
        userProfile.uid = userCredential.user.uid;

        return fetch("https://root-rhythms-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Toast.fire({
            icon: "success",
            title: "Successfully Created Account",
          });
          form.reset();
          setPhotoURL(null);
          setUploaded(false);
          navigate("/");
        } else {
          Toast.fire({
            icon: "error",
            title: "Account creation failed",
          });
        }
      })
      .catch((err) => {
        console.error("Sign Up Error:", err);
        Toast.fire({
          icon: "error",
          title: "Something went wrong!",
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
        navigate("/");
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
          <h1 className="text-3xl font-bold text-center">Sign Up Now!</h1>
          <form onSubmit={handleSignUp} className="fieldset">
            <label className="label">Name</label>
            <input
              name="displayName"
              type="text"
              className="input w-full"
              placeholder="Your Name"
            />
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
            <label className="label">Photo</label>
            <div className="flex gap-5">
              <input
                onChange={handleImageUpload}
                name="image"
                type="file"
                className="file-input file-input-primary border-none w-full"
              />
              {loader && (
                <span className="loading loading-spinner text-primary loading-lg"></span>
              )}
            </div>
            {uploaded && (
              <p className="text-sm text-success">
                Image Uploaded Successfully
              </p>
            )}
            <button className="btn btn-primary w-full mt-4">Sign Up</button>
          </form>
          <div className="divider divider-primary">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full btn btn-outline btn-primary"
          >
            <FcGoogle size={22} /> Sign Up With Google
          </button>
        </div>
        <div className="divider-primary divider mb-5 "></div>
        <p className="text-center mb-5">
          Already Have An Account?{" "}
          <Link className="text-primary hover:font-bold" to="/auth/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
