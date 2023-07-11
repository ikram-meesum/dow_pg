import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export default function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [rain, setRain] = useState(false);
  const [isDisable, setDisable] = useState(false);

  const onSubmit = (data) => {
    //console.log(data);
    if (data.username === "ikram@gmail.com" && data.password === "12345") {
      setDisable(true);
      setRain(true);

      setTimeout(() => {
        navigate("/main");
      }, 7000);
    } else {
      Swal.fire(
        "Authentication Failed",
        "Please enter valid username or password",
        "error"
      );
    }
  };

  //console.log(watch("username"), watch("password")); // print on console

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={{ opacity: 0 }}
      className="d-flex flex-row align-items-center justify-content-center vh-100 text-center"
      style={{ backgroundColor: "#2980b9" }}
    >
      <div className="" style={{ width: "40%" }}>
        <h1 className="text-white">
          No stack to fullstack
          <br /> developer
        </h1>
      </div>

      <div
        className=""
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "60%",
          paddingTop: "15%",
        }}
      >
        <h3>User Credential</h3>
        <p>Please login to get access the application.</p>
        {rain && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ marginLeft: "150px", marginRight: "150px" }}
        >
          <div className="form-group mb-4">
            <input
              {...register("username", { required: true })}
              placeholder="Enter username"
              className="form-control"
            />
            {errors.username && (
              <p className="text-danger">Username is required.</p>
            )}
          </div>

          <div className="form-group mb-4">
            <input
              {...register("password", { required: true })}
              placeholder="Valid password"
              className="form-control"
              type="password"
            />
            {errors.password && (
              <p className="text-danger">Please enter a valid password.</p>
            )}
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              disabled={isDisable}
              type="submit"
            >
              Login Please
            </button>
          </div>
        </form>
      </div>
    </motion.main>
  );
}
