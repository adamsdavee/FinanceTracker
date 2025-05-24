"use client"

import { useState, useEffect } from "react"

export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  date: string
  category: string
  notes: string
}

const STORAGE_KEY = "finance-tracker-transactions"

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load transactions from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedTransactions = JSON.parse(stored)
          setTransactions(parsedTransactions)
        }
      } catch (error) {
        console.error("Failed to load transactions from localStorage:", error)
      }
    }
  }, [])

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
      } catch (error) {
        console.error("Failed to save transactions to localStorage:", error)
      }
    }
  }, [transactions])

  const addTransaction = (transactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      ...transactionData,
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  const updateTransaction = (id: string, transactionData: Omit<Transaction, "id">) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { id, ...transactionData } : t)))
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const clearAllTransactions = () => {
    setTransactions([])
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearAllTransactions,
  }
}
