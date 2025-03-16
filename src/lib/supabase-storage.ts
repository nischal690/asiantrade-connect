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
    const { data, error } = await supabase.storage
      .from(this.bucket)
      .upload(path, file, {
        upsert: options?.upsert || false,
      });

    return { data, error };
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
    const { error } = await supabase.storage
      .from(this.bucket)
      .remove([path]);

    return { error };
  }
}
