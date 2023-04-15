import { useContext } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
// import {Routes} from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./Store/auth-context";
import Expense from "./Components/Body/Expense";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace="true" />}></Route>
      {!authCtx.isLoggedIn && <Route path="/login" element={<Login />}></Route>}
      {authCtx.isLoggedIn && (
        <Route path="/login" element={<Expense />}></Route>
      )}
    </Routes>
  );
}

export default App;
