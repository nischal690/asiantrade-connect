import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from '@/components/admin/FileUploader';
import { FileGallery } from '@/components/admin/FileGallery';
import { useSupabase } from '@/lib/supabase-context';
import { Copy, Check, FolderPlus } from 'lucide-react';

export default function StorageManagementPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { auth } = useSupabase();
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newFolder, setNewFolder] = useState('');
  const [currentFolder, setCurrentFolder] = useState('uploads');
  const [currentBucket, setCurrentBucket] = useState('public');

  // Check authentication
  if (!auth.isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleUploadComplete = (url: string) => {
    setSelectedUrl(url);
    toast({
      title: "Upload Complete",
      description: "File has been uploaded successfully",
    });
  };

  const handleSelect = (url: string) => {
    setSelectedUrl(url);
    toast({
      description: "URL copied to clipboard",
    });
  };

  const copyToClipboard = () => {
    if (selectedUrl) {
      navigator.clipboard.writeText(selectedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const createFolder = () => {
    if (!newFolder.trim()) {
      toast({
        title: "Error",
        description: "Please enter a folder name",
        variant: "destructive",
      });
      return;
    }

    // In Supabase, folders are created implicitly when files are uploaded
    // So we'll just update the current folder
    setCurrentFolder(newFolder.trim());
    setNewFolder('');
    
    toast({
      title: "Success",
      description: `Switched to folder: ${newFolder}`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Storage Management
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={() => auth.signOut()}>
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
            <CardHeader className="pb-3">
              <CardTitle>File Gallery</CardTitle>
              <CardDescription>
                Browse and manage your uploaded files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 flex items-center gap-2 p-2 bg-muted rounded-md">
                  <span className="text-sm font-medium">Current folder:</span>
                  <span className="text-sm text-muted-foreground">{currentFolder}</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="New folder name"
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    className="w-40"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={createFolder}
                    title="Create/Switch Folder"
                  >
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <FileGallery 
                bucket={currentBucket}
                folder={currentFolder}
                onSelect={handleSelect}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Upload new files to your storage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader 
                bucket={currentBucket}
                folder={currentFolder}
                onUploadComplete={handleUploadComplete}
              />
              
              {selectedUrl && (
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-1">
                    File URL
                  </label>
                  <div className="flex">
                    <Input
                      value={selectedUrl}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      className="rounded-l-none"
                      variant="outline"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>
                Configure your storage settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Bucket
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={currentBucket}
                      onChange={(e) => setCurrentBucket(e.target.value)}
                      placeholder="Bucket name"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Default bucket is 'public'
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
