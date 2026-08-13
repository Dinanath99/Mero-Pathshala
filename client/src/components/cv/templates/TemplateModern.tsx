import React from "react";
import { ICVData } from "@/types/cv.types";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface TemplateProps {
  data: ICVData;
}

export const TemplateModern: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    customSections = [],
    sectionOrder = [],
    hiddenSections = [],
    settings,
  } = data;

  const primaryColor = settings?.primaryColor || "#ea580c";
  const showIcons = settings?.showSectionIcons ?? true;

  const isHidden = (key: string) => hiddenSections.includes(key);

  const renderSection = (sectionKey: string) => {
    if (isHidden(sectionKey)) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <Sparkles size={14} />} Professional Summary
            </h2>
            <p className="text-[13px] text-gray-700 leading-relaxed font-normal">{summary}</p>
          </div>
        );

      case "experience":
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <Briefcase size={14} />} Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2 border-gray-200">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-sm font-bold text-gray-900">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-semibold text-gray-500">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    {exp.company} {exp.location ? `• ${exp.location}` : ""} {exp.employmentType ? `(${exp.employmentType})` : ""}
                  </div>
                  {exp.description && (
                    <p className="text-[12px] text-gray-700 leading-relaxed mb-1.5">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-[12px] text-gray-700 space-y-0.5 ml-1">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <GraduationCap size={14} />} Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline flex-wrap gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-[12px] text-gray-600">
                      {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                    </p>
                    {edu.description && <p className="text-[11px] text-gray-500 mt-0.5">{edu.description}</p>}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-gray-500">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate || "Present"}
                    </span>
                    {edu.gpa && <p className="text-[11px] font-bold text-gray-700">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "skills":
        if (skills.length === 0) return null;
        const categories = Array.from(new Set(skills.map((s) => s.category || "Technical Skills")));
        return (
          <div key="skills" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <BookOpen size={14} />} Skills & Competencies
            </h2>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <div key={cat} className="flex items-baseline gap-2">
                  <span className="text-[11px] font-bold text-gray-800 min-w-[110px]">{cat}:</span>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {skills
                      .filter((s) => (s.category || "Technical Skills") === cat)
                      .map((s) => (
                        <span
                          key={s.id}
                          className="text-[11px] px-2 py-0.5 rounded font-medium bg-gray-100 text-gray-800 border border-gray-200"
                        >
                          {s.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <Globe size={14} />} Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      {proj.name}
                      {proj.projectUrl && (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-orange-500 inline"
                        >
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </h3>
                    <span className="text-[10px] font-semibold text-gray-500">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ""}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-700 leading-relaxed my-0.5">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-gray-50 text-gray-600 border border-gray-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <Award size={14} />} Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-[12px]">
                  <div className="font-bold text-gray-900">{cert.name}</div>
                  <div className="text-[11px] text-gray-600">
                    {cert.organization} • {cert.issueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (languages.length === 0) return null;
        return (
          <div key="languages" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-3 text-[12px]">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-1 font-medium text-gray-800">
                  <span>{lang.language}</span>
                  <span className="text-[10px] text-gray-500 font-normal">({lang.proficiency})</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {showIcons && <Award size={14} />} Honors & Achievements
            </h2>
            <div className="space-y-1.5">
              {achievements.map((ach) => (
                <div key={ach.id} className="text-[12px]">
                  <div className="font-bold text-gray-900 flex justify-between">
                    <span>{ach.title}</span>
                    <span className="text-[10px] text-gray-500">{ach.date}</span>
                  </div>
                  {ach.description && <p className="text-[11px] text-gray-600">{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        // Handle custom sections
        const customSec = customSections.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="mb-5">
            <h2
              className="text-xs font-extrabold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: `${primaryColor}33` }}
            >
              {customSec.title}
            </h2>
            <div className="space-y-2">
              {customSec.items.map((item) => (
                <div key={item.id} className="text-[12px]">
                  <div className="flex justify-between items-baseline font-bold text-gray-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-[10px] text-gray-500 font-normal">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[11px] font-semibold text-gray-600">{item.subtitle}</p>}
                  {item.description && <p className="text-[11px] text-gray-600 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const defaultOrder = [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "achievements",
    ...customSections.map((cs) => cs.id),
  ];

  const orderedSections = sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  return (
    <div className="bg-white text-gray-900 w-full min-h-full font-sans leading-normal">
      {/* Top Header */}
      <div className="border-b-2 pb-5 mb-5" style={{ borderColor: primaryColor }}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-950 uppercase mb-0.5">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-bold tracking-wide" style={{ color: primaryColor }}>
              {personalInfo.professionalTitle || "Professional Job Title"}
            </p>

            {/* Contact Details Grid */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-gray-600 font-medium">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-gray-400" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-gray-400" /> {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin size={12} className="text-gray-400" /> {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github size={12} className="text-gray-400" /> {personalInfo.github.replace(/^https?:\/\//, "")}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe size={12} className="text-gray-400" /> {personalInfo.website.replace(/^https?:\/\//, "")}
                </span>
              )}
            </div>
          </div>

          {/* Optional Profile Photo */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-xl object-cover border-2 shadow-sm"
              style={{ borderColor: primaryColor }}
            />
          )}
        </div>
      </div>

      {/* Main Dynamic Sections in Draggable Order */}
      <div>{orderedSections.map((secKey) => renderSection(secKey))}</div>
    </div>
  );
};
