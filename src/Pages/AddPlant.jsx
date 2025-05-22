import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { CiCirclePlus } from "react-icons/ci";

const AddPlant = () => {
  const initialCategory = useLoaderData();
  const [categories, setCategories] = useState(initialCategory);
  const { user } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loaderC, setLoaderC] = useState(false);
  const [categoryPhotoURL, setCategoryPhotoURL] = useState(null);
  const [categoryName, setCategoryName] = useState("");

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
        setPhotoURL(data.data.url);
        setLoader(false);
        Toast.fire({
          icon: "success",
          title: "Image Uploaded Successfully",
        });
      });
  };

  const handleImageUploadForCategory = (e) => {
    setLoaderC(true);
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
        setCategoryPhotoURL(data.data.url);
        setLoaderC(false);
        Toast.fire({
          icon: "success",
          title: "Image Uploaded Successfully",
        });
      });
  };

  const handleAddCategory = () => {
    const category = { categoryName, categoryPhotoURL };
    fetch("http://localhost:5000/category", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Toast.fire({
            icon: "success",
            title: "Category Added Successfully",
          });
          setCategories((prevCat) => [...prevCat, category]);
          document.getElementById("categoryName").value = "";
          setCategoryPhotoURL(null);
        }
      });
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const plantData = Object.fromEntries(formData.entries());
    delete plantData.image;
    plantData.photoURL = photoURL;
    plantData.uid = user.uid;
    console.log(plantData);
    fetch("http://localhost:5000/plant", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Toast.fire({
            icon: "success",
            title: "Plant Added Successfully",
          });
        }
        form.reset();
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Add New Plant</h1>
          <form onSubmit={handleAddPlant} className="fieldset">
            {/* Plant Name */}
            <label className="label">Plant Name</label>
            <input
              name="plantName"
              type="text"
              className="input w-full"
              placeholder="Enter plant name"
              required
            />
            {/* Category */}
            <label className="label">Category</label>
            <div className="flex items-center gap-2">
              <select name="category" className="select w-full" required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                title="Add Category"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <CiCirclePlus size={30} />
              </button>
            </div>
            ;{/* Description */}
            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea w-full"
              placeholder="Describe your plant"
              required
            ></textarea>
            {/* Care Level */}
            <label className="label">Care Level</label>
            <select name="careLevel" className="select w-full" required>
              <option value="">Select Care Level</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
            {/* Watering Frequency */}
            <label className="label">Watering Frequency</label>
            <input
              name="wateringFrequency"
              type="text"
              className="input w-full"
              placeholder="e.g., every 3 days"
              required
            />
            {/* Last Watered Date */}
            <label className="label">Last Watered Date</label>
            <input
              name="lastWatered"
              type="date"
              className="input w-full"
              required
            />
            {/* Next Watering Date */}
            <label className="label">Next Watering Date</label>
            <input
              name="nextWatering"
              type="date"
              className="input w-full"
              required
            />
            {/* Health Status */}
            <label className="label">Health Status</label>
            <input
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
                required
              />
              {loader && (
                <span className="loading loading-spinner text-primary loading-lg"></span>
              )}
            </div>
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

      {/* Modal */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add New Category</h3>
          <div className="space-y-4 my-2">
            <div>
              <label className="label">Category Name</label>
              <input
                name="categoryName"
                id="categoryName"
                type="text"
                className="input w-full"
                placeholder="Enter Category Name"
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              {/* Image Upload */}
              <label className="label">Plant Image</label>
              <div className="flex gap-5">
                <input
                  onChange={handleImageUploadForCategory}
                  name="image"
                  type="file"
                  className="file-input file-input-primary border-none w-full"
                  required
                />
                {loaderC && (
                  <span className="loading loading-spinner text-primary loading-lg"></span>
                )}
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={handleAddCategory} className="btn btn-primary">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPlant;
