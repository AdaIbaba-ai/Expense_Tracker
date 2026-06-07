import React from "react";
import TransactionCard from "../Cards/TransactionCard.jsx";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import "./Dashboard.css";

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="card-container">
            <div className="card-header">
                <h5 className="card-title">Recent Transactions</h5>
            </div>

            <div className="card-body">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionCard
                        key={item._id}
                        title={item.type === "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
