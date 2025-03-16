import React, { createContext, useContext, ReactNode } from 'react';
import { supabase } from './supabase';
import { useSupabaseAuth } from './supabase-auth';
import { SupabaseService } from './supabase-db';
import { SupabaseStorageService } from './supabase-storage';

// Define types for your database tables
export interface Brand {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  website: string;
  created_at?: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
  created_at?: string;
}

export interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  is_active: boolean;
  created_at?: string;
}

// Create services for each table
const brandService = new SupabaseService<Brand>('brands');
const newsService = new SupabaseService<News>('news');
const careerService = new SupabaseService<Career>('careers');
const storageService = new SupabaseStorageService('public');

// Create the context
type SupabaseContextType = {
  supabase: typeof supabase;
  auth: ReturnType<typeof useSupabaseAuth>;
  db: {
    brands: SupabaseService<Brand>;
    news: SupabaseService<News>;
    careers: SupabaseService<Career>;
  };
  storage: SupabaseStorageService;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Create the provider
export function SupabaseProvider({ children }: { children: ReactNode }) {
  const auth = useSupabaseAuth();

  const value = {
    supabase,
    auth,
    db: {
      brands: brandService,
      news: newsService,
      careers: careerService,
    },
    storage: storageService,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Create a hook to use the context
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
