import React, { useState, useEffect } from "react";
import Input from "../Inputs/Input.jsx";
import Emoji from "../Emoji.jsx";
import "./Expense.css";

const AddExpenseDetail = ({ onAddExpense, initialData = null, isEditMode = false }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });


    useEffect(() => {
        if (initialData) {
            setExpense({
                _id: initialData._id,
                category: initialData.category || "",
                amount: initialData.amount || "",
                date: initialData.date?.substring(0, 10) || "",
                icon: initialData.icon || "",
            });
        }
    }, [initialData]);

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    };

    return (
        <div className="add-expense-form">
            <Emoji
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Food"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="form-footer">
                <button
                    type="button"
                    className="btn add-btn-expense"
                    onClick={() => {
                        onAddExpense(expense);
                    }}
                >
                    {isEditMode ? "Update Expense" : "Add Expense"}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseDetail;
