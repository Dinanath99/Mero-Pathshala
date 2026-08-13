import React, { useState } from "react";
import { useUpdateInstructorProfileMutation } from "@/features/api/instructorApi";
import { User, Globe, Briefcase, Sparkles, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const InstructorProfileEdit = () => {
  const [updateProfile, { isLoading }] = useUpdateInstructorProfileMutation();

  const [formData, setFormData] = useState({
    title: "Senior AI Instructor & ML Lead",
    specialization: "Natural Language Processing & LLMs",
    bio: "Passionate AI engineer teaching practical PyTorch and LLM development in Nepal.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    profilePhoto: "",
    yearsOfExperience: 5,
    expertise: "PyTorch, LangChain, OpenAI API, Prompt Engineering",
    languages: "English, Nepali",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "",
    website: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        title: formData.title,
        specialization: formData.specialization,
        bio: formData.bio,
        coverImage: formData.coverImage,
        profilePhoto: formData.profilePhoto,
        yearsOfExperience: Number(formData.yearsOfExperience),
        expertise: formData.expertise.split(",").map((s) => s.trim()),
        languages: formData.languages.split(",").map((s) => s.trim()),
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github,
          twitter: formData.twitter,
          website: formData.website,
        },
      }).unwrap();

      toast.success("Instructor marketplace profile updated!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="text-orange-500" /> Marketplace Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Customize how your public profile page appears to learners across Nepal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold">Public Bio & Title</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Public Headline Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Primary Specialization</Label>
              <Input
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="font-bold">Instructor Bio</Label>
            <Textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold">Media Banner & Avatar</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Profile Photo URL</Label>
              <Input
                value={formData.profilePhoto}
                onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Cover Image URL</Label>
              <Input
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold">Skills & Languages</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Expertise (Comma separated)</Label>
              <Input
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Languages</Label>
              <Input
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold">Social Handles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">LinkedIn</Label>
              <Input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">GitHub</Label>
              <Input
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold px-8 py-6"
          >
            <Save size={18} className="mr-2" /> Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InstructorProfileEdit;
