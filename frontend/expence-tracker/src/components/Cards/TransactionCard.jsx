import React from "react";
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2, LuPencil,
} from "react-icons/lu";
import "./Cards.css";

const TransactionCard = ({
                               icon,
                               title,
                               date,
                               amount,
                               type,
                               hideDeleteBtn,
                                 hideEditBtn,
                                 onEdit,
                                 onDelete
                             }) => {
  const getAmountStyles = () =>
      type === "income" ? "amount-box green" : "amount-box red";

  return (
      <div className="transaction-card">
        <div className="transaction-icon">
          {icon ? (
              <img src={icon} alt={title} className="icon-img" />
          ) : (
              <LuUtensils />
          )}
        </div>

        <div className="transaction-content">
          <div className="transaction-info">
            <p className="transaction-title">{title}</p>
            <p className="transaction-date">{date}</p>
          </div>

          <div className="transaction-amount-wrap">
              {onEdit && (
                  <button className="edit-btn"
                          onClick={onEdit} >
                      <LuPencil size={18} />
                  </button>
              )}
            {onDelete && (
                <button
                    className="delete-btn"
                    onClick={onDelete}
                >
                  <LuTrash2 size={18} />
                </button>
            )}

            <h6 className={`transaction-amount ${type === "income" ? "green-text" : "red-text"}`}>
              {type === "income" ? "+" : "-"} CHF {Number(amount).toFixed(2)}
            </h6>
            
          </div>
        </div>
      </div>
  );
};

export default TransactionCard;
