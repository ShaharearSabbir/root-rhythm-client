import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { Toast } from "../util/utils";

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

  const handleImageUpload = (e) => {
    setLoader(true);
    const image = e.target.files[0];

    if (!image) {
      setLoader(false);
      Toast.fire({ icon: "error", title: "No image selected!" });
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
          Toast.fire({ icon: "error", title: "Upload failed. Try again!" });
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

    fetch(`https://root-rhythms-server.vercel.app/plant/${plant._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Toast.fire({ icon: "success", title: "Plant updated successfully" });
          navigate(-1);
        } else {
          Toast.fire({
            icon: "error",
            title: "Update failed",
            text: "Could not update the plant.",
          });
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        Toast.fire({
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
    <div className="hero">
      <Helmet>
        <title>Uplate {plant.plantName} | Root Rhythm</title>
      </Helmet>
      <div className="card bg-base-100 w-full">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Update Plant</h1>
          <form onSubmit={handleUpdate} className="fieldset">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Plant Name */}
              <div>
                <label className="label">Plant Name</label>
                <input
                  defaultValue={plant.plantName}
                  name="plantName"
                  type="text"
                  className="input w-full"
                  placeholder="Enter plant name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">Category</label>
                <select name="category" className="select w-full" required>
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option
                      selected={
                        plant.category === cat.categoryName ? true : false
                      }
                      value={cat.categoryName}
                    >
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description</label>
                <textarea
                  defaultValue={plant.description}
                  name="description"
                  className="textarea w-full"
                  placeholder="Describe your plant"
                  required
                ></textarea>
              </div>

              {/* Care Level */}
              <div>
                <label className="label">Care Level</label>
                <select
                  name="careLevel"
                  defaultValue={plant.careLevel}
                  className="select w-full"
                  required
                >
                  <option value="">Select Care Level</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>

              {/* Watering Frequency */}
              <div>
                <label className="label">Watering Frequency</label>
                <div className="flex space-x-2 items-center">
                  {/* Selector 1: Times */}
                  <select
                    name="wateringFrequencyTimes"
                    className=" input appearance-none rounded-md py-2 px-3 shadow-sm"
                    required
                    defaultValue={plant.wateringFrequencyTimes}
                    onChange={(e) => setWateringFrequencyTimes(e.target.value)}
                  >
                    <option value="">Times</option>
                    <option value="1">1 time</option>
                    <option value="2">2 times</option>
                    <option value="3">3 times</option>
                  </select>

                  {/* Text separator */}
                  <span className="text-gray-600">in</span>

                  {/* Selector 2: Days */}
                  <select
                    name="wateringFrequencyDays"
                    className=" input appearance-none  rounded-md py-2 px-3 shadow-sm"
                    defaultValue={plant.wateringFrequencyDays}
                    onChange={(e) => {
                      setWateringFrequencyDays(e.target.value);
                      if (e.target.value) setWateringFrequencyWeeks("");
                    }}
                  >
                    <option value="">Select Days</option>
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                  </select>

                  {/* Selector 3: Weeks */}
                  <select
                    name="wateringFrequencyWeeks"
                    className=" input appearance-none  rounded-md py-2 px-3 shadow-sm"
                    defaultValue={plant.wateringFrequencyWeeks}
                    onChange={(e) => {
                      setWateringFrequencyWeeks(e.target.value);
                      if (e.target.value) setWateringFrequencyDays("");
                    }}
                  >
                    <option value="">Select Weeks</option>
                    <option value="1">1 week</option>
                    <option value="2">2 weeks</option>
                    <option value="3">3 weeks</option>
                    <option value="4">4 weeks</option>
                  </select>
                </div>
              </div>
              {/* Last Watered Date */}
              <div>
                <label className="label">Last Watered Date</label>
                <input
                  name="lastWatered"
                  type="date"
                  className="input w-full"
                  required
                  value={lastWateredFromInput}
                  onChange={(e) => setLastWateredFromInput(e.target.value)}
                />
              </div>
              {/* Next Watering Date */}
              <div>
                <label className="label">Next Watering Date</label>
                <input
                  name="nextWatering"
                  type="date"
                  className="input w-full"
                  required
                  defaultValue={nextWateringFromInput}
                />
              </div>

              {/* Health Status */}
              <div>
                <label className="label">Health Status</label>
                <input
                  defaultValue={plant.healthStatus}
                  name="healthStatus"
                  type="text"
                  className="input w-full"
                  placeholder="e.g., Healthy, Needs attention"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
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
              </div>

              {/* User Name */}
              <div>
                <label className="label">Name</label>
                <input
                  value={plant.userName}
                  name="userName"
                  type="text"
                  className="input w-full"
                  placeholder="Your Name"
                  required
                  readOnly
                />
              </div>

              {/* User Email */}
              <div>
                <label className="label">Email</label>
                <input
                  value={plant.userEmail}
                  type="email"
                  name="userEmail"
                  className="input w-full"
                  placeholder="Email"
                  required
                  readOnly
                />
              </div>
            </div>
            {/* Submit Button */}
            <button className="btn btn-primary w-full mt-4">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlant;
