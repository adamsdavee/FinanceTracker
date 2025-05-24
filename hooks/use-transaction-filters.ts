"use client"

import { useState, useMemo } from "react"
import type { Transaction } from "./use-transactions"

export function useTransactionFilters(transactions: Transaction[]) {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortOrder, setSortOrder] = useState<string>("desc")

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions

    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType)
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory)
    }

    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Transaction]
      let bValue: any = b[sortBy as keyof Transaction]

      if (sortBy === "amount") {
        aValue = Number.parseFloat(aValue)
        bValue = Number.parseFloat(bValue)
      } else if (sortBy === "date") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [transactions, filterType, filterCategory, sortBy, sortOrder])

  return {
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredAndSortedTransactions,
  }
}
