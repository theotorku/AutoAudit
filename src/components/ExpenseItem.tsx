import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Check, X, Calendar, Building2 } from 'lucide-react';
import { Expense } from '@/lib/supabase';

interface ExpenseItemProps {
  expense: Expense;
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-3 border-l-4" style={{
      borderLeftColor: expense.deductible ? 'hsl(var(--deductible))' : 'hsl(var(--non-deductible))'
    }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">{expense.vendor}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{formatDate(expense.date)}</span>
          </div>

          <Badge variant="secondary" className="text-xs mb-1">
            {expense.category}
          </Badge>

          {expense.deductible && expense.category === 'Meals & Entertainment' && (
            <p className="text-xs text-muted-foreground">50% deductible for business meals</p>
          )}
        </div>

        <div className="text-right">
          <div className="font-bold text-sm">${expense.amount.toFixed(2)}</div>

          {expense.deductible ? (
            <div className="flex items-center gap-1 text-green-600">
              <Check className="h-3 w-3" />
              <span className="text-xs">${expense.deductible_amount.toFixed(2)} deductible</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600">
              <X className="h-3 w-3" />
              <span className="text-xs">Non-deductible</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};