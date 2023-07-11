import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ip } from "../component/IpAddress";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function EditFCPS() {
  let { id } = useParams();
  const navigate = useNavigate();

  let [DEPARTID, SETDEPARTID] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [depart, setDepart] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  //const [departID, setDepartID] = useState("");

  const handleChange = (event) => {
    //console.log("LINE 72: ", event.target.value);
    SETDEPARTID(event.target.value);

    let path =
      "http://" + ip.address + ":3001/depart_supervisor/" + event.target.value;

    axios
      .get(path)
      .then((response) => {
        let mysupervisor = response.data;
        console.log("supervisor", mysupervisor);
        setSupervisor(mysupervisor);
      })
      .catch((error) => {
        console.log("Error occured from get supervisors :", error);
      });
  };

  const getDepart = () => {
    axios
      .get("http://" + ip.address + ":3001/depart")
      .then((response) => {
        setDepart(response.data);
      })
      .catch((error) => {
        console.log("Error from get depart function: ", error);
      });
  };

  useEffect(() => {
    getDepart();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "http://" + ip.address + `:3001/editfcps/${id}`
      );
      const data = await response.json();
      console.log("FETCH DATA: ", data);
      SETDEPARTID(data.depart_id);

      return {
        studentname: data.sname,
        fathername: data.fname,
        email: data.email,
        mobile: data.mobile,

        doj: dayjs(data.doj).format("YYYY-MM-DD"),
        dor: dayjs(data.dor).format("YYYY-MM-DD"),
        cnic: data.cnic,
        dob: dayjs(data.do_birth).format("YYYY-MM-DD"),
        cmsid: data.cmsid,
        nationality: data.nationality,
        pmdc: data.pmdc_no,

        rtmc: data.rtmc_no,
        gender: data.gender,
        //depart_id: data.depart_id,
        supervisor: data.supervisor_id,
        address: data.address,
        domicile: data.domicile,
        accountno: data.account_no,
        govt: data.govt,

        present: data.ispresent,
        religion: data.religion,
        remarks: data.remarks,
      };
    },
  });

  //------------------- INSERT DATA --------------------

  const onSubmit = (data) => {
    console.log("DOB: ", data.dob);

    axios
      .put("http://" + ip.address + `:3001/editfcps/${id}`, {
        studentname: data.studentname,
        fathername: data.fathername,
        email: data.email,
        mobile: data.mobile,
        doj: data.doj,
        dor: data.dor,
        cnic: data.cnic,
        dob: data.dob,
        cmsid: data.cmsid,
        nationality: data.nationality,
        pmdc: data.pmdc,
        rtmc: data.rtmc,
        gender: data.gender,
        depart_id: DEPARTID,
        supervisor_id: data.supervisor,
        address: data.address,
        domicile: data.domicile,
        account_no: data.accountno,
        govt: data.govt,
        ispresent: data.present,
        religion: data.religion,
        remarks: data.remarks,
      })
      .then((response) => {
        console.log("UPDATE PUT: ", response.data);
      })
      .catch((error) => console.log(error));

    navigate("/currentfcps");
  };

  return (
    <main>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        exit={{ opacity: 0 }}
        className="container"
      >
        <h3>Edit FCPS-II Trainee Record</h3>

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
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Date of Relieving</label>
            <input
              {...register("dor", { required: true })}
              className="form-control"
              type="date"
            />
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
              value={DEPARTID}
              className="form-select"
              onChange={handleChange}
            >
              <option>Select Depart</option>
              {depart.map((itm, ind) => {
                return (
                  <option selected key={ind} value={itm._id}>
                    {itm.ward_name}
                  </option>
                );
              })}
            </select>
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
            <select className="form-select" {...register("govt")}>
              <option value="NO">NO</option>
              <option value="YES">YES</option>
            </select>
            {errors.govt && <p className="text-danger">Type Trainee Status.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Present Status</label>
            <select className="form-select" {...register("present")}>
              <option>WORKING</option>
              <option>COMPLETE</option>
              <option>LEFT</option>
              <option>RESIGN</option>
            </select>
            {errors.present && <p className="text-danger">Please select.</p>}
          </div>

          <div className="col-md-4 mb-4">
            <label className="form-label">Religion</label>
            <select className="form-select" {...register("religion")}>
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
              UPDATE RECORD
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
