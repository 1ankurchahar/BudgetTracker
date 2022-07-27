import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets, UNCATEGEORIZED_BUDGET_ID } from "../context/BudgetContext";

const AddExpenseModel = ({ show, handleClose, defaultBudgetId }) => {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();

    const { addExpense, budgets } = useBudgets();

    const handleSubmit = (e) => {
        console.log("submited");
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* description form group */}
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            ref={descriptionRef}
                        />
                    </Form.Group>
                    {/* amount form group */}
                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type='number'
                            required
                            min={0}
                            step={1}
                            ref={amountRef}
                        />
                    </Form.Group>
                    {/* budget form group */}
                    <Form.Group className='mb-3' controlId='budgetId'>
                        <Form.Label>Budget </Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>
                            <option
                                id={UNCATEGEORIZED_BUDGET_ID}
                                value={UNCATEGEORIZED_BUDGET_ID}>
                                Uncategorized
                            </option>
                            {budgets.map((budget) => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddExpenseModel;
