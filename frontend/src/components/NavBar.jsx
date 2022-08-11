import {
  Navbar,
  Button,
  DarkThemeToggle,
  Flowbite,
  Avatar,
} from "flowbite-react";
import React, { useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { WorkoutContext } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
const {setWorkouts} = useContext(WorkoutContext)
  const handleBtnClick = () => {
    if (user) {
      logout();
      setWorkouts([])
    } else {
      navigate("/login");
    }
  };
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand>
        <Link to={"/"}>
          {user ? (
            <Avatar rounded={true}>
              <div className="space-y-1 w-20 sm:w-auto truncate font-medium dark:text-white">
                {user?.name}
              </div>
            </Avatar>
          ) : (
            <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
              FitEx
            </span>
          )}
        </Link>
      </Navbar.Brand>
      <div className="flex gap-2 sm:gap-5 md:order-2">
        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>
        <Button onClick={handleBtnClick}>{user ? "Logout" : "Login"}</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={location.pathname === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={location.pathname === "/create"}>
          <Link to="/create">Create</Link>
        </Navbar.Link>
        {!user && (
          <>
            <Navbar.Link active={location.pathname === "/signup"}>
              <Link to="/signup">Signup</Link>
            </Navbar.Link>
            <Navbar.Link active={location.pathname === "/login"}>
              <Link to="/login">Login</Link>
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
