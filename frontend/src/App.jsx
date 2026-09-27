import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // Brand Panel
  const BrandPanel = () => {
    return (
      <div className="brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            N
          </div>

          <h1>TASKFLOW</h1>

          <p>
            Login To Your TaskFlow Account
          </p>

          <div className="brand-features">
            <div>
              <span>✓</span>
              Task Management
            </div>

            <div>
              <span>✓</span>
              Progress Tracking
            </div>

            <div>
              <span>✓</span>
              Stay Productive
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Create new account
  const handleSignup = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check existing email
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered!"
      };
    }

    // Create new user ID
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    return {
      success: true,
      message: "Account created successfully!"
    };
  };

  // Login
  const handleLogin = (loginData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === loginData.email.toLowerCase() &&
        user.password === loginData.password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password!"
      };
    }

    // Save logged-in user
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    setLoggedInUser(user);

    return {
      success: true,
      message: "Login successful!"
    };
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setPage("login");
  };

  // If user logged in → Dashboard
  if (loggedInUser) {
    return (
      <Dashboard
        user={loggedInUser}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="auth-container">

      {/* Left Brand Section */}
      <BrandPanel />

      {/* Right Login / Signup Section */}
      <div className="form-section">

        {page === "login" ? (
          <Login
            onLogin={handleLogin}
            switchToSignup={() => setPage("signup")}
          />
        ) : (
          <Signup
            onSignup={handleSignup}
            switchToLogin={() => setPage("login")}
          />
        )}

      </div>
    </div>
  );
}

export default App;