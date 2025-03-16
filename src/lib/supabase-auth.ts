import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'An error occurred during sign in' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'An error occurred during sign up' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/admin/login');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return {
    session,
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    isAuthenticated: !!user
  };
}
