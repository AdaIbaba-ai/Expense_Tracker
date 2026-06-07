import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import LineChart from "../Diagramm/LineChart.jsx";
import { prepareIncomeBarChartData } from "../../utils/helper.js";
import "./IncomeDiagramm.css";

const IncomeDiagramm = ({
                            transactions,
                            onAddIncome,
                            selectedMonth,
                            setSelectedMonth,
                            selectedSource,
                            setSelectedSource,
                        }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);

    const uniqueMonths = [
        ...new Set(
            transactions.map((inc) =>
                new Date(inc.date).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })
            )
        ),
    ];

    const uniqueSources = [...new Set(transactions.map((i) => i.source))];

    return (
        <div className="income-card">
            <div className="income-header">
                <div className="income-header-text">
                    <h5 className="income-title">Income</h5>
                    <p className="income-subtitle">Track your income sources.</p>
                </div>
                <button className="add-income-btn" onClick={onAddIncome}>
                    <LuPlus className="icon" />
                    Add Income
                </button>
            </div>

            <div
                className="filter-controls"
                style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
            >
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="">All Months</option>
                    {uniqueMonths.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>

                <select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
                    <option value="">All Sources</option>
                    {uniqueSources.map((src) => (
                        <option key={src} value={src}>
                            {src}
                        </option>
                    ))}
                </select>

                <button onClick={() => {
                    setSelectedMonth("");
                    setSelectedSource("");
                }}>
                    Clear Filter
                </button>
            </div>

            <div className="income-chart">
                <LineChart data={chartData} type="income" />
            </div>
        </div>
    );
};

export default IncomeDiagramm;
