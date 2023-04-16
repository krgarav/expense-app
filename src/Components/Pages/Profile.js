import React, { useContext, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import AuthContext from "../../Store/auth-context";
const Profile = () => {
  const authCtx = useContext(AuthContext);
  const fullNameRef = useRef();
  const urlRef = useRef();
  const updateHandler = async (event) => {
    event.preventDefault();
    const enteredFullName = fullNameRef.current.value;
    const enteredUrlName = urlRef.current.value;
    console.log(authCtx.token)
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredFullName,
            photoUrl: enteredUrlName,
            returnSecureToken: true,
          }),
          headers: {
            "Context-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
      console.log(data.idToken);
    } catch (error) {
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
            borderRadius: "10px",
          }}
        >
          <span>
            <p>
              Your Profile is 64% completed.A complete Profile has higher chance
              of landing a job.
              <span style={{ cursor: "pointer" }}>Complete Now</span>
            </p>
          </span>
        </div>
      </div>
      <hr />
      <Container style={{ width: "500px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Contact detail</h2>
          <Button variant="outline-danger">Cancel</Button>
        </div>

        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" ref={fullNameRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Profile Photo URL</Form.Label>
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
