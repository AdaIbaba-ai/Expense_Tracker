const express = require("express");
const {
  addExpense,
  getAllExpenses,
  deleteExpense,
  downloadExpenseExcel,
  updateExpense
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpenses);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpense);

module.exports = router;
