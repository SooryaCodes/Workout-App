import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="font-Poppins bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <div className="w-full h-full-2 flex items-start justify-center ">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={user ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={user ? <Edit /> : <Navigate to="/login" />}
          />
          {/* //Auth// */}
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
