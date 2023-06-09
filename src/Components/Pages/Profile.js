import React, { useEffect, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Profile = () => {
const bearer_token = useSelector((state)=>state.auth.bearer_token);
  const navigate = useNavigate();
  const fullNameRef = useRef();
  const urlRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: bearer_token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      fullNameRef.current.value = data.users[0].displayName;
      urlRef.current.value = data.users[0].photoUrl;
    };
    fetchData();
  }, [bearer_token]);
  const cancelHandler = () => {
    navigate("/expense");
  };
  const updateHandler = async (event) => {
    event.preventDefault();
    const enteredFullName = fullNameRef.current.value;
    const enteredUrlName = urlRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: bearer_token,
            displayName: enteredFullName,
            photoUrl: enteredUrlName,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw data;
      }
      console.log(data.displayName, data.photoUrl);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <p>Winners never quit , quitters never win</p>
        <div
          style={{
            display: "flex",
            backgroundColor: "#FFE4E1",
            padding: "5px 10px",
            borderRadius: "40px",
          }}
        >
          <span>
            <p>
              Your Profile is 64% completed.A complete Profile has higher chance
              of landing a job.
            </p>
          </span>
        </div>
      </div>
      <hr />
      <Container style={{ width: "500px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Contact detail</h2>
          <Button onClick={cancelHandler} variant="outline-danger">
            Cancel
          </Button>
        </div>

        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <AiFillGithub />
              Full Name
            </Form.Label>
            <Form.Control type="text" ref={fullNameRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <TbWorld />
              Profile Photo URL
            </Form.Label>
            <Form.Control type="text" ref={urlRef} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
