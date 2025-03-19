import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your .env file
// For development, you can hardcode them here temporarily
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a supabase client with a service role for admin operations
// Only create the admin client if the service role key is available
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

// Create a temporary function to set up RLS bypass for the blogs bucket
export const setupPublicBucket = async () => {
  if (!supabaseAdmin) {
    console.warn('Cannot set up public bucket: Service role key is missing');
    return;
  }
  
  try {
    // This is a temporary solution to allow public uploads to the blogs bucket
    // In a production environment, you would use proper authentication and RLS policies
    
    // Create a policy to allow public uploads to the blogs bucket
    const { data, error } = await supabaseAdmin
      .rpc('create_public_bucket_policy', { bucket_name: 'blogs' });
    
    if (error) {
      console.error('Error setting up public bucket policy:', error);
    } else {
      console.log('Public bucket policy set up successfully:', data);
    }
  } catch (error) {
    console.error('Error setting up public bucket:', error);
  }
};
