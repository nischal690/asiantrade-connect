import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import { uploadFileWithSignedUrl } from '@/lib/supabase-policies';

// Bucket name for blog images
const BUCKET_NAME = 'blogs';

export interface UploadResult {
  path: string;
  url: string;
}

/**
 * Uploads multiple images to Supabase storage using signed URLs to bypass RLS policies
 * @param files Array of files to upload
 * @returns Array of upload results with paths and public URLs
 */
export const uploadBlogImages = async (files: File[]): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];
  
  for (const file of files) {
    try {
      // Generate a unique filename to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${fileName}`;
      
      // Upload the file using signed URLs to bypass RLS policies
      const publicUrl = await uploadFileWithSignedUrl(BUCKET_NAME, filePath, file);
      
      if (!publicUrl) {
        throw new Error(`Failed to upload image: ${file.name}`);
      }
      
      results.push({
        path: filePath,
        url: publicUrl
      });
    } catch (error) {
      console.error('Error in uploadBlogImages:', error);
      throw error;
    }
  }
  
  return results;
};

/**
 * Deletes images from Supabase storage
 * @param paths Array of file paths to delete
 */
export const deleteBlogImages = async (paths: string[]): Promise<void> => {
  for (const path of paths) {
    try {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);
      
      if (error) {
        console.error('Error deleting file:', error);
        throw new Error(`Failed to delete image: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in deleteBlogImages:', error);
      throw error;
    }
  }
};
