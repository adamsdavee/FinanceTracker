"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/hooks/use-transactions"

interface TransactionItemProps {
  transaction: Transaction
  onEdit: () => void
  onDelete: () => void
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Badge
            variant={transaction.type === "income" ? "default" : "destructive"}
            className={transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
          >
            {transaction.type}
          </Badge>
          <span className="font-medium text-gray-900">{transaction.category}</span>
          <span className="text-sm text-gray-500">{transaction.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
          >
            ${transaction.amount.toFixed(2)}
          </span>
          {transaction.notes && <span className="text-sm text-gray-600 max-w-xs truncate">{transaction.notes}</span>}
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <Button variant="outline" size="sm" onClick={onEdit} className="border-blue-200 text-blue-600 hover:bg-blue-50">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onDelete} className="border-red-200 text-red-600 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
