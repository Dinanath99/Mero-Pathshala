import React, { useState } from "react";
import {
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
} from "@/features/api/slxApi";
import {
  FileText,
  Plus,
  Trash2,
  Search,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const StudentNotesPage = () => {
  const { data, isLoading } = useGetNotesQuery();
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [timestamp, setTimestamp] = useState("05:30");

  const notes = data?.notes || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await createNote({
        title,
        content,
        timestamp,
        lectureTitle: "General Study Note",
      }).unwrap();
      toast.success("Note saved successfully!");
      setTitle("");
      setContent("");
      setIsDialogOpen(false);
    } catch (err) {
      toast.error("Failed to save note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id).unwrap();
      toast.success("Note deleted.");
    } catch (err) {
      toast.error("Failed to delete note.");
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 border border-purple-500/20 shadow-xl">
        <div className="space-y-2">
          <Badge className="bg-orange-500 text-white text-xs font-bold">
            <FileText size={14} className="mr-1 inline" /> Private Learning Space
          </Badge>
          <h1 className="text-3xl font-black">My Personal Study Notes</h1>
          <p className="text-sm text-gray-300">
            Write, review, and search personal notes recorded while studying AI masterclasses.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold rounded-full px-6 py-5 text-sm shadow-lg">
              <Plus size={16} className="mr-2" /> Add New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-orange-500" /> Create Study Note
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <Input
                placeholder="Note Title / शीर्षक..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl"
                required
              />
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <Input
                  placeholder="Timestamp e.g. 05:30"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  className="rounded-xl w-36"
                />
              </div>
              <Textarea
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="rounded-xl"
                required
              />
              <Button
                type="submit"
                disabled={isCreating}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl"
              >
                {isCreating ? "Saving..." : "Save Note"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full pl-10 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-xs py-2.5"
        />
        <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
      </div>

      {/* Notes Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500 font-bold">Loading your notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-gray-300 dark:border-slate-800 space-y-3">
          <FileText size={40} className="mx-auto text-gray-400" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No notes found</h3>
          <p className="text-xs text-gray-500">Click "Add New Note" to create your first personal study note.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] text-orange-500 border-orange-200">
                    <Clock size={10} className="mr-1 inline" /> {note.timestamp || "00:00"}
                  </Badge>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">{note.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                  <BookOpen size={12} /> {note.lectureTitle || "General Note"}
                </span>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotesPage;
