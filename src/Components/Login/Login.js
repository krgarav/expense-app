import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NavBar from "../Header/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-reducer";
const Login = () => {
  const dispatch = useDispatch();
  const [islogin, setIsLogin] = useState(true);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const toggleHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const eyeHandler = () => {
    setShow((prevState) => !prevState);
  };
  const forgotHandler = () => {
    navigate("/reset");
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
        dispatch(authActions.login(data.idToken));
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
        style={{
          marginTop: "5%",
          width: "40%",
          padding: "20px",
          boxShadow: "5px 4px 15px 10px #888888",
        }}
      >
        <h3 style={{ textAlign: "center", padding: "10px" }}>
          {" "}
          {islogin ? "Login" : "Sign up"}
        </h3>
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
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ position: "relative" }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={show ? "text" : "password"}
              placeholder="Password"
              ref={passwordRef}
              required
            ></Form.Control>
            <p
              style={{
                position: "absolute",
                top: "40px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={eyeHandler}
            >
              {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </p>
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
          {islogin && (
            <Button
              onClick={forgotHandler}
              variant="link"
              style={{
                textDecoration: "none",
                padding: "10px",
                width: "100%",
              }}
            >
              Forgot your password?
            </Button>
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
        <Button
          variant="link"
          onClick={toggleHandler}
          style={{
            textDecoration: "none",
            backgroundColor: "#E8EEF1",
            borderColor: "none",
            padding: "10px",
            width: "100%",
          }}
        >
          {islogin
            ? "Dont have an account?Create Account"
            : "Have an account?Login"}
        </Button>
      </Container>
    </>
  );
};
export default Login;
