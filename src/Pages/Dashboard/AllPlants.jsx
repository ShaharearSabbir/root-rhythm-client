import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import PageHeader from "../../Components/Shared/PageHeader";
import PlantForTable from "./PlantForTable";

const AllPlants = () => {
  const { count } = useLoaderData();
  const [plants, setPlants] = useState([]);
  const [sortBy, setSortBy] = useState("nextWatering");
  const [order, setOrder] = useState("descending");
  const [page, setPage] = useState(0);
  const [plantsPerPage, setPlantsPerPage] = useState(10);
  const totalPage = Math.ceil(count / plantsPerPage);
  const pageButtons = [];
  for (let i = 0; i < totalPage; i++) {
    pageButtons.push(i);
  }
  console.log(totalPage, page);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BASE_SITE
      }/plants?page=${page}&plantsPerPage=${plantsPerPage}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, [order, page, plantsPerPage, sortBy]);

  const handlePageButton = (page) => {
    setPage(page);
  };

  return (
    <div>
      <div className="p-8 text-center rounded-t-lg">
        <PageHeader>All Plants</PageHeader>
        <p className="text-lg opacity-90">See All the Plants</p>
      </div>
      <div className="flex flex-col justify-end items-end md:flex-row gap-4 my-5">
        <div className="flex items-center gap-3">
          <p>Sort By</p>
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
        <div className="flex items-center gap-3">
          <p>Order</p>
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
      <table className="table">
        {/* head */}
        <thead>
          <tr className="border-b-2 border-base-300">
            <th>SL No.</th>
            <th>Plant Name</th>
            <th>Category</th>
            <th>Watering Frequency</th>
            <th>Care Level</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, index) => (
            <PlantForTable
              key={plant._id}
              plant={plant}
              index={index}
            ></PlantForTable>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-3 flex-wrap mt-10">
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
            className={`btn ${page === button ? "btn-primary" : "btn-accent"}`}
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
  );
};

export default AllPlants;
