import { Button } from "@/components/ui/button";
import { useGetAdminBlogsQuery, useDeleteBlogMutation } from "@/features/api/blogApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const BlogManagement = () => {
  const { data, isLoading } = useGetAdminBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id).unwrap();
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading blogs...</div>;

  const blogs = data?.blogs || [];

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Blog Management</h1>
        <Button onClick={() => navigate("/admin/blog/create")} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" /> Create Blog
        </Button>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
        <Table>
          <TableCaption>A list of your recent blogs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.category?.name || "Uncategorized"}</TableCell>
                <TableCell>
                  <Badge className={blog.status === "Published" ? "bg-green-500" : "bg-gray-500"}>
                    {blog.status}
                  </Badge>
                </TableCell>
                <TableCell>{blog.views}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/blog/${blog._id}`)}>
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(blog._id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogManagement;
