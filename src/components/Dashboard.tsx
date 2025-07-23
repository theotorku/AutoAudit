import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Receipt, AlertTriangle, TrendingUp, Download } from 'lucide-react';
import { ExpenseItem } from './ExpenseItem';
import { TaxAlerts } from './TaxAlerts';

interface Expense {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  category: string;
  deductible: boolean;
  deductibleAmount: number;
  description: string;
}

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      vendor: 'Starbucks Coffee',
      amount: 45.60,
      date: '2024-01-20',
      category: 'Meals & Entertainment',
      deductible: true,
      deductibleAmount: 22.80,
      description: 'Business meeting with client'
    },
    {
      id: '2',
      vendor: 'Office Depot',
      amount: 127.50,
      date: '2024-01-19',
      category: 'Office Supplies',
      deductible: true,
      deductibleAmount: 127.50,
      description: 'Printer paper and supplies'
    },
    {
      id: '3',
      vendor: 'Gas Station',
      amount: 65.00,
      date: '2024-01-18',
      category: 'Personal',
      deductible: false,
      deductibleAmount: 0,
      description: 'Personal vehicle fuel'
    }
  ]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalDeductible = expenses.reduce((sum, expense) => sum + expense.deductibleAmount, 0);
  const deductiblePercentage = totalExpenses > 0 ? (totalDeductible / totalExpenses) * 100 : 0;

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">AutoAudit</h1>
        <p className="text-sm text-muted-foreground">Tax-Smart Expense Tracking</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Deductible
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-primary">${totalDeductible.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{deductiblePercentage.toFixed(0)}% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Deductible Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Tax Savings Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Deductible: ${totalDeductible.toFixed(2)}</span>
              <span className="text-red-600">Non-deductible: ${(totalExpenses - totalDeductible).toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${deductiblePercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Recent Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </CardContent>
      </Card>

      {/* Tax Alerts */}
      <TaxAlerts />

      {/* Export Button */}
      <Button className="w-full" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export Tax Report
      </Button>
    </div>
  );
};