import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";
import JoblyApi from "./api";
import NavBar from "./components/NavBar";
import RoutesList from "./RoutesList";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import './App.css';




function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);

  // Whenever the token changes, get user info
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {

          const { username } = jwtDecode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }

    getCurrentUser();
  }, [token]);

  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      return { success: false, err };
    }
  }


  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Signup failed:", err);
      return { success: false, err };
    }
  }


  function logout() {
    setToken(null);
    setCurrentUser(null);
  }



  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <NavBar logout={logout} />
        <RoutesList login={login} signup={signup} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

