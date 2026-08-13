import { 
  allComputerFundamentalsLessons, 
  computerFundamentalsModuleInfo 
} from "./computerSkillsData";
import { 
  operatingComputerLessons, 
  operatingComputerModuleMeta 
} from "./operatingComputerData";
import { 
  fileManagementLessons, 
  fileManagementModuleMeta 
} from "./fileManagementData";

export interface CurriculumLessonMeta {
  id: number;
  slug: string;
  lessonNumber: number;
  titleEn: string;
  titleNe: string;
  duration: string;
  level?: string;
  summaryEn?: string;
  summaryNe?: string;
  isAvailable: boolean;
}

export interface CurriculumModule {
  id: string; // e.g. "mod1", "mod2", "mod3", "mod4"
  moduleNumber: number;
  titleEn: string;
  titleNe: string;
  descriptionEn: string;
  descriptionNe: string;
  iconName: "Monitor" | "Settings" | "Folder" | "Globe" | "FileText" | "Cloud" | "MessageSquare" | "Shield" | "Wrench" | "Sparkles" | "Bot" | "Code2";
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: string;
  status: "available" | "coming_soon" | "in_development";
  accentColor?: "blue" | "green" | "amber" | "teal" | "orange" | "purple" | "rose" | "brown";
  lessons: CurriculumLessonMeta[];
  primarySlug: string;
}

export interface CurriculumStage {
  id: string;
  stageNumber: number;
  titleEn: string;
  titleNe: string;
  descriptionEn: string;
  descriptionNe: string;
  moduleIds: string[];
}

// Module 1 Lessons
const mod1Lessons: CurriculumLessonMeta[] = allComputerFundamentalsLessons.map((l) => ({
  id: l.id,
  slug: l.slug,
  lessonNumber: l.id,
  titleEn: l.title,
  titleNe: l.titleNp,
  duration: l.duration || "10 min",
  level: l.level || "Beginner",
  summaryEn: l.summaryEn,
  summaryNe: l.summaryNp,
  isAvailable: true
}));

// Module 2 Lessons
const mod2Lessons: CurriculumLessonMeta[] = operatingComputerLessons.map((l) => ({
  id: l.id,
  slug: l.slug,
  lessonNumber: l.lessonNumber,
  titleEn: l.titleEn,
  titleNe: l.titleNe,
  duration: l.duration || "12 min",
  level: l.difficulty || "Beginner",
  summaryEn: l.summaryEn,
  summaryNe: l.summaryNe,
  isAvailable: true
}));

// Module 3 Lessons
const mod3Lessons: CurriculumLessonMeta[] = fileManagementLessons.map((l) => ({
  id: l.id,
  slug: l.slug,
  lessonNumber: l.lessonNumber,
  titleEn: l.titleEn,
  titleNe: l.titleNe,
  duration: l.duration || "12 min",
  level: l.difficulty || "Beginner",
  summaryEn: l.summaryEn,
  summaryNe: l.summaryNe,
  isAvailable: true
}));

// Module 4 Lessons (Roadmap)
const mod4Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "what-is-the-internet", lessonNumber: 1, titleEn: "What is the Internet & World Wide Web?", titleNe: "इन्टरनेट र वर्ल्ड वाइड वेब के हो?", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 2, slug: "web-browsers-explained", lessonNumber: 2, titleEn: "Web Browsers: Chrome, Edge, Firefox", titleNe: "वेब ब्राउजरहरू: क्रोम, एज, फायरफक्स", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 3, slug: "urls-and-search-engines", lessonNumber: 3, titleEn: "Understanding URLs & Google Search", titleNe: "वेबसाइट लिङ्क र गुगल सर्च गर्ने तरिका", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 4, slug: "tabs-bookmarks-history", lessonNumber: 4, titleEn: "Managing Tabs, Bookmarks & Browsing History", titleNe: "ट्याब, बुकमार्क र हिस्ट्री व्यवस्थापन", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 5, slug: "downloading-files-safely", lessonNumber: 5, titleEn: "Downloading Online Files Safely", titleNe: "इन्टरनेटबाट सुरक्षित रूपमा फाइल डाउनलोड गर्ने", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 6, slug: "connecting-to-wifi", lessonNumber: 6, titleEn: "Wi-Fi, Hotspots & Network Basics", titleNe: "वाइफाइ, हटस्पट र नेटवर्क जडान", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 7, slug: "online-safety-basics", lessonNumber: 7, titleEn: "Safe Browsing & HTTPS Security", titleNe: "सुरक्षित ब्राउजिङ र सेक्युरिटी", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 8, slug: "internet-module-assessment", lessonNumber: 8, titleEn: "Internet Basics Assessment & Review", titleNe: "इन्टरनेट आधारभूत मूल्याङ्कन", duration: "15 min", level: "Beginner", isAvailable: false }
];

// Module 5 Lessons (Roadmap)
const mod5Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "intro-microsoft-word", lessonNumber: 1, titleEn: "Introduction to Microsoft Word Interface", titleNe: "माइक्रोसफ्ट वर्डको परिचय", duration: "10 min", level: "Intermediate", isAvailable: false },
  { id: 2, slug: "text-formatting-fonts", lessonNumber: 2, titleEn: "Text Formatting, Fonts & Colors in Nepali & English", titleNe: "फन्ट र अक्षर फर्म्याटिङ", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 3, slug: "paragraphs-and-alignment", lessonNumber: 3, titleEn: "Paragraph Spacing, Line Heights & Alignment", titleNe: "अनुच्छेद र स्पेसिङ मिलाउने", duration: "10 min", level: "Intermediate", isAvailable: false },
  { id: 4, slug: "creating-tables-lists", lessonNumber: 4, titleEn: "Inserting Tables, Rows, Columns & Bullet Lists", titleNe: "तालिका (Table) र बुलेट लिस्ट बनाउने", duration: "15 min", level: "Intermediate", isAvailable: false },
  { id: 5, slug: "inserting-images-shapes", lessonNumber: 5, titleEn: "Adding Images, Logos, Shapes & Captions", titleNe: "फोटो र आकारहरू थप्ने", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 6, slug: "page-setup-margins", lessonNumber: 6, titleEn: "Page Setup, Margins, Headers & Footers", titleNe: "पेज सेटअप, मार्जिन र हेडर-फुटर", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 7, slug: "creating-professional-cv", lessonNumber: 7, titleEn: "Project: Creating a Professional Nepali / English CV", titleNe: "व्यावसायिक बायोडाटा (CV) तयार गर्ने", duration: "20 min", level: "Intermediate", isAvailable: false },
  { id: 8, slug: "saving-as-pdf-printing", lessonNumber: 8, titleEn: "Exporting to PDF & Print Configuration", titleNe: "PDF बनाउने र प्रिन्ट गर्ने तरिका", duration: "10 min", level: "Intermediate", isAvailable: false }
];

// Module 6 Lessons (Roadmap)
const mod6Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "google-drive-mastery", lessonNumber: 1, titleEn: "Mastering Google Drive Cloud Storage", titleNe: "गुगल ड्राइभको पूर्ण प्रयोग", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 2, slug: "realtime-google-docs", lessonNumber: 2, titleEn: "Real-Time Collaboration with Google Docs", titleNe: "गुगल डक्समा सहकार्य", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 3, slug: "google-sheets-basics", lessonNumber: 3, titleEn: "Google Sheets: Data Entry & Basic Formulas", titleNe: "गुगल सिट: डेटा एन्ट्री र सूत्रहरू", duration: "15 min", level: "Intermediate", isAvailable: false },
  { id: 4, slug: "google-slides-presentations", lessonNumber: 4, titleEn: "Designing Clean Google Slides Presentations", titleNe: "गुगल स्लाईडमा प्रेजेन्टेसन बनाउने", duration: "15 min", level: "Intermediate", isAvailable: false },
  { id: 5, slug: "cloud-sharing-permissions", lessonNumber: 5, titleEn: "Sharing Links, Viewer vs Editor Permissions", titleNe: "लिङ्क सेयरिङ र अनुमति व्यवस्थापन", duration: "10 min", level: "Intermediate", isAvailable: false }
];

// Module 7 Lessons (Roadmap)
const mod7Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "email-fundamentals-gmail", lessonNumber: 1, titleEn: "Email Fundamentals & Setting Up Gmail", titleNe: "इमेलको आधारभूत ज्ञान र जिमेल", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 2, slug: "composing-professional-email", lessonNumber: 2, titleEn: "Writing Professional Subject Lines & Bodies", titleNe: "व्यावसायिक इमेल लेख्ने तरिका", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 3, slug: "email-attachments-drive-links", lessonNumber: 3, titleEn: "Sending Attachments & Google Drive Links", titleNe: "फाइल र डकुमेन्ट एट्याच गरी पठाउने", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 4, slug: "inbox-organization-labels", lessonNumber: 4, titleEn: "Organizing Inbox: Folders, Labels & Search", titleNe: "इनबक्स सफा र व्यवस्थित राख्ने", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 5, slug: "online-meetings-zoom-meet", lessonNumber: 5, titleEn: "Joining & Hosting Meetings on Google Meet & Zoom", titleNe: "गुगल मिट र जुममा अनलाइन बैठक", duration: "12 min", level: "Beginner", isAvailable: false }
];

// Module 8 Lessons (Roadmap)
const mod8Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "passwords-and-security", lessonNumber: 1, titleEn: "Creating Unbreakable Passwords & Managers", titleNe: "बलियो पासवर्ड र व्यवस्थापन", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 2, slug: "two-factor-authentication-2fa", lessonNumber: 2, titleEn: "Enabling Two-Factor Authentication (2FA)", titleNe: "टु-फ्याक्टर अथेन्टिकेसन (2FA) सुचारु गर्ने", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 3, slug: "identifying-phishing-scams", lessonNumber: 3, titleEn: "Recognizing Phishing, Fake SMS & Email Scams", titleNe: "अनलाइन ठगी र फिसिङ चिन्नुहोस्", duration: "15 min", level: "Beginner", isAvailable: false },
  { id: 4, slug: "social-media-privacy-settings", lessonNumber: 4, titleEn: "Privacy Settings for Facebook, WhatsApp & Google", titleNe: "सामाजिक सञ्जालको गोपनीयता सेटिङ", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 5, slug: "antivirus-and-malware-defense", lessonNumber: 5, titleEn: "Windows Defender, Antivirus & Malware Defense", titleNe: "एन्टिभाइरस र मालवेयरबाट सुरक्षा", duration: "12 min", level: "Beginner", isAvailable: false }
];

// Module 9 Lessons (Roadmap)
const mod9Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "diagnosing-slow-computer", lessonNumber: 1, titleEn: "Diagnosing a Slow PC: Task Manager & Startup", titleNe: "कम्प्युटर ढिलो चल्दा गर्ने प्राथमिक उपचार", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 2, slug: "disk-cleanup-temp-files", lessonNumber: 2, titleEn: "Cleaning Temporary Files & Freeing Storage", titleNe: "अनावश्यक फाइल हटाएर स्टोरेज खाली गर्ने", duration: "10 min", level: "Intermediate", isAvailable: false },
  { id: 3, slug: "troubleshooting-internet-wifi", lessonNumber: 3, titleEn: "Fixing Wi-Fi Disconnects & DNS Issues", titleNe: "इन्टरनेट नचल्ने समस्या समाधान", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 4, slug: "printer-and-audio-troubleshooting", lessonNumber: 4, titleEn: "Fixing Audio, Mic & Printer Connection Issues", titleNe: "प्रिन्टर र अडियो समस्या समाधान", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 5, slug: "system-restore-and-reset", lessonNumber: 5, titleEn: "System Restore, Windows Updates & Safe Mode", titleNe: "सिस्टम रिस्टोर र सुरक्षित मोड", duration: "15 min", level: "Intermediate", isAvailable: false }
];

// Module 10 Lessons (Roadmap)
const mod10Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "what-is-artificial-intelligence", lessonNumber: 1, titleEn: "What is AI & How Does Machine Learning Work?", titleNe: "आर्टिफिसियल इन्टेलिजेन्स (AI) के हो?", duration: "10 min", level: "Beginner", isAvailable: false },
  { id: 2, slug: "intro-chatgpt-claude", lessonNumber: 2, titleEn: "Getting Started with ChatGPT & Claude in Nepal", titleNe: "ChatGPT र Claude प्रयोग गर्ने तरिका", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 3, slug: "art-of-prompt-engineering", lessonNumber: 3, titleEn: "Prompt Engineering: Getting Accurate Answers", titleNe: "उत्कृष्ट प्रम्प्ट लेख्ने कला", duration: "15 min", level: "Beginner", isAvailable: false },
  { id: 4, slug: "ai-for-study-and-research", lessonNumber: 4, titleEn: "Using AI Ethically for Homework & Research", titleNe: "अध्ययन र अनुसन्धानमा AI को सही प्रयोग", duration: "12 min", level: "Beginner", isAvailable: false },
  { id: 5, slug: "future-of-ai-in-nepal", lessonNumber: 5, titleEn: "AI Trends & Opportunities in Nepal", titleNe: "नेपालमा AI को अवसर र भविष्य", duration: "12 min", level: "Beginner", isAvailable: false }
];

// Module 11 Lessons (Roadmap)
const mod11Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "ai-image-generation-tools", lessonNumber: 1, titleEn: "Generating Images with Midjourney & DALL-E", titleNe: "AI बाट फोटो तथा ग्राफिक्स बनाउने", duration: "15 min", level: "Intermediate", isAvailable: false },
  { id: 2, slug: "ai-presentation-makers", lessonNumber: 2, titleEn: "Creating Slides with Gamma & Tome AI", titleNe: "AI बाट मिनेटमै प्रेजेन्टेसन बनाउने", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 3, slug: "ai-for-writing-translation", lessonNumber: 3, titleEn: "Writing Letters, Articles & Nepali Translation", titleNe: "लेखन, सम्पादन र नेपाली अनुवादमा AI", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 4, slug: "ai-data-analysis-excel", lessonNumber: 4, titleEn: "Analyzing Excel Data with ChatGPT Code Interpreter", titleNe: "एक्सेल डेटा विश्लेषणमा AI को प्रयोग", duration: "15 min", level: "Intermediate", isAvailable: false }
];

// Module 12 Lessons (Roadmap)
const mod12Lessons: CurriculumLessonMeta[] = [
  { id: 1, slug: "how-software-and-apps-work", lessonNumber: 1, titleEn: "How Coding & Software Programs Work", titleNe: "प्रोग्रामिङ र कोडिङ कसरी काम गर्छ?", duration: "12 min", level: "Intermediate", isAvailable: false },
  { id: 2, slug: "html-basics-web-structure", lessonNumber: 2, titleEn: "HTML Basics: Building Your First Web Page", titleNe: "HTML को आधारभूत संरचना", duration: "15 min", level: "Intermediate", isAvailable: false },
  { id: 3, slug: "css-styling-colors", lessonNumber: 3, titleEn: "CSS Styling: Colors, Fonts & Layouts", titleNe: "CSS बाट वेबपेज आकर्षक बनाउने", duration: "15 min", level: "Intermediate", isAvailable: false },
  { id: 4, slug: "javascript-intro-interactivity", lessonNumber: 4, titleEn: "JavaScript Basics: Making Websites Interactive", titleNe: "जाभास्क्रिप्टको आधारभूत परिचय", duration: "18 min", level: "Intermediate", isAvailable: false },
  { id: 5, slug: "publishing-first-website-free", lessonNumber: 5, titleEn: "Publishing Your First Website for Free", titleNe: "आफ्नो पहिलो वेबसाइट इन्टरनेटमा राख्ने", duration: "15 min", level: "Intermediate", isAvailable: false }
];

// All Modules Array
export const allCurriculumModules: CurriculumModule[] = [
  {
    id: "mod1",
    moduleNumber: 1,
    titleEn: computerFundamentalsModuleInfo.titleEn,
    titleNe: computerFundamentalsModuleInfo.titleNe,
    descriptionEn: "Understand how computers work, their main hardware components (CPU, RAM, storage, motherboard), input/output peripherals, software types, and essential computer terminology.",
    descriptionNe: "कम्प्युटर के हो, यसले कसरी काम गर्छ, CPU, RAM, स्टोरेज, हार्डवेयर, सफ्टवेयर र आधारभूत प्राविधिक शब्दावली सरल नेपालीमा सिक्नुहोस्।",
    iconName: "Monitor",
    level: "Beginner",
    estimatedHours: "~2 hours",
    status: "available",
    accentColor: "blue",
    lessons: mod1Lessons,
    primarySlug: mod1Lessons[0].slug
  },
  {
    id: "mod2",
    moduleNumber: 2,
    titleEn: operatingComputerModuleMeta.titleEn,
    titleNe: operatingComputerModuleMeta.titleNe,
    descriptionEn: "Master the desktop environment, mouse handling, touch typing, keyboard shortcuts, multi-window multitasking, launching applications, and basic operating system tasks.",
    descriptionNe: "कम्प्युटर खोल्ने, डेस्कटप चलाउने, माउस र किबोर्डको प्रभावकारी प्रयोग, सर्टकट की, विन्डो मल्टिटास्किङ र सामान्य समस्या समाधानका व्यावहारिक सीपहरू।",
    iconName: "Settings",
    level: "Beginner",
    estimatedHours: "~2.5 hours",
    status: "available",
    accentColor: "green",
    lessons: mod2Lessons,
    primarySlug: mod2Lessons[0].slug
  },
  {
    id: "mod3",
    moduleNumber: 3,
    titleEn: fileManagementModuleMeta.titleEn,
    titleNe: fileManagementModuleMeta.titleNe,
    descriptionEn: "Learn how to create, organize, copy, move, rename, search, ZIP compress, and safely back up digital files across local hard drives, USB pen drives, and Google Drive.",
    descriptionNe: "फाइल र फोल्डर बनाउने, नाम परिवर्तन गर्ने, फाइल खोजी गर्ने, ZIP कम्प्रेस गर्ने, पेनड्राइभ प्रयोग गर्ने र गुगल ड्राइभमा सुरक्षित ब्याकअप राख्ने सीप।",
    iconName: "Folder",
    level: "Beginner",
    estimatedHours: "~2.5 hours",
    status: "available",
    accentColor: "amber",
    lessons: mod3Lessons,
    primarySlug: mod3Lessons[0].slug
  },
  {
    id: "mod4",
    moduleNumber: 4,
    titleEn: "Internet & Web Basics",
    titleNe: "इन्टरनेट तथा वेबका आधारभूत सीप",
    descriptionEn: "Understand how the global internet works, browse safely with Chrome and Edge, master search engines, manage bookmarks, and download files securely.",
    descriptionNe: "इन्टरनेट कसरी चल्छ, वेब ब्राउजर, गुगल सर्च, डाउनलोड गर्ने तरिका र सुरक्षित सर्फिङका नियमहरू सिक्नुहोस्।",
    iconName: "Globe",
    level: "Beginner",
    estimatedHours: "~1.5 hours",
    status: "coming_soon",
    accentColor: "teal",
    lessons: mod4Lessons,
    primarySlug: mod4Lessons[0].slug
  },
  {
    id: "mod5",
    moduleNumber: 5,
    titleEn: "Microsoft Office & Word Processing",
    titleNe: "माइक्रोसफ्ट वर्ड तथा डकुमेन्ट निर्माण",
    descriptionEn: "Create clean professional documents, reports, CVs, tables, graphics, headers, and export print-ready PDFs in Microsoft Word.",
    descriptionNe: "माइक्रोसफ्ट वर्डमा व्यावसायिक पत्र, रिपोर्ट, बायोडाटा, तालिका र डकुमेन्ट फर्म्याटिङ गरी पीडीएफ बनाउने सीप।",
    iconName: "FileText",
    level: "Intermediate",
    estimatedHours: "~3 hours",
    status: "coming_soon",
    accentColor: "orange",
    lessons: mod5Lessons,
    primarySlug: mod5Lessons[0].slug
  },
  {
    id: "mod6",
    moduleNumber: 6,
    titleEn: "Google Workspace & Cloud Collaboration",
    titleNe: "गुगल वर्कस्पेस र क्लाउड सहकार्य",
    descriptionEn: "Master real-time teamwork using Google Docs, Google Sheets, Google Slides, Google Drive cloud storage, and shared team folders.",
    descriptionNe: "गुगल डक्स, सिट, स्लाईड र ड्राइभको प्रयोग गरी अनलाइन समूहमा सहकार्य गर्ने आधुनिक प्रविधि।",
    iconName: "Cloud",
    level: "Intermediate",
    estimatedHours: "~2 hours",
    status: "coming_soon",
    accentColor: "blue",
    lessons: mod6Lessons,
    primarySlug: mod6Lessons[0].slug
  },
  {
    id: "mod7",
    moduleNumber: 7,
    titleEn: "Email & Online Communication",
    titleNe: "व्यावसायिक इमेल तथा अनलाइन सञ्चार",
    descriptionEn: "Write formal emails, manage Gmail inboxes, attach large files, avoid spam, and host virtual meetings on Google Meet and Zoom.",
    descriptionNe: "औपचारिक इमेल लेख्ने, जिमेल व्यवस्थापन, फाइल पठाउने र गुगल मिट/जुममा अनलाइन बैठक सञ्चालन गर्ने सीप।",
    iconName: "MessageSquare",
    level: "Beginner",
    estimatedHours: "~1.5 hours",
    status: "coming_soon",
    accentColor: "teal",
    lessons: mod7Lessons,
    primarySlug: mod7Lessons[0].slug
  },
  {
    id: "mod8",
    moduleNumber: 8,
    titleEn: "Digital Safety, Security & Privacy",
    titleNe: "डिजिटल सुरक्षा, गोपनीयता तथा साइबर सचेतना",
    descriptionEn: "Protect your personal accounts with 2FA, create secure passwords, identify phishing scams, and safeguard your digital privacy in Nepal.",
    descriptionNe: "बलियो पासवर्ड, 2FA सेक्युरिटी, अनलाइन ठगीबाट जोगिने र व्यक्तिगत गोपनीयता सुरक्षित राख्ने महत्वपूर्ण उपाय।",
    iconName: "Shield",
    level: "Beginner",
    estimatedHours: "~2 hours",
    status: "coming_soon",
    accentColor: "rose",
    lessons: mod8Lessons,
    primarySlug: mod8Lessons[0].slug
  },
  {
    id: "mod9",
    moduleNumber: 9,
    titleEn: "Computer Maintenance & Troubleshooting",
    titleNe: "कम्प्युटर मर्मत तथा समस्या समाधान",
    descriptionEn: "Learn how to speed up slow PCs, fix network/audio issues, free up storage, run antivirus scans, and resolve common software errors.",
    descriptionNe: "कम्प्युटर ढिलो हुने, इन्टरनेट नचल्ने, स्टोरेज भरिने र सफ्टवेयर बिग्रने जस्ता समस्या आफैं समाधान गर्ने सीप।",
    iconName: "Wrench",
    level: "Intermediate",
    estimatedHours: "~2 hours",
    status: "coming_soon",
    accentColor: "amber",
    lessons: mod9Lessons,
    primarySlug: mod9Lessons[0].slug
  },
  {
    id: "mod10",
    moduleNumber: 10,
    titleEn: "AI Fundamentals & Prompting",
    titleNe: "आर्टिफिसियल इन्टेलिजेन्स (AI) र प्रम्प्टिङ",
    descriptionEn: "Understand how generative AI works, use ChatGPT and Claude effectively, and write high-quality prompts for study and research.",
    descriptionNe: "AI के हो, ChatGPT र Claude कसरी चलाउने, र सही प्रम्प्ट लेखेर उत्कृष्ट नतिजा निकाल्ने सीप।",
    iconName: "Sparkles",
    level: "Beginner",
    estimatedHours: "~2 hours",
    status: "coming_soon",
    accentColor: "purple",
    lessons: mod10Lessons,
    primarySlug: mod10Lessons[0].slug
  },
  {
    id: "mod11",
    moduleNumber: 11,
    titleEn: "AI Tools for Work & Creativity",
    titleNe: "दैनिक कार्य र सिर्जनाका लागि AI टुल्स",
    descriptionEn: "Create graphics with AI, automate presentations, analyze spreadsheet data, and boost workplace productivity.",
    descriptionNe: "फोटो निर्माण, प्रेजेन्टेसन, डेटा विश्लेषण र लेखनमा आधुनिक AI टुल्स प्रयोग गर्ने सीप।",
    iconName: "Bot",
    level: "Intermediate",
    estimatedHours: "~2.5 hours",
    status: "coming_soon",
    accentColor: "purple",
    lessons: mod11Lessons,
    primarySlug: mod11Lessons[0].slug
  },
  {
    id: "mod12",
    moduleNumber: 12,
    titleEn: "Programming & Web Development Basics",
    titleNe: "प्रोग्रामिङ तथा वेब निर्माणको आधारभूत ज्ञान",
    descriptionEn: "Discover how coding works, learn HTML and CSS basics, build a simple personal webpage, and publish it online for free.",
    descriptionNe: "कोडिङको आधारभूत सिद्धान्त, HTML र CSS प्रयोग गरी आफ्नै पहिलो वेबपेज तयार गर्ने परिचय।",
    iconName: "Code2",
    level: "Intermediate",
    estimatedHours: "~3.5 hours",
    status: "coming_soon",
    accentColor: "teal",
    lessons: mod12Lessons,
    primarySlug: mod12Lessons[0].slug
  }
];

// Stages Definition
export const curriculumStages: CurriculumStage[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    titleEn: "FOUNDATION",
    titleNe: "आधारभूत तह (कम्प्युटरका आधारभूत सीप)",
    descriptionEn: "Start here if you are completely new to computers. Build core understanding of hardware, desktop navigation, and digital file management.",
    descriptionNe: "यदि तपाईं कम्प्युटरमा बिल्कुलै नयाँ हुनुहुन्छ भने यहाँबाट सुरु गर्नुहोस्। कम्प्युटरका मुख्य अङ्गहरू, सञ्चालन र फाइल व्यवस्थापन सिक्नुहोस्।",
    moduleIds: ["mod1", "mod2", "mod3", "mod4"]
  },
  {
    id: "stage-2",
    stageNumber: 2,
    titleEn: "DIGITAL PRODUCTIVITY",
    titleNe: "डिजिटल उत्पादकता (कार्यालय तथा कार्यक्षेत्रका सीप)",
    descriptionEn: "Create professional documents, collaborate in the cloud with teams, and master workplace email communication.",
    descriptionNe: "व्यावसायिक डकुमेन्ट निर्माण, क्लाउडमा सहकार्य, र औपचारिक इमेल सञ्चारका व्यावहारिक सीपहरू।",
    moduleIds: ["mod5", "mod6", "mod7"]
  },
  {
    id: "stage-3",
    stageNumber: 3,
    titleEn: "DIGITAL SAFETY & TROUBLESHOOTING",
    titleNe: "डिजिटल सुरक्षा तथा समस्या समाधान",
    descriptionEn: "Protect your accounts and data from cyber threats and solve common PC glitches with confidence.",
    descriptionNe: "आफ्नो डिजिटल डाटा सुरक्षित राख्न र सामान्य कम्प्युटर समस्याहरू आफैं समाधान गर्न सिक्नुहोस्।",
    moduleIds: ["mod8", "mod9"]
  },
  {
    id: "stage-4",
    stageNumber: 4,
    titleEn: "AI & FUTURE TECHNOLOGY",
    titleNe: "AI तथा भविष्यका डिजिटल प्रविधिहरू",
    descriptionEn: "Harness artificial intelligence tools for study, office work, data analysis, and explore the foundations of coding.",
    descriptionNe: "अध्ययन र काममा AI प्रविधि प्रयोग गर्न तथा प्रोग्रामिङको पहिलो पाइला चाल्न तयार हुनुहोस्।",
    moduleIds: ["mod10", "mod11", "mod12"]
  }
];
