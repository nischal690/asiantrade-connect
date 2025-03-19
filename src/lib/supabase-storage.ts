import { supabase } from './supabase';

export class SupabaseStorageService {
  private bucket: string;

  constructor(bucket: string) {
    this.bucket = bucket;
  }

  // Upload file
  async uploadFile(
    path: string,
    file: File,
    options?: { upsert?: boolean }
  ): Promise<{ data: any; error: any }> {
    // Check if user is authenticated as admin (using our simple auth)
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
    // If not admin, return an error
    if (!isAdmin) {
      return { 
        data: null, 
        error: { message: 'Unauthorized: Only admins can upload files' } 
      };
    }

    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .upload(path, file, {
          upsert: options?.upsert || false,
          // Add content type for better handling in browsers
          contentType: file.type
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
      }

      return { data, error };
    } catch (e) {
      console.error('Exception during file upload:', e);
      return { data: null, error: e };
    }
  }

  // Download file
  async downloadFile(path: string): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase.storage
      .from(this.bucket)
      .download(path);

    return { data, error };
  }

  // Get public URL
  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  // List files
  async listFiles(folder: string): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase.storage
      .from(this.bucket)
      .list(folder);

    return { data, error };
  }

  // Delete file
  async deleteFile(path: string): Promise<{ error: any }> {
    // Check if user is authenticated as admin
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
    // If not admin, return an error
    if (!isAdmin) {
      return { error: { message: 'Unauthorized: Only admins can delete files' } };
    }

    try {
      const { error } = await supabase.storage
        .from(this.bucket)
        .remove([path]);

      if (error) {
        console.error('Supabase storage delete error:', error);
      }

      return { error };
    } catch (e) {
      console.error('Exception during file deletion:', e);
      return { error: e };
    }
  }
}
