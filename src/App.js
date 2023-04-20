import "./App.css";
import Login from "./Components/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Expense from "./Components/Body/Expense";
import Profile from "./Components/Pages/Profile";
import EditProfile from "./Components/Pages/EditProfile";
import Reset from "./Components/Pages/Reset";
import { useSelector} from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace="true" />}
        ></Route>
        {!isLoggedIn && <Route path="/login" element={<Login />}></Route>}
        {isLoggedIn && <Route path="/login" element={<Expense />}></Route>}
        {isLoggedIn && <Route path="/expense" element={<Expense />}></Route>}
        {!isLoggedIn && <Route path="/expense" element={<Login />}></Route>}
        {isLoggedIn && <Route path="/profile" element={<Profile />}></Route>}
        {isLoggedIn && (
          <Route path="/editprofile" element={<EditProfile />}></Route>
        )}
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
