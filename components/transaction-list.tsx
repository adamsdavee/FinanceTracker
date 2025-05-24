"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterControls } from "./filter-controls"
import { ExportButton } from "./export-button"
import { TransactionItem } from "./transaction-item"
import { EditTransactionModal } from "./edit-transaction-modal"
import { useTransactionFilters } from "@/hooks/use-transaction-filters"
import type { Transaction } from "@/hooks/use-transactions"
import { useState } from "react"

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (id: string, transaction: Omit<Transaction, "id">) => void
  onDelete: (id: string) => void
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  const filters = useTransactionFilters(transactions)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
  }

  const handleUpdateTransaction = (transactionData: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      onEdit(editingTransaction.id, transactionData)
      setEditingTransaction(null)
    }
  }

  return (
    <>
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-blue-900">Transactions</CardTitle>
              <CardDescription>Your recent financial activities</CardDescription>
            </div>
            <ExportButton transactions={transactions} />
          </div>

          <FilterControls
            filterType={filters.filterType}
            setFilterType={filters.setFilterType}
            filterCategory={filters.filterCategory}
            setFilterCategory={filters.setFilterCategory}
            sortBy={filters.sortBy}
            setSortBy={filters.setSortBy}
            sortOrder={filters.sortOrder}
            setSortOrder={filters.setSortOrder}
          />
        </CardHeader>
        <CardContent>
          {filters.filteredAndSortedTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions found. Add your first transaction to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {filters.filteredAndSortedTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={() => handleEdit(transaction)}
                  onDelete={() => onDelete(transaction.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSubmit={handleUpdateTransaction}
      />
    </>
  )
}
