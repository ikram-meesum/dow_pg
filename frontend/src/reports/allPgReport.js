import React, { useEffect, useState } from "react";
import { ip } from "../component/IpAddress";
import axios from "axios";
import dayjs from "dayjs";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../component/Navbar";
//import { AiOutlineFilePdf } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";

export default function CurrentPG() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    axios
      .get("http://" + ip.address + ":3001/allpg_report")
      .then((response) => {
        setStudentData(response.data);
        //console.log("sudent data:", response.data);
      })
      .catch((error) => {
        console.log("Error occured from current pg report: " + error);
      });
  }, []);

  const getPDF = () => {
    console.log("pdf");

    const doc = new jsPDF({
      orientation: "landscape",
    });
    var totalPagesExp = "{total_pages_count_string}";

    doc.autoTable({
      html: "#my-table",
      styles: { fontSize: 8 },
      margin: { top: 22, left: 10, right: 10 },
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(10, 10, "Dow University of Health Sciences");
        doc.text(10, 18, "All FCPS-II Postgraduate Trainees");

        doc.setFontSize(9);
        let dt = new Date();
        doc.text(
          260,
          18,
          "Print: " +
            dt.getDate() +
            "-" +
            (dt.getMonth() + 1) +
            "-" +
            dt.getFullYear()
        );

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save("all_fcps_pgs.pdf");

    // ----------------- End PDF -------------------
  };

  const getExcel = () => {
    console.log("excel");
  };

  return (
    <div>
      <Navbar />
      <h4 className="mt-3">All FCPS Data</h4>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button type="button" onClick={getPDF} className="btn btn-danger">
          <FaFilePdf /> PDF
        </button>

        <button type="button" onClick={getExcel} className="btn btn-success">
          <BsFillFileEarmarkExcelFill /> Excel
        </button>
      </div>

      <br />
      <br />
      <table id="my-table" className="table table-striped table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">S#</th>
            <th scope="col">DEPARTMENT</th>
            <th scope="col">SUPERVISOR</th>
            <th scope="col">CMS ID</th>
            <th scope="col">TRAINEE NAME</th>
            <th scope="col">FATHER NAME</th>
            <th scope="col">D.O.J</th>
            <th scope="col">D.O.R</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((std, ind) => {
            return (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{std.depart_id.ward_name}</td>
                <td>{std.supervisor_id.super_name}</td>
                <td>{std.cmsid}</td>
                <td>{std.sname}</td>
                <td>{std.fname}</td>
                <td>{dayjs(std.doj).format("YYYY-MM-DD")}</td>
                <td>{dayjs(std.dor).format("YYYY-MM-DD")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
