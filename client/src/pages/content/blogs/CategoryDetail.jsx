import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlogsQuery, useGetCategoriesQuery } from "@/features/api/blogApi";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

const CategoryDetail = () => {
  const { slug } = useParams();
  
  const { data: categoryData } = useGetCategoriesQuery();
  const category = categoryData?.categories?.find(c => c.slug === slug);
  
  const { data: blogsData, isLoading } = useGetBlogsQuery({ category: category?._id }, { skip: !category });

  if (!categoryData) return <div className="p-10 text-center">Loading category...</div>;
  if (!category) return <div className="p-10 text-center">Category not found.</div>;

  const blogs = blogsData?.blogs || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 mb-10 shadow-sm border border-gray-100 dark:border-slate-800 text-center relative overflow-hidden">
          {category.coverImage && (
            <div className="absolute inset-0 z-0 opacity-20">
              <img src={category.coverImage} alt={category.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="relative z-10">
            <Badge style={{ backgroundColor: category.color }} className="mb-4 text-white hover:opacity-90">{category.name}</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {category.description || `Explore all articles, tutorials, and insights related to ${category.name}.`}
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="text-center py-10">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No blogs found</h3>
            <p className="text-gray-500 dark:text-gray-400">There are currently no published articles in this category.</p>
            <Link to="/blogs" className="text-blue-600 hover:underline mt-4 inline-block">Back to all blogs</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link to={`/blog/${blog.slug}`} key={blog._id} className="group">
                <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-slate-800 mt-auto">
                      <div className="flex items-center gap-2">
                        <img 
                          src={blog.author?.photoUrl || "https://avatar.iran.liara.run/public"} 
                          alt={blog.author?.name} 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-medium truncate max-w-[100px]">{blog.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
