import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./Input.css";

const Input = ({ label, value, onChange, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className="input-label">{label}</label>

            <div className="input-box">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className="input-field"
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === "password" && (
                    showPassword ? (
                        <FaRegEye className="input-eye" onClick={toggleShowPassword} />
                    ) : (
                        <FaRegEyeSlash className="input-eye" onClick={toggleShowPassword} />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
