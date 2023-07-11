import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { ip } from "../component/IpAddress";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Supervisor() {
  const [depart, setDepart] = useState([]);
  const [supervisor, setSupervisor] = useState([]);

  const navigate = useNavigate();

  const getDepart = () => {
    axios
      .get("http://" + ip.address + ":3001/depart")
      .then((response) => {
        //console.log("depart:", response.data);
        setDepart(response.data);
      })
      .catch((error) => {
        console.log("Error from get depart function: ", error);
      });
  };

  const getSupervisorData = () => {
    axios
      .get("http://" + ip.address + ":3001/current_supervisors")
      .then((response) => {
        console.log("supervisor: ", response.data);
        setSupervisor(response.data);
      })
      .catch((error) => {
        console.log("Error from use effect function: ", error);
      });
  };

  useEffect(() => {
    getDepart();
    getSupervisorData();
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);

    axios
      .post("http://" + ip.address + ":3001/current_supervisors", {
        super_name: data.supername,
        depart_id: data.depart,
        email: data.email,
        mobile: data.mobile,
      })
      .then((response) => {
        console.log("r: ", response.data);

        // setSupervisor([
        //   ...supervisor,
        //   {
        //     super_name: response.data.super_name,
        //     depart_id: response.data.depart_id,
        //     email: response.data.email,
        //     mobile: response.data.mobile,
        //   },
        // ]);

        Swal.fire(
          "Data Inserted!",
          "Data has been inserted successfully",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/loading");
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        exit={{ opacity: 0 }}
        className="container"
      >
        <h2>All Supervisor List</h2>

        <form
          className="row g-2"
          onSubmit={handleSubmit(onSubmit)}
          //style={{ marginLeft: "150px", marginRight: "150px" }}
        >
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              Supervisor Name
            </label>
            <input
              {...register("supername", { required: true })}
              placeholder="Enter valid supervisor"
              className="form-control"
            />
            {errors.supername && (
              <p className="text-danger">Supervisor name is required.</p>
            )}
          </div>

          {/*  */}

          <div className="col-md-6">
            <label htmlFor="validationCustom04" className="form-label">
              Select Department
            </label>
            <select
              {...register("depart")}
              //defaultValue={"Select Depart"}
              className="form-select"
              //value={"Select Depart"}
            >
              <option>Select Depart</option>
              {depart.map((itm, ind) => {
                return (
                  <option key={ind} value={itm._id}>
                    {itm.ward_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              placeholder="Enter valid supervisor"
              className="form-control"
            />
            {errors.email && <p className="text-danger">Email is required.</p>}
          </div>

          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              Mobile
            </label>
            <input
              {...register("mobile", { required: true })}
              placeholder="Enter valid supervisor"
              className="form-control"
            />
            {errors.mobile && (
              <p className="text-danger">Mobile number is required.</p>
            )}
          </div>

          <div className="col-md-3">
            <button className="btn btn-primary mb-4" type="submit">
              Insert Supervisor
            </button>
          </div>
        </form>

        {/* Table */}

        <div className="alert alert-primary" role="alert">
          All Available Supervisor.
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">S#</th>
                <th scope="col">Department Name</th>
                <th scope="col">Supervisor Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {supervisor.map((dep, ind) => {
                return (
                  <tr key={ind}>
                    <th scope="row">{ind + 1}</th>
                    <td>{dep.depart_id.ward_name}</td>
                    <td>{dep.super_name}</td>
                    <td>{dep.email}</td>
                    <td>{dep.mobile}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
