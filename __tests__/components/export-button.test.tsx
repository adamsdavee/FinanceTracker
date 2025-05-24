import { render, screen, fireEvent } from "@testing-library/react"
import { ExportButton } from "@/components/export-button"
import type { Transaction } from "@/hooks/use-transactions"
import jest from "jest" // Import jest to fix the undeclared variable error

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
    amount: 50,
    date: "2024-01-02",
    category: "Food & Dining",
    notes: "Lunch",
  },
]

describe("ExportButton", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  it("should render export button", () => {
    render(<ExportButton transactions={mockTransactions} />)

    expect(screen.getByText("Export CSV")).toBeInTheDocument()
  })

  it("should be disabled when no transactions", () => {
    render(<ExportButton transactions={[]} />)

    const button = screen.getByText("Export CSV")
    expect(button).toBeDisabled()
  })

  it("should be enabled when transactions exist", () => {
    render(<ExportButton transactions={mockTransactions} />)

    const button = screen.getByText("Export CSV")
    expect(button).not.toBeDisabled()
  })

  it("should trigger CSV download when clicked", () => {
    const createObjectURLSpy = jest.spyOn(window.URL, "createObjectURL")
    const revokeObjectURLSpy = jest.spyOn(window.URL, "revokeObjectURL")
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click")

    render(<ExportButton transactions={mockTransactions} />)

    const button = screen.getByText("Export CSV")
    fireEvent.click(button)

    expect(createObjectURLSpy).toHaveBeenCalled()
    expect(clickSpy).toHaveBeenCalled()
    expect(revokeObjectURLSpy).toHaveBeenCalled()
  })
})
