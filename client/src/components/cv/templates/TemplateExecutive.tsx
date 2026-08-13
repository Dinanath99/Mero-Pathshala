import React from "react";
import { ICVData } from "@/types/cv.types";
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award } from "lucide-react";

interface TemplateProps {
  data: ICVData;
}

export const TemplateExecutive: React.FC<TemplateProps> = ({ data }) => {
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

  const primaryColor = settings?.primaryColor || "#7f1d1d"; // Deep Burgundy / Maroon

  return (
    <div className="bg-white text-gray-900 w-full min-h-full font-sans leading-normal">
      {/* Executive Header Banner */}
      <div className="p-5 text-white rounded-lg mb-5" style={{ backgroundColor: primaryColor }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-wider uppercase text-white font-serif">
              {personalInfo.fullName || "Executive Name"}
            </h1>
            <p className="text-sm font-semibold text-rose-100 tracking-wide mt-0.5">
              {personalInfo.professionalTitle || "Executive Leader & Strategist"}
            </p>
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-16 h-16 rounded-lg object-cover border-2 border-white/40 shadow-sm"
            />
          )}
        </div>

        {/* Contact Info in Top Banner */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-white/20 text-[11px] text-rose-100">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail size={11} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone size={11} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin size={11} /> {personalInfo.linkedin.replace(/^https?:\/\//, "")}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe size={11} /> {personalInfo.website.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {summary && (
        <div className="mb-5 bg-rose-50/40 p-3 rounded-lg border-l-4" style={{ borderColor: primaryColor }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1 font-serif">
            Executive Profile & Core Competencies
          </h2>
          <p className="text-[12.5px] text-gray-800 leading-relaxed font-sans">{summary}</p>
        </div>
      )}

      {/* Leadership & Work Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-1 border-b-2 font-serif"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            <Briefcase size={14} /> Career Trajectory & Executive Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-gray-950 font-serif">{exp.jobTitle}</h3>
                  <span className="text-[11px] font-bold text-gray-600">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-[11.5px] font-semibold text-gray-700 mb-1">
                  {exp.company} {exp.location ? `• ${exp.location}` : ""} {exp.employmentType ? `(${exp.employmentType})` : ""}
                </div>
                {exp.description && <p className="text-[12px] text-gray-800 leading-relaxed mb-1.5">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-[11.5px] text-gray-800 space-y-0.5 ml-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Leadership Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b-2 font-serif"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            Executive Capabilities & Domain Mastery
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.id}
                className="text-[11px] font-semibold px-2.5 py-1 rounded bg-stone-100 text-gray-900 border border-stone-300"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education & Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {education.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b-2 font-serif"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              <GraduationCap size={14} /> Higher Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-[11.5px]">
                  <div className="font-bold text-gray-900">{edu.degree}</div>
                  <div className="text-gray-700">
                    {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                  </div>
                  <div className="text-[10.5px] text-gray-500">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate || "Present"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b-2 font-serif"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              <Award size={14} /> Key Strategic Honors
            </h2>
            <div className="space-y-1.5 text-[11.5px]">
              {achievements.map((ach) => (
                <div key={ach.id}>
                  <div className="font-bold text-gray-900">{ach.title}</div>
                  <div className="text-gray-600 text-[10.5px]">
                    {ach.organization} • {ach.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
