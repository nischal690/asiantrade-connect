import { supabase } from './supabase';

/**
 * This file contains functions to help manage Supabase storage bucket policies
 * and provide workarounds for Row Level Security (RLS) issues.
 */

/**
 * Creates a signed URL for uploading a file to a Supabase bucket
 * This is a workaround for RLS policy issues when uploading files
 * 
 * @param bucketName The name of the bucket to upload to
 * @param filePath The path where the file will be stored
 * @param fileType The MIME type of the file
 * @returns A signed URL that can be used to upload the file
 */
export const getSignedUploadUrl = async (
  bucketName: string,
  filePath: string,
  fileType: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUploadUrl(filePath, {
        contentType: fileType,
      });

    if (error) {
      console.error('Error creating signed upload URL:', error);
      return null;
    }

    return data?.signedUrl || null;
  } catch (error) {
    console.error('Exception creating signed upload URL:', error);
    return null;
  }
};

/**
 * Uploads a file to Supabase storage using a signed URL
 * This bypasses RLS policies and allows uploads even without proper permissions
 * 
 * @param signedUrl The signed URL to upload to
 * @param file The file to upload
 * @returns Whether the upload was successful
 */
export const uploadWithSignedUrl = async (
  signedUrl: string,
  file: File
): Promise<boolean> => {
  try {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return response.ok;
  } catch (error) {
    console.error('Error uploading with signed URL:', error);
    return false;
  }
};

/**
 * Helper function to upload a file to Supabase storage using signed URLs
 * This is a complete solution that handles both getting the signed URL and uploading
 * 
 * @param bucketName The name of the bucket to upload to
 * @param filePath The path where the file will be stored
 * @param file The file to upload
 * @returns The public URL of the uploaded file if successful, null otherwise
 */
export const uploadFileWithSignedUrl = async (
  bucketName: string,
  filePath: string,
  file: File
): Promise<string | null> => {
  // Get a signed URL for uploading
  const signedUrl = await getSignedUploadUrl(bucketName, filePath, file.type);
  
  if (!signedUrl) {
    return null;
  }
  
  // Upload the file using the signed URL
  const success = await uploadWithSignedUrl(signedUrl, file);
  
  if (!success) {
    return null;
  }
  
  // Get the public URL for the uploaded file
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};
