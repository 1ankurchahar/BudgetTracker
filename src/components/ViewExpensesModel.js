import { Button, Modal, Stack } from "react-bootstrap";
import { useBudgets, UNCATEGEORIZED_BUDGET_ID } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

const ViewExpensesModel = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
        useBudgets();

    const expenses = getBudgetExpenses(budgetId);
    const budget =
        UNCATEGEORIZED_BUDGET_ID === budgetId
            ? { name: "Uncategorized", id: UNCATEGEORIZED_BUDGET_ID }
            : budgets.find((b) => b.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap='2'>
                        <div>Expenses </div>
                        {budgetId != UNCATEGEORIZED_BUDGET_ID && (
                            <Button
                                onClick={() => {
                                    deleteBudget(budget);
                                    handleClose();
                                }}
                                variant='outline-danger'>
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='verticle' gap='3'>
                    {expenses.map((expense) => (
                        <Stack direction='horizontal' gap='2' key={expense.id}>
                            <div className='me-auto fs-4'>
                                {expense.description}
                            </div>
                            <div className='fs-5'>
                                {currencyFormatter.format(expense.amount)}
                            </div>
                            <Button
                                size='sm'
                                variant='outline-danger'
                                onClick={() => deleteExpense(expense)}>
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpensesModel;
