import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandManager } from '@/components/admin/BrandManager';
import { BlogManager } from '@/components/admin/BlogManager';
import { useAuth } from '@/lib/auth';
import { createJobPost } from '@/lib/data/store';
import { createBlogPost as createFirestoreBlogPost } from '@/lib/firebase/firestore';
import { uploadBlogImages } from '@/lib/firebase/storage';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { LucideLayoutDashboard, LucideNewspaper, LucideBriefcase, LucideShoppingBag, LucideLogOut } from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    } else {
      // Check if we can access the blogs bucket
      testBucketAccess();
    }
  }, [navigate, isAuthenticated]);

  // Function to test if we can access the blogs bucket
  const testBucketAccess = async () => {
    try {
      // Try to list files in the blogs bucket to check access
      const { data, error } = await supabase.storage
        .from('blogs')
        .list();
      
      if (error) {
        console.error('Error accessing blogs bucket:', error);
        // Display a toast notification about the storage access issue
        toast({
          title: "Storage Access Issue",
          description: "There's an issue accessing the storage bucket. Blog image uploads may not work.",
          variant: "destructive",
        });
      } else {
        console.log('Successfully accessed blogs bucket');
      }
    } catch (error) {
      console.error('Error testing bucket access:', error);
    }
  };

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [photos, setPhotos] = useState<FileList | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'jobs' | 'brands'>('create')

  // Job posting state
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [jobRequirements, setJobRequirements] = useState('')
  const [jobLocation, setJobLocation] = useState('')
  const [jobType, setJobType] = useState<'full-time' | 'part-time' | 'contract'>('full-time')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true)
    setError(null);

    try {
      let photoUrls: string[] = [];
      
      // Upload photos to Supabase storage if any
      if (photos && photos.length > 0) {
        const photoFiles = Array.from(photos);
        try {
          const uploadResults = await uploadBlogImages(photoFiles);
          photoUrls = uploadResults.map(result => result.url);
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError);
          setError(uploadError instanceof Error ? uploadError.message : "Failed to upload images");
          toast({
            title: "Error",
            description: uploadError instanceof Error ? uploadError.message : "Failed to upload images",
            variant: "destructive",
          });
          setIsSaving(false);
          return;
        }
      }

      // Create blog post in Firebase Firestore
      await createFirestoreBlogPost({
        title: title.trim(),
        content: content.trim(),
        photoUrls: photoUrls,
        publishedAt: new Date(),
      });

      toast({
        title: "Success",
        description: "Blog post created successfully",
      })

      // Clear form
      setTitle('')
      setContent('')
      setPhotos(null)
      
      // Switch to manage tab to see the new post
      setActiveTab('manage')
    } catch (error) {
      console.error('Error creating blog post:', error);
      setError(error instanceof Error ? error.message : "Failed to create blog post");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create blog post",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!jobTitle.trim() || !jobDescription.trim() || !jobRequirements.trim() || !jobLocation.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true)

    try {
      await createJobPost({
        title: jobTitle.trim(),
        description: jobDescription.trim(),
        requirements: jobRequirements.trim().split('\n').map(req => req.trim()), // Convert to array of requirements
        location: jobLocation.trim(),
        type: jobType,
        createdAt: new Date(), // Add createdAt field
      });

      toast({
        title: "Success",
        description: "Job posting created successfully",
      })

      // Clear form
      setJobTitle('')
      setJobDescription('')
      setJobRequirements('')
      setJobLocation('')
      setJobType('full-time')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job posting",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-4">
              <LucideLayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Admin Dashboard</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={logout}
            className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
          >
            <LucideLogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        <Tabs 
          value={activeTab} 
          onValueChange={(value: 'create' | 'manage' | 'jobs' | 'brands') => setActiveTab(value)} 
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TabsList className="grid grid-cols-4 mb-8 p-1 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-md">
              <TabsTrigger 
                value="create" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <LucideNewspaper className="h-4 w-4" />
                Create Blog Post
              </TabsTrigger>
              <TabsTrigger 
                value="manage" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <LucideNewspaper className="h-4 w-4" />
                Manage Blog Posts
              </TabsTrigger>
              <TabsTrigger 
                value="jobs" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <LucideBriefcase className="h-4 w-4" />
                Job Postings
              </TabsTrigger>
              <TabsTrigger 
                value="brands" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <LucideShoppingBag className="h-4 w-4" />
                Manage Brands
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsContent value="create" className="space-y-4">
              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Create New Blog Post</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter blog post content"
                      required
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="photos" className="block text-sm font-medium mb-1">
                      Photos
                    </label>
                    <Input
                      id="photos"
                      type="file"
                      onChange={handlePhotoChange}
                      accept="image/*"
                      multiple
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      You can select multiple images. The first image will be used as the main image.
                    </p>
                  </div>
                  
                  {error && (
                    <div className="text-destructive text-sm">{error}</div>
                  )}
                  
                  <Button type="submit" disabled={isSaving} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300">
                    {isSaving ? "Saving..." : "Create Blog Post"}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="manage">
              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <BlogManager />
              </div>
            </TabsContent>
            
            <TabsContent value="jobs" className="space-y-4">
              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Create Job Posting</h2>
                
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                      Job Title
                    </label>
                    <Input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Enter job title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
                      Job Description
                    </label>
                    <Textarea
                      id="jobDescription"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Enter job description"
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobRequirements" className="block text-sm font-medium mb-1">
                      Requirements (one per line)
                    </label>
                    <Textarea
                      id="jobRequirements"
                      value={jobRequirements}
                      onChange={(e) => setJobRequirements(e.target.value)}
                      placeholder="Enter job requirements (one per line)"
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobLocation" className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <Input
                      id="jobLocation"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      placeholder="Enter job location"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobType" className="block text-sm font-medium mb-1">
                      Job Type
                    </label>
                    <select
                      id="jobType"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value as any)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300">
                    {isLoading ? "Creating..." : "Create Job Posting"}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="brands">
              <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <BrandManager />
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
