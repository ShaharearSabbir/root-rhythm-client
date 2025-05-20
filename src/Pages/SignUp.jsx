import React, { useContext, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [imageURL, setImageURL] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleImageUpload = (e) => {
    setLoader(true);
    const image = e.target.files[0];
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
        setImageURL(data.data.url);
        setLoader(false);
        setUploaded(true);
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
    userProfile.imageURL = imageURL;
    console.log(email, password, userProfile);
    createUser(email, password).then((userCredential) => {
      userProfile.email = email;
      userProfile.uid = userCredential.user.uid;
      console.log(userProfile);
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userProfile),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
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
            Toast.fire({
              icon: "success",
              title: "Successfully Created Account",
            });
          }
        });
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Sign Up Now!</h1>
          <form onSubmit={handleSignUp} className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
