import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionCard from "../Cards/TransactionCard.jsx";
import moment from "moment";
import "./Dashboard.css";

const IncomeBox = ({ transactions, onSeeMore }) => {
    return (
        <div className="card-container">
            <div className="card-header">
                <h5 className="card-title">Income</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="card-icon" />
                </button>
            </div>

            <div className="card-body">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type="income"
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeBox;
