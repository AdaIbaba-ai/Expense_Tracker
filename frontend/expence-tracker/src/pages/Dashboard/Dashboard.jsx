import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout.jsx";

import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { addThousandsSeparator } from "../../utils/helper.js";
import RecentTransactions from "../../components/Dashboard/IncomeAndExpensesBox.jsx";
import Overview from "../../components/Dashboard/Overview.jsx";
import ExpenseBox from "../../components/Dashboard/ExpenseBox.jsx";
import IncomeBox from "../../components/Dashboard/IncomeBox.jsx";

import "./Dashboard.css";
import {LuScale, LuTrendingDown, LuTrendingUp} from "react-icons/lu";

const Dashboard = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  

    let balanceWarning = null;
    const balance = dashboardData?.totalBalance || 0;

    if (balance < 0) {
    balanceWarning = {
        type: "danger",
        message: "🆘 You’re broke broke! Time to sell imaginary NFTs or marry rich",
    };
    } else if (balance < 50) {
    balanceWarning = {
        type: "warning",
        message: "⚠️ Your wallet squeaked: 'Can we please not go out today?'",
    };
    }


  return (
      <Layout activeMenu="Dashboard">
        <div className="home-wrapper">
          <div className="home-cards-row">
            <InfoCard
                icon={<LuScale />}
                label="Total Balance"
                value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                color="info-primary"
            />
            <InfoCard
                icon={<LuTrendingUp />}
                label="Total Income"
                value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                color="info-orange"
            />
            <InfoCard
                icon={<LuTrendingDown />}
                label="Total Expenses"
                value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                color="info-red"
            />
          </div>
          
            {balanceWarning && (
            <div className={`balance-alert ${balanceWarning.type}`}>
                {balanceWarning.message}
            </div>
            )}


          <div className="home-charts-grid">
            <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
            />
            <Overview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpenses || 0}
            />
            <ExpenseBox
                transactions={
                    dashboardData?.last30DaysExpenses?.transactions || []
                }
                onSeeMore={() => navigate("/expense")}
            />
            <IncomeBox
                transactions={
                    dashboardData?.last60DaysIncome?.transactions || []
                }
                onSeeMore={() => navigate("/income")}
            />
          </div>
        </div>
      </Layout>
  );
};

export default Dashboard;
