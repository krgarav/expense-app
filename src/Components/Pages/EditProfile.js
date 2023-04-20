import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
const EditProfile = () => {
  return (
    <>
      <Container style={{ width: "500px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Contact detail</h2>
          <Button variant="outline-danger">Cancel</Button>
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <AiFillGithub />
              Full Name
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <TbWorld />
              Profile Photo URL
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default EditProfile;
