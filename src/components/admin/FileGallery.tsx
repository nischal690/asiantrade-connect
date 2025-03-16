import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from '@/lib/supabase-context';
import { Loader2, Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupabaseStorageService } from '@/lib/supabase-storage';

interface FileGalleryProps {
  bucket?: string;
  folder?: string;
  onDelete?: (path: string) => void;
  onSelect?: (url: string, path: string) => void;
}

export function FileGallery({
  bucket = 'public',
  folder = 'uploads',
  onDelete,
  onSelect
}: FileGalleryProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { supabase } = useSupabase();
  
  // Create a storage service instance
  const storageService = new SupabaseStorageService(bucket);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await storageService.listFiles(folder);
      
      if (error) throw error;
      
      setFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [folder, bucket]);

  const handleDelete = async (path: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      const { error } = await storageService.deleteFile(path);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      // Refresh the file list
      loadFiles();
      
      // Call the callback
      if (onDelete) {
        onDelete(path);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const handleSelect = (path: string) => {
    if (onSelect) {
      const url = storageService.getPublicUrl(path);
      onSelect(url, path);
    }
  };

  const isImage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
  };

  const getFileNameFromPath = (path: string) => {
    return path.split('/').pop() || path;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Files</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadFiles} 
          disabled={loading}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No files found in this folder
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <Card key={file.id} className="overflow-hidden group hover:shadow-md transition-all duration-300">
              {isImage(file.name) ? (
                <div className="relative aspect-square bg-muted">
                  <img 
                    src={storageService.getPublicUrl(`${folder}/${file.name}`)} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-muted text-muted-foreground">
                  <div className="text-4xl">
                    {file.name.split('.').pop()?.toUpperCase()}
                  </div>
                </div>
              )}
              
              <CardHeader className="p-3">
                <CardTitle className="text-sm truncate">
                  {getFileNameFromPath(file.name)}
                </CardTitle>
              </CardHeader>
              
              <CardFooter className="p-3 pt-0 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSelect(`${folder}/${file.name}`)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Select
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-destructive hover:text-destructive"
                  onClick={() => handleDelete(`${folder}/${file.name}`)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
