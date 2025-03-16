import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from '@/lib/supabase-context';
import { Loader2, Upload, X, FileIcon, Image as ImageIcon, FileText } from 'lucide-react';
import { SupabaseStorageService } from '@/lib/supabase-storage';

interface FileUploaderProps {
  bucket?: string;
  folder?: string;
  onUploadComplete?: (url: string, file: File) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  bucket = 'public',
  folder = 'uploads',
  onUploadComplete,
  acceptedFileTypes = '*',
  maxSizeMB = 5
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Create a storage service instance
  const storageService = new SupabaseStorageService(bucket);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreview(null);
      return;
    }

    const selectedFile = e.target.files[0];
    
    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "Error",
        description: `File size exceeds the ${maxSizeMB}MB limit`,
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    
    setUploading(true);
    
    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      // Upload to Supabase
      const { data, error } = await storageService.uploadFile(filePath, file, { upsert: true });
      
      if (error) throw error;
      
      // Get the public URL
      const publicUrl = storageService.getPublicUrl(filePath);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      
      // Call the callback with the URL
      if (onUploadComplete) {
        onUploadComplete(publicUrl, file);
      }
      
      // Reset the form
      setFile(null);
      setPreview(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const getFileTypeIcon = () => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />;
    } else if (file.type.includes('pdf') || file.type.includes('document')) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else {
      return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          className="flex-1"
          disabled={uploading}
        />
        
        {file && (
          <Button
            variant="outline"
            size="icon"
            onClick={clearFile}
            disabled={uploading}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {file && (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-2 overflow-hidden">
            {getFileTypeIcon()}
            <span className="text-sm font-medium truncate">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
          
          <Button
            onClick={uploadFile}
            disabled={uploading}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>
      )}
      
      {preview && (
        <div className="relative mt-2 rounded-lg overflow-hidden border">
          <img src={preview} alt="Preview" className="max-h-40 w-auto mx-auto" />
        </div>
      )}
    </div>
  );
}
