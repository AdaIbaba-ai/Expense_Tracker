import React, { useEffect, useState } from "react";
import Input from "../Inputs/Input.jsx";
import Emoji from "../Emoji.jsx";
import "./Income.css";

const AddIncomeDetail = ({ onAddIncome, initialData = null, isEditMode = false }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });


    useEffect(() => {
        if (initialData) {
            setIncome({
                _id: initialData._id, // für Update wichtig
                source: initialData.source || "",
                amount: initialData.amount || "",
                date: initialData.date ? new Date(initialData.date).toISOString().substr(0, 10) : "",
                icon: initialData.icon || "",
            });
        }
    }, [initialData]);

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div className="add-income-form">
            <Emoji
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Investment"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div className="form-footer-expense">
                <button
                    type="button"
                    className="btn add-btn-income"
                    onClick={() => onAddIncome(income)}
                >
                    {isEditMode ? "Update Income" : "Add Income"}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeDetail;
