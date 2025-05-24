import { render, screen, fireEvent } from "@testing-library/react"
import { TransactionItem } from "@/components/transaction-item"
import type { Transaction } from "@/hooks/use-transactions"
import { jest } from "@jest/globals"

const mockTransaction: Transaction = {
  id: "1",
  type: "expense",
  amount: 50.75,
  date: "2024-01-01",
  category: "Food & Dining",
  notes: "Lunch at restaurant",
}

const mockProps = {
  transaction: mockTransaction,
  onEdit: jest.fn(),
  onDelete: jest.fn(),
}

describe("TransactionItem", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render transaction details", () => {
    render(<TransactionItem {...mockProps} />)

    expect(screen.getByText("expense")).toBeInTheDocument()
    expect(screen.getByText("Food & Dining")).toBeInTheDocument()
    expect(screen.getByText("2024-01-01")).toBeInTheDocument()
    expect(screen.getByText("$50.75")).toBeInTheDocument()
    expect(screen.getByText("Lunch at restaurant")).toBeInTheDocument()
  })

  it("should display expense amount in red", () => {
    render(<TransactionItem {...mockProps} />)

    const amountElement = screen.getByText("$50.75")
    expect(amountElement).toHaveClass("text-red-600")
  })

  it("should display income amount in green", () => {
    const incomeTransaction = { ...mockTransaction, type: "income" as const }
    render(<TransactionItem {...mockProps} transaction={incomeTransaction} />)

    const amountElement = screen.getByText("$50.75")
    expect(amountElement).toHaveClass("text-green-600")
  })

  it("should call onEdit when edit button is clicked", () => {
    render(<TransactionItem {...mockProps} />)

    const editButton = screen.getByRole("button", { name: /edit/i })
    fireEvent.click(editButton)

    expect(mockProps.onEdit).toHaveBeenCalledTimes(1)
  })

  it("should call onDelete when delete button is clicked", () => {
    render(<TransactionItem {...mockProps} />)

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    fireEvent.click(deleteButton)

    expect(mockProps.onDelete).toHaveBeenCalledTimes(1)
  })

  it("should not render notes if empty", () => {
    const transactionWithoutNotes = { ...mockTransaction, notes: "" }
    render(<TransactionItem {...mockProps} transaction={transactionWithoutNotes} />)

    expect(screen.queryByText("Lunch at restaurant")).not.toBeInTheDocument()
  })
})
