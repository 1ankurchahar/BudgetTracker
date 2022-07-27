import React from "react";
import { UNCATEGEORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

const UncategorizedBudgetCard = (props) => {
    const { getBudgetExpenses } = useBudgets();

    const amount = getBudgetExpenses(UNCATEGEORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0,
    );
    if (amount === 0) return null;

    return <BudgetCard amount={amount} gray name='Uncategorized' {...props} />;
};

export default UncategorizedBudgetCard;
