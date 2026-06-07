import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout.jsx";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import ExpenseDiagramm from "../../components/Expense/ExpenseDiagramm.jsx";
import ExpenseBox from "../../components/Expense/ExpenseBox.jsx";
import AddExpenseDetail from "../../components/Expense/AddExpenseDetail.jsx";
import DeleteMessage from "../../components/DeleteMessage.jsx";
import Modal from "../../components/Modal.jsx";
import toast from "react-hot-toast";

import "./Expense.css";

const Expense = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [editExpenseModal, setEditExpenseModal] = useState({ show: false, data: null });


  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a number > 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };


  const handleEditExpense = (expenseItem) => {
    setEditExpenseModal({ show: true, data: expenseItem });
  };


  const handleUpdateExpense = async (updatedExpense) => {
    const { _id, category, amount, date, icon } = updatedExpense;

    if (!category.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a number > 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(_id), {
        category,
        amount,
        date,
        icon,
      });

      setEditExpenseModal({ show: false, data: null });
      toast.success("Expense updated successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense.");
    }
  };


  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
    }
  };


  const filteredExpenses = expenseData.filter((exp) => {
    const monthMatch = selectedMonth
        ? new Date(exp.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    }) === selectedMonth
        : true;

    const categoryMatch = selectedCategory ? exp.category === selectedCategory : true;

    return monthMatch && categoryMatch;
  });


  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download expense details.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
      <Layout activeMenu="Expense">
        <div className="expense-page">
          <div className="expense-grid">
            <ExpenseDiagramm
                transactions={expenseData}
                onExpenseIncome={() => setOpenAddExpenseModal(true)}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ExpenseBox
                transactions={filteredExpenses}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onEdit={(item) => handleEditExpense(item)}
                onDownload={handleDownloadExpenseDetails}
            />

            {/* Add Expense Modal */}
            <Modal
                isOpen={openAddExpenseModal}
                onClose={() => setOpenAddExpenseModal(false)}
                title="Add Expense"
                type="expense"
            >
              <AddExpenseDetail onAddExpense={handleAddExpense} />
            </Modal>

            {/* Edit Expense Modal */}
            <Modal
                isOpen={editExpenseModal.show}
                onClose={() => setEditExpenseModal({ show: false, data: null })}
                title="Edit Expense"
                type="expense"
            >
              <AddExpenseDetail
                  initialData={editExpenseModal.data}
                  onAddExpense={handleUpdateExpense}
                  isEditMode={true}
              />
            </Modal>

            <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                title="Delete Expense"
            >
              <DeleteMessage
                  content="Are you sure you want to delete this expense?"
                  onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
      </Layout>
  );
};

export default Expense;
