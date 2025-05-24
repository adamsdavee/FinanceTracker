"use client"

import { SummaryCards } from "@/components/summary-cards"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { useTransactions } from "@/hooks/use-transactions"

export default function PersonalFinanceTracker() {
  const transactions = useTransactions()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Finance Tracker</h1>
          <p className="text-gray-600">Track your income and expenses to manage your finances better</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions.transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={transactions.addTransaction} />
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions.transactions}
              onEdit={transactions.updateTransaction}
              onDelete={transactions.deleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
