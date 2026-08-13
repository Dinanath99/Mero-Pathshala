import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBlogMutation, useGetCategoriesQuery, useGetBlogByIdQuery, useUpdateBlogMutation } from "@/features/api/blogApi";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const CreateEditBlog = () => {
  const { blogId } = useParams();
  const isEditing = !!blogId;

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [featuredImage, setFeaturedImage] = useState(null);
  
  const { data: catData } = useGetCategoriesQuery();
  const { data: existingBlog, isLoading: isFetching } = useGetBlogByIdQuery(blogId, { skip: !isEditing });
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (existingBlog?.blog) {
      const b = existingBlog.blog;
      setTitle(b.title || "");
      setExcerpt(b.excerpt || "");
      setContent(b.content || "");
      setCategory(b.category?._id || "");
      setStatus(b.status || "Draft");
    }
  }, [existingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !excerpt || !content || !category) {
        toast.error("Please fill all required fields");
        return;
    }
    
    if (!isEditing && !featuredImage) {
        toast.error("Featured image is required for new blogs");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("status", status);
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    try {
      if (isEditing) {
        await updateBlog({ id: blogId, formData }).unwrap();
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(formData).unwrap();
        toast.success("Blog created successfully!");
      }
      navigate("/admin/blog");
    } catch (error) {
      toast.error(error.data?.message || `Failed to ${isEditing ? 'update' : 'create'} blog`);
    }
  };

  const isLoading = isCreating || isUpdating;

  if (isFetching) return <div className="p-6">Loading blog data...</div>;

  return (
    <div className="flex-1 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">{isEditing ? "Edit Blog" : "Create New Blog"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
        
        <div>
          <Label>Blog Title *</Label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. The Future of AI in Education" 
            className="mt-1"
          />
        </div>

        <div>
          <Label>Excerpt *</Label>
          <Input 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)} 
            placeholder="A short description for the blog card..." 
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {catData?.categories?.map((c) => (
                    <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>

        <div>
          <Label>Featured Image {isEditing ? "(Optional)" : "*"}</Label>
          {isEditing && existingBlog?.blog?.featuredImage && !featuredImage && (
            <div className="mb-2 mt-2">
              <img src={existingBlog.blog.featuredImage} alt="Current featured" className="h-20 w-32 object-cover rounded-md" />
            </div>
          )}
          <Input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files[0])} 
            className="mt-1"
          />
        </div>

        <div>
          <Label>Content *</Label>
          <div className="mt-1 border dark:border-slate-800 rounded-md">
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>Cancel</Button>
            <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
              {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4"/> : null}
              {isEditing ? "Update Blog" : "Save Blog"}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditBlog;
