import React, { useState } from "react";
import { useGetAdminNewsQuery, useDeleteNewsMutation, useUpdateNewsMutation } from "@/features/api/newsApi";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Newspaper,
  Eye,
  Radio,
  Star,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const NewsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, refetch } = useGetAdminNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();
  const [updateNews] = useUpdateNewsMutation();

  const newsList = data?.news || [];

  const filteredNews = newsList.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteNews(id).unwrap();
        toast.success("Article deleted successfully!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete article.");
      }
    }
  };

  const handleToggleBreaking = async (article) => {
    try {
      await updateNews({
        id: article._id,
        newsData: { breakingNews: !article.breakingNews },
      }).unwrap();
      toast.success(`Article ${!article.breakingNews ? "marked as Breaking News" : "removed from Breaking"}.`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleToggleFeatured = async (article) => {
    try {
      await updateNews({
        id: article._id,
        newsData: { featured: !article.featured },
      }).unwrap();
      toast.success(`Article ${!article.featured ? "marked as Featured" : "unfeatured"}.`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Newspaper className="text-blue-600" /> AI News Hub CMS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Publish, edit, feature, and manage AI news articles and breaking announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/admin/news-categories")}
            variant="outline"
            className="rounded-full"
          >
            Categories & Tags
          </Button>
          <Button
            onClick={() => navigate("/admin/news/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-md"
          >
            <Plus size={18} className="mr-1" /> Publish News Article
          </Button>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news by headline, category, or summary..."
            className="pl-11 rounded-full border-gray-200 dark:border-slate-800"
          />
        </div>
        <span className="text-xs font-bold text-gray-500">Total: {filteredNews.length} Articles</span>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading AI news directory...</div>
        ) : filteredNews.length === 0 ? (
          <div className="p-12 text-center">
            <Newspaper className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-semibold">No news articles found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Headline</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Breaking</TableHead>
                <TableHead className="font-bold">Featured</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Views</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((article) => (
                <TableRow key={article._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3 max-w-xs">
                      <img src={article.coverImage} alt="thumb" className="w-10 h-10 rounded-lg object-cover border shrink-0" />
                      <span className="truncate">{article.title}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {article.category?.name || "General"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleToggleBreaking(article)}
                      className="p-1.5 rounded-lg border bg-gray-50 dark:bg-slate-800 hover:scale-110 transition-transform"
                    >
                      <Radio
                        size={16}
                        className={article.breakingNews ? "text-red-600 animate-pulse" : "text-gray-400"}
                      />
                    </button>
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleToggleFeatured(article)}
                      className="p-1.5 rounded-lg border bg-gray-50 dark:bg-slate-800 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={16}
                        className={article.featured ? "text-amber-500 fill-amber-500" : "text-gray-400"}
                      />
                    </button>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        article.status === "Published"
                          ? "bg-emerald-500 text-white text-[10px]"
                          : "bg-gray-400 text-white text-[10px]"
                      }
                    >
                      {article.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold">
                    👁️ {article.views || 0}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/news/${article.slug}`)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/admin/news/${article._id}`)}
                      className="h-8 w-8 p-0 text-blue-500"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(article._id, article.title)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
