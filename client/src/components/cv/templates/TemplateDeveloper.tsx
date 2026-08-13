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
  Terminal,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

interface TemplateProps {
  data: ICVData;
}

export const TemplateDeveloper: React.FC<TemplateProps> = ({ data }) => {
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

  const primaryColor = settings?.primaryColor || "#0f766e"; // Sleek teal / dark cyan by default
  const isHidden = (key: string) => hiddenSections.includes(key);

  const mainSections = ["summary", "experience", "projects", "achievements"];
  const sideSections = ["education", "skills", "certifications", "languages"];

  return (
    <div className="bg-white text-gray-900 w-full min-h-full font-sans leading-normal flex flex-col">
      {/* Top Tech Header */}
      <div className="bg-slate-900 text-white p-5 rounded-xl mb-5 flex justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold mb-1" style={{ color: "#38bdf8" }}>
            <Terminal size={14} /> <span>~/developer-profile</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight uppercase text-white">
            {personalInfo.fullName || "Developer Name"}
          </h1>
          <p className="text-sm font-semibold text-gray-300 font-mono">
            {personalInfo.professionalTitle || "Software Engineer"}
          </p>
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="w-16 h-16 rounded-xl object-cover border-2 border-slate-700 shadow-md"
          />
        )}
      </div>

      {/* Grid Layout: Left Main Column (65%) + Right Sidebar (35%) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="col-span-8 space-y-4">
          {/* Summary */}
          {!isHidden("summary") && summary && (
            <div>
              <h2
                className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                // Summary
              </h2>
              <p className="text-[12.5px] text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {!isHidden("experience") && experience.length > 0 && (
            <div>
              <h2
                className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b pb-1"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                <Briefcase size={14} /> // Experience
              </h2>
              <div className="space-y-3.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: primaryColor }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-gray-900">{exp.jobTitle}</h3>
                      <span className="text-[10px] font-mono text-gray-500">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-gray-600 mb-1">
                      {exp.company} {exp.location ? `• ${exp.location}` : ""}
                    </div>
                    {exp.description && (
                      <p className="text-[12px] text-gray-700 leading-relaxed mb-1">{exp.description}</p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-[11.5px] text-gray-700 space-y-0.5 ml-1">
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

          {/* Projects */}
          {!isHidden("projects") && projects.length > 0 && (
            <div>
              <h2
                className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b pb-1"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                <Terminal size={14} /> // Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        {proj.name}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-500 hover:text-gray-900"
                          >
                            <Github size={12} />
                          </a>
                        )}
                        {proj.projectUrl && (
                          <a
                            href={proj.projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-500 hover:text-gray-900"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </h3>
                      <span className="text-[10px] font-mono text-gray-500">
                        {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ""}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-gray-700 leading-relaxed mb-1.5">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-gray-700 border border-slate-300 font-semibold"
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

          {/* Achievements / Custom */}
          {!isHidden("achievements") && achievements.length > 0 && (
            <div>
              <h2
                className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                <Award size={14} /> // Achievements
              </h2>
              <div className="space-y-1.5">
                {achievements.map((ach) => (
                  <div key={ach.id} className="text-[12px]">
                    <div className="font-bold text-gray-900 flex justify-between">
                      <span>{ach.title}</span>
                      <span className="text-[10px] font-mono text-gray-500">{ach.date}</span>
                    </div>
                    {ach.description && <p className="text-[11px] text-gray-600">{ach.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {customSections.map((cs) => {
            if (isHidden(cs.id) || cs.items.length === 0) return null;
            return (
              <div key={cs.id}>
                <h2
                  className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b pb-1"
                  style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
                >
                  // {cs.title}
                </h2>
                <div className="space-y-2">
                  {cs.items.map((item) => (
                    <div key={item.id} className="text-[12px]">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{item.title}</span>
                        {item.date && <span className="text-[10px] font-mono text-gray-500">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-[11px] text-gray-600 italic">{item.subtitle}</p>}
                      {item.description && <p className="text-[11px] text-gray-600">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Info Area */}
        <div className="col-span-4 space-y-5 border-l pl-5 border-gray-200">
          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase text-gray-900 mb-2">// Contact</h3>
            <div className="space-y-1.5 text-[11px] text-gray-700">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5 break-all">
                  <Mail size={12} className="text-gray-400 shrink-0" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-gray-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-gray-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5 break-all">
                  <Github size={12} className="text-gray-400 shrink-0" />
                  <span>{personalInfo.github.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5 break-all">
                  <Linkedin size={12} className="text-gray-400 shrink-0" />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5 break-all">
                  <Globe size={12} className="text-gray-400 shrink-0" />
                  <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Breakdown */}
          {!isHidden("skills") && skills.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-gray-900 mb-2">// Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="text-[11px] font-mono px-2 py-0.5 rounded font-semibold bg-gray-100 text-gray-800 border border-gray-300"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {!isHidden("education") && education.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-gray-900 mb-2 flex items-center gap-1">
                <GraduationCap size={13} /> // Education
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11.5px]">
                    <div className="font-bold text-gray-900">{edu.degree}</div>
                    <div className="text-gray-600">{edu.institution}</div>
                    <div className="text-[10px] font-mono text-gray-500">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate || "Present"}
                    </div>
                    {edu.gpa && <div className="text-[10px] font-bold text-gray-700">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {!isHidden("certifications") && certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-gray-900 mb-2">// Certs</h3>
              <div className="space-y-1.5 text-[11px]">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold text-gray-900">{cert.name}</div>
                    <div className="text-gray-500 font-mono text-[10px]">{cert.organization}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {!isHidden("languages") && languages.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-gray-900 mb-1.5">// Languages</h3>
              <div className="space-y-1 text-[11px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-500 text-[10px] font-mono">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
