import React from "react";
import Navbar from "../component/Navbar";
import { motion } from "framer-motion";

export default function Main() {
  return (
    <div>
      <Navbar />
      {/* Start Card */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        exit={{ opacity: 0 }}
        className="pt-5"
        style={{ backgroundColor: "#f5f5f5", height: "100vh" }}
      >
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="card  mb-3">
                <div className="card-header text-bg-danger">
                  1. Current FCPS-II Trainees
                </div>
                <div className="card-body">
                  <h5 className="card-title">Current FCPS-II Trainees</h5>
                  <p className="card-text">
                    See and search edit and detail of all FCPS-II Trainees.
                  </p>
                </div>
              </div>
            </div>
            {/* Second column */}
            <div className="col">
              <div className="card mb-3">
                <div className="card-header text-bg-dark">
                  2. Previous FCPS-II Trainees
                </div>
                <div className="card-body">
                  <h5 className="card-title">Previous card title</h5>
                  <p className="card-text">
                    See detail and export data of previous FCPS-II Trainees
                    List.
                  </p>
                </div>
              </div>
            </div>

            {/* Third column */}
            <div className="col">
              <div className="card mb-3">
                <div className="card-header text-bg-success">
                  3. Current MCPS Trainees
                </div>
                <div className="card-body">
                  <h5 className="card-title">Current MCPS Trainees</h5>
                  <p className="card-text">
                    See detail and export data of current MCPS Trainees List.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND GRID ROW */}

        <div className="container text-center mt-4">
          <div className="row">
            <div className="col">
              <div className="card mb-3">
                <div className="card-header text-bg-primary">
                  4. Previous MCPS Trainees
                </div>
                <div className="card-body">
                  <h5 className="card-title">Previous MCPS Trainees</h5>
                  <p className="card-text">
                    See detail and export data of previous MCPS Trainees List.
                  </p>
                </div>
              </div>
            </div>
            {/* Second column */}
            <div className="col">
              <div className="card mb-3">
                <div className="card-header text-bg-warning">
                  5. Export all data in PDF
                </div>
                <div className="card-body">
                  <h5 className="card-title">Export all data in PDF</h5>
                  <p className="card-text">
                    You can export all record from database in PDF format.
                  </p>
                </div>
              </div>
            </div>

            {/* Third column */}
            <div className="col">
              <div className="card mb-3">
                <div className="card-header text-bg-info">
                  6. Export all data in excel
                </div>
                <div className="card-body">
                  <h5 className="card-title">Export all data in excel</h5>
                  <p className="card-text">
                    You can export all data in excel format easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
