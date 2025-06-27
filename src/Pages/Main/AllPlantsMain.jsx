import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import PlantCard from "../../Components/Shared/PlantCard";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import PageHeader from "../../Components/Shared/PageHeader";
import Loader from "../../Components/Shared/Loader";

const AllPlantsMain = () => {
  const { count } = useLoaderData();
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("nextWatering");
  const [filterBy, setFilterBy] = useState("");
  const [order, setOrder] = useState("descending");
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const [plantsPerPage, setPlantsPerPage] = useState(10);
  const totalPage = Math.ceil(count / plantsPerPage);
  const pageButtons = [];
  for (let i = 0; i < totalPage; i++) {
    pageButtons.push(i);
  }

  useEffect(() => {
    setLoader(true);
    fetch(
      `${
        import.meta.env.VITE_BASE_SITE
      }/plants?page=${page}&plantsPerPage=${plantsPerPage}&sortBy=${sortBy}&order=${order}&filterBy=${filterBy}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoader(false);
      });
  }, [filterBy, order, page, plantsPerPage, sortBy]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_SITE}/categories`)
      .then((res) => res.json())
      .then((result) => setCategories(result));
  }, [loader]);

  console.log(categories);

  const handlePageButton = (page) => {
    setPage(page);
  };

  return (
    <div>
      <div className="p-8 text-center rounded-t-lg">
        <PageHeader>All Plants</PageHeader>
        <p className="text-lg opacity-90">See All the Plants</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-2 space-y-4 mb-5">
          <div className="space-y-2">
            <p>Filter By:</p>
            <select
              className="select w-fit border border-base-300"
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="" selected={filterBy === "" ? true : false}>
                All
              </option>
              {categories.map((cat) => (
                <option selected={filterBy === cat.categoryName ? true : false}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <p>Sort By:</p>
            <select
              className="select w-fit border border-base-300"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option
                selected={sortBy === "nextWatering" ? true : false}
                value="nextWatering"
              >
                Next Watering Date
              </option>
              <option
                selected={sortBy === "careLevel" ? true : false}
                value="careLevel"
              >
                Care Level
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <p>Order By:</p>
            <select
              className="select w-fit border border-base-300"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option
                selected={order === "ascending" ? true : false}
                value="ascending"
              >
                Ascending
              </option>
              <option
                selected={order === "descending" ? true : false}
                value="descending"
              >
                Descending{" "}
              </option>
            </select>
          </div>
        </div>
        {loader ? (
          <div className="lg:col-span-10 text-center">
            <Loader />
          </div>
        ) : (
          <div className="lg:col-span-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
              {plants.map((plant) => (
                <PlantCard plant={plant} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-3 flex-wrap mt-10 motion-translate-y-in-100">
              <button
                onClick={() => {
                  if (page + 1 > 1) {
                    setPage((prev) => prev - 1);
                  }
                }}
                className="btn btn-accent"
              >
                <GiPreviousButton size={20} /> Previous
              </button>
              {pageButtons.map((button) => (
                <button
                  onClick={() => handlePageButton(button)}
                  className={`btn ${
                    page === button ? "btn-primary" : "btn-accent"
                  }`}
                >
                  {button + 1}
                </button>
              ))}
              <button
                onClick={() => {
                  if (page + 1 < totalPage) {
                    setPage((prev) => prev + 1);
                  }
                }}
                className="btn btn-accent"
              >
                Next <GiNextButton size={20} />
              </button>
            </div>
            <div className=" flex justify-center flex-wrap items-center gap-2 mt-5">
              <p>Plants Per Page:</p>
              <select
                className="select select-sm select-accent w-fit"
                value={plantsPerPage}
                onChange={(e) => {
                  setPlantsPerPage(parseInt(e.target.value));
                  setPage(0);
                }}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPlantsMain;
