import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const loginHandler = () => {
    navigate("/login");
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("clicked");
    const enteredEmail = emailRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
      alert("Verification link sent Successfull");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Container
        style={{
          marginTop: "5%",
          width: "40%",
          padding: "20px",
          boxShadow: "5px 4px 15px 10px #888888",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        <h3 style={{ textAlign: "center", padding: "10px" }}>Password Reset</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>
              Enter the email with which you have registered
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              required
            />
          </Form.Group>
          <Button type="submit" style={{ width: "100%", borderRadius: "20px" }}>
            Send Link
          </Button>
        </Form>
        <Button
          variant="link"
          onClick={loginHandler}
          style={{ textDecoration: "none" }}
        >
          Already a user ? Login
        </Button>
      </Container>
    </>
  );
};

export default Reset;
