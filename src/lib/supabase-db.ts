import { supabase } from './supabase';

// Generic database service for Supabase
export class SupabaseService<T> {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  // Get all records
  async getAll(): Promise<{ data: T[] | null; error: any }> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*');
    
    return { data, error };
  }

  // Get a record by id
  async getById(id: number | string): Promise<{ data: T | null; error: any }> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  }

  // Create a new record
  async create(record: Partial<T>): Promise<{ data: T | null; error: any }> {
    const { data, error } = await supabase
      .from(this.table)
      .insert(record)
      .select()
      .single();
    
    return { data, error };
  }

  // Update a record
  async update(id: number | string, record: Partial<T>): Promise<{ data: T | null; error: any }> {
    const { data, error } = await supabase
      .from(this.table)
      .update(record)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  }

  // Delete a record
  async delete(id: number | string): Promise<{ error: any }> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);
    
    return { error };
  }

  // Custom query
  async customQuery(query: any): Promise<{ data: any; error: any }> {
    const { data, error } = await query;
    return { data, error };
  }
}
