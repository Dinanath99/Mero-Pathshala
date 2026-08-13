export type AccentColor = 
  | "blue" 
  | "green" 
  | "amber" 
  | "teal" 
  | "orange" 
  | "purple" 
  | "rose" 
  | "brown";

export interface AccentTheme {
  name: AccentColor;
  hex: string;
  topLine: string;
  hoverBorder: string;
  hoverBg: string;
  text: string;
  textSubtle: string;
  iconContainer: string;
  iconContainerHover: string;
  progressFill: string;
  buttonPrimary: string;
  buttonHoverFromNeutral: string;
  badge: string;
  activeRow: string;
  activeDot: string;
  borderSubtle: string;
}

export const accentThemes: Record<AccentColor, AccentTheme> = {
  blue: {
    name: "blue",
    hex: "#2563EB",
    topLine: "bg-blue-600 dark:bg-blue-500",
    hoverBorder: "hover:border-blue-500/60 dark:hover:border-blue-400/50",
    hoverBg: "hover:bg-blue-50/30 dark:hover:bg-blue-950/20",
    text: "text-blue-600 dark:text-blue-400",
    textSubtle: "text-blue-700/90 dark:text-blue-300/90",
    iconContainer: "bg-blue-50 text-blue-600 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60",
    iconContainerHover: "group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 dark:group-hover:bg-blue-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-blue-600 dark:bg-blue-500",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-blue-600 group-hover:text-white",
    badge: "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60",
    activeRow: "bg-blue-50/80 dark:bg-blue-950/30 border-l-4 border-l-blue-600",
    activeDot: "bg-blue-600 text-white",
    borderSubtle: "border-blue-500/20"
  },
  green: {
    name: "green",
    hex: "#16A34A",
    topLine: "bg-emerald-600 dark:bg-emerald-500",
    hoverBorder: "hover:border-emerald-500/60 dark:hover:border-emerald-400/50",
    hoverBg: "hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
    text: "text-emerald-600 dark:text-emerald-400",
    textSubtle: "text-emerald-700/90 dark:text-emerald-300/90",
    iconContainer: "bg-emerald-50 text-emerald-600 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60",
    iconContainerHover: "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 dark:group-hover:bg-emerald-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-emerald-600 dark:bg-emerald-500",
    buttonPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-emerald-600 group-hover:text-white",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60",
    activeRow: "bg-emerald-50/80 dark:bg-emerald-950/30 border-l-4 border-l-emerald-600",
    activeDot: "bg-emerald-600 text-white",
    borderSubtle: "border-emerald-500/20"
  },
  amber: {
    name: "amber",
    hex: "#D97706",
    topLine: "bg-amber-600 dark:bg-amber-500",
    hoverBorder: "hover:border-amber-500/60 dark:hover:border-amber-400/50",
    hoverBg: "hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    textSubtle: "text-amber-700/90 dark:text-amber-300/90",
    iconContainer: "bg-amber-50 text-amber-600 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60",
    iconContainerHover: "group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 dark:group-hover:bg-amber-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-amber-600 dark:bg-amber-500",
    buttonPrimary: "bg-amber-600 hover:bg-amber-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-amber-600 group-hover:text-white",
    badge: "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60",
    activeRow: "bg-amber-50/80 dark:bg-amber-950/30 border-l-4 border-l-amber-600",
    activeDot: "bg-amber-600 text-white",
    borderSubtle: "border-amber-500/20"
  },
  teal: {
    name: "teal",
    hex: "#0F766E",
    topLine: "bg-teal-600 dark:bg-teal-500",
    hoverBorder: "hover:border-teal-500/60 dark:hover:border-teal-400/50",
    hoverBg: "hover:bg-teal-50/30 dark:hover:bg-teal-950/20",
    text: "text-teal-600 dark:text-teal-400",
    textSubtle: "text-teal-700/90 dark:text-teal-300/90",
    iconContainer: "bg-teal-50 text-teal-600 border-teal-200/80 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/60",
    iconContainerHover: "group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 dark:group-hover:bg-teal-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-teal-600 dark:bg-teal-500",
    buttonPrimary: "bg-teal-600 hover:bg-teal-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-teal-600 group-hover:text-white",
    badge: "bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/60",
    activeRow: "bg-teal-50/80 dark:bg-teal-950/30 border-l-4 border-l-teal-600",
    activeDot: "bg-teal-600 text-white",
    borderSubtle: "border-teal-500/20"
  },
  orange: {
    name: "orange",
    hex: "#EA580C",
    topLine: "bg-orange-600 dark:bg-orange-500",
    hoverBorder: "hover:border-orange-500/60 dark:hover:border-orange-400/50",
    hoverBg: "hover:bg-orange-50/30 dark:hover:bg-orange-950/20",
    text: "text-orange-600 dark:text-orange-400",
    textSubtle: "text-orange-700/90 dark:text-orange-300/90",
    iconContainer: "bg-orange-50 text-orange-600 border-orange-200/80 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/60",
    iconContainerHover: "group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 dark:group-hover:bg-orange-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-orange-600 dark:bg-orange-500",
    buttonPrimary: "bg-orange-600 hover:bg-orange-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-orange-600 group-hover:text-white",
    badge: "bg-orange-50 text-orange-700 border-orange-200/80 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/60",
    activeRow: "bg-orange-50/80 dark:bg-orange-950/30 border-l-4 border-l-orange-600",
    activeDot: "bg-orange-600 text-white",
    borderSubtle: "border-orange-500/20"
  },
  purple: {
    name: "purple",
    hex: "#7C3AED",
    topLine: "bg-purple-600 dark:bg-purple-500",
    hoverBorder: "hover:border-purple-500/60 dark:hover:border-purple-400/50",
    hoverBg: "hover:bg-purple-50/30 dark:hover:bg-purple-950/20",
    text: "text-purple-600 dark:text-purple-400",
    textSubtle: "text-purple-700/90 dark:text-purple-300/90",
    iconContainer: "bg-purple-50 text-purple-600 border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/60",
    iconContainerHover: "group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 dark:group-hover:bg-purple-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-purple-600 dark:bg-purple-500",
    buttonPrimary: "bg-purple-600 hover:bg-purple-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-purple-600 group-hover:text-white",
    badge: "bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/60",
    activeRow: "bg-purple-50/80 dark:bg-purple-950/30 border-l-4 border-l-purple-600",
    activeDot: "bg-purple-600 text-white",
    borderSubtle: "border-purple-500/20"
  },
  rose: {
    name: "rose",
    hex: "#E11D48",
    topLine: "bg-rose-600 dark:bg-rose-500",
    hoverBorder: "hover:border-rose-500/60 dark:hover:border-rose-400/50",
    hoverBg: "hover:bg-rose-50/30 dark:hover:bg-rose-950/20",
    text: "text-rose-600 dark:text-rose-400",
    textSubtle: "text-rose-700/90 dark:text-rose-300/90",
    iconContainer: "bg-rose-50 text-rose-600 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60",
    iconContainerHover: "group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 dark:group-hover:bg-rose-600 dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-rose-600 dark:bg-rose-500",
    buttonPrimary: "bg-rose-600 hover:bg-rose-700 text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-rose-600 group-hover:text-white",
    badge: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60",
    activeRow: "bg-rose-50/80 dark:bg-rose-950/30 border-l-4 border-l-rose-600",
    activeDot: "bg-rose-600 text-white",
    borderSubtle: "border-rose-500/20"
  },
  brown: {
    name: "brown",
    hex: "#8B5E3C",
    topLine: "bg-[#8B5E3C] dark:bg-[#A77B57]",
    hoverBorder: "hover:border-[#8B5E3C]/60 dark:hover:border-[#A77B57]/50",
    hoverBg: "hover:bg-amber-50/20 dark:hover:bg-slate-800/30",
    text: "text-[#8B5E3C] dark:text-[#D4A373]",
    textSubtle: "text-[#70482B] dark:text-[#E6BE94]",
    iconContainer: "bg-[#8B5E3C]/10 text-[#8B5E3C] border-[#8B5E3C]/20 dark:bg-[#8B5E3C]/20 dark:text-[#D4A373] dark:border-[#8B5E3C]/30",
    iconContainerHover: "group-hover:bg-[#8B5E3C] group-hover:text-white group-hover:border-[#8B5E3C] dark:group-hover:bg-[#A77B57] dark:group-hover:text-white group-hover:shadow-md",
    progressFill: "bg-[#8B5E3C] dark:bg-[#A77B57]",
    buttonPrimary: "bg-[#8B5E3C] hover:bg-[#70482B] text-white shadow-xs",
    buttonHoverFromNeutral: "group-hover:bg-[#8B5E3C] group-hover:text-white",
    badge: "bg-[#8B5E3C]/10 text-[#8B5E3C] border-[#8B5E3C]/20 dark:bg-[#8B5E3C]/20 dark:text-[#D4A373] dark:border-[#8B5E3C]/30",
    activeRow: "bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-l-[#8B5E3C]",
    activeDot: "bg-[#8B5E3C] text-white",
    borderSubtle: "border-[#8B5E3C]/20"
  }
};

/**
 * Returns the accent theme for a given module ID or topic
 */
export function getModuleAccent(moduleIdOrName: string, defaultAccent: AccentColor = "blue"): AccentTheme {
  const key = moduleIdOrName.toLowerCase();
  
  if (key === "mod1" || key === "1" || key.includes("fundamental") || key.includes("hardware") || key.includes("computer")) {
    return accentThemes.blue;
  }
  if (key === "mod2" || key === "2" || key.includes("operating") || key.includes("windows") || key.includes("desktop")) {
    return accentThemes.green;
  }
  if (key === "mod3" || key === "3" || key.includes("file") || key.includes("folder") || key.includes("storage")) {
    return accentThemes.amber;
  }
  if (key === "mod4" || key === "4" || key.includes("internet") || key.includes("web") || key.includes("browser")) {
    return accentThemes.teal;
  }
  if (key === "mod5" || key === "5" || key.includes("office") || key.includes("word") || key.includes("document")) {
    return accentThemes.orange;
  }
  if (key === "mod6" || key === "6" || key.includes("google") || key.includes("cloud") || key.includes("workspace")) {
    return accentThemes.blue;
  }
  if (key === "mod7" || key === "7" || key.includes("email") || key.includes("communication") || key.includes("meet")) {
    return accentThemes.teal;
  }
  if (key === "mod8" || key === "8" || key.includes("security") || key.includes("privacy") || key.includes("safety")) {
    return accentThemes.rose;
  }
  if (key === "mod9" || key === "9" || key.includes("troubleshoot") || key.includes("maintenance") || key.includes("repair")) {
    return accentThemes.amber;
  }
  if (key === "mod10" || key === "10" || key.includes("prompt") || key.includes("ai-fundamental") || key.includes("chatgpt")) {
    return accentThemes.purple;
  }
  if (key === "mod11" || key === "11" || key.includes("ai-tool") || key.includes("creativity") || key.includes("generative")) {
    return accentThemes.purple;
  }
  if (key === "mod12" || key === "12" || key.includes("programming") || key.includes("coding") || key.includes("html") || key.includes("javascript")) {
    return accentThemes.teal;
  }

  return accentThemes[defaultAccent] || accentThemes.blue;
}
