import React from "react";
import { ICVPersonalInfo } from "@/types/cv.types";
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, Camera } from "lucide-react";

interface Props {
  data: ICVPersonalInfo;
  onChange: (updated: ICVPersonalInfo) => void;
}

export const PersonalInfoSection: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof ICVPersonalInfo, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo / Avatar Option */}
      <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="relative group">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt="Avatar"
              className="w-16 h-16 rounded-xl object-cover border-2 border-orange-500 shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center border-2 border-dashed border-orange-300 dark:border-orange-800">
              <Camera size={24} />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Profile Photo URL (Optional)</label>
          <input
            type="text"
            placeholder="https://example.com/photo.jpg"
            value={data.photoUrl || ""}
            onChange={(e) => handleChange("photoUrl", e.target.value)}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPhoto"
              checked={data.showPhoto}
              onChange={(e) => handleChange("showPhoto", e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
            />
            <label htmlFor="showPhoto" className="text-[11px] text-gray-600 dark:text-gray-400 cursor-pointer">
              Show photo on CV
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={data.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Professional Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Briefcase size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Senior Full Stack Engineer"
              value={data.professionalTitle || ""}
              onChange={(e) => handleChange("professionalTitle", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="e.g. aarav@example.com"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              placeholder="e.g. +977 9801234567"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Kathmandu, Nepal"
              value={data.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Website / Portfolio</label>
          <div className="relative">
            <Globe size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="url"
              placeholder="e.g. https://aaravsharma.dev"
              value={data.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <Linkedin size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="url"
              placeholder="e.g. https://linkedin.com/in/aaravsharma"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">GitHub Profile</label>
          <div className="relative">
            <Github size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="url"
              placeholder="e.g. https://github.com/aaravsharma"
              value={data.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
