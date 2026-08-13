import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetAdminCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/features/api/blogApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CategoryManagement = () => {
  const { data, isLoading } = useGetAdminCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#f97316");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const openDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setDescription(category.description || "");
      setIcon(category.icon || "");
      setColor(category.color || "#f97316");
      setDisplayOrder(category.displayOrder || 0);
      setIsActive(category.isActive ?? true);
    } else {
      setEditingCategory(null);
      setName("");
      setDescription("");
      setIcon("");
      setColor("#f97316");
      setDisplayOrder(0);
      setIsActive(true);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required");
      return;
    }

    const payload = { name, description, icon, color, displayOrder: Number(displayOrder), isActive };

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory._id, formData: payload }).unwrap();
        toast.success("Category updated");
      } else {
        await createCategory(payload).unwrap();
        toast.success("Category created");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted");
      } catch (error) {
        toast.error(error.data?.message || "Failed to delete category");
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading categories...</div>;

  const categories = data?.categories || [];

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Blog Categories</h1>
        <Button onClick={() => openDialog()} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" /> Create Category
        </Button>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
        <Table>
          <TableCaption>Manage your blog categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Total Blogs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell>{cat.displayOrder}</TableCell>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: cat.color }}></div>
                </TableCell>
                <TableCell>{cat.blogCount}</TableCell>
                <TableCell>
                  <Badge className={cat.isActive ? "bg-green-500" : "bg-gray-500"}>
                    {cat.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => openDialog(cat)}>
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(cat._id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label>Description</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Color Code</Label>
                <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="p-1 h-10" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4" />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isCreating || isUpdating} className="bg-orange-500 hover:bg-orange-600">
                {(isCreating || isUpdating) ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                {editingCategory ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
