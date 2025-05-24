"use client"

import { useMemo } from "react"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/hooks/use-transactions"

interface SummaryCardsProps {
  transactions: Transaction[]
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const summary = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expense,
      balance: income - expense,
    }
  }, [transactions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">${summary.income.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">${summary.expense.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${summary.balance.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
