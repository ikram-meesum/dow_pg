import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loading page");
    navigate("/supervisor");
  });
  return <div>loading data...</div>;
}
