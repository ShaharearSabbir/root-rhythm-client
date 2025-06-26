import React, { useEffect, useState } from "react";
import PlantForTable from "../../Components/plantForTable";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";
import PageHeader from "../../Components/Shared/PageHeader";

const AllPlants = () => {
  const [sortBy, setSortBy] = useState("nextWatering");
  const [order, setOrder] = useState("descending");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = `https://root-rhythms-server.vercel.app/plants?sortBy=${sortBy}&order=${order}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setPlants(result);
        setLoading(false);
      });
  }, [sortBy, order]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="overflow-x-auto motion-translate-y-in-100">
      <Helmet>
        <title>All Plants | Root Rhythm</title>
      </Helmet>
      <div className="p-8 text-center">
        <PageHeader>All Plants</PageHeader>
        <p className="text-lg opacity-90">A list of plants</p>
      </div>
      <div className="flex flex-col justify-end items-end md:flex-row gap-4">
        <div className="flex items-center gap-3">
          <p>Sort By</p>
          <select
            className="select w-fit"
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
            className="select w-fit"
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
          <tr>
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
    </div>
  );
};

export default AllPlants;
