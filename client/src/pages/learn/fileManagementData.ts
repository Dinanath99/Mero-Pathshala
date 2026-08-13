import { ComputerSkillLesson } from "./computerSkillsData";
import { fileManagementLessonsPart1 } from "./fileManagementLessonsPart1";
import { fileManagementLessonsPart2 } from "./fileManagementLessonsPart2";
import { 
  fileManagementLessonsPart3,
  fileManagementModuleQuizQuestions,
  fileManagementFlashcards,
  fileManagementKeyTerms
} from "./fileManagementLessonsPart3";

export const fileManagementLessons: ComputerSkillLesson[] = [
  ...fileManagementLessonsPart1,
  ...fileManagementLessonsPart2,
  ...fileManagementLessonsPart3
];

export const fileManagementModuleMeta = {
  id: "module-3-files-and-file-management",
  moduleNumber: 3,
  level: "Level 1: Beginner",
  titleEn: "Files & File Management",
  titleNe: "फाइल तथा फोल्डर व्यवस्थापन",
  descEn: "Master file formats, extensions, hierarchical folders, search filters, ZIP compression, USB drive safety, and cloud backup across Windows and cloud platforms.",
  descNe: "फाइलका प्रकार, एक्सटेन्सन, व्यवस्थित फोल्डर संरचना, सर्च फिल्टर, ZIP कम्प्रेसन, पेनड्राइभ सुरक्षा र गुगल ड्राइभ ब्याकअप सम्बन्धी सम्पूर्ण ज्ञान।",
  estimatedTime: "60–75 minutes",
  totalLessons: 11,
  badge: "File & Data Management Specialist 🗂️"
};

export {
  fileManagementModuleQuizQuestions,
  fileManagementFlashcards,
  fileManagementKeyTerms
};
