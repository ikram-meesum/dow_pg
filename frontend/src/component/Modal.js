import React from "react";
//import NoImage from "../component/no_images.png";
import dayjs from "dayjs";

export default function Modal(props) {
  return (
    <main>
      {/* talble end */}
      <div
        className="modal fade"
        id={"exampleModal" + props.id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-danger"
                id="exampleModalLabel"
              >
                DR {props.pgname}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* start card */}
              <h5 className="card-title text-success">{props.fname}</h5>
              Email <small className="text-body-secondary">{props.email}</small>
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <td scope="col">CNIC</td>
                    <td scope="col">Mobile</td>
                    <td scope="col">Domicile</td>
                    <td scope="col">Account</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      <small className="text-body-secondary">
                        {props.cnic}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.mobile}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.domicile}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.account}
                      </small>
                    </td>
                  </tr>
                  <tr className="table-light">
                    <td scope="row">Govt</td>
                    <td>Date of Birth</td>
                    <td>CMSID</td>
                    <td>Nationality</td>
                  </tr>

                  <tr>
                    <td>
                      <small className="text-body-secondary">
                        {props.govt}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {dayjs(props.do_birth).format("YYYY-MM-DD")}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.cmsid}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.nationality}
                      </small>
                    </td>
                  </tr>
                  <tr className="table-light">
                    <td>PMDC</td>
                    <td>RTMC</td>
                    <td>Gender</td>
                    <td>Present</td>
                  </tr>
                  <tr>
                    <td>
                      <small className="text-body-secondary">
                        {props.pmdc_no}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.rtmc_no}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.gender}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.ispresent}
                      </small>
                    </td>
                  </tr>

                  <tr className="table-light">
                    <td>Religion</td>
                    <td>Remarks</td>
                    <td colSpan={2}></td>
                  </tr>
                  <tr>
                    <td>
                      <small className="text-body-secondary">
                        {props.religion}
                      </small>
                    </td>
                    <td>
                      <small className="text-body-secondary">
                        {props.remarks}
                      </small>
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                  <tr className="table-light">
                    <td colSpan={4}>
                      Address:{" "}
                      <small className="text-body-secondary">
                        {props.address}
                      </small>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* table end */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
