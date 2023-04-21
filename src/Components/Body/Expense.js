import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-reducer";
import { expenseAction } from "../../Store/expense-reducer";
import classes from "./Expense.module.css";

const Expense = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const listItem = useSelector((state) => state.expense.expense);
  const bearer_token = useSelector((state) => state.auth.bearer_token);
  const totalAmt = useSelector((state) => state.expense.totalAmount);
  const emailverify = useSelector((state) => state.auth.email_verified);

  const dispatch = useDispatch();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const length = listItem.length;
  useEffect(() => {
    const data = async () => {
      let initialExpense = [];
      const response = await fetch(
        "https://expense-app-e491d-default-rtdb.firebaseio.com/items.json"
      );
      const data = await response.json();

      const length = Object.keys(data).length;
      const item = Object.entries(data)[length - 1];
      initialExpense = item[1].expense;
      dispatch(expenseAction.addInitial(initialExpense));
    };
    data();
    const verifyEmail = async () => {
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
      dispatch(authActions.verify(data.users[0].emailVerified));
    };
    verifyEmail();
  }, []);

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
    dispatch(expenseAction.addExpense(itemObj));
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const verifyHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDjLyQ010cmXK_RdE626y3mSLl1E1Y03-c",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: bearer_token,
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
    dispatch(expenseAction.removeExpense(description));
  };
  const editHandler = (item) => {
    const price = item.target.parentNode.parentNode.children[0].innerText;
    const description = item.target.parentNode.parentNode.children[1].innerText;
    const category = item.target.parentNode.parentNode.children[2].innerText;
    amountRef.current.value = price;
    descriptionRef.current.value = description;
    categoryRef.current.value = category;
    dispatch(expenseAction.removeExpense(description));
  };
  const toggleHandler = () => {
    
    setDarkMode((prevInput) => !prevInput);
  };
  const downloadHandler = ()=>{
    fetch("https://expense-app-e491d.firebaseio/.json?download=expensefile.txt")
  }
  const listItems = listItem.map((item) => {
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
    <div className={darkMode ? classes.body : ""}>
      <div className={classes.firstdiv}>
        <h1>Welcome To Expense Tracker!!!</h1>
        <div>
          <span className={classes.spanclass}>
            <p>
              Your Profile is Incomplete.
              <NavLink to="/profile">Complete Now</NavLink>
            </p>
          </span>
          {totalAmt > 10000 &&!showButton && (
            <Button
              onClick={() => {
                setShowButton((prevInput) => !prevInput);
              }}
              variant="success"
            >
              Activate Premium
            </Button>
          )}
          
          {showButton && (
            <Form>
              <Form.Check
                type="switch"
                label={darkMode ? "Light Mode" : "Dark Mode"}
                onClick={toggleHandler}
              />
              <Button onClick={downloadHandler} variant="outline-success">Download</Button>
            </Form>
          )}
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
      {!emailverify && (
        <Button onClick={verifyHandler}>
          Verify Email To Access ExpenseTracker
        </Button>
      )}
      {emailverify && (
        <div>
          <Container
            style={{
              width: "70%",
              backgroundColor: "#99CCFF",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <h1>Add Items</h1>

            <Form
              onSubmit={submitHandler}
              style={{ width: "60%", textAlign: "center", marginLeft: "20%" }}
            >
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
                  <option value="">--Please choose an option--</option>
                  <option value="Food">Food</option>
                  <option value="Petrol"> Petrol</option>
                  <option value="Salary">Salary</option>
                </Form.Select>
              </Form.Group>

              <Button
                style={{ margin: "10px" }}
                variant="primary"
                type="submit"
              >
                Add
              </Button>
            </Form>
          </Container>

          {length > 0 && (
            <Container style={{ textAlign: "center" }}>
              <h1>Expense Items</h1>
              <ListGroup as="ul">{listItems}</ListGroup>
            </Container>
          )}
        </div>
      )}
    </div>
  );
};
export default Expense;
