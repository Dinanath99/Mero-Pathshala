import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ICVData, INITIAL_CV_DATA, ICVRecommendation } from "@/types/cv.types";
import {
  useGetCVByIdQuery,
  useCreateCVMutation,
  useUpdateCVMutation,
} from "@/features/api/cvApi";
import { CVPreview } from "@/components/cv/CVPreview";
import { PersonalInfoSection } from "@/components/cv/editor/PersonalInfoSection";
import { SummarySection } from "@/components/cv/editor/SummarySection";
import { ExperienceSection } from "@/components/cv/editor/ExperienceSection";
import { EducationSection } from "@/components/cv/editor/EducationSection";
import { SkillsSection } from "@/components/cv/editor/SkillsSection";
import { ProjectsSection } from "@/components/cv/editor/ProjectsSection";
import { CertificationsSection } from "@/components/cv/editor/CertificationsSection";
import { LanguagesSection } from "@/components/cv/editor/LanguagesSection";
import { AchievementsSection } from "@/components/cv/editor/AchievementsSection";
import { CustomSections } from "@/components/cv/editor/CustomSections";
import { SectionOrderManager } from "@/components/cv/editor/SectionOrderManager";
import { TemplateSettingsModal } from "@/components/cv/editor/TemplateSettingsModal";
import { CVAnalyzerModal } from "@/components/cv/analyzer/CVAnalyzerModal";
import { exportCVToPDF } from "@/utils/pdfExport";
import {
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  BookOpen,
  Globe,
  Award,
  Languages,
  Layers,
  ArrowUpDown,
  Palette,
  Download,
  Save,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  Share2,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

export const CVMaker: React.FC = () => {
  const { cvId } = useParams<{ cvId?: string }>();
  const navigate = useNavigate();

  const previewRef = useRef<HTMLDivElement>(null);

  // Fetch CV if editing existing
  const { data: fetchedCVData, isLoading: isFetching } = useGetCVByIdQuery(cvId || "", {
    skip: !cvId,
  });

  const [createCV, { isLoading: isCreating }] = useCreateCVMutation();
  const [updateCV, { isLoading: isUpdating }] = useUpdateCVMutation();

  const [cvData, setCvData] = useState<ICVData>(INITIAL_CV_DATA);
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [zoom, setZoom] = useState<number>(0.85);
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [showAnalyzerModal, setShowAnalyzerModal] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  // Populate loaded CV data
  useEffect(() => {
    if (fetchedCVData?.cv) {
      setCvData(fetchedCVData.cv);
    }
  }, [fetchedCVData]);

  // Adjust zoom for mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZoom(0.48);
      } else if (window.innerWidth < 1280) {
        setZoom(0.7);
      } else {
        setZoom(0.85);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUpdateCv = (partial: Partial<ICVData>) => {
    setCvData((prev) => ({ ...prev, ...partial }));
  };

  const handleSave = async () => {
    try {
      if (cvId) {
        const res = await updateCV({ id: cvId, cvData }).unwrap();
        if (res.success) {
          toast.success("CV saved successfully!");
        }
      } else {
        const res = await createCV(cvData).unwrap();
        if (res.success && res.cv?._id) {
          toast.success("CV created successfully!");
          navigate(`/cv-builder/${res.cv._id}`, { replace: true });
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save CV.");
    }
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    toast.info("Generating high-resolution PDF...");

    try {
      const fileName = `${cvData.personalInfo?.fullName || "Resume"}_CV.pdf`;
      const success = await exportCVToPDF(previewRef.current, fileName);
      if (success) {
        toast.success("PDF downloaded successfully!");
      } else {
        toast.error("Failed to generate PDF.");
      }
    } catch (err) {
      toast.error("An error occurred during PDF generation.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleApplyRecommendation = (rec: ICVRecommendation) => {
    if (rec.section === "summary" && rec.suggestedText) {
      setCvData((prev) => ({ ...prev, summary: rec.suggestedText || prev.summary }));
    }
  };

  const handleToggleHidden = (sectionKey: string) => {
    const hidden = cvData.hiddenSections || [];
    if (hidden.includes(sectionKey)) {
      setCvData((prev) => ({
        ...prev,
        hiddenSections: hidden.filter((k) => k !== sectionKey),
      }));
    } else {
      setCvData((prev) => ({
        ...prev,
        hiddenSections: [...hidden, sectionKey],
      }));
    }
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: <User size={13} /> },
    { id: "summary", label: "Summary", icon: <Sparkles size={13} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={13} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={13} /> },
    { id: "skills", label: "Skills", icon: <BookOpen size={13} /> },
    { id: "projects", label: "Projects", icon: <Globe size={13} /> },
    { id: "certifications", label: "Certs", icon: <Award size={13} /> },
    { id: "languages", label: "Languages", icon: <Languages size={13} /> },
    { id: "achievements", label: "Honors", icon: <Award size={13} /> },
    { id: "custom", label: "Custom", icon: <Layers size={13} /> },
    { id: "ordering", label: "Reorder", icon: <ArrowUpDown size={13} /> },
  ];

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center space-y-3">
          <Loader2 size={36} className="animate-spin text-orange-600 mx-auto" />
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Loading CV details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col">
      <Helmet>
        <title>{cvData.title || "AI CV Builder"} — AI Guru Nepal</title>
        <meta
          name="description"
          content="Build ATS-friendly, professional CVs tailored for top technology and corporate roles with AI enhancements."
        />
      </Helmet>

      {/* Top Action & Control Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xs px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/my-cvs")}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Back to My CVs"
          >
            <ChevronLeft size={18} />
          </button>

          <div>
            <input
              type="text"
              value={cvData.title}
              onChange={(e) => handleUpdateCv({ title: e.target.value })}
              className="text-sm font-bold text-gray-900 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-orange-500 focus:outline-none px-1"
            />
            <p className="text-[10.5px] text-gray-400">Template: {cvData.template} • Free AI Builder</p>
          </div>
        </div>

        {/* Mobile View Toggle (Editor vs Live Preview) */}
        <div className="flex md:hidden bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setMobileView("editor")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              mobileView === "editor" ? "bg-white dark:bg-gray-900 shadow-xs text-orange-600" : "text-gray-500"
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setMobileView("preview")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              mobileView === "preview" ? "bg-white dark:bg-gray-900 shadow-xs text-orange-600" : "text-gray-500"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Template & Color Picker */}
          <button
            type="button"
            onClick={() => setShowTemplateModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
          >
            <Palette size={14} className="text-orange-500" />
            <span>Design & Style</span>
          </button>

          {/* AI Analyzer & ATS Matcher */}
          <button
            type="button"
            onClick={() => setShowAnalyzerModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">AI ATS Check</span>
          </button>

          {/* Save CV */}
          <button
            type="button"
            disabled={isCreating || isUpdating}
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isCreating || isUpdating ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            <span>Save</span>
          </button>

          {/* PDF Export */}
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isExporting ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Split Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: Interactive Editor (Form) */}
        <div
          className={`col-span-12 md:col-span-6 lg:col-span-5 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-[calc(100vh-57px)] overflow-hidden ${
            mobileView === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Section Tabs Scroller */}
          <div className="flex items-center gap-1.5 p-2.5 border-b border-gray-100 dark:border-gray-800 overflow-x-auto no-scrollbar bg-gray-50/50 dark:bg-gray-800/20">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange-600 text-white shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Scrollable Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {activeTab === "personal" && (
              <PersonalInfoSection
                data={cvData.personalInfo}
                onChange={(updated) => handleUpdateCv({ personalInfo: updated })}
              />
            )}

            {activeTab === "summary" && (
              <SummarySection
                summary={cvData.summary}
                personalInfo={cvData.personalInfo}
                experience={cvData.experience}
                skills={cvData.skills}
                onChange={(newSummary) => handleUpdateCv({ summary: newSummary })}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceSection
                experience={cvData.experience}
                onChange={(updated) => handleUpdateCv({ experience: updated })}
              />
            )}

            {activeTab === "education" && (
              <EducationSection
                education={cvData.education}
                onChange={(updated) => handleUpdateCv({ education: updated })}
              />
            )}

            {activeTab === "skills" && (
              <SkillsSection
                skills={cvData.skills}
                onChange={(updated) => handleUpdateCv({ skills: updated })}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsSection
                projects={cvData.projects}
                onChange={(updated) => handleUpdateCv({ projects: updated })}
              />
            )}

            {activeTab === "certifications" && (
              <CertificationsSection
                certifications={cvData.certifications}
                onChange={(updated) => handleUpdateCv({ certifications: updated })}
              />
            )}

            {activeTab === "languages" && (
              <LanguagesSection
                languages={cvData.languages}
                onChange={(updated) => handleUpdateCv({ languages: updated })}
              />
            )}

            {activeTab === "achievements" && (
              <AchievementsSection
                achievements={cvData.achievements}
                onChange={(updated) => handleUpdateCv({ achievements: updated })}
              />
            )}

            {activeTab === "custom" && (
              <CustomSections
                customSections={cvData.customSections}
                onChange={(updated) => handleUpdateCv({ customSections: updated })}
              />
            )}

            {activeTab === "ordering" && (
              <SectionOrderManager
                sectionOrder={cvData.sectionOrder}
                hiddenSections={cvData.hiddenSections}
                customSections={cvData.customSections}
                onReorder={(newOrder) => handleUpdateCv({ sectionOrder: newOrder })}
                onToggleHidden={handleToggleHidden}
              />
            )}
          </div>
        </div>

        {/* Right Column: Live A4 Visual Preview */}
        <div
          className={`col-span-12 md:col-span-6 lg:col-span-7 bg-slate-200/70 dark:bg-slate-950 flex flex-col h-[calc(100vh-57px)] overflow-hidden ${
            mobileView === "editor" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Preview Toolbar */}
          <div className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xs border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Live A4 Paper Preview</span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(0.4, Number((prev - 0.05).toFixed(2))))}
                className="p-1 rounded text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-[11px] font-mono font-bold text-gray-700 dark:text-gray-300 px-1">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(1.4, Number((prev + 0.05).toFixed(2))))}
                className="p-1 rounded text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
              <button
                type="button"
                onClick={() => setZoom(0.85)}
                className="p-1 rounded text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 ml-1"
                title="Fit Page"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          {/* Interactive Document Viewport */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center items-start">
            <CVPreview ref={previewRef} data={cvData} zoom={zoom} />
          </div>
        </div>
      </div>

      {/* Template & Color Modal */}
      {showTemplateModal && (
        <TemplateSettingsModal
          data={cvData}
          onChange={handleUpdateCv}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {/* AI CV Analyzer & ATS Matcher Modal */}
      {showAnalyzerModal && (
        <CVAnalyzerModal
          cvData={cvData}
          cvId={cvId}
          onApplyRecommendation={handleApplyRecommendation}
          onClose={() => setShowAnalyzerModal(false)}
        />
      )}
    </div>
  );
};

export default CVMaker;
