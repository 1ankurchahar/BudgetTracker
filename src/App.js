import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModel from "./components/AddBudgetModel";
import AddExpenseModel from "./components/AddExpenseModel";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModel from "./components/ViewExpensesModel";
import { UNCATEGEORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";

const App = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
        useState();

    const { budgets, getBudgetExpenses } = useBudgets();

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    return (
        <>
            <Container className='my-4'>
                <Stack direction='horizontal' gap='2' className='mb-2'>
                    <h1 className='me-auto'>Budgets</h1>
                    <Button
                        variant='primary'
                        onClick={() => setShowAddBudgetModal(true)}>
                        Add Budget
                    </Button>
                    <Button
                        variant='outline-primary'
                        onClick={openAddExpenseModal}>
                        Add Expense
                    </Button>
                </Stack>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill,minmax(300px,1fr))",
                        gap: "1rem",
                        alignItems: "flex-start",
                    }}>
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0,
                        );
                        return (
                            <BudgetCard
                                name={budget.name}
                                key={budget.id}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() =>
                                    openAddExpenseModal(budget.id)
                                }
                                onViewExpenseClick={() =>
                                    setViewExpensesModalBudgetId(budget.id)
                                }
                            />
                        );
                    })}
                </div>

                <UncategorizedBudgetCard
                    onAddExpenseClick={openAddExpenseModal}
                    onViewExpenseClick={() =>
                        setViewExpensesModalBudgetId(UNCATEGEORIZED_BUDGET_ID)
                    }
                />
                <TotalBudgetCard />
            </Container>
            <AddBudgetModel
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModel
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModel
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />
        </>
    );
};

export default App;
