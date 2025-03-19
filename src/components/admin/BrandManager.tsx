import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, Save, X, Upload, ImageIcon, Globe } from "lucide-react";
import { getBrands, createBrand, updateBrand, deleteBrand, convertImageToBase64 } from '@/lib/data/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from 'framer-motion';

interface Brand {
  name: string;
  description: string;
  images: string[];
  website?: string;
}

export function BrandManager() {
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [newBrand, setNewBrand] = useState<Brand>({ name: '', description: '', images: [], website: '' });
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [addingImages, setAddingImages] = useState(false);
  const [editingImages, setEditingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [editingSelectedFiles, setEditingSelectedFiles] = useState<FileList | null>(null);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  useEffect(() => {
    // Load initial brands
    setBrands(getBrands());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      setAddingImages(true);
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditingSelectedFiles(e.target.files);
      setEditingImages(true);
    }
  };

  const processImages = async (files: FileList | null) => {
    const imageUrls: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const base64Image = await convertImageToBase64(files[i]);
        imageUrls.push(base64Image);
      }
    }
    return imageUrls;
  };

  const handleAddBrand = async () => {
    if (!newBrand.name.trim() || !newBrand.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const imageUrls = await processImages(selectedFiles);

      const brandToAdd = {
        ...newBrand,
        images: imageUrls
      };

      createBrand(brandToAdd);
      setBrands(getBrands());
      setNewBrand({ name: '', description: '', images: [], website: '' });
      setSelectedFiles(null);
      setAddingImages(false);

      toast({
        title: "Success",
        description: "Brand added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add brand",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand({ ...brand, images: [...brand.images] });
  };

  const handleSaveEdit = async () => {
    if (!editingBrand) return;
    
    if (!editingBrand.name.trim() || !editingBrand.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (editingImages && editingSelectedFiles) {
        const newImages = await processImages(editingSelectedFiles);
        editingBrand.images = [...editingBrand.images, ...newImages];
        setEditingImages(false);
        setEditingSelectedFiles(null);
      }

      updateBrand(editingBrand);
      setBrands(getBrands());
      setEditingBrand(null);

      toast({
        title: "Success",
        description: "Brand updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update brand",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBrand = async (brandName: string) => {
    if (!confirm(`Are you sure you want to delete the brand "${brandName}"?`)) {
      return;
    }
    
    setLoading(true);
    try {
      deleteBrand(brandName);
      setBrands(getBrands());

      toast({
        title: "Success",
        description: "Brand deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete brand",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!newBrand) return;
    
    setNewBrand({
      ...newBrand,
      images: newBrand.images.filter((_, i) => i !== index)
    });
  };

  const handleRemoveEditingImage = (index: number) => {
    if (!editingBrand) return;
    
    setEditingBrand({
      ...editingBrand,
      images: editingBrand.images.filter((_, i) => i !== index)
    });
  };

  const cancelImageUpload = () => {
    setSelectedFiles(null);
    setAddingImages(false);
  };

  const cancelEditImageUpload = () => {
    setEditingSelectedFiles(null);
    setEditingImages(false);
  };

  const previewNewImages = () => {
    if (!selectedFiles || selectedFiles.length === 0) return null;
    
    return (
      <motion.div 
        className="mt-4 space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h4 className="font-medium">Image Preview</h4>
        <div className="grid grid-cols-3 gap-2">
          {Array.from(selectedFiles).map((file, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={itemVariants}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const previewEditImages = () => {
    if (!editingSelectedFiles || editingSelectedFiles.length === 0) return null;
    
    return (
      <motion.div 
        className="mt-4 space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h4 className="font-medium">Image Preview</h4>
        <div className="grid grid-cols-3 gap-2">
          {Array.from(editingSelectedFiles).map((file, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={itemVariants}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Brand Management</h2>
        
        <Tabs defaultValue="add">
          <TabsList className="mb-4 p-1 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-md">
            <TabsTrigger 
              value="add" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </TabsTrigger>
            <TabsTrigger 
              value="manage" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Manage Brands
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card className="p-6 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Add New Brand</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input
                    id="brand-name"
                    placeholder="Enter brand name"
                    value={newBrand.name}
                    onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="brand-description">Brand Description</Label>
                  <Textarea
                    id="brand-description"
                    placeholder="Enter brand description"
                    value={newBrand.description}
                    onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="brand-website">Brand Website URL</Label>
                  <Input
                    id="brand-website"
                    placeholder="https://example.com"
                    value={newBrand.website || ''}
                    onChange={(e) => setNewBrand({ ...newBrand, website: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="brand-images">Brand Images</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="brand-images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('brand-images')?.click()}
                      className="flex-grow"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Select Images
                    </Button>
                  </div>
                </div>

                {addingImages && previewNewImages()}

                {newBrand.images.length > 0 && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h4 className="font-medium mb-2">Current Images</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {newBrand.images.map((image, index) => (
                        <motion.div 
                          key={index} 
                          className="relative"
                          variants={itemVariants}
                        >
                          <img
                            src={image}
                            alt={`New brand image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="w-5 h-5 absolute top-1 right-1 bg-red-500 hover:bg-red-600"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <Button 
                  onClick={handleAddBrand} 
                  disabled={loading || (!newBrand.name.trim() || !newBrand.description.trim())}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Brand
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Manage Brands</h2>
              
              {brands.length === 0 ? (
                <Alert className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                  <AlertDescription>
                    No brands available. Add your first brand using the "Add Brand" tab.
                  </AlertDescription>
                </Alert>
              ) : (
                brands.map((brand, index) => (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="p-4 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl hover:shadow-lg transition-all duration-300">
                      {editingBrand?.name === brand.name ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-brand-name">Brand Name</Label>
                            <Input
                              id="edit-brand-name"
                              value={editingBrand.name}
                              onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="edit-brand-description">Brand Description</Label>
                            <Textarea
                              id="edit-brand-description"
                              value={editingBrand.description}
                              onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                              rows={4}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="edit-brand-website">Brand Website URL</Label>
                            <Input
                              id="edit-brand-website"
                              placeholder="https://example.com"
                              value={editingBrand.website || ''}
                              onChange={(e) => setEditingBrand({ ...editingBrand, website: e.target.value })}
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label>Brand Images</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={`edit-brand-images-${brand.name}`}
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={handleEditFileChange}
                                  className="hidden"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => document.getElementById(`edit-brand-images-${brand.name}`)?.click()}
                                >
                                  <Upload className="w-4 h-4 mr-1" />
                                  Add Images
                                </Button>
                              </div>
                            </div>
                            
                            {editingImages && previewEditImages()}
                            
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                              {editingBrand.images.map((image, index) => (
                                <motion.div 
                                  key={index} 
                                  className="relative group"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                  <img
                                    src={image}
                                    alt={`${editingBrand.name} image ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="w-5 h-5 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600"
                                    onClick={() => handleRemoveEditingImage(index)}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </motion.div>
                              ))}
                              
                              {editingBrand.images.length === 0 && (
                                <div className="w-20 h-20 border border-dashed rounded flex items-center justify-center text-muted-foreground">
                                  <ImageIcon className="w-8 h-8" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              onClick={handleSaveEdit}
                              disabled={loading || (!editingBrand.name.trim() || !editingBrand.description.trim())}
                              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                            >
                              {loading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4 mr-2" />
                                  Save Changes
                                </>
                              )}
                            </Button>
                            <Button variant="outline" onClick={() => {
                              setEditingBrand(null);
                              setEditingImages(false);
                              setEditingSelectedFiles(null);
                            }}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{brand.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{brand.description}</p>
                              {brand.website && (
                                <a 
                                  href={brand.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:underline mt-1 inline-flex items-center gap-1"
                                >
                                  <Globe className="h-3 w-3" />
                                  {brand.website}
                                </a>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditBrand(brand)}
                                className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                              >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteBrand(brand.name)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Brand Images</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {brand.images.length > 0 ? (
                                brand.images.map((image, index) => (
                                  <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                  >
                                    <img
                                      src={image}
                                      alt={`${brand.name} image ${index + 1}`}
                                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                                    />
                                  </motion.div>
                                ))
                              ) : (
                                <div className="w-20 h-20 border border-dashed rounded flex items-center justify-center text-muted-foreground">
                                  <ImageIcon className="w-8 h-8" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
