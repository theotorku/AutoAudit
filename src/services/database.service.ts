import { supabase, Expense } from '@/lib/supabase';

export class DatabaseService {
    // Get all expenses for the current user
    static async getExpenses(): Promise<Expense[]> {
        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }

        return data || [];
    }

    // Add a new expense
    static async addExpense(expense: Omit<Expense, 'id' | 'user_id' | 'created_at'>): Promise<Expense> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
            .from('expenses')
            .insert([
                {
                    ...expense,
                    user_id: user.id,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error adding expense:', error);
            throw error;
        }

        return data;
    }

    // Update an existing expense
    static async updateExpense(id: string, updates: Partial<Expense>): Promise<Expense> {
        const { data, error } = await supabase
            .from('expenses')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating expense:', error);
            throw error;
        }

        return data;
    }

    // Delete an expense
    static async deleteExpense(id: string): Promise<void> {
        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    }

    // Upload receipt image to Supabase Storage
    static async uploadReceiptImage(file: File, expenseId: string): Promise<string> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error('User not authenticated');
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${expenseId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('receipts')
            .upload(fileName, file, {
                upsert: true,
            });

        if (uploadError) {
            console.error('Error uploading receipt:', uploadError);
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('receipts')
            .getPublicUrl(fileName);

        return publicUrl;
    }

    // Subscribe to real-time expense updates
    static subscribeToExpenses(callback: (expenses: Expense[]) => void) {
        const channel = supabase
            .channel('expenses-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'expenses',
                },
                async () => {
                    // Fetch updated expenses when any change occurs
                    const expenses = await this.getExpenses();
                    callback(expenses);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }
}
