import { render, screen } from "@testing-library/react"
import { SummaryCards } from "@/components/summary-cards"
import type { Transaction } from "@/hooks/use-transactions"

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 1000,
    date: "2024-01-01",
    category: "Salary",
    notes: "Monthly salary",
  },
  {
    id: "2",
    type: "expense",
    amount: 200,
    date: "2024-01-02",
    category: "Food & Dining",
    notes: "Groceries",
  },
  {
    id: "3",
    type: "expense",
    amount: 50,
    date: "2024-01-03",
    category: "Transportation",
    notes: "Gas",
  },
]

describe("SummaryCards", () => {
  it("should render all summary cards", () => {
    render(<SummaryCards transactions={mockTransactions} />)

    expect(screen.getByText("Total Income")).toBeInTheDocument()
    expect(screen.getByText("Total Expenses")).toBeInTheDocument()
    expect(screen.getByText("Balance")).toBeInTheDocument()
  })

  it("should calculate and display correct totals", () => {
    render(<SummaryCards transactions={mockTransactions} />)

    expect(screen.getByText("$1000.00")).toBeInTheDocument() // Total Income
    expect(screen.getByText("$250.00")).toBeInTheDocument() // Total Expenses
    expect(screen.getByText("$750.00")).toBeInTheDocument() // Balance
  })

  it("should display positive balance in green", () => {
    render(<SummaryCards transactions={mockTransactions} />)

    const balanceElement = screen.getByText("$750.00")
    expect(balanceElement).toHaveClass("text-green-600")
  })

  it("should display negative balance in red", () => {
    const negativeBalanceTransactions: Transaction[] = [
      {
        id: "1",
        type: "income",
        amount: 100,
        date: "2024-01-01",
        category: "Salary",
        notes: "Part-time",
      },
      {
        id: "2",
        type: "expense",
        amount: 200,
        date: "2024-01-02",
        category: "Food & Dining",
        notes: "Expensive meal",
      },
    ]

    render(<SummaryCards transactions={negativeBalanceTransactions} />)

    const balanceElement = screen.getByText("-$100.00")
    expect(balanceElement).toHaveClass("text-red-600")
  })

  it("should handle empty transactions array", () => {
    render(<SummaryCards transactions={[]} />)

    expect(screen.getByText("$0.00")).toBeInTheDocument()
  })
})
