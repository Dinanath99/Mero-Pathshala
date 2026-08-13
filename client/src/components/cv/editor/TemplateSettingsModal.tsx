import React from "react";
import { ICVData, ICVSettings } from "@/types/cv.types";
import { Check, X, Palette, Type, LayoutTemplate } from "lucide-react";

interface Props {
  data: ICVData;
  onChange: (updated: Partial<ICVData>) => void;
  onClose: () => void;
}

const TEMPLATE_OPTIONS: { id: ICVData["template"]; title: string; desc: string; previewColor: string }[] = [
  { id: "modern", title: "Modern Minimal", desc: "Clean & structured with dynamic badges and icons", previewColor: "#ea580c" },
  { id: "classic", title: "Classic Professional", desc: "Timeless serif hierarchy and conservative formatting", previewColor: "#1e293b" },
  { id: "developer", title: "Tech & Developer", desc: "Code-centric sidebar, GitHub stats & tech stack tags", previewColor: "#0f766e" },
  { id: "graduate", title: "Fresh Graduate", desc: "Education & capstone projects emphasized first", previewColor: "#2563eb" },
  { id: "executive", title: "Executive Leadership", desc: "Deep luxury accents and strategic impact highlights", previewColor: "#7f1d1d" },
];

const COLOR_PALETTES = [
  { name: "Nepali Crimson", hex: "#ea580c" },
  { name: "Corporate Blue", hex: "#2563eb" },
  { name: "Emerald Forest", hex: "#059669" },
  { name: "Tech Cyan", hex: "#0f766e" },
  { name: "Royal Purple", hex: "#7c3aed" },
  { name: "Executive Burgundy", hex: "#7f1d1d" },
  { name: "Charcoal Slate", hex: "#334155" },
  { name: "Amber Gold", hex: "#d97706" },
];

export const TemplateSettingsModal: React.FC<Props> = ({ data, onChange, onClose }) => {
  const currentTemplate = data.template || "modern";
  const settings = data.settings || {
    fontFamily: "inter",
    fontSize: "medium",
    spacing: "normal",
    primaryColor: "#ea580c",
    margins: "normal",
    showSectionIcons: true,
  };

  const handleUpdateSettings = (field: keyof ICVSettings, value: any) => {
    onChange({
      settings: { ...settings, [field]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Palette size={18} className="text-orange-500" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Design & Template Settings</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Template Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2.5 flex items-center gap-1.5">
              <LayoutTemplate size={14} className="text-orange-500" /> Select CV Layout Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEMPLATE_OPTIONS.map((tpl) => {
                const isSelected = currentTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => onChange({ template: tpl.id })}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 shadow-xs"
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: tpl.previewColor }} />
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{tpl.title}</span>
                      </div>
                      {isSelected && <Check size={14} className="text-orange-600" />}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{tpl.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Accent Color */}
          <div>
            <label className="block text-xs font-bold text-gray-900 dark:text-white mb-2.5 flex items-center gap-1.5">
              <Palette size={14} className="text-orange-500" /> Accent Brand Color
            </label>
            <div className="flex flex-wrap gap-2.5 items-center">
              {COLOR_PALETTES.map((col) => {
                const isSelected = settings.primaryColor === col.hex;
                return (
                  <button
                    key={col.hex}
                    type="button"
                    onClick={() => handleUpdateSettings("primaryColor", col.hex)}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs cursor-pointer ${
                      isSelected ? "ring-2 ring-offset-2 ring-gray-900 dark:ring-white scale-110" : ""
                    }`}
                  >
                    {isSelected && <Check size={14} className="text-white drop-shadow-sm" />}
                  </button>
                );
              })}

              {/* Custom Color Input */}
              <div className="flex items-center gap-1.5 ml-2">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleUpdateSettings("primaryColor", e.target.value)}
                  className="w-7 h-7 rounded border-0 p-0 cursor-pointer"
                />
                <span className="text-[11px] font-mono text-gray-500">{settings.primaryColor}</span>
              </div>
            </div>
          </div>

          {/* Typography & Sizing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            {/* Font Family */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Type size={13} /> Font Family
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleUpdateSettings("fontFamily", e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                <option value="inter">Inter (Modern Clean)</option>
                <option value="roboto">Roboto (Geometric Sans)</option>
                <option value="merriweather">Merriweather (Classic Serif)</option>
                <option value="outfit">Outfit (Contemporary)</option>
                <option value="playfair">Playfair (High Luxury)</option>
                <option value="geist">Geist / Mono (Tech)</option>
              </select>
            </div>

            {/* Spacing */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Section Spacing
              </label>
              <select
                value={settings.spacing}
                onChange={(e) => handleUpdateSettings("spacing", e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                <option value="compact">Compact (Fit 1 Page)</option>
                <option value="normal">Standard / Normal</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>

            {/* Page Margins */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">Page Margins</label>
              <select
                value={settings.margins}
                onChange={(e) => handleUpdateSettings("margins", e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                <option value="compact">Narrow / Compact</option>
                <option value="normal">Normal</option>
                <option value="spacious">Wide</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-sm cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
