import React, { useState, useContext } from "react";
import "./LoginForm.css";
import LayoutSign from "../../components/Layouts/LayoutSign.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UserContext.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
          error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
      <LayoutSign>
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">💼</div>
            <h2>Expense Tracker</h2>
            <p>Sign in to manage your finances</p>
          </div>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
                type="text"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Enter your email"
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter your password"
            />

            {error && <p className="error">{error}</p>}

            <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
            >
              Continue without login
            </button>

            <button type="submit" className="primary-button">
              Sign In
            </button>
          </form>

          <div className="footer">
            Don’t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </LayoutSign>
  );
};

export default LoginForm;
