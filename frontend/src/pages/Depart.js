import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ip } from "../component/IpAddress";
import { motion } from "framer-motion";

export default function Depart() {
  const navigate = useNavigate();
  const [depart, setDepart] = useState([]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://" + ip.address + ":3001/depart")
      .then((response) => {
        //let mysupervisor = response.data;
        //this.setState({supervisorData: mysupervisor});
        //console.log("depart:", response.data);
        setDepart(response.data);
      })
      .catch((error) => {
        console.log("line 27: ", error);
      });
  }, []);

  const onSubmit = (data) => {
    //console.log(data.departname);

    axios
      .post("http://" + ip.address + ":3001/depart", {
        ward_name: data.departname,
      })
      .then((response) => {
        console.log(response.data);
        setDepart([
          ...depart,
          {
            _id: response.data._id,
            ward_name: response.data.ward_name,
            ispresent: response.data.ispresent,
            createdOn: response.data.createdOn,
          },
        ]);
        //data.departname = "";

        Swal.fire(
          "Data Inserted!",
          "Data has been inserted successfully",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
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
        <h2>All Departments</h2>

        <form
          className="row g-2"
          onSubmit={handleSubmit(onSubmit)}
          //style={{ marginLeft: "150px", marginRight: "150px" }}
        >
          <div className="col-auto mb-4">
            <input
              style={{ width: "450px" }}
              {...register("departname", { required: true })}
              placeholder="Enter new department"
              className="form-control"
            />
            {errors.departname && (
              <p className="text-danger">Department is required.</p>
            )}
          </div>
          <div className="col-auto">
            <button className="btn btn-primary mb-4" type="submit">
              Inserte Depart
            </button>
          </div>
        </form>

        {/* Table */}

        <div className="alert alert-primary" role="alert">
          All Department is available.
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">S#</th>
                <th scope="col">ID Number</th>
                <th scope="col">Department Name</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {depart.map((dep, ind) => {
                return (
                  <tr key={ind}>
                    <th scope="row">{ind + 1}</th>
                    <td>{dep._id}</td>
                    <td>{dep.ward_name}</td>
                    <td>{dep.ispresent}</td>
                    <td>{dep.createdOn}</td>
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
