export interface LessonObjective {
  en: string;
  ne: string;
}

export interface KeyTerm {
  termEn: string;
  termNe: string;
  definitionEn: string;
  definitionNe: string;
  exampleEn?: string;
  exampleNe?: string;
}

export interface Misconception {
  mythEn: string;
  mythNe: string;
  realityEn: string;
  realityNe: string;
}

export interface PracticeItem {
  id: string;
  nameEn: string;
  nameNe: string;
  category: string; // e.g. "input" | "output" | "hardware" | "software"
  hintEn?: string;
  hintNe?: string;
}

export interface PracticeActivityData {
  titleEn: string;
  titleNe: string;
  instructionEn: string;
  instructionNe: string;
  categories: { key: string; labelEn: string; labelNe: string; color: string }[];
  items: PracticeItem[];
}

export interface QuizQuestion {
  id?: string;
  question: string;
  questionNe?: string;
  options: string[];
  optionsNe?: string[];
  answer: number; // 0-indexed
  explanation: string;
  explanationNe?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface FlashcardItem {
  id: string;
  frontEn: string;
  frontNe: string;
  backEn: string;
  backNe: string;
  category?: string;
}

export interface VisualDiagramStep {
  step: string;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  icon: string;
}

export interface LessonSection {
  id: string;
  titleEn: string;
  titleNe: string;
  contentEn: string;
  contentNe: string;
  bulletPointsEn?: string[];
  bulletPointsNe?: string[];
}

export interface LessonContentBlock {
  type: "heading" | "subheading" | "paragraph" | "callout" | "diagram" | "nepalExample" | "componentGrid";
  title?: string;
  titleNe?: string;
  text?: string;
  textNe?: string;
  variant?: "info" | "tip" | "warning" | "concept";
  items?: any[];
}

export interface ComputerSkillLesson {
  id: number;
  slug: string;
  moduleNumber: number;
  moduleTitleEn: string;
  moduleTitleNe: string;
  lessonNumber: number;
  titleEn: string;
  titleNe: string;
  subtitleEn?: string;
  subtitleNe?: string;
  duration: string;
  readTime?: string;
  difficulty?: string;
  level?: string;
  summaryEn: string;
  summaryNe: string;
  objectives?: LessonObjective[];
  sections?: LessonSection[];
  contentBlocks?: LessonContentBlock[];
  diagrams?: VisualDiagramStep[];
  misconceptions?: Misconception[];
  practiceActivity?: PracticeActivityData;
  caseStudyEn?: string;
  caseStudyNe?: string;
  flashcards: FlashcardItem[];
  quiz: QuizQuestion[];
  keyTerms?: KeyTerm[];
  rememberPoints?: { en: string; ne: string }[];
}

export interface ComputerLesson {
  id: number;
  slug: string;
  title: string;
  titleNp: string;
  duration: string;
  level: string;
  summaryEn: string;
  summaryNp: string;
  objectives: LessonObjective[];
  contentBlocks: LessonContentBlock[];
  keyTerms: KeyTerm[];
  misconceptions: Misconception[];
  practiceActivity?: PracticeActivityData;
  quiz: QuizQuestion[];
  flashcards: FlashcardItem[];
  rememberPoints: { en: string; ne: string }[];
}

export const computerFundamentalsLessons: ComputerLesson[] = [
  // ==========================================
  // LESSON 01: What Is a Computer?
  // ==========================================
  {
    id: 1,
    slug: "what-is-a-computer",
    title: "What Is a Computer?",
    titleNp: "कम्प्युटर भनेको के हो?",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Understand what a computer is, the core IPOS (Input, Processing, Output, Storage) model, and its role in modern society.",
    summaryNp: "कम्प्युटरको परिभाषा, यसको आधारभूत कार्यप्रणाली (इनपुट, प्रशोधन, आउटपुट, भण्डारण) र समाजमा यसको भूमिका बुझ्नुहोस्।",
    objectives: [
      { en: "Define what a computer is in simple terms", ne: "सरल भाषामा कम्प्युटरको परिभाषा बुझ्ने" },
      { en: "Understand the 4 core functions: Input, Processing, Output, and Storage", ne: "४ मुख्य कार्यहरू: इनपुट, प्रशोधन, आउटपुट र भण्डारण बुझ्ने" },
      { en: "Recognize everyday computing examples across Nepal", ne: "नेपालमा दैनिक जीवनमा प्रयोग हुने कम्प्युटरका उदाहरणहरू पहिचान गर्ने" },
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "A computer is an electronic device that accepts data (input), processes it according to instructions, stores results for later use, and produces meaningful information (output).",
        textNe: "कम्प्युटर एउटा विद्युतीय उपकरण हो जसले कच्चा डेटा (इनपुट) लिन्छ, दिइएको निर्देशन अनुसार त्यसलाई प्रशोधन गर्छ, भविष्यका लागि सुरक्षित राख्छ र उपयोगी परिणाम (आउटपुट) दिन्छ।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "Core Computer Definition",
        titleNe: "कम्प्युटरको मूल परिभाषा",
        text: "A computer takes raw Input, Processes it using internal electronic logic, Stores information safely, and delivers actionable Output to the user.",
        textNe: "कम्प्युटरले इनपुट लिन्छ, त्यसलाई प्रशोधन गर्छ, आवश्यक जानकारी भण्डारण गर्छ र स्पष्ट आउटपुट दिन्छ।"
      },
      {
        type: "heading",
        title: "The 4-Step IPOS Computer Model",
        titleNe: "कम्प्युटरको ४-चरणको IPOS मोडेल"
      },
      {
        type: "diagram",
        items: [
          { step: "1", titleEn: "Input", titleNe: "इनपुट", descEn: "Data entered via keyboard, mouse, mic, or touchscreen.", descNe: "किबोर्ड, माउस, माइक वा स्क्रिनबाट पठाइने डेटा।", icon: "Keyboard" },
          { step: "2", titleEn: "Processing", titleNe: "प्रशोधन", descEn: "CPU calculates, organizes, and transforms data into info.", descNe: "CPU ले गणना गर्छ र डेटालाई उपयोगी जानकारीमा बदल्छ।", icon: "Cpu" },
          { step: "3", titleEn: "Output", titleNe: "आउटपुट", descEn: "Displaying results on monitor, speakers, or paper printer.", descNe: "मोनिटर, स्पिकर वा प्रिन्टरमार्फत नतिजा देखाउने।", icon: "Monitor" },
          { step: "4", titleEn: "Storage", titleNe: "भण्डारण", descEn: "Saving files permanently on SSD, HDD, or Flash Drives.", descNe: "SSD, हार्डडिस्क वा पेनड्राइभमा फाइलहरू सुरक्षित राख्ने।", icon: "HardDrive" },
        ]
      },
      {
        type: "nepalExample",
        title: "Real-Life Nepal Example: Typing a Student Assignment",
        titleNe: "नेपालको सन्दर्भमा उदाहरण: कलेज असाइनमेन्ट तयार गर्दा",
        text: "When a student in Kathmandu types '2 + 3' in a calculator program: Keyboard sends input → CPU calculates sum → Monitor instantly displays '5' → SSD stores the document file.",
        textNe: "जब विद्यार्थीले किबोर्डबाट '२ + ३' टाइप गर्छ: किबोर्डले इनपुट पठाउँछ → प्रोसेसरले गणना गर्छ → मोनिटरले '५' आउटपुट देखाउँछ → SSD मा फाइल सुरक्षित हुन्छ।"
      },
      {
        type: "callout",
        variant: "info",
        title: "Data vs. Information",
        titleNe: "डेटा र जानकारी बीचको भिन्नता",
        text: "Data represents unorganized raw facts (e.g. 'Ram', '85', 'Science'). Information is processed, meaningful data (e.g. 'Ram scored 85 marks in Science').",
        textNe: "डेटा भनेको अव्यवस्थित कच्चा तथ्य हो। जब डेटालाई प्रशोधन गरेर अर्थपूर्ण बनाइन्छ, त्यसलाई जानकारी (Information) भनिन्छ।"
      }
    ],
    keyTerms: [
      { termEn: "Computer", termNe: "कम्प्युटर", definitionEn: "An electronic machine that accepts input, processes data, and outputs information.", definitionNe: "इनपुट लिने, प्रशोधन गर्ने र आउटपुट दिने विद्युतीय मेसिन।" },
      { termEn: "Data", termNe: "डेटा", definitionEn: "Raw, unorganized facts, figures, and symbols.", definitionNe: "कच्चा र अव्यवस्थित तथ्य तथा अंकहरू।" },
      { termEn: "Information", termNe: "जानकारी", definitionEn: "Processed and structured data that carries clear meaning.", definitionNe: "प्रशोधित र अर्थपूर्ण बनाइएको डेटा।" },
      { termEn: "Input", termNe: "इनपुट", definitionEn: "The process of entering data into a computer.", definitionNe: "कम्प्युटर भित्र डेटा वा निर्देशन पठाउने कार्य।" },
      { termEn: "Output", termNe: "आउटपुट", definitionEn: "The result or information presented to the user.", definitionNe: "कम्प्युटरले प्रशोधन गरेर देखाएको नतिजा।" },
      { termEn: "Storage", termNe: "भण्डारण", definitionEn: "Saving digital data for short-term or permanent future access.", definitionNe: "भविष्यका लागि डिजिटल फाइल सुरक्षित राख्ने ठाउँ।" },
    ],
    misconceptions: [
      {
        mythEn: "The desktop monitor is the entire computer.",
        mythNe: "मोनिटर (स्क्रिन) नै पूरा कम्प्युटर हो।",
        realityEn: "The monitor is only an output display. The actual computer processing happens inside the CPU and system unit.",
        realityNe: "मोनिटर केवल स्क्रिन (आउटपुट) मात्र हो। वास्तविक प्रशोधन कम्प्युटरको सिस्टम युनिट भित्र हुन्छ।"
      },
      {
        mythEn: "Computers have their own human feelings and independent thoughts.",
        mythNe: "कम्प्युटरसँग मानिस जस्तै भावना र स्वतन्त्र सोच हुन्छ।",
        realityEn: "Computers only execute explicit program instructions created by software engineers and users.",
        realityNe: "कम्प्युटरले मानिस वा प्रोग्रामरले दिएको निर्देशन अनुसार मात्र काम गर्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Classify: Input vs Output Devices",
      titleNe: "वर्गीकरण गर्नुहोस्: इनपुट र आउटपुट उपकरण",
      instructionEn: "Click each device into its correct category (Input or Output).",
      instructionNe: "दिइएको उपकरणलाई सही श्रेणी (इनपुट वा आउटपुट) मा राख्नुहोस्।",
      categories: [
        { key: "input", labelEn: "Input Device (इनपुट)", labelNe: "इनपुट", color: "indigo" },
        { key: "output", labelEn: "Output Device (आउटपुट)", labelNe: "आउटपुट", color: "emerald" }
      ],
      items: [
        { id: "p1", nameEn: "Keyboard (किबोर्ड)", nameNe: "किबोर्ड", category: "input" },
        { id: "p2", nameEn: "Computer Monitor (मोनिटर)", nameNe: "मोनिटर", category: "output" },
        { id: "p3", nameEn: "Computer Mouse (माउस)", nameNe: "माउस", category: "input" },
        { id: "p4", nameEn: "Audio Speaker (स्पिकर)", nameNe: "स्पिकर", category: "output" },
        { id: "p5", nameEn: "Paper Printer (प्रिन्टर)", nameNe: "प्रिन्टर", category: "output" },
        { id: "p6", nameEn: "Microphone (माइक्रोफोन)", nameNe: "माइक्रोफोन", category: "input" },
      ]
    },
    quiz: [
      {
        question: "What is a computer?",
        options: [
          "Only a device used for typing letters",
          "An electronic device that processes data according to instructions",
          "Only a screen used for watching videos",
          "A mechanical calculator with gears"
        ],
        answer: 1,
        explanation: "A computer is an electronic device that takes raw data as input, processes it logically, and outputs meaningful results.",
        difficulty: "easy"
      },
      {
        question: "Which of the following is an input device?",
        options: ["Monitor", "Speaker", "Keyboard", "Printer"],
        answer: 2,
        explanation: "A keyboard lets you enter text and commands into the computer, making it an input device.",
        difficulty: "easy"
      },
      {
        question: "Which sequence correctly describes the basic computing cycle?",
        options: [
          "Output → Input → Processing",
          "Input → Processing → Output",
          "Processing → Output → Input",
          "Storage → Output → Input"
        ],
        answer: 1,
        explanation: "The core cycle is IPOS: Input (enter data) → Processing (calculate/transform) → Output (display result) → Storage (save).",
        difficulty: "easy"
      },
      {
        question: "Which of the following is used to store files permanently?",
        options: ["Keyboard", "Monitor", "SSD (Solid State Drive)", "Speaker"],
        answer: 2,
        explanation: "An SSD (Solid State Drive) is non-volatile storage where files and operating systems remain saved even when power is turned off.",
        difficulty: "easy"
      },
      {
        question: "What is raw 'data'?",
        options: [
          "Always a finished decision",
          "Raw, unprocessed facts, numbers, or symbols",
          "Only graphic images",
          "Only video clips"
        ],
        answer: 1,
        explanation: "Data refers to raw facts and values that need processing to become structured, useful information.",
        difficulty: "medium"
      },
      {
        question: "Which device is primarily used to display visual output to the user?",
        options: ["Keyboard", "Monitor", "Mouse", "Microphone"],
        answer: 1,
        explanation: "A monitor (or display screen) visually shows the processed output, pictures, text, and user interfaces.",
        difficulty: "easy"
      },
      {
        question: "Which of these is NOT an input device?",
        options: ["Mouse", "Keyboard", "Microphone", "Computer Monitor"],
        answer: 3,
        explanation: "A standard computer monitor is an output device that presents visual information to the user.",
        difficulty: "medium"
      },
      {
        question: "What happens during the 'Processing' stage?",
        options: [
          "The computer executes instructions and calculates on data",
          "The computer only prints sheets of paper",
          "The computer turns off power automatically",
          "The computer deletes all storage"
        ],
        answer: 0,
        explanation: "Processing is when the processor performs arithmetic, logical comparisons, and transformations according to program instructions.",
        difficulty: "medium"
      },
      {
        question: "Which is an example of an output action?",
        options: [
          "Typing on a keyboard",
          "Speaking into a microphone",
          "Hearing sound from speakers",
          "Clicking a mouse button"
        ],
        answer: 2,
        explanation: "Hearing sound from speakers is receiving information generated by the computer, which is output.",
        difficulty: "easy"
      },
      {
        question: "What is the key difference between hardware and software?",
        options: [
          "Hardware refers to physical components; software refers to digital programs",
          "Software is made of plastic; hardware is made of code",
          "Hardware only runs on mobile phones",
          "There is no difference between hardware and software"
        ],
        answer: 0,
        explanation: "Hardware consists of physical, touchable parts (like chips, keyboard, screen), while software consists of code and instructions that run on the hardware.",
        difficulty: "medium"
      }
    ],
    flashcards: [
      { id: "f1", frontEn: "What is a Computer?", frontNe: "कम्प्युटर भनेको के हो?", backEn: "An electronic machine that accepts data (input), processes it, stores it, and produces output.", backNe: "इनपुट लिने, प्रशोधन गर्ने, भण्डारण गर्ने र आउटपुट दिने विद्युतीय उपकरण।" },
      { id: "f2", frontEn: "What is Input?", frontNe: "इनपुट भनेको के हो?", backEn: "Data or commands entered into the computer via devices like keyboard, mouse, or microphone.", backNe: "किबोर्ड, माउस आदिमार्फत कम्प्युटर भित्र पठाइने डेटा वा निर्देशन।" },
      { id: "f3", frontEn: "What is Processing?", frontNe: "प्रशोधन (Processing) भनेको के हो?", backEn: "The manipulation, calculation, and transformation of raw data into meaningful information by the CPU.", backNe: "CPU ले डेटालाई गणना गरी उपयोगी जानकारीमा रूपान्तरण गर्ने कार्य।" },
      { id: "f4", frontEn: "What is Output?", frontNe: "आउटपुट भनेको के हो?", backEn: "The resulting information presented to the user through monitors, speakers, or printers.", backNe: "कम्प्युटरले स्क्रिन, स्पिकर वा प्रिन्टरमार्फत प्रयोगकर्तालाई दिने नतिजा।" },
      { id: "f5", frontEn: "What is Storage?", frontNe: "भण्डारण (Storage) भनेको के हो?", backEn: "The capacity to save files and software on devices like SSDs or hard disks for future access.", backNe: "भविष्यमा पुनः प्रयोग गर्न फाइलहरू सुरक्षित राख्ने माध्यम।" },
      { id: "f6", frontEn: "Data vs Information", frontNe: "डेटा र जानकारीको भिन्नता", backEn: "Data is raw, unorganized facts. Information is organized, processed, and meaningful data.", backNe: "डेटा अव्यवस्थित कच्चा तथ्य हो; जानकारी प्रशोधित र अर्थपूर्ण नतिजा हो।" },
      { id: "f7", frontEn: "What is Hardware?", frontNe: "हार्डवेयर भनेको के हो?", backEn: "The physical, tangible electronic parts of a computer system.", backNe: "कम्प्युटरका छुन र देख्न सकिने भौतिक भागहरू।" },
      { id: "f8", frontEn: "What is Software?", frontNe: "सफ्टवेयर भनेको के हो?", backEn: "Programs, applications, and instructions that tell the computer hardware what to do.", backNe: "कम्प्युटर हार्डवेयरलाई काम गर्न निर्देशन दिने डिजिटल प्रोग्रामहरू।" },
      { id: "f9", frontEn: "What is the CPU?", frontNe: "CPU भनेको के हो?", backEn: "Central Processing Unit — the primary electronic chip that executes program instructions.", backNe: "केन्द्रीय प्रशोधन एकाइ — कम्प्युटरको मुख्य प्रोसेसर।" },
      { id: "f10", frontEn: "Name 3 Input Devices", frontNe: "३ वटा इनपुट उपकरणहरूको नाम भन्नुहोस्", backEn: "Keyboard, Mouse, and Microphone.", backNe: "किबोर्ड, माउस र माइक्रोफोन।" },
    ],
    rememberPoints: [
      { en: "A computer follows the IPOS cycle: Input → Processing → Output → Storage.", ne: "कम्प्युटरले IPOS चक्र पछ्याउँछ: इनपुट → प्रशोधन → आउटपुट → भण्डारण।" },
      { en: "Data is raw; information is processed and meaningful.", ne: "डेटा कच्चा तथ्य हो; जानकारी प्रशोधित अर्थपूर्ण रूप हो।" },
      { en: "The monitor displays output; the CPU does the calculations.", ne: "मोनिटरले आउटपुट देखाउँछ; CPU ले हिसाब र प्रशोधन गर्छ।" }
    ]
  },

  // ==========================================
  // LESSON 02: How Does a Computer Work?
  // ==========================================
  {
    id: 2,
    slug: "how-does-a-computer-work",
    title: "How Does a Computer Work?",
    titleNp: "कम्प्युटरले कसरी काम गर्छ?",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Explore the step-by-step internal workflow: from user input through RAM, CPU registers, storage retrieval, to output display.",
    summaryNp: "प्रयोगकर्ताको इनपुटदेखि RAM, CPU र स्टोरेज हुँदै स्क्रिनमा आउटपुट आउने चरणबद्ध प्रक्रिया बुझ्नुहोस्।",
    objectives: [
      { en: "Trace the path of data inside a computer system", ne: "कम्प्युटर भित्र डेटा कसरी प्रवाह हुन्छ बुझ्ने" },
      { en: "Understand the role of RAM as temporary working memory", ne: "अस्थायी मेमोरी (RAM) को भूमिका बुझ्ने" },
      { en: "Explain how instructions are fetched, decoded, and executed", ne: "निर्देशनहरू कसरी लोड, बुझाइ र कार्यान्वयन हुन्छन् सिक्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "When you interact with a computer, high-speed electronic signals coordinate between your input devices, temporary memory (RAM), the central processor (CPU), permanent storage, and output displays.",
        textNe: "जब तपाईं कम्प्युटर चलाउनुहुन्छ, इनपुट उपकरण, अस्थायी मेमोरी (RAM), मुख्य प्रोसेसर (CPU), स्टोरेज र डिस्प्लेबीच बिजुलीको गतिमा तालमेल हुन्छ।"
      },
      {
        type: "heading",
        title: "Step-by-Step Data Workflow",
        titleNe: "चरणबद्ध डेटा कार्यप्रवाह"
      },
      {
        type: "diagram",
        items: [
          { step: "Step 1", titleEn: "1. Input", titleNe: "१. इनपुट लिने", descEn: "You click a mouse or type a word. The input device sends electronic signals to the system.", descNe: "तपाईंले किबोर्ड वा माउस चलाउँदा कम्प्युटरमा सिग्नल पुग्छ।", icon: "MousePointer" },
          { step: "Step 2", titleEn: "2. Load to RAM", titleNe: "२. RAM मा लोड हुने", descEn: "The open document and data are placed in fast temporary memory (RAM) for the CPU.", descNe: "चालु फाइल र डेटा छिटो काम गर्न अस्थायी मेमोरी (RAM) मा बस्छ।", icon: "Layers" },
          { step: "Step 3", titleEn: "3. CPU Executes", titleNe: "३. CPU ले काम गर्ने", descEn: "CPU fetches instructions, performs calculations, and organizes data in nanoseconds.", descNe: "CPU ले दिएको आदेश तुरुन्तै गणना र प्रशोधन गर्छ।", icon: "Cpu" },
          { step: "Step 4", titleEn: "4. Display & Save", titleNe: "४. देखाउने र सेभ गर्ने", descEn: "The result is shown on screen. When you click Save, it writes permanently to SSD storage.", descNe: "नतिजा स्क्रिनमा देखिन्छ र Save गर्दा SSD मा सुरक्षित हुन्छ।", icon: "Save" }
        ]
      },
      {
        type: "nepalExample",
        title: "Practical Scenario: Writing a Bio-Data in Word Processor",
        titleNe: "व्यावहारिक उदाहरण: नेपालीमा व्यक्तिगत विवरण (बायोडाटा) लेख्दा",
        text: "When a job seeker in Pokhara opens a word processor, the program loads from SSD into RAM. Typing characters displays them on the monitor. Pressing Ctrl+S permanently writes the updated file back to the SSD storage.",
        textNe: "जब विद्यार्थीले वर्ड प्रोसेसर खोल्छन्, त्यो एप SSD बाट RAM मा आउँछ। टाइप गर्दा अक्षर स्क्रिनमा देखिन्छ। Ctrl+S थिच्दा फाइल स्थायी रूपमा सेभ हुन्छ।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "Why RAM is Essential",
        titleNe: "RAM किन आवश्यक छ?",
        text: "Storage (SSD/HDD) holds your files permanently, but it is too slow for the CPU to read every millisecond. RAM acts as a super-fast workbench holding open apps and active files while you work.",
        textNe: "SSD मा फाइलहरू सधैं रहन्छन् तर ती CPU का लागि ढिला हुन्छन्। RAM ले खुल्ला रहेका एप र फाइलहरूलाई तत्काल काम गर्न सजिलो बनाउँछ।"
      }
    ],
    keyTerms: [
      { termEn: "RAM (Random Access Memory)", termNe: "र्‍याम (अस्थायी मेमोरी)", definitionEn: "Ultra-fast temporary workspace that holds active software and data while computer is powered on.", definitionNe: "कम्प्युटर चालु हुँदा खुल्ला प्रोग्रामहरू राख्ने द्रुत अस्थायी मेमोरी।" },
      { termEn: "Permanent Storage (SSD/HDD)", termNe: "स्थायी भण्डारण", definitionEn: "Non-volatile storage that retains files, photos, and system software even after turning off power.", definitionNe: "बिजुली नहुँदा पनि फाइलहरू सुरक्षित राखिरहने ठाउँ।" },
      { termEn: "Execute", termNe: "कार्यान्वयन (Execute)", definitionEn: "Carrying out an instruction or software task by the processor.", definitionNe: "कम्प्युटरले दिएको आदेश वा प्रोग्राम चलाउने कार्य।" },
      { termEn: "Binary (0s and 1s)", termNe: "बाइनरी (० र १)", definitionEn: "The fundamental 2-state language of computers representing on/off electrical states.", definitionNe: "कम्प्युटरको आधारभूत विद्युतीय भाषा (० र १)।" }
    ],
    misconceptions: [
      {
        mythEn: "If you don't click Save, your typed text is safely preserved forever.",
        mythNe: "Save नगरे पनि टाइप गरेको कुरा सधैं आफैं सुरक्षित रहन्छ।",
        realityEn: "Unsaved work resides in volatile RAM. If power fails or the battery dies before saving, unsaved RAM data is lost.",
        realityNe: "Save नगरेको कुरा RAM मा हुन्छ। बिजुली जाँदा वा ल्यापटप बन्द हुँदा त्यो हराउन सक्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Sequence the Computing Steps",
      titleNe: "कम्प्युटरको काम गर्ने क्रम मिलाउनुहोस्",
      instructionEn: "Classify each step into its correct stage of the workflow.",
      instructionNe: "दिइएको गतिविधिलाई सही चरणमा वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "input", labelEn: "Step 1: Input (इनपुट)", labelNe: "इनपुट", color: "indigo" },
        { key: "process", labelEn: "Step 2: Processing & RAM (प्रशोधन)", labelNe: "प्रशोधन", color: "amber" },
        { key: "output", labelEn: "Step 3: Output & Storage (आउटपुट/सेभ)", labelNe: "आउटपुट", color: "emerald" }
      ],
      items: [
        { id: "s1", nameEn: "User presses keys on keyboard", nameNe: "किबोर्डमा बटन थिच्ने", category: "input" },
        { id: "s2", nameEn: "CPU calculates letter shapes & layout", nameNe: "CPU ले अक्षरको डिजाइन हिसाब गर्छ", category: "process" },
        { id: "s3", nameEn: "Active document is kept in RAM", nameNe: "चालु डकुमेन्ट RAM मा बस्छ", category: "process" },
        { id: "s4", nameEn: "Words appear crisp on the monitor screen", nameNe: "स्क्रिनमा अक्षरहरू देखिन्छन्", category: "output" },
        { id: "s5", nameEn: "File is saved to the SSD disk", nameNe: "फाइल SSD मा सेभ हुन्छ", category: "output" },
      ]
    },
    quiz: [
      {
        question: "Where is an active program loaded when you open it?",
        options: ["Directly inside the keyboard", "Into temporary memory (RAM)", "Into the monitor speakers", "Into the power cable"],
        answer: 1,
        explanation: "When an application is opened, it loads from permanent storage into RAM for rapid access by the CPU.",
        difficulty: "easy"
      },
      {
        question: "What happens to data in RAM when the computer is completely powered off?",
        options: ["It is permanently saved forever", "It is cleared (lost) because RAM is volatile memory", "It automatically prints on paper", "It turns into audio"],
        answer: 1,
        explanation: "RAM is volatile memory; it requires electrical power to hold data. When power is off, unsaved RAM contents are lost.",
        difficulty: "medium"
      },
      {
        question: "What is the fundamental binary language of computers?",
        options: ["English and Nepali words", "Zeros and ones (0 and 1)", "Letters from A to Z only", "Decimal numbers 1 to 100"],
        answer: 1,
        explanation: "Computers use binary states (0 for off/low voltage, 1 for on/high voltage) to represent all digital data.",
        difficulty: "easy"
      },
      {
        question: "Which component carries out the calculations and logic instructions?",
        options: ["Monitor", "CPU (Central Processing Unit)", "Power switch", "Mouse pad"],
        answer: 1,
        explanation: "The CPU executes program instructions, performs arithmetic calculations, and manages logical decisions.",
        difficulty: "easy"
      },
      {
        question: "When you press 'Save' (Ctrl+S) in a document, where is the file copied?",
        options: ["From RAM into permanent storage (SSD/HDD)", "From the monitor to the keyboard", "From the internet to the speaker", "Directly into the power outlet"],
        answer: 0,
        explanation: "Saving transfers current changes from temporary RAM onto non-volatile permanent storage (SSD/HDD).",
        difficulty: "medium"
      },
      {
        question: "Why can't a computer run programs directly from slow storage without RAM?",
        options: ["Storage drives are too slow compared to CPU speed", "Storage drives don't have electrical wires", "Computers are forbidden from reading disks", "Monitors cannot connect to SSDs"],
        answer: 0,
        explanation: "RAM is thousands of times faster than storage drives, allowing the CPU to execute billions of instructions per second without bottlenecking.",
        difficulty: "hard"
      },
      {
        question: "Which of the following is an example of an electronic input signal?",
        options: ["A click from a computer mouse", "A printout on A4 paper", "Sound coming from headphones", "Light emitted by a display"],
        answer: 0,
        explanation: "Clicking a mouse generates electronic input signals that tell the computer where the cursor is and what action to take.",
        difficulty: "easy"
      },
      {
        question: "What is the role of an output device in the computing cycle?",
        options: ["To delete user documents", "To communicate processed results back to the user", "To provide backup electrical power", "To clean the processor"],
        answer: 1,
        explanation: "Output devices present the results of processing to humans in visual, auditory, or physical formats.",
        difficulty: "easy"
      },
      {
        question: "What does 'non-volatile' storage mean?",
        options: ["It keeps saved data even without electrical power", "It deletes everything every hour", "It only works when connected to WiFi", "It can only store music files"],
        answer: 0,
        explanation: "Non-volatile storage (like SSDs, Hard Disks, and USB flash drives) retains stored information safely when power is disconnected.",
        difficulty: "medium"
      },
      {
        question: "Which device converts electrical audio signals into sound waves you can hear?",
        options: ["Microphone", "Speakers / Headphones", "Webcam", "Keyboard"],
        answer: 1,
        explanation: "Speakers and headphones are output devices that convert processed digital audio signals into audible sound waves.",
        difficulty: "easy"
      }
    ],
    flashcards: [
      { id: "f201", frontEn: "What is the IPOS cycle?", frontNe: "IPOS चक्र के हो?", backEn: "Input → Processing → Output → Storage — the 4 fundamental stages of computing.", backNe: "इनपुट → प्रशोधन → आउटपुट → भण्डारण — कम्प्युटरका ४ मुख्य चरणहरू।" },
      { id: "f202", frontEn: "Why is RAM called volatile?", frontNe: "RAM लाई किन volatile भनिन्छ?", backEn: "Because it loses all stored data as soon as electrical power is turned off.", backNe: "किनकि बिजुली बन्द हुनासाथ यसमा भएको सबै डेटा खाली हुन्छ।" },
      { id: "f203", frontEn: "What is Non-Volatile Storage?", frontNe: "Non-Volatile भण्डारण के हो?", backEn: "Storage (like SSDs) that retains saved data safely even without electricity.", backNe: "बिजुली नहुँदा पनि फाइलहरू सुरक्षित राख्ने स्थायी स्टोरेज (जस्तै SSD)।" },
      { id: "f204", frontEn: "What does CPU Fetch-Decode-Execute mean?", frontNe: "Fetch-Decode-Execute चक्र के हो?", backEn: "The continuous loop where CPU gets an instruction, understands it, and runs it.", backNe: "CPU ले निर्देशन लिने, बुझ्ने र कार्यान्वयन गर्ने निरन्तर चक्र।" },
      { id: "f205", frontEn: "What is a Bit?", frontNe: "बिट (Bit) भनेको के हो?", backEn: "The smallest unit of data in computing, representing either a 0 or a 1.", backNe: "कम्प्युटर डेटाको सबैभन्दा सानो एकाइ (० वा १)।" },
      { id: "f206", frontEn: "What is a Byte?", frontNe: "बाइट (Byte) भनेको के हो?", backEn: "A group of 8 bits, typically representing one character (like letter 'A').", backNe: "८ वटा बिटको समूह, जसले एउटा अक्षर वा संकेत जनाउँछ।" },
      { id: "f207", frontEn: "What does Ctrl+S do?", frontNe: "Ctrl+S ले के गर्छ?", backEn: "Saves the current document from temporary RAM to permanent SSD storage.", backNe: "अस्थायी RAM मा भएको फाइललाई स्थायी SSD मा सेभ गर्छ।" },
      { id: "f208", frontEn: "How does input reach the CPU?", frontNe: "इनपुट CPU सम्म कसरी पुग्छ?", backEn: "Input hardware sends electronic signals through motherboard data buses to RAM and CPU.", backNe: "मदरबोर्डको डेटा बसमार्फत विद्युतीय सिग्नल भएर पुग्छ।" },
      { id: "f209", frontEn: "What is an Output Device?", frontNe: "आउटपुट उपकरण के हो?", backEn: "Hardware that presents processed results to humans (e.g. monitor, printer, speaker).", backNe: "प्रशोधित नतिजा मानिसलाई देखाउने वा सुनाउने यन्त्र।" },
      { id: "f210", frontEn: "What is Clock Speed in simple terms?", frontNe: "प्रोसेसरको Clock Speed के हो?", backEn: "How many instruction cycles a CPU can complete per second (measured in GHz).", backNe: "CPU ले एक सेकेन्डमा कति काम गर्न सक्छ भन्ने गति (GHz मा मापन)।" },
    ],
    rememberPoints: [
      { en: "Active work stays in RAM; saved work is stored on SSD/HDD.", ne: "चालु काम RAM मा बस्छ; सेभ गरेको काम SSD मा सुरक्षित हुन्छ।" },
      { en: "Always save your important documents frequently.", ne: "आफ्ना महत्त्वपूर्ण कागजातहरू समय समयमा सेभ (Save) गरिरहनुहोस्।" },
      { en: "The CPU interprets all software commands as lightning-fast binary logic.", ne: "CPU ले सबै आदेशहरूलाई द्रुत गतिको बाइनरी गणितमार्फत पूरा गर्छ।" }
    ]
  },

  // ==========================================
  // LESSON 03: Hardware and Software
  // ==========================================
  {
    id: 3,
    slug: "hardware-and-software",
    title: "Hardware and Software",
    titleNp: "हार्डवेयर र सफ्टवेयर",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Master the clear distinction between physical hardware components and digital software programs that drive them.",
    summaryNp: "भौतिक हार्डवेयर (छुन सकिने) र डिजिटल सफ्टवेयर (प्रोग्रामहरू) बीचको स्पष्ट भिन्नता बुझ्नुहोस्।",
    objectives: [
      { en: "Define hardware and recognize common hardware items", ne: "हार्डवेयरको परिभाषा र भौतिक भागहरू पहिचान गर्ने" },
      { en: "Define software and differentiate system software from application software", ne: "सफ्टवेयरको परिभाषा र सिस्टम तथा एप्लिकेसन सफ्टवेयरको भिन्नता बुझ्ने" },
      { en: "Understand how hardware and software work harmoniously together", ne: "हार्डवेयर र सफ्टवेयर मिलेर कसरी काम गर्छन् सिक्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "A complete computer system requires two fundamental parts to function: Hardware (the physical machine) and Software (the digital programs and instructions).",
        textNe: "कम्प्युटर प्रणाली चल्न दुई मुख्य कुराहरू चाहिन्छ: हार्डवेयर (भौतिक यन्त्र) र सफ्टवेयर (डिजिटल प्रोग्राम र निर्देशनहरू)।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "The Musician and Musical Instrument Analogy",
        titleNe: "बाजा र संगीतको सरल उदाहरण",
        text: "Think of a guitar: The wooden body and metal strings are Hardware (physical). The song sheet, musical knowledge, and chords are Software (instructions). A guitar cannot make music on its own without a song to play!",
        textNe: "मादल वा गितार हार्डवेयर (भौतिक) हो भने, त्यसमा बजाइने धुन र गीत सफ्टवेयर (निर्देशन) हो। धुनबिना बाजा आफैं बज्न सक्दैन!"
      },
      {
        type: "heading",
        title: "System Software vs Application Software",
        titleNe: "सिस्टम सफ्टवेयर र एप्लिकेसन सफ्टवेयर"
      },
      {
        type: "diagram",
        items: [
          { step: "Type 1", titleEn: "Hardware", titleNe: "हार्डवेयर", descEn: "Physical parts you can see and touch: Screen, CPU, Keyboard, SSD, Motherboard.", descNe: "छुन र देख्न सकिने भागहरू: स्क्रिन, किबोर्ड, CPU, माउस आदि।", icon: "HardDrive" },
          { step: "Type 2", titleEn: "System Software", titleNe: "सिस्टम सफ्टवेयर", descEn: "The Operating System (Windows, macOS, Linux, Android) that controls the hardware.", descNe: "हार्डवेयर चलाउने मुख्य प्रणाली (जस्तै: Windows, Android, Linux)।", icon: "Settings" },
          { step: "Type 3", titleEn: "Application Software", titleNe: "एप्लिकेसन सफ्टवेयर", descEn: "Apps for specific user tasks: Web browsers (Chrome), Word processors, Media players.", descNe: "प्रयोगकर्ताका कामका लागि बनाइएका एपहरू (Chrome, Word, Zoom आदि)।", icon: "AppWindow" }
        ]
      },
      {
        type: "nepalExample",
        title: "Real-Life Nepal Example: Attending an Online Class",
        titleNe: "नेपालको सन्दर्भमा: अनलाइन कक्षा लिँदा",
        text: "Hardware: Laptop screen, microphone, and speakers. System Software: Windows 11. Application Software: Zoom or Google Meet and Microsoft Edge.",
        textNe: "हार्डवेयर: ल्यापटपको स्क्रिन, स्पिकर, माइक। सिस्टम सफ्टवेयर: Windows 11। एप्लिकेसन सफ्टवेयर: Zoom, Google Meet वा Chrome।"
      }
    ],
    keyTerms: [
      { termEn: "Hardware", termNe: "हार्डवेयर", definitionEn: "The physical, tangible machinery and electronic circuits of a computer.", definitionNe: "कम्प्युटरका भौतिक तथा देख्न र छुन सकिने सबै भागहरू।" },
      { termEn: "Software", termNe: "सफ्टवेयर", definitionEn: "Intangible sets of digital instructions, programs, and data that direct hardware operations.", definitionNe: "कम्प्युटरलाई चलाउने डिजिटल प्रोग्राम, कोड र निर्देशनहरू।" },
      { termEn: "Operating System (OS)", termNe: "अपरेटिङ सिस्टम", definitionEn: "Master system software that manages computer memory, hardware devices, and user interface.", definitionNe: "कम्प्युटरका सम्पूर्ण स्रोत र हार्डवेयरलाई व्यवस्थापन गर्ने मुख्य सफ्टवेयर।" },
      { termEn: "Application (App)", termNe: "एप्लिकेसन (एप)", definitionEn: "Software created to help users perform specific tasks like browsing, typing, or editing photos.", definitionNe: "प्रयोगकर्ताको कुनै खास कामका लागि बनाइएको सफ्टवेयर (जस्तै: वर्ड, ब्राउजर)।" }
    ],
    misconceptions: [
      {
        mythEn: "If your computer gets a virus, the physical keyboard or monitor melts.",
        mythNe: "कम्प्युटरमा भाइरस लाग्दा भौतिक किबोर्ड वा स्क्रिन पग्लिन्छ।",
        realityEn: "Viruses are malicious software programs that damage files, steal data, or slow down processing, but do not physically melt external hardware.",
        realityNe: "भाइरस भनेको हानिकारक सफ्टवेयर प्रोग्राम हो। यसले फाइल बिगार्छ र डेटा चोर्छ, तर भौतिक रूपमा किबोर्ड पगाल्दैन।"
      }
    ],
    practiceActivity: {
      titleEn: "Classify: Hardware vs Software",
      titleNe: "वर्गीकरण गर्नुहोस्: हार्डवेयर कि सफ्टवेयर?",
      instructionEn: "Place each item into the Hardware or Software category.",
      instructionNe: "दिइएको वस्तुलाई हार्डवेयर वा सफ्टवेयरको सूचीमा वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "hw", labelEn: "Hardware (हार्डवेयर)", labelNe: "हार्डवेयर", color: "indigo" },
        { key: "sw", labelEn: "Software (सफ्टवेयर)", labelNe: "सफ्टवेयर", color: "purple" }
      ],
      items: [
        { id: "h1", nameEn: "Computer Mouse", nameNe: "कम्प्युटर माउस", category: "hw" },
        { id: "h2", nameEn: "Google Chrome Browser", nameNe: "गुगल क्रोम ब्राउजर", category: "sw" },
        { id: "h3", nameEn: "Solid State Drive (SSD)", nameNe: "SSD स्टोरेज", category: "hw" },
        { id: "h4", nameEn: "Windows 11 Operating System", nameNe: "विन्डोज ११", category: "sw" },
        { id: "h5", nameEn: "Microsoft Word", nameNe: "माइक्रोसफ्ट वर्ड", category: "sw" },
        { id: "h6", nameEn: "RAM Memory Stick", nameNe: "RAM चिप", category: "hw" },
      ]
    },
    quiz: [
      {
        question: "Which of the following is considered computer HARDWARE?",
        options: ["Google Chrome web browser", "Physical Keyboard", "Antivirus program", "YouTube website"],
        answer: 1,
        explanation: "A physical keyboard is a tangible device you can touch, making it hardware.",
        difficulty: "easy"
      },
      {
        question: "Which of the following is considered computer SOFTWARE?",
        options: ["Monitor screen", "Computer mouse", "Operating System (e.g. Windows)", "Power cable"],
        answer: 2,
        explanation: "An Operating System is a collection of digital programs and instructions, which is software.",
        difficulty: "easy"
      },
      {
        question: "What is the primary role of System Software (Operating System)?",
        options: [
          "To clean the computer case with water",
          "To manage hardware resources and provide a platform for apps",
          "To manufacture new microchips",
          "To act as physical storage shelf"
        ],
        answer: 1,
        explanation: "System software acts as the foundation that manages memory, processor time, files, and connected devices.",
        difficulty: "medium"
      },
      {
        question: "Which of the following is an Application Software?",
        options: ["RAM memory chip", "Motherboard", "Microsoft Word / Google Docs", "Cooling fan"],
        answer: 2,
        explanation: "Microsoft Word and Google Docs are application programs designed for the specific task of creating and editing text documents.",
        difficulty: "easy"
      },
      {
        question: "Can computer hardware function usefully without any software installed?",
        options: [
          "No, hardware requires software instructions to do useful work",
          "Yes, hardware can think and browse the web on its own",
          "Yes, hardware automatically writes its own books",
          "Only on rainy days"
        ],
        answer: 0,
        explanation: "Hardware needs software instructions and an operating system to know what tasks to perform.",
        difficulty: "easy"
      },
      {
        question: "Which category does an Android mobile operating system belong to?",
        options: ["Hardware component", "System Software", "Plastic casing", "Paper manual"],
        answer: 1,
        explanation: "Android is system software (operating system) designed for smartphones, tablets, and smart devices.",
        difficulty: "easy"
      },
      {
        question: "Which component connects all internal hardware parts together?",
        options: ["Motherboard", "Mouse pad", "Web browser", "Desktop wallpaper"],
        answer: 0,
        explanation: "The motherboard is the main physical printed circuit board that connects the CPU, RAM, storage, and expansion cards.",
        difficulty: "medium"
      },
      {
        question: "What is a Device Driver?",
        options: [
          "A person who drives a delivery truck",
          "Special software that allows the OS to communicate with specific hardware like printers",
          "A screwdriver used for fixing cases",
          "A type of physical cable"
        ],
        answer: 1,
        explanation: "A device driver is specialized software that lets the operating system understand and control hardware accessories.",
        difficulty: "hard"
      },
      {
        question: "What is Firmware?",
        options: [
          "Permanent low-level software programmed directly into read-only hardware memory chips (like BIOS)",
          "A flexible soft computer screen",
          "An online multiplayer game",
          "A brand of computer chair"
        ],
        answer: 0,
        explanation: "Firmware is permanent, low-level software embedded inside hardware chips (like the motherboard BIOS/UEFI) to initialize bootup.",
        difficulty: "hard"
      },
      {
        question: "Why do we say Hardware and Software are complementary?",
        options: [
          "They have the exact same physical weight",
          "Neither can provide computing value to a user without the other",
          "They are both sold in grocery stores",
          "They only work on Tuesdays"
        ],
        answer: 1,
        explanation: "Hardware provides the physical execution capacity, while software provides the intelligent instructions. Both are indispensable.",
        difficulty: "medium"
      }
    ],
    flashcards: [
      { id: "f301", frontEn: "Define Hardware", frontNe: "हार्डवेयरको परिभाषा", backEn: "The physical, touchable electronic parts of a computer system.", backNe: "कम्प्युटरका देख्न र छुन सकिने सबै भौतिक भागहरू।" },
      { id: "f302", frontEn: "Define Software", frontNe: "सफ्टवेयरको परिभाषा", backEn: "Digital programs, code, and instructions that tell computer hardware what to do.", backNe: "हार्डवेयरलाई काम गर्न लगाउने डिजिटल प्रोग्राम र निर्देशनहरू।" },
      { id: "f303", frontEn: "What is System Software?", frontNe: "सिस्टम सफ्टवेयर के हो?", backEn: "Software that manages the computer hardware and basic operations (e.g. Windows, macOS, Linux).", backNe: "कम्प्युटरको हार्डवेयरलाई नियन्त्रण गर्ने मूल सफ्टवेयर (जस्तै: Windows, Linux)।" },
      { id: "f304", frontEn: "What is Application Software?", frontNe: "एप्लिकेसन सफ्टवेयर के हो?", backEn: "Programs designed to help users perform specific tasks (e.g. Word, Excel, Chrome, Photoshop).", backNe: "प्रयोगकर्ताका दैनिक कामका लागि बनाइएका एपहरू (जस्तै: Word, Photoshop)।" },
      { id: "f305", frontEn: "Name 3 Hardware Components", frontNe: "३ वटा हार्डवेयर भागहरूको नाम दिनुहोस्", backEn: "CPU, Monitor, and SSD Storage.", backNe: "CPU, मोनिटर र SSD भण्डारण।" },
      { id: "f306", frontEn: "Name 3 Software Examples", frontNe: "३ वटा सफ्टवेयरका उदाहरण दिनुहोस्", backEn: "Windows 11, Google Chrome, and Zoom.", backNe: "Windows 11, Google Chrome र Zoom।" },
      { id: "f307", frontEn: "What is a Device Driver?", frontNe: "डिभाइस ड्राइभर (Driver) के हो?", backEn: "Software that allows the OS to communicate properly with a specific hardware device (like a printer).", backNe: "प्रिन्टर वा क्यामेरा जस्ता यन्त्र चलाउन चाहिने सफ्टवेयर।" },
      { id: "f308", frontEn: "What is BIOS / UEFI?", frontNe: "BIOS वा UEFI के हो?", backEn: "Firmware on the motherboard that boots up the computer and tests hardware on power-on.", backNe: "कम्प्युटर खोल्दा हार्डवेयर जाँच गर्ने र सुरु गर्ने आधारभूत फर्मवेयर।" },
      { id: "f309", frontEn: "Can Software exist without Hardware?", frontNe: "हार्डवेयर बिना सफ्टवेयर चल्न सक्छ?", backEn: "No. Software needs physical processors and memory circuits to be stored and executed.", backNe: "सक्दैन। सफ्टवेयर चल्न भौतिक मेमोरी र प्रोसेसर चाहिन्छ।" },
      { id: "f310", frontEn: "Is a Smartphone App software?", frontNe: "मोबाइल एप सफ्टवेयर हो?", backEn: "Yes, all mobile apps are application software designed for mobile operating systems.", backNe: "हो, सबै मोबाइल एपहरू एप्लिकेसन सफ्टवेयर हुन्।" },
    ],
    rememberPoints: [
      { en: "Hardware is the physical body; Software is the directing mind.", ne: "हार्डवेयर भौतिक शरीर हो; सफ्टवेयर त्यसलाई चलाउने मन र निर्देशन हो।" },
      { en: "System software runs the machine; Application software helps you do work.", ne: "सिस्टम सफ्टवेयरले कम्प्युटर चलाउँछ; एप्लिकेसनले तपाईंको काम सजिलो बनाउँछ।" }
    ]
  },

  // ==========================================
  // LESSON 04: Main Parts of a Computer
  // ==========================================
  {
    id: 4,
    slug: "main-parts-of-a-computer",
    title: "Main Parts of a Computer",
    titleNp: "कम्प्युटरका मुख्य भागहरू",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Identify the critical internal and external hardware components: Monitor, Keyboard, Mouse, Motherboard, Power Supply, and Ports.",
    summaryNp: "कम्प्युटरका भित्री र बाहिरी मुख्य भागहरू: मोनिटर, किबोर्ड, माउस, मदरबोर्ड, पावर सप्लाई र पोर्टहरू पहिचान गर्नुहोस्।",
    objectives: [
      { en: "Recognize essential external peripherals (Monitor, Keyboard, Mouse, Speakers)", ne: "बाहिरी मुख्य उपकरणहरू (मोनिटर, किबोर्ड, माउस) पहिचान गर्ने" },
      { en: "Understand key internal components (Motherboard, PSU, Storage, Cooling)", ne: "भित्री मुख्य भागहरू (मदरबोर्ड, पावर सप्लाई, कुलिङ फ्यान) बुझ्ने" },
      { en: "Learn standard connection ports (USB, HDMI, Audio jack)", ne: "कम्प्युटर जोड्ने मुख्य पोर्टहरू (USB, HDMI) चिन्न सिक्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "A desktop or laptop computer is an organized assembly of specialized hardware parts, each designed for a specific electrical, processing, storage, or communication task.",
        textNe: "डेस्कटप वा ल्यापटप कम्प्युटर विभिन्न विशेष पार्टपुर्जाहरू मिलेर बनेको हुन्छ, जहाँ हरेक भागको आफ्नै छुट्टै काम हुन्छ।"
      },
      {
        type: "heading",
        title: "Major Internal and External Components",
        titleNe: "मुख्य भित्री र बाहिरी भागहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "1", titleEn: "Motherboard", titleNe: "मदरबोर्ड", descEn: "The main circuit board connecting the CPU, RAM, storage, and all external ports.", descNe: "सबै पार्टपुर्जा (CPU, RAM, पोर्टहरू) जोड्ने मुख्य सर्किट बोर्ड।", icon: "CircuitBoard" },
          { step: "2", titleEn: "Power Supply (PSU)", titleNe: "पावर सप्लाई (PSU)", descEn: "Converts high-voltage AC wall power into steady, safe low-voltage DC power.", descNe: "घरको बिजुलीलाई कम्प्युटरका लागि सुरक्षित डिसी करेन्टमा बदल्ने यन्त्र।", icon: "Zap" },
          { step: "3", titleEn: "Cooling Fan / Heatsink", titleNe: "कुलिङ फ्यान", descEn: "Removes intense heat generated by high-speed processor chips to prevent overheating.", descNe: "प्रोसेसर तात्न नदिन चिसो बनाइराख्ने फ्यान।", icon: "Fan" },
          { step: "4", titleEn: "Ports (USB / HDMI)", titleNe: "पोर्टहरू (USB / HDMI)", descEn: "Sockets to plug in monitors, flash drives, keyboards, printers, and internet cables.", descNe: "पेनड्राइभ, मोनिटर र इन्टरनेट तार जोड्ने ठाउँहरू।", icon: "Cable" }
        ]
      },
      {
        type: "nepalExample",
        title: "Everyday Nepal Setup: Office & School Computer Lab",
        titleNe: "नेपालको कार्यालय तथा विद्यालयको कम्प्युटर ल्याब",
        text: "In a Nepali school computer lab, you will see the System Case connected to a Monitor via HDMI or VGA, a USB Keyboard and Mouse, and power routed through a stabilizer or UPS to protect against voltage fluctuations.",
        textNe: "विद्यालयको ल्याबमा मोनिटरलाई HDMI तारले, किबोर्ड-माउसलाई USB ले जोडिएको हुन्छ र भोल्टेज तलमाथि हुन नदिन UPS वा स्टेबलाइजर राखिन्छ।"
      }
    ],
    keyTerms: [
      { termEn: "Motherboard", termNe: "मदरबोर्ड", definitionEn: "The central printed circuit board that connects all system components together.", definitionNe: "कम्प्युटरका सम्पूर्ण भागहरूलाई जोड्ने मुख्य सर्किट बोर्ड।" },
      { termEn: "Power Supply Unit (PSU)", termNe: "पावर सप्लाई युनिट", definitionEn: "Hardware component that delivers regulated electrical energy to internal parts.", definitionNe: "कम्प्युटरका सबै भागमा आवश्यक बिजुली वितरण गर्ने यन्त्र।" },
      { termEn: "USB (Universal Serial Bus)", termNe: "USB", definitionEn: "Universal industry standard port for connecting mice, keyboards, drives, and phones.", definitionNe: "पेनड्राइभ, किबोर्ड, माउस जोड्ने विश्वव्यापी पोर्ट।" },
      { termEn: "HDMI (High-Definition Multimedia Interface)", termNe: "HDMI", definitionEn: "Standard cable and port used to transmit digital video and audio to monitors and TVs.", definitionNe: "मोनिटर वा टिभीमा सफा भिडियो र आवाज पठाउने पोर्ट।" },
      { termEn: "UPS (Uninterruptible Power Supply)", termNe: "UPS", definitionEn: "Battery backup device that provides temporary power during electrical outages.", definitionNe: "बत्ती जाँदा केही समय कम्प्युटर बन्द हुन नदिने ब्याट्री ब्याकअप।" }
    ],
    misconceptions: [
      {
        mythEn: "The desktop case is just an empty metal box.",
        mythNe: "कम्प्युटरको बक्सा (CPU Cabinet) केवल खाली फलामको बट्टा हो।",
        realityEn: "Inside the case sits the entire computer engine: motherboard, CPU, RAM, storage, power supply, and cooling fans.",
        realityNe: "त्यसभित्र कम्प्युटरको मुटु र दिमाग (मदरबोर्ड, CPU, RAM, SSD, फ्यान) जडान गरिएको हुन्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Identify Internal vs External Parts",
      titleNe: "भित्री र बाहिरी भागहरू छुट्याउनुहोस्",
      instructionEn: "Classify each component as an Internal component (inside the case) or External Peripheral.",
      instructionNe: "दिइएको भागलाई भित्री (Internal) वा बाहिरी (External) सूचीमा राख्नुहोस्।",
      categories: [
        { key: "int", labelEn: "Internal (भित्री भाग)", labelNe: "भित्री भाग", color: "indigo" },
        { key: "ext", labelEn: "External Peripheral (बाहिरी भाग)", labelNe: "बाहिरी उपकरण", color: "emerald" }
      ],
      items: [
        { id: "m1", nameEn: "Motherboard", nameNe: "मदरबोर्ड", category: "int" },
        { id: "m2", nameEn: "Desktop Monitor Screen", nameNe: "मोनिटर स्क्रिन", category: "ext" },
        { id: "m3", nameEn: "Power Supply Unit (PSU)", nameNe: "पावर सप्लाई (PSU)", category: "int" },
        { id: "m4", nameEn: "USB Mouse", nameNe: "USB माउस", category: "ext" },
        { id: "m5", nameEn: "CPU Cooling Fan", nameNe: "कुलिङ फ्यान", category: "int" },
        { id: "m6", nameEn: "Paper Printer", nameNe: "प्रिन्टर", category: "ext" },
      ]
    },
    quiz: [
      {
        question: "What is the main circuit board that connects all computer parts called?",
        options: ["Keyboard", "Motherboard", "Hard drive casing", "Mouse pad"],
        answer: 1,
        explanation: "The motherboard is the main printed circuit board connecting the processor, memory, storage, and ports.",
        difficulty: "easy"
      },
      {
        question: "What is the primary function of the Power Supply Unit (PSU)?",
        options: [
          "To generate funny sounds",
          "To convert high voltage AC power into regulated DC power for internal components",
          "To display high definition video",
          "To connect to WiFi"
        ],
        answer: 1,
        explanation: "The PSU safely transforms wall alternating current into the precise direct current voltages needed by chips.",
        difficulty: "medium"
      },
      {
        question: "Which port is commonly used to connect monitors and TVs with digital video and audio?",
        options: ["HDMI", "Power plug", "Headphone wire", "CD tray"],
        answer: 0,
        explanation: "HDMI (High-Definition Multimedia Interface) transmits high-definition digital video and multi-channel audio over one cable.",
        difficulty: "easy"
      },
      {
        question: "Why do high-performance computers have cooling fans and metal heatsinks?",
        options: [
          "To make the computer heavier",
          "To dissipate intense heat generated by electronic microchips and prevent damage",
          "To clean dust automatically",
          "To keep room temperatures freezing"
        ],
        answer: 1,
        explanation: "Microprocessors generate heat when billions of transistors switch states. Heatsinks and fans prevent thermal throttling and overheating.",
        difficulty: "easy"
      },
      {
        question: "What is a UPS primarily used for in Nepal?",
        options: [
          "To boost internet download speed",
          "To provide emergency battery backup power and surge protection during power cuts",
          "To change screen wallpaper",
          "To install operating systems"
        ],
        answer: 1,
        explanation: "A UPS (Uninterruptible Power Supply) provides battery power during power cuts so users can save work and shut down safely.",
        difficulty: "medium"
      },
      {
        question: "Which of the following is an external peripheral device?",
        options: ["RAM stick", "Webcam", "CPU chip", "Motherboard chipset"],
        answer: 1,
        explanation: "A webcam is an external peripheral plugged into the computer to capture video.",
        difficulty: "easy"
      },
      {
        question: "What does USB stand for?",
        options: ["Universal Serial Bus", "United Software Base", "Ultra Speed Battery", "Uniform Screen Brightness"],
        answer: 0,
        explanation: "USB stands for Universal Serial Bus, the worldwide standard for connecting computer accessories.",
        difficulty: "medium"
      },
      {
        question: "Where are laptop webcams and microphones usually located?",
        options: ["Inside the battery", "Above the top bezel of the display screen", "Underneath the keyboard spacebar", "Inside the mouse trackpad"],
        answer: 1,
        explanation: "Laptop webcams and stereo microphones are placed above the screen for natural face-to-face video calling.",
        difficulty: "easy"
      },
      {
        question: "What happens if a computer's cooling fan completely stops working?",
        options: [
          "The CPU will overheat, slow down automatically to protect itself, or turn off unexpectedly",
          "The computer turns into a radio",
          "The screen displays 3D movies automatically",
          "The keyboard stops typing letter 'A'"
        ],
        answer: 0,
        explanation: "When cooling fails, modern CPUs reach high temperatures and initiate thermal throttling or emergency emergency shutdowns to protect silicon circuits.",
        difficulty: "hard"
      },
      {
        question: "Which cable is commonly used to connect a computer directly to a wired local internet router?",
        options: ["Ethernet (RJ-45) cable", "HDMI cable", "Audio 3.5mm jack", "Power cord"],
        answer: 0,
        explanation: "An Ethernet network cable (with an RJ-45 connector) provides a fast, stable wired internet connection.",
        difficulty: "medium"
      }
    ],
    flashcards: [
      { id: "f401", frontEn: "What is a Motherboard?", frontNe: "मदरबोर्ड के हो?", backEn: "The primary printed circuit board that connects all computer components together.", backNe: "कम्प्युटरका सम्पूर्ण पार्टपुर्जाहरू जोड्ने मुख्य सर्किट बोर्ड।" },
      { id: "f402", frontEn: "What is a Power Supply Unit (PSU)?", frontNe: "पावर सप्लाई (PSU) के हो?", backEn: "The unit that converts electrical power from the wall into safe voltages for computer parts.", backNe: "घरको बिजुलीलाई कम्प्युटरका लागि सुरक्षित बनाएर वितरण गर्ने यन्त्र।" },
      { id: "f403", frontEn: "What is HDMI?", frontNe: "HDMI के हो?", backEn: "A standard digital cable and port that sends video and audio to monitors and televisions.", backNe: "मोनिटर वा टिभीमा भिडियो र अडियो पठाउने आधुनिक पोर्ट।" },
      { id: "f404", frontEn: "What is USB?", frontNe: "USB के हो?", backEn: "Universal Serial Bus — the most common port for connecting mice, keyboards, and drives.", backNe: "किबोर्ड, माउस, पेनड्राइभ जोड्ने सबैभन्दा बढी प्रयोग हुने पोर्ट।" },
      { id: "f405", frontEn: "Why is a Heatsink needed?", frontNe: "हिटसिङ्क (Heatsink) किन चाहिन्छ?", backEn: "To draw away intense heat from the CPU and keep it operating at safe temperatures.", backNe: "CPU बाट निस्कने अत्यधिक तातो तानेर चिसो राख्न।" },
      { id: "f406", frontEn: "What is a UPS?", frontNe: "UPS को पूरा रूप र काम के हो?", backEn: "Uninterruptible Power Supply — provides emergency battery power during sudden power loss.", backNe: "बिजुली जाँदा कम्प्युटर तत्काल बन्द हुन नदिने ब्याट्री ब्याकअप।" },
      { id: "f407", frontEn: "What is an Ethernet Port?", frontNe: "इथरनेट (Ethernet) पोर्ट के हो?", backEn: "A physical port (RJ-45) used to connect a wired internet cable to a network router.", backNe: "राउटरबाट सिधै इन्टरनेटको तार जोड्ने पोर्ट।" },
      { id: "f408", frontEn: "What is a Peripheral Device?", frontNe: "पेरिफेरल (Peripheral) उपकरण के हो?", backEn: "Any external auxiliary device (like a mouse, keyboard, or printer) connected to the computer.", backNe: "कम्प्युटरसँग बाहिरबाट जोडिने यन्त्रहरू (जस्तै: माउस, प्रिन्टर)।" },
      { id: "f409", frontEn: "Where does RAM plug in?", frontNe: "RAM कहाँ जोडिन्छ?", backEn: "Into dedicated memory slots directly on the motherboard.", backNe: "मदरबोर्डमा रहेका विशेष RAM स्लटहरूमा।" },
      { id: "f410", frontEn: "What is a GPU / Graphics Card?", frontNe: "ग्राफिक्स कार्ड (GPU) के हो?", backEn: "A dedicated processor chip designed specifically for rendering images, video, and 3D graphics.", backNe: "भिडियो, तस्बिर र थ्रीडी गेमहरू छिटो देखाउने विशेष प्रोसेसर।" },
    ],
    rememberPoints: [
      { en: "The motherboard is the backbone connecting all internal components.", ne: "मदरबोर्ड सबै भित्री भागहरू जोड्ने मेरुदण्ड हो।" },
      { en: "Proper cooling and stable power are essential for computer longevity.", ne: "कम्प्युटर लामो समय टिकाउन राम्रो कुलिङ र भरपर्दो बिजुली आवश्यक हुन्छ।" }
    ]
  }
];

import { lessonsPart2 } from "./computerSkillsLessonsPart2";
import { lessonsPart3 } from "./computerSkillsLessonsPart3";

export const allComputerFundamentalsLessons: ComputerLesson[] = [
  ...computerFundamentalsLessons,
  ...lessonsPart2,
  ...lessonsPart3
];

export const computerFundamentalsModuleInfo = {
  id: "module-1-computer-fundamentals",
  moduleNumber: 1,
  level: "Level 1: Beginner",
  titleEn: "Computer Fundamentals",
  titleNe: "कम्प्युटरका आधारभूत ज्ञान",
  descEn: "Learn what a computer is, how it works, its major components, and how computers are used in everyday life.",
  descNe: "कम्प्युटर के हो, यसले कसरी काम गर्छ, यसका मुख्य भागहरू के हुन् र दैनिक जीवनमा कम्प्युटर कसरी प्रयोग हुन्छ भन्ने कुरा सरल तरिकाले सिक्नुहोस्।",
  estimatedTime: "45–60 minutes",
  totalLessons: 12,
  badge: "Computer Fundamentals Graduate 🎓"
};

export {
  operatingComputerLessons,
  operatingComputerModuleMeta,
  operatingComputerQuizQuestions,
  operatingComputerFlashcards,
  operatingComputerKeyTerms
} from "./operatingComputerData";

export {
  fileManagementLessons,
  fileManagementModuleMeta,
  fileManagementModuleQuizQuestions,
  fileManagementFlashcards,
  fileManagementKeyTerms
} from "./fileManagementData";



