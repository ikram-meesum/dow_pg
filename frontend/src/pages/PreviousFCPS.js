import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { ip } from "../component/IpAddress";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { BsPencilFill } from "react-icons/bs";
//import { AiFillDelete } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import Modal from "../component/Modal";
import { Audio } from "react-loader-spinner";
import { motion } from "framer-motion";

export default function PreviousFCPS() {
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  async function getStudent() {
    setIsLoading(true);
    const response = await fetch("http://" + ip.address + ":3001/nopresent");
    const results = await response.json();
    console.log("data", results);
    setStudent(results);
    setIsLoading(false);
  }

  useEffect(() => {
    getStudent();
  }, []);

  const lowercasedFilter = filter.toLowerCase();

  const filteredData = student.filter((item) => {
    if (
      (item["sname"] &&
        item["sname"].toLowerCase().includes(lowercasedFilter)) ||
      (item["fname"] &&
        item["fname"].toLowerCase().includes(lowercasedFilter)) ||
      (item["depart_id"] &&
        item["depart_id"].ward_name &&
        item["depart_id"].ward_name.toLowerCase().includes(lowercasedFilter)) ||
      (item["supervisor_id"] &&
        item["supervisor_id"].super_name &&
        item["supervisor_id"].super_name
          .toLowerCase()
          .includes(lowercasedFilter))
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <main>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        exit={{ opacity: 0 }}
        className="mt-4"
        style={{ marginLeft: "7px", marginRight: "7px" }}
      >
        <h2>Previous FCPS-II Trainees</h2>

        <div className="mb-3">
          <input
            type="text"
            value={filter}
            className="form-control"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Search any"
          />
        </div>

        <Link className="btn btn-primary mb-4" to={"/currentfcps"}>
          Go Back
        </Link>

        <div className="alert alert-danger text-center p-2" role="alert">
          All FCPS-II Previous Trainees Records.
        </div>

        <div className="d-flex align-items-center justify-content-center">
          {isLoading === true ? (
            <Audio
              className=""
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          ) : (
            ""
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">S#</th>
                <th scope="col">DEARTMENT</th>
                <th scope="col">SUPERVISOR NAME</th>
                <th scope="col">PG NAME</th>
                <th scope="col">FATHER NAME</th>
                <th scope="col">MOBILE</th>
                <th scope="col">D.O.J</th>
                <th scope="col">D.O.R</th>

                {/* <th scope="col">ED</th> */}
                <th scope="col">DT</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((std, ind) => {
                return (
                  <tr key={ind}>
                    <th scope="row">{ind + 1}</th>
                    <td>{std.depart_id.ward_name}</td>
                    <td>{std.supervisor_id.super_name}</td>
                    <td>{std.sname}</td>
                    <td>{std.fname}</td>
                    <td>{std.mobile}</td>
                    <td>{dayjs(std.doj).format("YYYY-MM-DD")}</td>
                    <td>{dayjs(std.dor).format("YYYY-MM-DD")}</td>
                    {/* <td>
                      <Link to={"/main"}>
                        <BsPencilFill color="#f53b57" />
                      </Link>
                    </td> */}
                    <td>
                      <FaClipboardList
                        color="#3c40c6"
                        //className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target={"#exampleModal" + std._id}
                      />

                      <Modal
                        id={std._id}
                        pgname={std.sname}
                        fname={std.fname}
                        email={std.email}
                        mobile={std.mobile}
                        domicile={std.domicile}
                        account={std.account_no}
                        cnic={std.cnic}
                        do_birth={std.do_birth}
                        cmsid={std.cmsid}
                        nationality={std.nationality}
                        pmdc_no={std.pmdc_no}
                        rtmc_no={std.rtmc_no}
                        gender={std.gender}
                        govt={std.govt}
                        address={std.address}
                        ispresent={std.ispresent}
                        religion={std.religion}
                        remarks={std.remarks}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  );
}
