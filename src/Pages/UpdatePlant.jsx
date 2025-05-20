import React, { useContext, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdatePlant = () => {
  const {
    careLevel,
    category,
    description,
    healthStatus,
    lastWatered,
    nextWatering,
    plantName,
    wateringFrequency,
    userName,
    userEmail,
    _id,
  } = useLoaderData();
  const { user } = useContext(AuthContext);
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
          console.error("Upload failed:", data);
          Toast.fire({
            icon: "error",
            title: "Upload failed. Try again!",
          });
        }
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        Toast.fire({
          icon: "error",
          title: "Something went wrong during upload.",
        });
        setLoader(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const plantData = Object.fromEntries(formData.entries());

    delete plantData.image;

    if (photoURL) {
      plantData.photoURL = photoURL;
    }

    plantData.uid = user.uid;

    fetch(`http://localhost:5000/plant/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Plant updated successfully",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          navigate(-1);
        } else {
          Swal.fire({
            icon: "error",
            title: "Update failed",
            text: "Could not update the plant.",
          });
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Failed to update plant.",
        });
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Update Plant</h1>
          <form onSubmit={handleUpdate} className="fieldset">
            {/* Plant Name */}
            <label className="label">Plant Name</label>
            <input
              defaultValue={plantName}
              name="plantName"
              type="text"
              className="input w-full"
              placeholder="Enter plant name"
              required
            />

            {/* Category */}
            <label className="label">Category</label>
            <select
              name="category"
              className="select w-full"
              defaultValue={category}
              required
            >
              <option value="">Select Category</option>
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flowering">Flowering</option>
              <option value="cactus">Cactus</option>
              <option value="herb">Herb</option>
              <option value="tree">Tree</option>
              <option value="shrub">Shrub</option>
              <option value="vine">Vine</option>
              <option value="grass">Grass</option>
              <option value="aquatic">Aquatic</option>
              <option value="orchid">Orchid</option>
              <option value="palm">Palm</option>
              <option value="bamboo">Bamboo</option>
              <option value="aloe">Aloe</option>
              <option value="bulb">Bulb</option>
              <option value="tropical">Tropical</option>
              <option value="air-plant">Air Plant (Tillandsia)</option>
              <option value="bonsai">Bonsai</option>
              <option value="carnivorous">Carnivorous</option>
            </select>

            {/* Description */}
            <label className="label">Description</label>
            <textarea
              defaultValue={description}
              name="description"
              className="textarea w-full"
              placeholder="Describe your plant"
              required
            ></textarea>

            {/* Care Level */}
            <label className="label">Care Level</label>
            <select
              name="careLevel"
              className="select w-full"
              defaultValue={careLevel}
              required
            >
              <option value="">Select Care Level</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>

            {/* Watering Frequency */}
            <label className="label">Watering Frequency</label>
            <input
              defaultValue={wateringFrequency}
              name="wateringFrequency"
              type="text"
              className="input w-full"
              placeholder="e.g., every 3 days"
              required
            />

            {/* Last Watered Date */}
            <label className="label">Last Watered Date</label>
            <input
              defaultValue={lastWatered}
              name="lastWatered"
              type="date"
              className="input w-full"
              required
            />

            {/* Next Watering Date */}

            <label className="label">Next Watering Date</label>
            <input
              defaultValue={nextWatering}
              name="nextWatering"
              type="date"
              className="input w-full"
              required
            />

            {/* Health Status */}
            <label className="label">Health Status</label>
            <input
              defaultValue={healthStatus}
              name="healthStatus"
              type="text"
              className="input w-full"
              placeholder="e.g., Healthy, Needs attention"
              required
            />

            {/* Image Upload */}
            <label className="label">Plant Image</label>
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

            {/* User Name */}
            <label className="label">Name</label>
            <input
              value={user?.displayName}
              name="userName"
              type="text"
              className="input w-full"
              placeholder="Your Name"
              required
            />

            {/* User Email */}
            <label className="label">Email</label>
            <input
              value={user?.email}
              type="email"
              name="userEmail"
              className="input w-full"
              placeholder="Email"
              required
            />

            {/* Submit Button */}
            <button className="btn btn-primary w-full mt-4">Add Plant</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlant;
