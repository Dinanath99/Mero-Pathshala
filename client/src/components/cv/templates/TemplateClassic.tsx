import React from "react";
import { ICVData } from "@/types/cv.types";

interface TemplateProps {
  data: ICVData;
}

export const TemplateClassic: React.FC<TemplateProps> = ({ data }) => {
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

  const primaryColor = settings?.primaryColor || "#1e293b";
  const isHidden = (key: string) => hiddenSections.includes(key);

  const renderSection = (sectionKey: string) => {
    if (isHidden(sectionKey)) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5 font-serif">
              Professional Summary
            </h2>
            <p className="text-[12px] text-gray-800 leading-relaxed font-serif text-justify">{summary}</p>
          </div>
        );

      case "experience":
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-2 font-serif">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-gray-950 font-serif">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-medium text-gray-600 font-serif">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-gray-700 italic mb-1 font-serif">
                    {exp.company} {exp.location ? `| ${exp.location}` : ""}
                  </div>
                  {exp.description && (
                    <p className="text-[12px] text-gray-800 leading-relaxed mb-1 font-serif text-justify">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-[11.5px] text-gray-800 space-y-0.5 ml-1 font-serif">
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
          <div key="education" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-2 font-serif">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 font-serif">{edu.degree}</h3>
                    <p className="text-[11px] text-gray-700 italic font-serif">
                      {edu.institution} {edu.location ? `| ${edu.location}` : ""}
                    </p>
                    {edu.description && <p className="text-[11px] text-gray-600 font-serif">{edu.description}</p>}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-600 font-serif">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate || "Present"}
                    </span>
                    {edu.gpa && <p className="text-[11px] font-bold text-gray-800 font-serif">GPA: {edu.gpa}</p>}
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
          <div key="skills" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5 font-serif">
              Key Skills
            </h2>
            <div className="space-y-1 text-[11.5px] font-serif">
              {categories.map((cat) => (
                <div key={cat} className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900 min-w-[130px]">{cat}:</span>
                  <span className="text-gray-800">
                    {skills
                      .filter((s) => (s.category || "Technical Skills") === cat)
                      .map((s) => s.name)
                      .join(" • ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-2 font-serif">
              Selected Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-gray-900 font-serif">
                      {proj.name}{" "}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal text-gray-600 text-[11px] italic">
                          ({proj.technologies.join(", ")})
                        </span>
                      )}
                    </h3>
                    <span className="text-[10px] text-gray-600 font-serif">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ""}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-gray-800 font-serif leading-relaxed mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5 font-serif">
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] font-serif">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-gray-900">{cert.name}</div>
                  <div className="text-gray-700 italic">
                    {cert.organization} | {cert.issueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (languages.length === 0) return null;
        return (
          <div key="languages" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5 font-serif">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4 text-[11.5px] font-serif">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <span className="font-bold text-gray-900">{lang.language}:</span>{" "}
                  <span className="text-gray-700">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5 font-serif">
              Honors & Awards
            </h2>
            <div className="space-y-1.5 font-serif text-[11.5px]">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-900">{ach.title}</span>
                    {ach.organization && <span className="text-gray-700 italic"> – {ach.organization}</span>}
                    {ach.description && <p className="text-gray-600 text-[11px]">{ach.description}</p>}
                  </div>
                  <span className="text-[10px] text-gray-500">{ach.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        const customSec = customSections.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5 font-serif">
              {customSec.title}
            </h2>
            <div className="space-y-2 font-serif text-[11.5px]">
              {customSec.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">{item.title}</span>
                    {item.date && <span className="text-[10px] text-gray-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-gray-700 italic">{item.subtitle}</p>}
                  {item.description && <p className="text-gray-600 mt-0.5">{item.description}</p>}
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
    <div className="bg-white text-gray-900 w-full min-h-full font-serif leading-normal p-2">
      {/* Centered Traditional Header */}
      <div className="text-center border-b-2 pb-4 mb-4" style={{ borderColor: primaryColor }}>
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-950 font-serif mb-1">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-xs font-semibold text-gray-700 italic tracking-wide mb-2 font-serif">
          {personalInfo.professionalTitle || "Professional Title"}
        </p>

        {/* Traditional Dot-separated Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[11px] text-gray-700 font-serif">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, "")}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, "")}</span>}
        </div>
      </div>

      {/* Render Sections */}
      <div>{orderedSections.map((secKey) => renderSection(secKey))}</div>
    </div>
  );
};
