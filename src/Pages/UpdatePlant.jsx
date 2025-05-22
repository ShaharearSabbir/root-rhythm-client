import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { format } from "date-fns";

const UpdatePlant = () => {
  const plant = useLoaderData();
  const { user } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [lastWateredFromInput, setLastWateredFromInput] = useState("");
  const [wateringFrequencyTimes, setWateringFrequencyTimes] = useState("");
  const [wateringFrequencyDays, setWateringFrequencyDays] = useState("");
  const [wateringFrequencyWeeks, setWateringFrequencyWeeks] = useState("");
  const [nextWateringFromInput, setNextWateringFromInput] = useState("");
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  const updatedDate = format(new Date(), "yyyy-MM-dd");

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  };

  const handleImageUpload = (e) => {
    setLoader(true);
    const image = e.target.files[0];

    if (!image) {
      setLoader(false);
      showToast("error", "No image selected!");
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
          showToast("success", "Image uploaded successfully!");
        } else {
          console.error("Upload failed:", data);
          showToast("error", "Upload failed. Try again!");
        }
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        showToast("error", "Something went wrong during upload.");
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
    plantData.updatedDate = updatedDate;

    fetch(`https://root-rhythms-server.vercel.app/plant/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          showToast("success", "Plant updated successfully");
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

  useEffect(() => {
    if (
      lastWateredFromInput &&
      wateringFrequencyTimes &&
      (wateringFrequencyDays || wateringFrequencyWeeks)
    ) {
      const lastWateredDate = new Date(lastWateredFromInput);
      let intervalDays = 0;

      const days = parseInt(wateringFrequencyDays, 10);
      const weeks = parseInt(wateringFrequencyWeeks, 10);

      if (wateringFrequencyDays) {
        intervalDays = days;
      } else if (wateringFrequencyWeeks) {
        intervalDays = weeks * 7;
      }

      // Calculate the next date
      const nextDate = new Date(lastWateredDate);
      nextDate.setDate(lastWateredDate.getDate() + intervalDays);

      const formattedNextDate = nextDate.toISOString().split("T")[0];
      setNextWateringFromInput(formattedNextDate);
    } else {
      setNextWateringFromInput("");
    }
  }, [
    lastWateredFromInput,
    wateringFrequencyTimes,
    wateringFrequencyDays,
    wateringFrequencyWeeks,
  ]);

  useEffect(() => {
    fetch("https://root-rhythms-server.vercel.app/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));
  }, []);

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Update Plant</h1>
          <form onSubmit={handleUpdate} className="fieldset">
            {/* Plant Name */}
            <label className="label">Plant Name</label>
            <input
              defaultValue={plant.plantName}
              name="plantName"
              type="text"
              className="input w-full"
              placeholder="Enter plant name"
              required
            />

            {/* Category */}
            <label className="label">Category</label>
            <select name="category" className="select w-full" required>
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option
                  selected={plant.category === cat.categoryName ? true : false}
                  value={cat.categoryName}
                >
                  {cat.categoryName}
                </option>
              ))}
            </select>

            {/* Description */}
            <label className="label">Description</label>
            <textarea
              defaultValue={plant.description}
              name="description"
              className="textarea w-full"
              placeholder="Describe your plant"
              required
            ></textarea>

            {/* Care Level */}
            <label className="label">Care Level</label>
            <select name="careLevel" className="select w-full" required>
              <option value="">Select Care Level</option>
              <option
                selected={plant.careLevel === "easy" ? true : false}
                value="easy"
              >
                Easy
              </option>
              <option
                selected={plant.careLevel === "moderate" ? true : false}
                value="moderate"
              >
                Moderate
              </option>
              <option
                selected={plant.areLevel === "difficult" ? true : false}
                value="difficult"
              >
                Difficult
              </option>
            </select>

            {/* Watering Frequency */}
            <label className="label">Watering Frequency</label>
            <div className="flex space-x-2 items-center">
              {/* Selector 1: Times */}
              <select
                name="wateringFrequencyTimes"
                className=" input appearance-none rounded-md py-2 px-3 shadow-sm"
                required
                value={wateringFrequencyTimes}
                onChange={(e) => setWateringFrequencyTimes(e.target.value)}
              >
                <option value="">Times</option>
                <option
                  selected={
                    plant.plantwateringFrequencyTimes == "1" ? true : false
                  }
                  value="1"
                >
                  1 time
                </option>
                <option
                  selected={
                    plant.plantwateringFrequencyTimes == "2" ? true : false
                  }
                  value="2"
                >
                  2 times
                </option>
                <option
                  selected={
                    plant.plantwateringFrequencyTimes == "3" ? true : false
                  }
                  value="3"
                >
                  3 times
                </option>
              </select>

              {/* Text separator */}
              <span className="text-gray-600">in</span>

              {/* Selector 2: Days */}
              <select
                name="wateringFrequencyDays"
                className=" input appearance-none  rounded-md py-2 px-3 shadow-sm"
                value={wateringFrequencyDays}
                onChange={(e) => {
                  setWateringFrequencyDays(e.target.value);
                  // Optional: clear weeks if days selected to enforce one-or-the-other
                  if (e.target.value) setWateringFrequencyWeeks("");
                }}
              >
                <option value="">Select Days</option>
                <option
                  selected={plant.wateringFrequencyDays == "1" ? true : false}
                  value="1"
                >
                  1 day
                </option>
                <option
                  selected={plant.wateringFrequencyDays == "2" ? true : false}
                  value="2"
                >
                  2 days
                </option>
                <option
                  selected={plant.wateringFrequencyDays == "3" ? true : false}
                  value="3"
                >
                  3 days
                </option>
                <option
                  selected={plant.wateringFrequencyDays == "4" ? true : false}
                  value="4"
                >
                  4 days
                </option>
                <option
                  selected={plant.wateringFrequencyDays == "5" ? true : false}
                  value="5"
                >
                  5 days
                </option>
                <option
                  selected={plant.wateringFrequencyDays == "6" ? true : false}
                  value="6"
                >
                  6 days
                </option>
                <option
                  selected={plant.wateringFrequencyDays == "7" ? true : false}
                  value="7"
                >
                  7 days
                </option>
              </select>

              {/* Selector 3: Weeks */}
              <select
                name="wateringFrequencyWeeks"
                className=" input appearance-none  rounded-md py-2 px-3 shadow-sm"
                value={wateringFrequencyWeeks}
                onChange={(e) => {
                  setWateringFrequencyWeeks(e.target.value);
                  // Optional: clear days if weeks selected to enforce one-or-the-other
                  if (e.target.value) setWateringFrequencyDays("");
                }}
              >
                <option value="">Select Weeks</option>
                <option
                  selected={plant.wateringFrequencyWeeks == "1" ? true : false}
                  value="1"
                >
                  1 week
                </option>
                <option
                  selected={plant.wateringFrequencyWeeks == "2" ? true : false}
                  value="2"
                >
                  2 weeks
                </option>
                <option
                  selected={plant.wateringFrequencyWeeks == "3" ? true : false}
                  value="3"
                >
                  3 weeks
                </option>
                <option
                  selected={plant.wateringFrequencyWeeks == "4" ? true : false}
                  value="4"
                >
                  4 weeks
                </option>
              </select>
            </div>
            {/* Last Watered Date */}
            <label className="label">Last Watered Date</label>
            <input
              name="lastWatered"
              type="date"
              className="input w-full"
              required
              value={lastWateredFromInput}
              onChange={(e) => setLastWateredFromInput(e.target.value)}
            />
            {/* Next Watering Date */}
            <label className="label">Next Watering Date</label>
            <input
              name="nextWatering"
              type="date"
              className="input w-full"
              required
              value={nextWateringFromInput}
              readOnly // Make it read-only as it's auto-calculated
            />

            {/* Health Status */}
            <label className="label">Health Status</label>
            <input
              defaultValue={plant.healthStatus}
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
              value={plant.userName}
              name="userName"
              type="text"
              className="input w-full"
              placeholder="Your Name"
              required
            />

            {/* User Email */}
            <label className="label">Email</label>
            <input
              value={plant.userEmail}
              type="email"
              name="userEmail"
              className="input w-full"
              placeholder="Email"
              required
            />

            {/* Submit Button */}
            <button className="btn btn-primary w-full mt-4">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlant;
