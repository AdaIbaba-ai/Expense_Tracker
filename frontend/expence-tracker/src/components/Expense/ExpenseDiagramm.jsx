import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import LineChart from "../Diagramm/LineChart.jsx";
import { prepareExpenseLineChartData } from "../../utils/helper.js";
import "./ExpenseDiagramm.css";

const ExpenseDiagramm = ({
                             transactions,
                             onExpenseIncome,
                             selectedMonth,
                             setSelectedMonth,
                             selectedCategory,
                             setSelectedCategory,
                         }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    const uniqueMonths = [
        ...new Set(
            transactions.map((tx) =>
                new Date(tx.date).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })
            )
        ),
    ];

    const uniqueCategories = [...new Set(transactions.map((tx) => tx.category))];

    return (
        <div className="income-card">
        <div className="card">
            <div className="overview-header">
                <div className="overview-title">
                    <h5>Expenses</h5>
                    <p className="overview-description">
                        Track and manage your spending.
                    </p>
                </div>

                <button className="add-expense-btn" onClick={onExpenseIncome}>
                    <LuPlus />
                    Add Expense
                </button>
            </div>

            {/* Filter Controls */}
            <div className="filter-controls">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">All Months</option>
                    {uniqueMonths.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => {
                        setSelectedMonth("");
                        setSelectedCategory("");
                    }}
                >
                    Clear Filter
                </button>
            </div>

            <div className="overview-chart">
                <LineChart data={chartData} type="expense" />
            </div>
        </div>
        </div>
    );
};

export default ExpenseDiagramm;
