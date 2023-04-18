import React, { useContext, useRef } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import ListContext from "../../Store/list-context";

const Expense = () => {
  const authCtx = useContext(AuthContext);
  const listCtx = useContext(ListContext);
  const navigate = useNavigate();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const profileHandler = () => {
    navigate("/profile", { replace: "true" });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    const itemObj = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    listCtx.addListItem(itemObj);
  };
  const logoutHandler = () => {
    authCtx.logout();
  };
  const verifyHandler = async () => {
    try {
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
      if (data.error) {
        throw data;
      }
      console.log(data);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  const deleteHandler = (item) => {
    const description = item.target.parentNode.parentNode.children[1].innerText;
    
    listCtx.removeListItem(description);
  };
  const editHandler = (item) => {
    const price = item.target.parentNode.parentNode.children[0].innerText;
    const description = item.target.parentNode.parentNode.children[1].innerText;
    const category = item.target.parentNode.parentNode.children[2].innerText;
    amountRef.current.value = price;
    descriptionRef.current.value = description;
    categoryRef.current.value = category;
    listCtx.removeListItem(description);
  };
  const listItems = listCtx.listItems.map((item) => {
    return (
      <ListGroup.Item as="li" key={item.description}>
        <Container>
          <Row>
            <Col>{item.amount}</Col>
            <Col>{item.description}</Col>
            <Col>{item.category}</Col>
            <Col>
              <Button onClick={editHandler} variant="outline-warning">
                Edit
              </Button>
            </Col>
            <Col>
              <Button onClick={deleteHandler} variant="outline-danger">
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Welcome To Expense Tracker!!!</h1>
        <div>
          <span>
            <p>
              Your Profile is Incomplete.{" "}
              <span onClick={profileHandler} style={{ cursor: "pointer" }}>
                Complete Now
              </span>
            </p>
          </span>
          <Button
            style={{ float: "right" }}
            onClick={logoutHandler}
            variant="danger"
          >
            Logout
          </Button>
        </div>
      </div>
      <hr />
      <Button onClick={verifyHandler}>Verify Email</Button>

      <Container
        style={{
          width: "70%",
          backgroundColor: "#99CCFF",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h1>Add Items</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount "
              ref={amountRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add description"
              ref={descriptionRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select ref={categoryRef}>
              <option>Food</option>
              <option>Petrol</option>
              <option>Salary</option>
            </Form.Select>
          </Form.Group>

          <Button style={{ margin: "10px" }} variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Container>
      <Container style={{ textAlign: "center" }}>
        <h1>Expense Items</h1>
        <ListGroup as="ul">{listItems}</ListGroup>
      </Container>
    </div>
  );
};
export default Expense;
