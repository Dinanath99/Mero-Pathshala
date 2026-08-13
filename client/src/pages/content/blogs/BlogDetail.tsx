import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlogBySlugQuery } from "@/features/api/blogApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/comments/CommentSection";

const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetBlogBySlugQuery(slug || "");

  if (isLoading) return <div className="p-20 text-center mt-16">Loading article...</div>;
  if (error || !data?.blog) return <div className="p-20 text-center mt-16">Article not found.</div>;

  const blog = data.blog as any;

  // Sanitize the HTML content to prevent XSS attacks before injecting
  const cleanContent = DOMPurify.sanitize(blog.content || "");

  const publishDate = blog.publishedAt || blog.createdAt;

  return (
    <>
      {/* SEO Metadata Injection */}
      <Helmet>
        <title>{blog.seoTitle || blog.title} | AI Guru Nepal</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt || ""} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || ""} />
        {blog.featuredImage || blog.coverImage ? (
          <meta property="og:image" content={blog.featuredImage || blog.coverImage} />
        ) : null}
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <Link to="/blogs">
            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-200 border-none mb-6 rounded-full px-4 py-1.5">
              {typeof blog.category === "object" ? blog.category?.name : (blog.category || "General")}
            </Badge>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 ring-2 ring-orange-500/20">
                <AvatarImage src={blog.author?.photoUrl || blog.author?.avatar} />
                <AvatarFallback>{blog.author?.name?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <span className="text-gray-900 dark:text-gray-200">{blog.author?.name || "Author"}</span>
            </div>
            {publishDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{new Date(publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</span>
              </div>
            )}
            {blog.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{blog.readingTime} min read</span>
              </div>
            )}
            {blog.views !== undefined && (
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{blog.views} views</span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {(blog.featuredImage || blog.coverImage) && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800">
            <img 
              src={blog.featuredImage || blog.coverImage} 
              alt={blog.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Rich Text Content Render */}
        <article 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        <Separator className="my-12 dark:bg-slate-800" />

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-12">
            <span className="font-semibold mr-2 dark:text-white">Tags:</span>
            {blog.tags.map((tag: any, idx: number) => (
              <Badge key={idx} variant="secondary" className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700">
                #{typeof tag === "object" ? tag.name : tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Comments section */}
        <CommentSection blogId={blog._id} />
      </div>
    </>
  );
};

export default BlogDetail;
