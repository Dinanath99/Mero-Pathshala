import React, { useState } from "react";
import { useGetCommentsQuery, useAddCommentMutation } from "@/features/api/blogApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { RootState } from "@/app/store";
import { BlogComment } from "@/types/blog.types";

interface CommentSectionProps {
  blogId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetCommentsQuery(blogId);
  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();

  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    try {
      await addComment({ blogId, content }).unwrap();
      setContent("");
      toast.success("Comment added!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add comment");
    }
  };

  const comments = data?.comments || [];

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-6 dark:text-white">Comments ({comments.length})</h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-10 flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Join the discussion..."
              className="mb-2 bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 focus-visible:ring-orange-500"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isAdding || !content.trim()} className="bg-orange-500 hover:bg-orange-600">
                {isAdding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg mb-10 text-center text-sm text-gray-600 dark:text-gray-400">
          Please log in to leave a comment.
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-6">
        {isLoading ? (
          <div>Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-500 italic">No comments yet. Be the first!</div>
        ) : (
          comments.map((comment: BlogComment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user?.photoUrl} />
                <AvatarFallback>{comment.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold dark:text-white text-sm">{comment.user?.name}</span>
                    <span className="text-xs text-gray-400">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
