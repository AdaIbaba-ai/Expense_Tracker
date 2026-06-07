import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import IncomeDiagramm from "../../components/Income/IncomeDiagramm.jsx";
import IncomeBox from "../../components/Income/IncomeBox.jsx";
import AddIncomeDetail from "../../components/Income/AddIncomeDetail.jsx";
import Modal from "../../components/Modal.jsx";
import toast from "react-hot-toast";
import DeleteMessage from "../../components/DeleteMessage.jsx";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [editIncomeModal, setEditIncomeModal] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      console.error("Failed to fetch income data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a valid number greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income.");
    }
  };

  const handleEditIncome = (incomeItem) => {
    setEditIncomeModal({ show: true, data: incomeItem });
  };

  const handleUpdateIncome = async (updatedIncome) => {
    const { _id, source, amount, date, icon } = updatedIncome;

    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a valid number greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(_id), {
        source,
        amount,
        date,
        icon,
      });

      setEditIncomeModal({ show: false, data: null });
      toast.success("Income updated successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error updating income:", error);
      toast.error("Failed to update income.");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income.");
    }
  };

  const filteredIncome = incomeData.filter((inc) => {
    const monthMatch = selectedMonth
        ? new Date(inc.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    }) === selectedMonth
        : true;

    const sourceMatch = selectedSource ? inc.source === selectedSource : true;

    return monthMatch && sourceMatch;
  });

  const getMonthYear = (date) =>
    new Date(date).toLocaleString("default", { month: "long", year: "numeric" });

  const now = new Date();
  const currentMonth = getMonthYear(now);

  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = getMonthYear(lastMonthDate);


  const thisMonthTotal = incomeData
    .filter((inc) => getMonthYear(inc.date) === currentMonth)
    .reduce((sum, inc) => sum + Number(inc.amount), 0);

  const lastMonthTotal = incomeData
    .filter((inc) => getMonthYear(inc.date) === lastMonth)
    .reduce((sum, inc) => sum + Number(inc.amount), 0);

  const totalIncome = incomeData.reduce(
    (sum, inc) => sum + Number(inc.amount),
    0
  );


  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download income details.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
      <Layout activeMenu="Income">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <IncomeDiagramm
                transactions={incomeData}
                onAddIncome={() => setOpenAddIncomeModal(true)}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
            />

            <div className="income-summary-grid">
              <div className="income-summary-card this-month">
                <p className="summary-label">This Month</p>
                <h3 className="summary-amount">CHF {thisMonthTotal.toFixed(2)}</h3>
              </div>
              <div className="income-summary-card last-month">
                <p className="summary-label">Last Month</p>
                <h3 className="summary-amount">CHF {lastMonthTotal.toFixed(2)}</h3>
              </div>
              <div className="income-summary-card total-income">
                <p className="summary-label">Total Income</p>
                <h3 className="summary-amount">CHF {totalIncome.toFixed(2)}</h3>
              </div>
            </div>


            <IncomeBox
                transactions={filteredIncome}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onEdit={(item) => handleEditIncome(item)}
                onDownload={handleDownloadIncomeDetails}
            />

            <Modal
                isOpen={openAddIncomeModal}
                onClose={() => setOpenAddIncomeModal(false)}
                title="Add Income"
                type="income"
            >
              <AddIncomeDetail onAddIncome={handleAddIncome} />
            </Modal>

            <Modal
                isOpen={editIncomeModal.show}
                onClose={() => setEditIncomeModal({ show: false, data: null })}
                title="Edit Income"
                type="income"
            >
              <AddIncomeDetail
                  initialData={editIncomeModal.data}
                  onAddIncome={handleUpdateIncome}
                  isEditMode={true}
              />
            </Modal>

            <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                title="Delete Income"
            >
              <DeleteMessage
                  content="Are you sure you want to delete this income detail?"
                  onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
      </Layout>
  );
};

export default Income;
