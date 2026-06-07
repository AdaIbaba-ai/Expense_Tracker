import moment from "moment";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionCard from "../Cards/TransactionCard.jsx";
import "./Dashboard.css";
const ExpenseBox = ({transactions, onSeeMore}) => {
  return (
      <div className="card-container">
          <div className="card-header">
              <h5 className="card-title">Expenses</h5>

              <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0,5)?.map((expense) => (
          <TransactionCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseBox;
