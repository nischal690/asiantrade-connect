import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your .env file
// For development, you can hardcode them here temporarily
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
