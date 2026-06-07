import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";
import "./LineChart.css";

const LineChart = ({ data, type = "expense" }) => {
    const isIncome = type === "income";
    const strokeColor = isIncome ? "darkgreen" : "#dc2626";
    const fillColor = isIncome ? "url(#incomeGradient)" : "url(#expenseGradient)";
    const gradientId = isIncome ? "incomeGradient" : "expenseGradient";

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="tooltip-box">
                    <p className="tooltip-category">{payload[0].payload.category}</p>
                    <p className="tooltip-amount">
                        Amount: <span>CHF {payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="darkgreen" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="darkgreen" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke={strokeColor}
                        fill={fillColor}
                        strokeWidth={3}
                        dot={{ r: 3, fill: strokeColor }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
