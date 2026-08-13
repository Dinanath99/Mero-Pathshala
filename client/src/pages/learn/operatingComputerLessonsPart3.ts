import { ComputerSkillLesson, QuizQuestion, FlashcardItem, KeyTerm } from "./computerSkillsData";

export const operatingComputerQuizQuestions: QuizQuestion[] = [
  // 1 - Easy
  {
    id: "mod2-q-01",
    question: "What is the primary screen that appears after turning on and logging into a computer?",
    questionNe: "कम्प्युटर सुरु भएपछि स्क्रिनमा देखिने मुख्य पृष्ठभूमिलाई के भनिन्छ?",
    options: [
      "The Desktop (डेस्कटप)",
      "The Hard Disk (हार्ड डिस्क)",
      "The CPU Socket (सीपीयू सकेट)",
      "The BIOS screen (बायोस)"
    ],
    answer: 0,
    explanation: "The Desktop is the primary on-screen workspace shown upon logging in.",
    explanationNe: "कम्प्युटर खोलेपछि देखिने मुख्य कार्यक्षेत्रलाई डेस्कटप भनिन्छ।",
    difficulty: "easy"
  },
  // 2 - Easy
  {
    id: "mod2-q-02",
    question: "Which mouse action opens a file, folder, or application from the Desktop?",
    questionNe: "डेस्कटपबाट कुनै फाइल वा सफ्टवेयर खोल्न माउसको कुन कार्य गरिन्छ?",
    options: [
      "Double-click the Left mouse button",
      "Right-click three times",
      "Hold down the mouse scroll wheel",
      "Triple-click the Right mouse button"
    ],
    answer: 0,
    explanation: "Double-clicking (two rapid left clicks) launches applications and opens files.",
    explanationNe: "छिटो-छिटो दुई पटक देब्रे क्लिक (Double-Click) गर्दा फाइल वा एप खुल्छ।",
    difficulty: "easy"
  },
  // 3 - Easy
  {
    id: "mod2-q-03",
    question: "Which key moves the blinking text cursor down to start a new line or paragraph?",
    questionNe: "टाइप गर्दा कर्सरलाई नयाँ लाइन वा अनुच्छेदमा लैजान कुन की थिचिन्छ?",
    options: [
      "Enter / Return key",
      "Spacebar key",
      "Escape (Esc) key",
      "Tab key"
    ],
    answer: 0,
    explanation: "The Enter key moves the cursor to a new line and confirms computer actions.",
    explanationNe: "Enter की थिच्दा कर्सर नयाँ लाइनमा जान्छ र आदेश कार्यान्वयन हुन्छ।",
    difficulty: "easy"
  },
  // 4 - Easy
  {
    id: "mod2-q-04",
    question: "What is the universal keyboard shortcut to Copy selected text or files?",
    questionNe: "छानिएको अक्षर वा फाइल कपी (Copy) गर्ने विश्वव्यापी सर्टकट के हो?",
    options: [
      "Ctrl + C",
      "Ctrl + V",
      "Ctrl + X",
      "Ctrl + Z"
    ],
    answer: 0,
    explanation: "Ctrl + C copies the selected item into the clipboard buffer.",
    explanationNe: "Ctrl + C ले छानिएका वस्तुहरूको प्रतिलिपि (Copy) बनाउँछ।",
    difficulty: "easy"
  },
  // 5 - Easy
  {
    id: "mod2-q-05",
    question: "What is the universal keyboard shortcut to Paste copied items?",
    questionNe: "कपी गरिएको वस्तुलाई नयाँ ठाउँमा टाँस्न (Paste गर्न) कुन सर्टकट थिचिन्छ?",
    options: [
      "Ctrl + V",
      "Ctrl + C",
      "Ctrl + S",
      "Ctrl + A"
    ],
    answer: 0,
    explanation: "Ctrl + V pastes items currently stored on your clipboard.",
    explanationNe: "Ctrl + V ले कपी गरिएको वस्तुलाई छानेको ठाउँमा टाँस्ने (Paste गर्ने) काम गर्छ।",
    difficulty: "easy"
  },
  // 6 - Easy
  {
    id: "mod2-q-06",
    question: "Which button hides a window to the taskbar while keeping the program running?",
    questionNe: "सफ्टवेयर बन्द नगरी स्क्रिनबाट लुकाएर टास्कबारमा राख्न कुन बटन थिचिन्छ?",
    options: [
      "Minimize button (−)",
      "Close button (✕)",
      "Maximize button (□)",
      "Power button"
    ],
    answer: 0,
    explanation: "The Minimize button (−) conceals the window to the bottom taskbar.",
    explanationNe: "Minimize बटन (−) ले विन्डोलाई तलको टास्कबारमा लुकाइदिन्छ।",
    difficulty: "easy"
  },
  // 7 - Easy
  {
    id: "mod2-q-07",
    question: "Where are files downloaded from web browsers typically saved by default?",
    questionNe: "इन्टरनेटबाट डाउनलोड गरिएका फाइलहरू साधारणतया कहाँ बस्छन्?",
    options: [
      "The Downloads folder (डाउनलोड्स फोल्डर)",
      "The Recycle Bin (रद्दीको टोकरी)",
      "The Network Router",
      "Inside the computer monitor"
    ],
    answer: 0,
    explanation: "Web browsers download all incoming files to the user's Downloads folder.",
    explanationNe: "इन्टरनेटबाट डाउनलोड भएका फाइलहरू सिधै 'Downloads' फोल्डरमा सुरक्षित हुन्छन्।",
    difficulty: "easy"
  },
  // 8 - Easy
  {
    id: "mod2-q-08",
    question: "What is the difference between Backspace and Delete keys?",
    questionNe: "Backspace र Delete की बिच के भिन्नता छ?",
    options: [
      "Backspace deletes to the left of the cursor; Delete erases to the right",
      "Backspace types spaces; Delete erases spaces",
      "Backspace turns off the computer; Delete restarts it",
      "There is no difference between them"
    ],
    answer: 0,
    explanation: "Backspace removes characters behind (left of) the cursor; Delete removes characters ahead (right of) the cursor.",
    explanationNe: "Backspace ले कर्सरको देब्रेपट्टि र Delete ले दायाँपट्टिको अक्षर मेटाउँछ।",
    difficulty: "easy"
  },

  // 9 - Medium
  {
    id: "mod2-q-09",
    question: "Which keyboard shortcut reverses your last mistake (Undo)?",
    questionNe: "भर्खरै भएको गल्ती वा मेटिएको कुरा फिर्ता ल्याउन (Undo गर्न) कुन सर्टकट प्रयोग गरिन्छ?",
    options: [
      "Ctrl + Z",
      "Ctrl + Y",
      "Ctrl + S",
      "Ctrl + P"
    ],
    answer: 0,
    explanation: "Ctrl + Z triggers the universal Undo action to reverse accidental edits.",
    explanationNe: "Ctrl + Z गल्ती सच्याउने (Undo गर्ने) विश्वव्यापी किबोर्ड सर्टकट हो।",
    difficulty: "medium"
  },
  // 10 - Medium
  {
    id: "mod2-q-10",
    question: "What is the purpose of holding down the Shift key while typing?",
    questionNe: "टाइप गर्दा सिफ्ट (Shift) की थिचिराख्नुको मुख्य उद्देश्य के हो?",
    options: [
      "To type capital letters or secondary symbols printed above number keys",
      "To delete the entire sentence",
      "To instantly shut down the computer",
      "To change the font color to red"
    ],
    answer: 0,
    explanation: "Shift capitalizes alphabet letters and types upper symbols on dual-character keys.",
    explanationNe: "Shift थिच्दा ठूला (Capital) अक्षरहरू र नम्बर माथिका चिन्हहरू (@, $, %) टाइप हुन्छन्।",
    difficulty: "medium"
  },
  // 11 - Medium
  {
    id: "mod2-q-11",
    question: "Which shortcut opens the modern Snipping screenshot tool on Windows 10 and 11?",
    questionNe: "विन्डोजमा स्क्रिनको निश्चित भागको फोटो (Screenshot) खिच्न कुन सर्टकट थिचिन्छ?",
    options: [
      "Windows Key + Shift + S",
      "Ctrl + Alt + Delete",
      "Windows Key + L",
      "Alt + F4"
    ],
    answer: 0,
    explanation: "Windows Key + Shift + S opens the regional Snipping Tool tool to capture a screenshot.",
    explanationNe: "Windows Key + Shift + S थिचेर स्क्रिनको चाहेको भागको स्क्रिनसट लिन सकिन्छ।",
    difficulty: "medium"
  },
  // 12 - Medium
  {
    id: "mod2-q-12",
    question: "How do you quickly switch between open application windows without using a mouse?",
    questionNe: "माउस नचलाई खुला रहेका सफ्टवेयरहरू बीच तुरुन्तै अदलबदल गर्न कुन सर्टकट प्रयोग गरिन्छ?",
    options: [
      "Alt + Tab",
      "Ctrl + Shift + Esc",
      "Windows Key + Tab",
      "Shift + Enter"
    ],
    answer: 0,
    explanation: "Holding Alt and tapping Tab displays open windows and switches active focus.",
    explanationNe: "Alt थिचेर Tab दबाउँदा (Alt + Tab) खुला रहेका एपहरू बीच अदलबदल गर्न सकिन्छ।",
    difficulty: "medium"
  },
  // 13 - Medium
  {
    id: "mod2-q-13",
    question: "What happens when you right-click on a blank space on the Desktop?",
    questionNe: "डेस्कटपको खाली ठाउँमा माउसको दायाँ बटन (Right-Click) थिच्दा के हुन्छ?",
    options: [
      "A context menu opens showing options like View, Sort by, Refresh, and New Folder",
      "The computer screen turns off immediately",
      "All files on the hard drive are permanently deleted",
      "Google Chrome automatically launches"
    ],
    answer: 0,
    explanation: "Right-clicking opens a context menu with options to refresh, sort, or create new folders.",
    explanationNe: "दायाँ क्लिक गर्दा रिफ्रेस गर्ने, मिलाउने र नयाँ फोल्डर बनाउने मेनु खुल्छ।",
    difficulty: "medium"
  },
  // 14 - Medium
  {
    id: "mod2-q-14",
    question: "What is the primary difference between an Operating System and an Application?",
    questionNe: "अपरेटिङ सिस्टम र एप्लिकेसन बिचको मुख्य भिन्नता के हो?",
    options: [
      "The OS manages computer hardware and system resources; Apps perform specific user tasks like typing or browsing",
      "The OS is hardware you can touch; Apps are cables",
      "Apps run without needing an operating system",
      "There is no difference between them"
    ],
    answer: 0,
    explanation: "The OS is the foundation managing hardware; Applications run on top of the OS to perform user jobs.",
    explanationNe: "OS ले कम्प्युटरका पार्टपुर्जा चलाउँछ भने एप्लिकेसनले प्रयोगकर्ताका निश्चित काम गर्छ।",
    difficulty: "medium"
  },
  // 15 - Medium
  {
    id: "mod2-q-15",
    question: "What is the shortcut to instantly minimize all open windows and show the Desktop?",
    questionNe: "सबै खुला विन्डोजहरू एकैपटक लुकाएर सिधै डेस्कटपमा पुग्न कुन सर्टकट थिचिन्छ?",
    options: [
      "Windows Key + D",
      "Ctrl + D",
      "Alt + D",
      "Shift + D"
    ],
    answer: 0,
    explanation: "Windows Key + D toggles the Desktop view by minimizing all open windows.",
    explanationNe: "Windows Key + D ले सबै झ्यालहरू लुकाएर सिधै सफा डेस्कटप देखाउँछ।",
    difficulty: "medium"
  },
  // 16 - Medium
  {
    id: "mod2-q-16",
    question: "Which of the following is a popular open-source Linux operating system distribution?",
    questionNe: "तलका मध्ये कुन एउटा लोकप्रिय खुला (Open-Source) लिनक्स अपरेटिङ सिस्टम हो?",
    options: [
      "Ubuntu (उबुन्टु)",
      "Microsoft Office 365",
      "Adobe Photoshop",
      "Intel Core i9"
    ],
    answer: 0,
    explanation: "Ubuntu is one of the world's most widely used free, open-source Linux distributions.",
    explanationNe: "Ubuntu संसारमै सबैभन्दा लोकप्रिय र निःशुल्क लिनक्स अपरेटिङ सिस्टम हो।",
    difficulty: "medium"
  },

  // 17 - Hard
  {
    id: "mod2-q-17",
    question: "What is the function of the Windows Task Manager (Ctrl + Shift + Esc)?",
    questionNe: "विन्डोज टास्क म्यानेजर (Task Manager) को मुख्य काम के हो?",
    options: [
      "To monitor CPU/RAM performance and force-close frozen, non-responsive applications",
      "To clean dust from the computer motherboard",
      "To format the hard disk permanently",
      "To print PDF documents in color"
    ],
    answer: 0,
    explanation: "Task Manager monitors system hardware usage and allows terminating non-responsive processes safely.",
    explanationNe: "टास्क म्यानेजरले कम्प्युटरको लोड हेर्न र अड्किएका (ह्याङ भएका) एपहरू बन्द गर्न मद्दत गर्छ।",
    difficulty: "hard"
  },
  // 18 - Hard
  {
    id: "mod2-q-18",
    question: "When you drag a window's Title Bar to the far left or right edge of the screen, what happens?",
    questionNe: "विन्डोको टाइटल बार समातेर स्क्रिनको देब्रे वा दायाँ कुनामा तान्दा के हुन्छ?",
    options: [
      "The window snaps to exactly half (50%) of the screen for side-by-side multitasking",
      "The window is permanently deleted",
      "The monitor screen resolution decreases",
      "The computer immediately restarts"
    ],
    answer: 0,
    explanation: "Window Snap Assist resizes the window to fill half the display for easy multitasking.",
    explanationNe: "विन्डो स्न्याप भएर स्क्रिनको ठ्याक्कै आधा भागमा बस्छ र दुईवटा काम सँगै गर्न सकिन्छ।",
    difficulty: "hard"
  },
  // 19 - Hard
  {
    id: "mod2-q-19",
    question: "What is the crucial difference between 'Save' (Ctrl + S) and 'Save As'?",
    questionNe: "'Save' र 'Save As' बिचको महत्वपूर्ण भिन्नता के हो?",
    options: [
      "'Save' updates the current file; 'Save As' lets you save a copy with a new name, location, or file format",
      "'Save' deletes the file; 'Save As' restores it",
      "'Save' works offline only; 'Save As' requires high-speed 5G internet",
      "There is no difference between Save and Save As"
    ],
    answer: 0,
    explanation: "'Save' saves changes to the current file; 'Save As' prompts for a new file name, location, or format.",
    explanationNe: "'Save' ले चलिरहेको फाइल अपडेट गर्छ भने 'Save As' ले नयाँ नाम वा नयाँ फोल्डरमा सुरक्षित गर्छ।",
    difficulty: "hard"
  },
  // 20 - Hard
  {
    id: "mod2-q-20",
    question: "Why does the Linux operating system power over 90% of the world's top cloud servers and supercomputers?",
    questionNe: "संसारका ९०% भन्दा बढी इन्टरनेट सर्भरहरू र सुपरकम्प्युटरहरूमा लिनक्स (Linux) किन प्रयोग गरिन्छ?",
    options: [
      "Due to exceptional stability, high security, open-source flexibility, and low resource overhead",
      "Because Microsoft banned Windows on servers",
      "Because Linux requires 100 times more expensive licenses",
      "Because Linux only runs on mobile batteries"
    ],
    answer: 0,
    explanation: "Linux provides incredible uptime reliability, modular security, scriptability, and zero licensing fees for servers.",
    explanationNe: "लिनक्स अत्यन्त सुरक्षित, भरपर्दो (ह्याङ नहुने), निःशुल्क र शक्तिशाली भएकाले सर्भरहरूमा प्रयोग हुन्छ।",
    difficulty: "hard"
  }
];

export const operatingComputerFlashcards: FlashcardItem[] = [
  {
    id: "fc-m2-01",
    frontEn: "Desktop",
    frontNe: "डेस्कटप (Desktop)",
    backEn: "The primary working screen area displayed upon turning on and logging into a computer.",
    backNe: "कम्प्युटर खुलेपछि स्क्रिनमा देखिने मुख्य कार्यक्षेत्र वा पृष्ठभूमि।"
  },
  {
    id: "fc-m2-02",
    frontEn: "Taskbar",
    frontNe: "टास्कबार (Taskbar)",
    backEn: "The horizontal strip at the bottom of the screen holding the Start Menu, open application buttons, and system tray.",
    backNe: "स्क्रिनको तल्लो भागमा रहने लामो पट्टी जहाँ स्टार्ट मेनु, खुला एपहरू र घडी देखिन्छन्।"
  },
  {
    id: "fc-m2-03",
    frontEn: "Left Click",
    frontNe: "लेफ्ट क्लिक (Left Click)",
    backEn: "Clicking the left mouse button once to select an icon, place text cursor, or click a button.",
    backNe: "देब्रे बटन एक पटक थिचेर कुनै वस्तु छनोट गर्ने वा कर्सर राख्ने कार्य।"
  },
  {
    id: "fc-m2-04",
    frontEn: "Double Click",
    frontNe: "डबल क्लिक (Double Click)",
    backEn: "Pressing the left mouse button twice in rapid succession to launch an application or open a file.",
    backNe: "देब्रे बटनलाई छिटो-छिटो दुई पटक थिचेर कुनै सफ्टवेयर वा फाइल खोल्ने तरिका।"
  },
  {
    id: "fc-m2-05",
    frontEn: "Right Click",
    frontNe: "राइट क्लिक (Right Click)",
    backEn: "Clicking the right mouse button to open a context menu of helpful action options.",
    backNe: "दायाँ बटन थिचेर थप विकल्पहरूको मेनु (Copy, Paste, Delete, Properties) खोल्ने काम।"
  },
  {
    id: "fc-m2-06",
    frontEn: "Drag and Drop",
    frontNe: "ड्र्याग एन्ड ड्रप (Drag & Drop)",
    backEn: "Holding down the mouse button while dragging an object to a new location, then releasing.",
    backNe: "माउस थिचेर फाइललाई तानेर अर्को फोल्डर वा ठाउँमा लगेर छोड्ने प्रक्रिया।"
  },
  {
    id: "fc-m2-07",
    frontEn: "Enter Key",
    frontNe: "इन्टर की (Enter Key)",
    backEn: "Executes commands, submits form inputs, and starts a new line in text editors.",
    backNe: "आदेश कार्यान्वयन गर्न वा लेख्दा नयाँ अनुच्छेद (लाइन) सुरु गर्न प्रयोग गरिने की।"
  },
  {
    id: "fc-m2-08",
    frontEn: "Spacebar",
    frontNe: "स्पेसबार (Spacebar)",
    backEn: "The longest horizontal key that inserts a single blank space between words.",
    backNe: "किबोर्डको सबैभन्दा लामो की जसले शब्दहरू बिच खाली ठाउँ (स्पेस) राख्छ।"
  },
  {
    id: "fc-m2-09",
    frontEn: "Backspace Key",
    frontNe: "ब्याकस्पेस की (Backspace)",
    backEn: "Erases the text character directly to the LEFT of the blinking cursor.",
    backNe: "कर्सरको देब्रेपट्टि (पछाडि) रहेको अक्षर मेटाउने की।"
  },
  {
    id: "fc-m2-10",
    frontEn: "Delete Key (Del)",
    frontNe: "डिलिट की (Delete)",
    backEn: "Erases the text character to the RIGHT of the cursor or removes selected files.",
    backNe: "कर्सरको दायाँपट्टि (अगाडि) रहेको अक्षर मेटाउने वा छानिएको फाइल हटाउने की।"
  },
  {
    id: "fc-m2-11",
    frontEn: "Shift Key",
    frontNe: "सिफ्ट की (Shift)",
    backEn: "Modifier key used to type uppercase letters and top symbols on number keys.",
    backNe: "ठूलो (Capital) अक्षर टाइप गर्न वा नम्बर माथिका चिन्हहरू निकाल्न थिचिने की।"
  },
  {
    id: "fc-m2-12",
    frontEn: "Ctrl + C",
    frontNe: "Ctrl + C (कपी सर्टकट)",
    backEn: "Copies selected text, images, or files to the temporary clipboard buffer.",
    backNe: "छानिएको अक्षर वा फाइलको प्रतिलिपि (Copy) बनाउने सर्टकट।"
  },
  {
    id: "fc-m2-13",
    frontEn: "Ctrl + V",
    frontNe: "Ctrl + V (पेस्ट सर्टकट)",
    backEn: "Pastes previously copied or cut items into the target location.",
    backNe: "कपी वा कट गरिएको वस्तुलाई छानेको ठाउँमा टाँस्ने (Paste गर्ने) सर्टकट।"
  },
  {
    id: "fc-m2-14",
    frontEn: "Ctrl + Z",
    frontNe: "Ctrl + Z (अनडू सर्टकट)",
    backEn: "Reverses your most recent action, mistake, or accidental deletion (Undo).",
    backNe: "भर्खरै भएको गल्ती वा मेटिएको कुरा तत्काल फिर्ता ल्याउने (Undo गर्ने) सर्टकट।"
  },
  {
    id: "fc-m2-15",
    frontEn: "Ctrl + S",
    frontNe: "Ctrl + S (सेभ सर्टकट)",
    backEn: "Instantly saves the current active document to disk storage.",
    backNe: "चालु रहेको फाइललाई कम्प्युटरमा तुरुन्तै सुरक्षित (Save) गर्ने सर्टकट।"
  },
  {
    id: "fc-m2-16",
    frontEn: "Alt + Tab",
    frontNe: "Alt + Tab (एप्स बदल्ने)",
    backEn: "Switches focus seamlessly between currently open application windows.",
    backNe: "खुला रहेका विन्डोजहरू बीच तुरुन्तै अदलबदल गर्ने सर्टकट।"
  },
  {
    id: "fc-m2-17",
    frontEn: "Windows + D",
    frontNe: "Windows + D (डेस्कटप देखाउने)",
    backEn: "Minimizes all open windows at once to show the clear Desktop.",
    backNe: "सबै खुला झ्यालहरू लुकाएर सिधै डेस्कटपमा पुग्ने सर्टकट।"
  },
  {
    id: "fc-m2-18",
    frontEn: "Minimize Button (−)",
    frontNe: "मिनिमाइज बटन (−)",
    backEn: "Hides the window from screen to the Taskbar while keeping it active.",
    backNe: "एप बन्द नगरी विन्डोलाई स्क्रिनबाट लुकाएर टास्कबारमा राख्ने बटन।"
  },
  {
    id: "fc-m2-19",
    frontEn: "Maximize Button (□)",
    frontNe: "म्याक्सिमाइज बटन (□)",
    backEn: "Expands the active window to fill the entire monitor screen.",
    backNe: "विन्डोलाई पुरै स्क्रिन भरिने गरी ठूलो बनाउने बटन।"
  },
  {
    id: "fc-m2-20",
    frontEn: "Linux Distribution",
    frontNe: "लिनक्स डिस्ट्रिब्युसन (Distro)",
    backEn: "A complete open-source operating system built around the Linux kernel (e.g. Ubuntu, Fedora, Mint).",
    backNe: "लिनक्समा आधारित भएर बनाइएको पूर्ण निःशुल्क अपरेटिङ सिस्टम (जस्तै: Ubuntu, Mint)।"
  }
];

export const operatingComputerKeyTerms: KeyTerm[] = [
  {
    termEn: "Desktop",
    termNe: "डेस्कटप",
    definitionEn: "The primary graphical workspace shown after booting and logging into a computer.",
    definitionNe: "कम्प्युटर खुलेपछि स्क्रिनमा देखिने मुख्य पृष्ठभूमि वा कार्यक्षेत्र।"
  },
  {
    termEn: "Taskbar",
    termNe: "टास्कबार",
    definitionEn: "The horizontal bar along the bottom of the screen displaying running applications, Start button, and system clock.",
    definitionNe: "कम्प्युटरमा चालु रहेका सबै प्रोग्रामहरू र घडी देखाउने तल्लो पट्टी।"
  },
  {
    termEn: "Context Menu",
    termNe: "कन्टेक्स्ट मेनु",
    definitionEn: "A popup menu of relevant actions that appears when you click the right mouse button.",
    definitionNe: "माउसको दायाँ बटन थिच्दा खुल्ने विकल्पहरूको सूची।"
  },
  {
    termEn: "Clipboard",
    termNe: "क्लिपबोर्ड",
    definitionEn: "Temporary computer memory holding text or files that have been copied or cut.",
    definitionNe: "कपी वा कट गरिएका अक्षरहरू अर्को ठाउँमा पेस्ट नगर्दासम्म बस्ने अस्थायी मेमोरी।"
  },
  {
    termEn: "Multitasking",
    termNe: "मल्टिटास्किङ",
    definitionEn: "Running and switching between multiple software programs at the same time.",
    definitionNe: "कम्प्युटरमा एकैपटक धेरै सफ्टवेयरहरू चलाएर काम गर्ने प्रक्रिया।"
  },
  {
    termEn: "Title Bar",
    termNe: "टाइटल बार",
    definitionEn: "The top horizontal bar of a window containing the document title, Minimize, Maximize, and Close buttons.",
    definitionNe: "विन्डोको सबैभन्दा माथिल्लो पट्टी जहाँ फाइलको नाम र कन्ट्रोल बटनहरू हुन्छन्।"
  },
  {
    termEn: "Screenshot",
    termNe: "स्क्रिनसट",
    definitionEn: "A digital photo capturing the visible display of your computer monitor.",
    definitionNe: "कम्प्युटर स्क्रिनमा देखिएको दृश्यको डिजिटल तस्बिर।"
  },
  {
    termEn: "Open Source",
    termNe: "ओपन सोर्स",
    definitionEn: "Software whose underlying code is publicly available for anyone to inspect, modify, and use freely.",
    definitionNe: "यस्तो सफ्टवेयर जसको मुख्य कोड निःशुल्क हेर्न, सच्याउन र प्रयोग गर्न पाइन्छ।"
  }
];

// Lesson 11 (Final Assessment Lesson)
export const operatingComputerLesson11: ComputerSkillLesson = {
  id: 11,
  slug: "module-review-and-assessment",
  moduleNumber: 2,
  moduleTitleEn: "Operating a Computer",
  moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
  lessonNumber: 11,
  titleEn: "Module 2 Review & Final Assessment",
  titleNe: "समग्र समीक्षा र अन्तिम मूल्याङ्कन",
  subtitleEn: "Review core operating skills and complete the comprehensive 20-question bilingual certification assessment.",
  subtitleNe: "सिकेका सीपहरूको समीक्षा गरी २० वटा बहु-वैकल्पिक प्रश्नहरूको अन्तिम मूल्याङ्कन परीक्षा दिनुहोस्।",
  duration: "25 min",
  readTime: "15 min read",
  difficulty: "Beginner",
  summaryEn: "This final review summarizes Desktop management, mouse precision, key functions, essential shortcuts, window controls, and practical computing skills.",
  summaryNe: "यस समीक्षामा डेस्कटप, माउस, किबोर्ड सर्टकट, विन्डोज नियन्त्रण र दैनिक कम्प्युटर सीपहरूको सम्पूर्ण सार समेटिएको छ।",
  sections: [
    {
      id: "summary-review",
      titleEn: "Module 2 Key Takeaways",
      titleNe: "दोस्रो मोड्युलका मुख्य उपलब्धिहरू",
      contentEn: "Congratulations on completing all lessons of Module 2: Operating a Computer! Here is a recap of the essential computing rules:",
      contentNe: "कम्प्युटर सञ्चालन सम्बन्धी दोस्रो मोड्युल सफलतापूर्वक पूरा गर्नुभएकोमा बधाई छ! यहाँ मुख्य नियमहरूको सार प्रस्तुत गरिएको छ:",
      bulletPointsEn: [
        "**Desktop & Taskbar**: The Desktop is your home launchpad; the Taskbar keeps running apps organized at the bottom.",
        "**Mouse Actions**: Left click selects, Double click opens, Right click shows context menus, and Drag-and-drop repositions files.",
        "**Key Controls**: Enter creates lines, Spacebar adds spaces, Backspace deletes left, and Delete erases right.",
        "**Top Shortcuts**: Memorize **Ctrl+C** (Copy), **Ctrl+V** (Paste), **Ctrl+Z** (Undo), **Ctrl+S** (Save), **Alt+Tab** (Switch apps), and **Win+D** (Show desktop).",
        "**Window Management**: Minimize (−) hides to taskbar, Maximize (□) fills screen, and Close (✕) exits the program safely."
      ],
      bulletPointsNe: [
        "**डेस्कटप र टास्कबार**: डेस्कटप मुख्य कार्यक्षेत्र हो र टास्कबारले चलिरहेका सबै एपहरूलाई व्यवस्थित गर्छ।",
        "**माउसका कार्यहरू**: लेफ्ट क्लिकले छान्छ, डबल क्लिकले खोल्छ, राइट क्लिकले मेनु देखाउँछ र ड्र्याग-एन्ड-ड्रपले फाइल सार्छ।",
        "**किबोर्डका मुख्य कीहरू**: Enter ले नयाँ लाइन दिन्छ, Space ले खाली ठाउँ दिन्छ, Backspace ले देब्रे मेटाउँछ र Delete ले दायाँ मेटाउँछ।",
        "**महत्वपूर्ण सर्टकटहरू**: **Ctrl+C** (कपी), **Ctrl+V** (पेस्ट), **Ctrl+Z** (अनडू), **Ctrl+S** (सेभ), **Alt+Tab** (एप्स बदल्ने) र **Win+D** (डेस्कटप देखाउने)।",
        "**विन्डोज नियन्त्रण**: Minimize ले टास्कबारमा लुकाउँछ, Maximize ले स्क्रिन भर्छ र Close ले सफ्टवेयर पूर्णतया बन्द गर्छ।"
      ]
    }
  ],
  flashcards: operatingComputerFlashcards.slice(0, 8),
  quiz: operatingComputerQuizQuestions,
  keyTerms: operatingComputerKeyTerms
};
