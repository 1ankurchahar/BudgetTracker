import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext();

export const UNCATEGEORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    // {id: name: max:}
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    // {id: budgetId: amount: description:}

    // functions
    function getBudgetExpenses(budgetId) {
        return expenses.filter((expense) => expense.budgetId === budgetId);
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses((prevExpenses) => {
            return [
                ...prevExpenses,
                { id: nanoid(), description, amount, budgetId },
            ];
        });
    }

    function addBudget({ name, max }) {
        setBudgets((prevBudgets) => {
            if (prevBudgets.find((budget) => budget.name === name)) {
                return prevBudgets;
            }

            return [...prevBudgets, { id: nanoid(), name, max }];
        });
    }
    function deleteBudget({ id }) {
        // todo Deal with budget uncatogorical expenses
        setExpenses((prevExpenses) => {
            return prevExpenses.map((expense) => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGEORIZED_BUDGET_ID };
            });
        });

        setBudgets((prevBudgets) => {
            return prevBudgets.filter((budget) => budget.id !== id);
        });
    }
    function deleteExpense({ id }) {
        setExpenses((prevExpenses) => {
            return prevExpenses.filter(expenses.id !== id);
        });
    }

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
            }}>
            {children}
        </BudgetsContext.Provider>
    );
};
