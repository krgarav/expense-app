import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Expense = () => {
  const navigate = useNavigate();
  const profileHandler = () => {
    navigate("/profile", { replace: "true" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Welcome To Expense Tracker!!!</h1>
      <div style={{ display: "flex" }}>
        <span>
          <p>
            Your Profile is Incomplete.{" "}
            <span onClick={profileHandler} style={{ cursor: "pointer" }}>
              Complete Now
            </span>
          </p>
        </span>
      </div>
    </div>
  );
};
export default Expense;
