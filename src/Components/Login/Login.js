import React, { useRef, useContext, useState } from "react";
import NavBar from "../Header/NavBar";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../../Store/auth-context";

const Login = () => {
  const [islogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const toggleHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!islogin) {
      const enteredConfirmPassword = confirmPasswordRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Password and Confirm Password does not Match");
      } else {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
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

          alert("Signed up successfully");
          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        } catch (error) {
          alert(error.message);
        }
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
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
        authCtx.login(data.idToken);
        alert("Logged In successfully");
        
        emailRef.current.value = "";
        passwordRef.current.value = "";
      
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <NavBar />
      <Container
        style={{ width: "40%", border: "1px solid Black", padding: "20px" }}
      >
        <h4 style={{ textAlign: "center", padding: "10px" }}>
          {" "}
          {islogin ? "Login" : "Sign up"}
        </h4>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </Form.Group>
          {!islogin && (
            <Form.Group
              className="mb-3"
              controlId="formBasicPasswordConfirmation"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
          )}
          <Button
            style={{ width: "100%", borderRadius: "20px" }}
            variant="primary"
            type="submit"
          >
            {islogin ? "Login" : "Sign up"}
          </Button>
        </Form>
      </Container>
      <br />
      <Container
        style={{
          width: "40%",
          border: "1px solid Black",
          padding: "10px",
          backgroundColor: "#E8EEF1",
        }}
      >
        <button
          onClick={toggleHandler}
          style={{
            backgroundColor: "#E8EEF1",
            borderColor: "none",
            padding: "10px",
            width: "100%",
          }}
        >
          {islogin
            ? "Dont have an account?Create Account"
            : "Have an account?Login"}
        </button>
      </Container>
    </>
  );
};
export default Login;
