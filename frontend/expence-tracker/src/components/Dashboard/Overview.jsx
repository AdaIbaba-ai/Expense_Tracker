import React from "react";
import CustomPieChart from "../Diagramm/CustomPieChart.jsx";
import "./Dashboard.css";
const Overview = ({ totalIncome, totalExpense }) => {
    const COLORS = ["#FA2C37", "#26752c"];

    const data = [
        { name: "Expenses", amount: totalExpense },
        { name: "Income", amount: totalIncome },
    ];

    return (
        <div className="finance-card">
            <h5 className="card-title">Expenses by Category</h5>

            <CustomPieChart
                data={data}
                colors={COLORS}
            />
        </div>
    );
};

export default Overview;
