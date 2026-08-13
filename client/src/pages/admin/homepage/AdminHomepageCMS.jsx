import React, { useState, useEffect } from "react";
import {
  useGetPersonalizedHomepageQuery,
  useUpdateHomepageConfigMutation,
} from "@/features/api/homepageApi";
import { Sliders, Save, Sparkles, Layers, Eye, EyeOff, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const AdminHomepageCMS = () => {
  const { data, isLoading, refetch } = useGetPersonalizedHomepageQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateHomepageConfigMutation();

  const [heroBanner, setHeroBanner] = useState({
    title: "",
    subtitle: "",
    badgeText: "",
    ctaText: "",
    ctaLink: "",
  });

  const [promoBanner, setPromoBanner] = useState({
    isActive: true,
    text: "",
    linkText: "",
    linkUrl: "",
    bgColor: "from-orange-500 to-pink-600",
  });

  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (data?.config) {
      if (data.config.heroBanner) setHeroBanner(data.config.heroBanner);
      if (data.config.promoBanner) setPromoBanner(data.config.promoBanner);
      if (data.config.sections) setSections(data.config.sections);
    }
  }, [data]);

  const handleSectionToggle = (index) => {
    const updated = [...sections];
    updated[index].isVisible = !updated[index].isVisible;
    setSections(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateConfig({
        heroBanner,
        promoBanner,
        sections,
      }).unwrap();

      toast.success("Homepage CMS Configuration Saved!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update configuration.");
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Loading Homepage CMS Settings...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Sliders className="text-orange-500" /> Homepage Content Management (CMS)
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure hero banners, promotional announcements, and toggle section visibility for all visitor roles.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Banner Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <LayoutTemplate className="text-blue-500" /> Hero Banner Settings
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Badge Text</Label>
              <Input
                value={heroBanner.badgeText}
                onChange={(e) => setHeroBanner({ ...heroBanner, badgeText: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Primary Hero Title</Label>
              <Input
                value={heroBanner.title}
                onChange={(e) => setHeroBanner({ ...heroBanner, title: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="font-bold">Subtitle Description</Label>
            <Textarea
              rows={2}
              value={heroBanner.subtitle}
              onChange={(e) => setHeroBanner({ ...heroBanner, subtitle: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">CTA Button Label</Label>
              <Input
                value={heroBanner.ctaText}
                onChange={(e) => setHeroBanner({ ...heroBanner, ctaText: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">CTA Link URL</Label>
              <Input
                value={heroBanner.ctaLink}
                onChange={(e) => setHeroBanner({ ...heroBanner, ctaLink: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Promotional Announcement Banner */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-amber-500" /> Promotional Top Banner
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Active</span>
              <Switch
                checked={promoBanner.isActive}
                onCheckedChange={(val) => setPromoBanner({ ...promoBanner, isActive: val })}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Announcement Text</Label>
              <Input
                value={promoBanner.text}
                onChange={(e) => setPromoBanner({ ...promoBanner, text: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Action Button Text</Label>
              <Input
                value={promoBanner.linkText}
                onChange={(e) => setPromoBanner({ ...promoBanner, linkText: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Section Visibility Manager */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="text-purple-500" /> Homepage Sections Visibility & Order
          </h3>

          <div className="space-y-3 pt-2">
            {sections.map((sec, idx) => (
              <div
                key={sec.sectionKey || idx}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{sec.title}</span>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={sec.isVisible ? "default" : "outline"}
                  onClick={() => handleSectionToggle(idx)}
                  className={sec.isVisible ? "bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs" : "text-gray-400 rounded-full text-xs"}
                >
                  {sec.isVisible ? (
                    <>
                      <Eye size={14} className="mr-1" /> Visible
                    </>
                  ) : (
                    <>
                      <EyeOff size={14} className="mr-1" /> Hidden
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold px-8 py-6 text-base"
          >
            <Save size={18} className="mr-2" /> Save Homepage CMS Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminHomepageCMS;
