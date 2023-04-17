import { useContext } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
// import {Routes} from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./Store/auth-context";
import Expense from "./Components/Body/Expense";
import NavBar from "./Components/Header/NavBar";
import Profile from "./Components/Pages/Profile";
import EditProfile from "./Components/Pages/EditProfile";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace="true" />}
        ></Route>
        {!authCtx.isLoggedIn && (
          <Route path="/login" element={<Login />}></Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/login" element={<Expense />}></Route>
        )}
         {authCtx.isLoggedIn && (
          <Route path="/profile" element={<Profile />}></Route>
        )}
         {authCtx.isLoggedIn && (
          <Route path="/editprofile" element={<EditProfile />}></Route>
        )}
      </Routes>
    
    </>
  );
}

export default App;
