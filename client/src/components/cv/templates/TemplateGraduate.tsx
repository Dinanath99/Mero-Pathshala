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

export const TemplateGraduate: React.FC<TemplateProps> = ({ data }) => {
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
    settings,
  } = data;

  const primaryColor = settings?.primaryColor || "#2563eb"; // Energetic Royal Blue

  return (
    <div className="bg-white text-gray-900 w-full min-h-full font-sans leading-normal">
      {/* Graduate Header with Accent Bar */}
      <div className="border-b-4 pb-4 mb-4" style={{ borderColor: primaryColor }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-950 uppercase">
              {personalInfo.fullName || "Candidate Name"}
            </h1>
            <p className="text-sm font-bold text-blue-600 mt-0.5" style={{ color: primaryColor }}>
              {personalInfo.professionalTitle || "Fresh Graduate & Aspirant"}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-gray-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail size={11} className="text-gray-400" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={11} className="text-gray-400" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-gray-400" /> {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin size={11} className="text-gray-400" /> {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github size={11} className="text-gray-400" /> {personalInfo.github.replace(/^https?:\/\//, "")}
                </span>
              )}
            </div>
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: primaryColor }}
            />
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 border-b pb-1"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            <Sparkles size={13} /> Career Objective & Profile
          </h2>
          <p className="text-[12px] text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Education First (Graduate Focus) */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            <GraduationCap size={13} /> Academic Qualifications
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start bg-blue-50/40 p-2 rounded-lg border border-blue-100">
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-[11.5px] font-semibold text-gray-700">
                    {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                  </p>
                  {edu.description && <p className="text-[11px] text-gray-600 mt-0.5">{edu.description}</p>}
                </div>
                <div className="text-right">
                  <span className="text-[10.5px] font-semibold text-gray-500">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate || "Present"}
                  </span>
                  {edu.gpa && (
                    <div className="text-[11px] font-bold" style={{ color: primaryColor }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects & Academic Works */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            <Globe size={13} /> Academic & Capstone Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    {proj.name}
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-blue-500">
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ""}
                  </span>
                </div>
                <p className="text-[11.5px] text-gray-700 leading-relaxed my-0.5">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-gray-100 text-gray-700 border border-gray-200"
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
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            <BookOpen size={13} /> Technical & Soft Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s.id}
                className="text-[11px] px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-900 border border-blue-200"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience / Internships */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
            style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
          >
            <Briefcase size={13} /> Internships & Practical Experience
          </h2>
          <div className="space-y-2.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-[10.5px] text-gray-500">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-gray-600 mb-0.5">
                  {exp.company} {exp.location ? `• ${exp.location}` : ""}
                </div>
                {exp.description && <p className="text-[11.5px] text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 border-b pb-1"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Award size={13} /> Certifications
            </h2>
            <div className="space-y-1 text-[11px]">
              {certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-bold text-gray-900">{c.name}</span>
                  <span className="text-gray-500"> ({c.organization})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 border-b pb-1"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              <Award size={13} /> Honors & Activities
            </h2>
            <div className="space-y-1 text-[11px]">
              {achievements.map((a) => (
                <div key={a.id}>
                  <span className="font-bold text-gray-900">{a.title}</span>
                  {a.organization && <span className="text-gray-500"> • {a.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
