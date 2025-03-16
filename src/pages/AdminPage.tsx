import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandManager } from '@/components/admin/BrandManager';
import { useAuth } from '@/lib/auth';
import { createBlogPost, createJobPost, convertImageToBase64 } from '@/lib/data/store';

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate, isAuthenticated]);

  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [photos, setPhotos] = useState<FileList | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    try {
      const photoUrls: string[] = [];
      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          const base64Image = await convertImageToBase64(photos[i]);
          photoUrls.push(base64Image);
        }
      }

      createBlogPost({
        title: title.trim(),
        content: content.trim(),
        photos: photoUrls,
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
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create blog post",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

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
    
    setIsSaving(true)

    try {
      createJobPost({
        title: jobTitle.trim(),
        description: jobDescription.trim(),
        requirements: jobRequirements.split('\n').filter(req => req.trim()),
        location: jobLocation.trim(),
        type: jobType,
        createdAt: new Date(),
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
        description: error instanceof Error ? error.message : "Failed to create job posting",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/storage')} className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
            Storage
          </Button>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </div>
      
      <Tabs defaultValue="blog" className="space-y-6">
        <TabsList>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Blog Post</h2>
            
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter blog post title"
                    className={!title.trim() ? "border-destructive" : ""}
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Enter blog post content"
                    className={!content.trim() ? "border-destructive" : ""}
                    rows={6}
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-medium mb-1">
                    Photos
                  </label>
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="cursor-pointer"
                  />
                  {photos && photos.length > 0 && (
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {Array.from(photos).map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Create Post'
                  )}
                </Button>
              </form>
            )}
          </div>
        </TabsContent>

        <TabsContent value="brands">
          <BrandManager />
        </TabsContent>

        <TabsContent value="jobs">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Create Job Posting</h2>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <Input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Description</label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter detailed job description..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Requirements (one per line)</label>
                <Textarea
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  placeholder="- 5+ years of experience&#13;&#10;- Bachelor's degree&#13;&#10;- Strong communication skills"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="e.g. Singapore"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as 'full-time' | 'part-time' | 'contract')}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Creating...' : 'Create Job Posting'}
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
