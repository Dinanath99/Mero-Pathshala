import { ComputerSkillLesson, QuizQuestion, FlashcardItem, KeyTerm } from "./computerSkillsData";
import { operatingComputerLessonsPart1 } from "./operatingComputerLessonsPart1";
import { operatingComputerLessonsPart2 } from "./operatingComputerLessonsPart2";
import { 
  operatingComputerLesson11, 
  operatingComputerQuizQuestions, 
  operatingComputerFlashcards, 
  operatingComputerKeyTerms 
} from "./operatingComputerLessonsPart3";

export const operatingComputerLessons: ComputerSkillLesson[] = [
  ...operatingComputerLessonsPart1,
  ...operatingComputerLessonsPart2,
  operatingComputerLesson11
];

export {
  operatingComputerQuizQuestions,
  operatingComputerFlashcards,
  operatingComputerKeyTerms
};

export const operatingComputerModuleMeta = {
  moduleNumber: 2,
  slug: "operating-a-computer",
  titleEn: "Operating a Computer",
  titleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
  descriptionEn: "Master desktop navigation, mouse precision, typing, keyboard shortcuts, window multitasking, file menus, system settings, screenshots, and everyday computing tasks.",
  descriptionNe: "डेस्कटप, माउस, किबोर्ड, सर्टकटहरू, विन्डोज व्यवस्थापन, सेटिङ्स र दैनिक १० मुख्य कार्यहरू सजिलै सिक्नुहोस्।",
  totalLessons: 11,
  estimatedTime: "2.5 hours",
  level: "Level 1 • Beginner"
};
