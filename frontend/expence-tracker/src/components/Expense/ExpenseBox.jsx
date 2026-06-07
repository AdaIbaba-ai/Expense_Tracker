import React from "react";
import TransactionCard from "../Cards/TransactionCard.jsx";
import moment from "moment";
import "./Expense.css";

const ExpenseBox = ({ transactions, onDelete, onEdit, onDownload }) => {
    return (
        <div className="expense-card">
            <div className="expense-card-header">
                <h5 className="expense-card-title">Expenses</h5>

                <button className="expense-download-btn" onClick={onDownload}>
                    <img
                        src="https://img.icons8.com/color/24/microsoft-excel-2019--v1.png"
                        alt="Excel Icon"
                        className="excel-icon"
                    />
                    Export as Excel
                </button>

            </div>

            <div className="transaction-grid">
                {transactions?.map((expense) => (
                    <TransactionCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense._id)}
                        onEdit={() => onEdit(expense)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseBox;
