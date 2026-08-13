import React, { forwardRef } from "react";
import { ICVData } from "@/types/cv.types";
import { TemplateModern } from "./templates/TemplateModern";
import { TemplateClassic } from "./templates/TemplateClassic";
import { TemplateDeveloper } from "./templates/TemplateDeveloper";
import { TemplateGraduate } from "./templates/TemplateGraduate";
import { TemplateExecutive } from "./templates/TemplateExecutive";

interface CVPreviewProps {
  data: ICVData;
  className?: string;
  zoom?: number;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data, className = "", zoom = 1 }, ref) => {
  const template = data.template || "modern";
  const fontFamily = data.settings?.fontFamily || "inter";
  const spacing = data.settings?.spacing || "normal";
  const margins = data.settings?.margins || "normal";

  // Spacing styling classes
  const spacingClasses = {
    compact: "space-y-3",
    normal: "space-y-5",
    spacious: "space-y-7",
  }[spacing];

  // Margins styling
  const marginClasses = {
    compact: "p-6",
    normal: "p-8 md:p-10",
    spacious: "p-10 md:p-12",
  }[margins];

  // Font family mappings
  const fontClasses = {
    inter: "font-sans",
    roboto: "font-sans font-roboto",
    merriweather: "font-serif",
    outfit: "font-sans tracking-tight",
    playfair: "font-serif",
    geist: "font-mono",
  }[fontFamily];

  const renderTemplateContent = () => {
    switch (template) {
      case "classic":
        return <TemplateClassic data={data} />;
      case "developer":
        return <TemplateDeveloper data={data} />;
      case "graduate":
        return <TemplateGraduate data={data} />;
      case "executive":
        return <TemplateExecutive data={data} />;
      case "modern":
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top center",
        transition: "transform 0.15s ease-out",
      }}
      className={`cv-preview-container flex justify-center ${className}`}
    >
      {/* Standard A4 Paper Container with Shadow and Precise Dimensions */}
      <div
        ref={ref}
        id="cv-printable-area"
        data-cv-printable="true"
        className={`bg-white text-gray-900 shadow-2xl rounded-sm print:shadow-none w-[210mm] min-h-[297mm] box-border relative ${marginClasses} ${fontClasses} ${spacingClasses}`}
        style={{
          boxSizing: "border-box",
        }}
      >
        {renderTemplateContent()}
      </div>
    </div>
  );
});

CVPreview.displayName = "CVPreview";
