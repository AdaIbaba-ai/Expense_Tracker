import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import LayoutSign from "../../components/Layouts/LayoutSign.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import ProfilePic from "../../components/Inputs/ProfilePic.jsx";
import { validateEmail } from "../../utils/helper.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import uploadImage from "../../utils/uploadImage.js";
import { UserContext } from "../../context/UserContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

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
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
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
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create an Account</h2>
            <p>Join us today by entering your details below.</p>
          </div>

          <form onSubmit={handleSignUp}>
            <ProfilePic image={profilePic} setImage={setProfilePic} />

            <div className="form-row">
              <div className="form-group">
                <Input
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="max mustermann"
                    type="text"
                />
              </div>
              <div className="form-group">
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="maxmustermann@beispiel.com"
                    type="text"
                />
              </div>
            </div>

            <div className="form-group">
              <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="not 123"
                  type="password"
              />
            </div>

            {error && <p className="signup-error">{error}</p>}

            <button type="submit" className="primary-button">
              SIGN UP
            </button>

            <div className="signup-footer">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </LayoutSign>
  );
};

export default SignUpForm;
