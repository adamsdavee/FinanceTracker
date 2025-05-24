"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/hooks/use-transactions"

interface ExportButtonProps {
  transactions: Transaction[]
}

export function ExportButton({ transactions }: ExportButtonProps) {
  const exportToCSV = () => {
    const headers = ["Type", "Amount", "Date", "Category", "Notes"]
    const csvContent = [
      headers.join(","),
      ...transactions.map((t) => [t.type, t.amount, t.date, `"${t.category}"`, `"${t.notes}"`].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={exportToCSV}
      disabled={transactions.length === 0}
      className="border-blue-200 text-blue-600 hover:bg-blue-50"
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV
    </Button>
  )
}
