import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const Expense = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const profileHandler = () => {
    navigate("/profile", { replace: "true" });
  };

  const verifyHandler = async () => {
    try{
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if(data.error){
      throw data
    }
    console.log(data);
    }catch(error){
      alert(error.message)
      console.log(error)
    }

  };
  return (
    <div>
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
      <hr />
      <Button onClick={verifyHandler}>Verify Email</Button>
    </div>
  );
};
export default Expense;
