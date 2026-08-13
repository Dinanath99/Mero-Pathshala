import React from "react";
import { Button } from "@/components/ui/button";
import {
  useGetAdminToolsQuery,
  useDeleteToolMutation,
  useToggleFeatureToolMutation,
  useTogglePublishToolMutation,
} from "@/features/api/toolApi";
import { Edit, Plus, Trash2, Star, Eye, ExternalLink, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "sonner";

const ToolManagement = () => {
  const { data, isLoading } = useGetAdminToolsQuery();
  const [deleteTool] = useDeleteToolMutation();
  const [toggleFeature] = useToggleFeatureToolMutation();
  const [togglePublish] = useTogglePublishToolMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this AI Tool?")) {
      try {
        const res = await deleteTool(id).unwrap();
        toast.success(res?.message || "Tool deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete tool.");
      }
    }
  };

  const handleToggleFeature = async (id) => {
    try {
      const res = await toggleFeature(id).unwrap();
      toast.success(res?.message || "Featured status updated.");
    } catch (error) {
      toast.error("Failed to update featured status.");
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await togglePublish(id).unwrap();
      toast.success(res?.message || "Publish status updated.");
    } catch (error) {
      toast.error("Failed to update publish status.");
    }
  };

  if (isLoading) return <div className="p-6 dark:text-white">Loading AI tools...</div>;

  const tools = data?.tools || [];

  return (
    <div className="flex-1 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">AI Tools Directory Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage published tools, feature status, pricing, and content.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/tool-categories")}
            className="border-gray-300 dark:border-slate-700"
          >
            Manage Categories
          </Button>
          <Button onClick={() => navigate("/admin/tools/create")} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Tool
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableCaption>Total tools registered: {tools.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tool</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Pricing</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No AI tools found. Click "Add New Tool" to create your first tool entry.
                </TableCell>
              </TableRow>
            ) : (
              tools.map((tool) => (
                <TableRow key={tool._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={tool.logo || "https://via.placeholder.com/40"}
                        alt={tool.name}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 dark:border-slate-800"
                      />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                          {tool.name}
                          <a
                            href={tool.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-orange-500 transition-colors"
                            title="Visit website"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{tool.tagline || tool.description?.slice(0, 40)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {tool.category?.name || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        tool.pricingType === "Free"
                          ? "bg-emerald-500 text-white"
                          : tool.pricingType === "Freemium"
                          ? "bg-blue-500 text-white"
                          : tool.pricingType === "Free Trial"
                          ? "bg-purple-500 text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {tool.pricingType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleFeature(tool._id)}
                      title={tool.featured ? "Unfeature tool" : "Feature tool"}
                      className="p-1 h-auto"
                    >
                      <Star
                        size={18}
                        className={tool.featured ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-slate-700"}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleTogglePublish(tool._id)}
                      className="p-0 h-auto"
                    >
                      <Badge
                        className={
                          tool.status === "Published"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                            : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300"
                        }
                      >
                        {tool.status}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1 text-xs">
                      <Eye size={13} /> {tool.views || 0}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                        title="View Public Page"
                      >
                        <Globe className="h-4 w-4 text-emerald-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/admin/tools/${tool._id}`)}
                        title="Edit Tool"
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(tool._id)}
                        title="Delete Tool"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ToolManagement;
