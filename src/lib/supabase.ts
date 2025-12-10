import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types for our database tables
export interface Expense {
  id: string;
  user_id: string;
  vendor: string;
  amount: number;
  date: string;
  category: string;
  deductible: boolean;
  deductible_amount: number;
  description: string;
  receipt_image_url?: string;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  deductible_percentage: number;
  created_at: string;
}
