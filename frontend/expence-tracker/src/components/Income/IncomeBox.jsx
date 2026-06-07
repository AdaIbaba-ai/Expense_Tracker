import React from "react";
import TransactionCard from "../Cards/TransactionCard.jsx";
import moment from "moment";
import "./IncomeBox.css";

const IncomeBox = ({ transactions, onDelete, onEdit, onDownload  }) => {
    return (
        <div className="income-card">
            <div className="income-card-header">
                <h5 className="income-card-title">Income</h5>

                <button className="income-download-btn" onClick={onDownload}>
                    <img
                        src="https://img.icons8.com/color/24/microsoft-excel-2019--v1.png"
                        alt="Excel Icon"
                        className="excel-icon"
                    />
                    Export as Excel
                </button>
            </div>

            <div className="income-grid">
                {transactions?.map((income) => (
                    <TransactionCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={moment(income.date).format("Do MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onEdit={() => onEdit(income)}
                        onDelete={() => onDelete(income._id)}


                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeBox;
