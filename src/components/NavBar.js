import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <>
        <NavLink to="/companies">Companies</NavLink> |
        <NavLink to="/jobs">Jobs</NavLink> |
        <NavLink to="/profile">Profile</NavLink> |
        <NavLink to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <NavLink to="/login">Login</NavLink> |
        <NavLink to="/signup">Signup</NavLink>
      </>
    );
  }

  return (
    <nav>
      <NavLink to="/">Jobly</NavLink> |
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default NavBar;

