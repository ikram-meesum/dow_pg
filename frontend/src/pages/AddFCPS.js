import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import axios from "axios";
import { ip } from "../component/IpAddress";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function AddFCPS() {
  const {
    register,
    //watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const [departID, setDepartID] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setDepartID(event.target.value);

    let path =
      "http://" + ip.address + ":3001/depart_supervisor/" + event.target.value;

    axios
      .get(path)
      .then((response) => {
        let mysupervisor = response.data;
        //this.setState({ supervisorData: mysupervisor });
        console.log("supervisor", mysupervisor);
        setSupervisor(mysupervisor);
      })
      .catch((error) => {
        console.log("Error occured from get supervisors :", error);
      });
  };

  useEffect(() => {
    getDepart();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    if (data.depart == "Select Depart") {
      alert("Please a valid department");
    } else {
      axios
        .post("http://" + ip.address + ":3001/addfcps", {
          txtsname: data.studentname,
          txtfname: data.fathername,
          txtemail: data.email,
          txtmobile: data.mobile,
          txtdoj: data.doj,
          txtdor: data.dor,
          txtdomicile: data.domicile,
          txtaccount_no: data.accountno,
          txtcnic: data.cnic,
          txtdob: data.dob,
          txtcmsid: data.cmsid,
          txtnationality: data.nationality,
          txtpmdc: data.pmdc,
          txtrtmc: data.rtmc,
          cmbgender: data.gender,
          cmbdepart: departID, //---------------------------
          cmbsupervisor: data.supervisor,
          txtaddress: data.address,
          cmbgovt: data.govt,
          cmbpresent: data.present,
          txtremarks: data.remarks,
          cmbreligion: data.religion,
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
      navigate("/currentfcps");
    }
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
        <h3>Add New FCPS-II Trainee</h3>

        <form
          style={{
            border: "1px solid #cccccc",
            borderRadius: "7px",
            padding: "15px",
          }}
          className="row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-md-4 mb-4">
            <label className="form-label">Student Full Name</label>
            <input
              {...register("studentname", { required: true })}
              placeholder="Enter student name"
              className="form-control"
            />
            {errors.studentname && (
              <p className="text-danger">Student name is required.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Father Name</label>
            <input
              {...register("fathername", { required: true })}
              placeholder="Enter father name"
              className="form-control"
            />
            {errors.fathername && (
              <p className="text-danger">Father name is required.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Valid Email</label>
            <input
              {...register("email", { required: true })}
              placeholder="Valid email"
              className="form-control"
            />
            {errors.email && (
              <p className="text-danger">Please enter email address.</p>
            )}
          </div>

          {/* Second Row */}

          <div className="col-md-4 mb-4">
            <label className="form-label">Mobile</label>
            <input
              {...register("mobile", { required: true })}
              placeholder="Mobile Number"
              className="form-control"
            />
            {errors.mobile && (
              <p className="text-danger">Please enter mobile number.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Date of Joining</label>
            <input
              {...register("doj", { required: true })}
              className="form-control"
              type="date"
            />
            {errors.doj && (
              <p className="text-danger">Select date of joining.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Date of Relieving</label>
            <input
              {...register("dor", { required: true })}
              className="form-control"
              type="date"
            />
            {errors.dor && (
              <p className="text-danger">Select date of relieving.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">CNIC</label>
            <input
              {...register("cnic", { required: true })}
              placeholder="Mobile Number"
              className="form-control"
            />
            {errors.cnic && <p className="text-danger">Valid CNIC number.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Date of Birth</label>
            <input
              {...register("dob", { required: true })}
              className="form-control"
              type="date"
            />
            {errors.dob && <p className="text-danger">Select date of birth.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">CMS ID</label>
            <input
              {...register("cmsid", { required: true })}
              placeholder="Enter CMS ID"
              className="form-control"
            />
            {errors.cmsid && (
              <p className="text-danger">Please enter valid CMS ID.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Nationality</label>
            <input
              {...register("nationality", { required: true })}
              placeholder="Enter Nationality"
              className="form-control"
            />
            {errors.nationality && (
              <p className="text-danger">Please enter nationality.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">PMDC Number</label>
            <input
              {...register("pmdc", { required: true })}
              placeholder="Enter PMDC Number"
              className="form-control"
            />
            {errors.pmdc && <p className="text-danger">Enter PMDC Number.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">RTMC</label>
            <input
              {...register("rtmc", { required: true })}
              placeholder="Enter RTMC Number"
              className="form-control"
            />
            {errors.rtmc && <p className="text-danger">Enter RTMC Number.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Gender</label>
            <select className="form-select" {...register("gender")}>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
            {errors.gender && <p className="text-danger">Select Gender.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              onChange={handleChange}
              //onChange={getWardId}
              // onChange={(e) => {
              //   department.onChange(e); // react hook form onChange
              //   console.log("avc", e.target.value);
              //   console.log("Here would go the my onChange"); // my onChange
              // }}
              // onChange={(e) => {
              //   console.log(e.target.value);
              // }}

              //onBlur={department.onBlur}
              //{...register("department")}
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
            {errors.depart && (
              <p className="text-danger">Select Valid Department.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Valid Supervisor</label>
            <select className="form-select" {...register("supervisor")}>
              <option>Select Supervisor</option>
              {supervisor.map((itm, ind) => {
                return (
                  <option key={ind} value={itm._id}>
                    {itm.super_name}
                  </option>
                );
              })}
            </select>
            {errors.supervisor && (
              <p className="text-danger">Select Valid Supervisor.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Address</label>
            <input
              {...register("address", { required: true })}
              placeholder="Enter Valid Address"
              className="form-control"
            />
            {errors.address && (
              <p className="text-danger">Rasidential Address.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Domicile</label>
            <input
              {...register("domicile", { required: true })}
              placeholder="Enter Sindh Domicile"
              className="form-control"
            />
            {errors.domicile && (
              <p className="text-danger">Enter Sindh Domicle.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Account Number</label>
            <input
              {...register("accountno", { required: true })}
              placeholder="Type Account Number"
              className="form-control"
            />
            {errors.accountno && (
              <p className="text-danger">Type Account Number.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Goverment</label>
            <select
              className="form-select"
              defaultValue={"NO"}
              {...register("govt")}
            >
              <option value="NO">NO</option>
              <option value="YES">YES</option>
            </select>
            {errors.govt && <p className="text-danger">Type Trainee Status.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Present Status</label>
            <select
              className="form-select"
              defaultValue={"NO"}
              {...register("present")}
            >
              <option>WORKING</option>
              <option>COMPLETE</option>
              <option>LEFT</option>
              <option>RESIGN</option>
            </select>
            {errors.present && <p className="text-danger">Please select.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Religion</label>
            <select
              className="form-select"
              //defaultValue={"NO"}
              {...register("religion")}
            >
              <option value="Muslim">MUSLIM</option>
              <option value="Non Muslim">NON MUSLIM</option>
            </select>
            {errors.religion && (
              <p className="text-danger">Please select religion.</p>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Remarks</label>
            <input
              {...register("remarks", { required: true })}
              placeholder="Remarks if any"
              className="form-control"
            />
            {errors.remarks && (
              <p className="text-danger">Enter remarks if any.</p>
            )}
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Insert New Record
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
