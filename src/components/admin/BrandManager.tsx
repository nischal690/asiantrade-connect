import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, Save } from "lucide-react";
import { getBrands, createBrand, updateBrand, deleteBrand, convertImageToBase64 } from '@/lib/data/store';

interface Brand {
  name: string;
  description: string;
  images: string[];
}

export function BrandManager() {
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [newBrand, setNewBrand] = useState<Brand>({
    name: '',
    description: '',
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    // Load initial brands
    setBrands(getBrands());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
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

    try {
      const imageUrls: string[] = [];
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const base64Image = await convertImageToBase64(selectedFiles[i]);
          imageUrls.push(base64Image);
        }
      }

      const brandToAdd = {
        ...newBrand,
        images: imageUrls
      };

      createBrand(brandToAdd);
      setBrands(getBrands());
      setNewBrand({ name: '', description: '', images: [] });
      setSelectedFiles(null);

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
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
  };

  const handleSaveEdit = async (brand: Brand) => {
    try {
      updateBrand(brand);
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
    }
  };

  const handleDeleteBrand = async (brandName: string) => {
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
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Add New Brand</h2>
        <div className="space-y-4">
          <Input
            placeholder="Brand Name"
            value={newBrand.name}
            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
          />
          <Textarea
            placeholder="Brand Description"
            value={newBrand.description}
            onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
          />
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button onClick={handleAddBrand}>
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Manage Brands</h2>
        {brands.map((brand) => (
          <Card key={brand.name} className="p-4">
            {editingBrand?.name === brand.name ? (
              <div className="space-y-4">
                <Input
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                />
                <Textarea
                  value={editingBrand.description}
                  onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={() => handleSaveEdit(editingBrand)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingBrand(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.description}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {brand.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${brand.name} image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditBrand(brand)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteBrand(brand.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
