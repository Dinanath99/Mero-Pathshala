import { ComputerSkillLesson } from "./computerSkillsData";

export const operatingComputerLessonsPart2: ComputerSkillLesson[] = [
  // Lesson 06
  {
    id: 6,
    slug: "opening-and-managing-applications",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 6,
    titleEn: "Opening, Managing & Closing Applications",
    titleNe: "एप्लिकेसन खोल्ने, व्यवस्थापन गर्ने र बन्द गर्ने",
    subtitleEn: "Understand the clear difference between Applications, Files, and the Operating System.",
    subtitleNe: "एप्लिकेसन, फाइल र अपरेटिङ सिस्टम बिचको भिन्नता र सफ्टवेयर चलाउने तरिका सिक्नुहोस्।",
    duration: "10 min",
    readTime: "8 min read",
    difficulty: "Beginner",
    summaryEn: "Applications are programs designed to perform specific user tasks like typing letters, browsing the web, or editing photos.",
    summaryNe: "एप्लिकेसन भनेको कुनै निश्चित काम (जस्तै: चिठी लेख्ने, इन्टरनेट चलाउने, फोटो सम्पादन गर्ने) गर्न बनाइएका सफ्टवेयर हुन्।",
    sections: [
      {
        id: "app-vs-os-vs-file",
        titleEn: "Distinguishing App vs. OS vs. File",
        titleNe: "एप्लिकेसन, अपरेटिङ सिस्टम र फाइल बिचको भिन्नता",
        contentEn: "To operate computers with confidence, understand these three distinct concepts:",
        contentNe: "कम्प्युटर राम्रोसँग चलाउन यी ३ कुरा बुझ्न जरुरी छ:",
        bulletPointsEn: [
          "**Operating System (OS)**: The master foundation software (e.g. Windows 11, macOS, Ubuntu Linux) that runs the hardware.",
          "**Application (App/Program)**: Specific tools running on top of the OS (e.g. Google Chrome, MS Word, VLC Player).",
          "**Data File**: The document, image, or song you create or save using an app (e.g. `Letter.docx`, `Photo.jpg`, `Budget.xlsx`)."
        ],
        bulletPointsNe: [
          "**अपरेटिङ सिस्टम (OS)**: कम्प्युटरका सबै पार्टपुर्जा चलाउने मुख्य आधार सफ्टवेयर (जस्तै: Windows, macOS, Linux)।",
          "**एप्लिकेसन (App)**: कुनै निश्चित काम गर्न खोलिने सफ्टवेयर (जस्तै: Google Chrome, MS Word, Photoshop)।",
          "**फाइल (File)**: एप्लिकेसन प्रयोग गरेर बनाइएको कागजात वा तस्बिर (जस्तै: `Exam_Routine.pdf`, `Family_Photo.jpg`)।"
        ]
      },
      {
        id: "managing-apps",
        titleEn: "Installing & Closing Apps Safely",
        titleNe: "एपहरू सुरक्षित रूपमा खोल्ने र बन्द गर्ने",
        contentEn: "Always save your current document before closing an app. If an app stops responding (freezes), open **Task Manager (Ctrl + Shift + Esc)** to safely end the task without powering off the machine.",
        contentNe: "कुनै पनि सफ्टवेयर बन्द गर्नुअघि फाइल सेभ गर्नुपर्छ। यदि कुनै एप अड्किएर चलेन भने **Task Manager (Ctrl + Shift + Esc)** खोलेर बन्द गर्न सकिन्छ।"
      }
    ],
    caseStudyEn: "A cyber café manager in Butwal teaches beginners to use the Windows Start search bar: simply press the Windows key, start typing 'Word' or 'Chrome', and press Enter to launch apps in 2 seconds.",
    caseStudyNe: "बुटवलका एक साइबर क्याफे सञ्चालकले नयाँ सिक्नेहरूलाई विन्डोज की थिचेर सिधै नाम (जस्तै: 'Word' वा 'Chrome') टाइप गरी इन्टर गरेर २ सेकेन्डमै एप खोल्ने सजिलो तरिका सिकाउँछन्।",
    flashcards: [
      {
        id: "fc-mod2-10",
        frontEn: "What is an Application?",
        frontNe: "एप्लिकेसन (Application) भनेको के हो?",
        backEn: "An application is a software program designed to help users perform specific tasks, such as browsing the web (Chrome) or writing documents (Word).",
        backNe: "एप्लिकेसन प्रयोगकर्तालाई निश्चित काम गर्न मद्दत गर्ने सफ्टवेयर हो (जस्तै: इन्टरनेट चलाउने Chrome वा लेख्ने Word)।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-6-1",
        question: "Which of the following is an example of an Application (App)?",
        questionNe: "तलका मध्ये कुन एउटा एप्लिकेसन (App) को उदाहरण हो?",
        options: [
          "Google Chrome web browser",
          "Windows 11 Operating System",
          "Intel Core i5 Processor",
          "DDR4 RAM memory"
        ],
        answer: 0,
        explanation: "Google Chrome is an application designed for browsing web pages.",
        explanationNe: "Google Chrome इन्टरनेट चलाउन प्रयोग हुने एप्लिकेसन सफ्टवेयर हो।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Task Manager",
        termNe: "टास्क म्यानेजर",
        definitionEn: "A system utility in Windows that shows running programs, CPU usage, and lets you close frozen apps.",
        definitionNe: "कम्प्युटरमा चालु रहेका सबै सफ्टवेयर र रोकिएका एपहरू बन्द गर्न मद्दत गर्ने टुल।"
      }
    ]
  },

  // Lesson 07
  {
    id: 7,
    slug: "files-menus-and-settings",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 7,
    titleEn: "Files, Menus and System Settings",
    titleNe: "फाइल मेनु, एडिट मेनु र कम्प्युटर सेटिङ्स",
    subtitleEn: "Navigate the standard application menu ribbon (File, Edit, View) and configure basic computer settings.",
    subtitleNe: "सफ्टवेयरका मेनुहरू चलाउने र कम्प्युटरको डिस्प्ले, आवाज, इन्टरनेट सेटिङ्स मिलाउने तरिका सिक्नुहोस्।",
    duration: "10 min",
    readTime: "8 min read",
    difficulty: "Beginner",
    summaryEn: "Menus provide access to commands (New, Open, Save, Print), while Settings allow customization of sound, Wi-Fi, and display.",
    summaryNe: "मेनुबाट फाइल बनाउने र छाप्ने काम गरिन्छ भने सेटिङ्सबाट कम्प्युटरको आवाज, इन्टरनेट र स्क्रिनको प्रकाश मिलाइन्छ।",
    sections: [
      {
        id: "standard-menus",
        titleEn: "The Standard Application Menu Bar",
        titleNe: "सफ्टवेयरको मुख्य मेनु बार",
        contentEn: "Most desktop applications have a top menu bar with universal categories:",
        contentNe: "प्रायः सबै कम्प्युटर सफ्टवेयरको माथि मेनु बार हुन्छ:",
        bulletPointsEn: [
          "**File Menu**: Contains New, Open, Save, Save As, Print, and Exit commands.",
          "**Edit Menu**: Contains Undo, Redo, Cut, Copy, Paste, and Select All commands.",
          "**View Menu**: Adjusts zoom level, page layout, rulers, and full-screen view.",
          "**Help Menu**: Accesses tutorials, user manuals, and version information."
        ],
        bulletPointsNe: [
          "**फाइल मेनु (File)**: नयाँ बनाउने (New), खोल्ने (Open), सेभ गर्ने (Save) र प्रिन्ट गर्ने कमान्डहरू।",
          "**एडिट मेनु (Edit)**: अनडू (Undo), कपी (Copy), कट (Cut) र पेस्ट (Paste) गर्ने विकल्पहरू।",
          "**भ्यु मेनु (View)**: स्क्रिनको साइज (Zoom), लेआउट र रुलर देखाउने/लुकाउने ठाउँ।",
          "**हेल्प मेनु (Help)**: सफ्टवेयर प्रयोग गर्ने नियम र सहायता लिने मेनु।"
        ]
      },
      {
        id: "system-settings",
        titleEn: "Adjusting Everyday System Settings",
        titleNe: "कम्प्युटरका दैनिक सेटिङ्स मिलाउने",
        contentEn: "Press **Windows Key + I** to open Settings. From here you can connect to Wi-Fi networks, pair Bluetooth headphones, adjust screen brightness, set date and time, and check storage space.",
        contentNe: "किबोर्डमा **Win + I** थिचेर सेटिङ्स खोल्न सकिन्छ। यहाँबाट Wi-Fi जोड्ने, स्क्रिनको प्रकाश मिलाउने, ब्लुटुथ जोड्ने र घडी मिलाउने काम गरिन्छ।"
      }
    ],
    caseStudyEn: "In an office in Dharan, an administrative staff member reduced eye strain by enabling Night Light / Warm Display in Windows Settings during evening shifts.",
    caseStudyNe: "धरानको एक कार्यालयमा कर्मचारीले बेलुकी काम गर्दा आँखा नदुखोस् भनेर विन्डोज सेटिङ्सबाट नाइट लाइट (Night Light) अन गरेर काम गर्छन्।",
    flashcards: [
      {
        id: "fc-mod2-11",
        frontEn: "What is the shortcut to open Windows Settings?",
        frontNe: "विन्डोज सेटिङ्स (Settings) खोल्ने सर्टकट के हो?",
        backEn: "Press the Windows Logo Key + I (Win + I).",
        backNe: "किबोर्डमा Windows Key + I थिचेर सेटिङ्स खोलिन्छ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-7-1",
        question: "Which menu category contains the 'Save' and 'Print' options in most applications?",
        questionNe: "प्रायः सबै सफ्टवेयरमा 'Save' र 'Print' विकल्प कुन मेनुभित्र हुन्छ?",
        options: [
          "File menu",
          "Edit menu",
          "Help menu",
          "Format menu"
        ],
        answer: 0,
        explanation: "The File menu universally houses file operations like New, Open, Save, and Print.",
        explanationNe: "फाइल मेनु (File Menu) भित्र New, Open, Save, र Print जस्ता मुख्य विकल्पहरू हुन्छन्।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Context Menu",
        termNe: "कन्टेक्स्ट मेनु",
        definitionEn: "The popup list of options that appears when you right-click on any item.",
        definitionNe: "कुनै पनि वस्तुमा माउसको दायाँ बटन थिच्दा खुल्ने विकल्पहरूको सूची।"
      }
    ]
  },

  // Lesson 08
  {
    id: 8,
    slug: "screenshots-and-basic-computer-tasks",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 8,
    titleEn: "Screenshots & Everyday Computer Tasks",
    titleNe: "स्क्रिनसट लिने र दैनिक आधारभूत कार्यहरू",
    subtitleEn: "Master essential daily tasks: Taking screenshots, copy-pasting across apps, web browsing, and locating downloads.",
    subtitleNe: "स्क्रिनसट खिच्ने, इन्टरनेटबाट जानकारी खोज्ने, फाइल डाउनलोड गर्ने र पत्ता लगाउने तरिका सिक्नुहोस्।",
    duration: "12 min",
    readTime: "9 min read",
    difficulty: "Beginner",
    summaryEn: "Capturing screenshots and managing downloads are vital skills for sharing information, studying, and remote work.",
    summaryNe: "स्क्रिनको तस्बिर खिच्ने र डाउनलोड भएका फाइलहरू खोज्ने सीप अनलाइन पढाइ र कार्यालयको काममा दैनिक आवश्यक पर्छ।",
    sections: [
      {
        id: "how-to-screenshot",
        titleEn: "How to Take a Screenshot on Windows & Mac",
        titleNe: "कम्प्युटरमा स्क्रिनसट (Screenshot) लिने तरिका",
        contentEn: "A screenshot captures an exact picture of what is currently on your monitor screen:",
        contentNe: "स्क्रिनमा जे देखिएको छ त्यसको हुबहु फोटो खिच्ने तरिका:",
        bulletPointsEn: [
          "**Windows Snipping Tool Shortcut**: Press **Windows Key + Shift + S**. The screen dims; click and drag over the region you want to capture.",
          "**Full Screen Capture**: Press the **Print Screen (PrtScn)** key to copy the entire screen to your clipboard, then press Ctrl + V to paste it into Word or Paint.",
          "**On Mac**: Press **Command + Shift + 4** to select an area, or **Command + Shift + 3** for full screen."
        ],
        bulletPointsNe: [
          "**विन्डोजमा भाग छानेर स्क्रिनसट**: किबोर्डमा **Win + Shift + S** थिच्नुहोस् र चाहेको भाग माउसले तानेर फोटो खिच्नुहोस्।",
          "**पुरै स्क्रिनको फोटो**: किबोर्डमा **PrtScn (Print Screen)** थिच्नुहोस् र Word वा Paint मा गएर Ctrl + V थिच्नुहोस्।",
          "**म्याक (Mac) मा**: **Cmd + Shift + 4** थिचेर चाहेको भाग छानेर फोटो खिचिन्छ।"
        ]
      },
      {
        id: "locating-downloads",
        titleEn: "Locating Downloaded Files",
        titleNe: "डाउनलोड भएका फाइलहरू फेला पार्ने तरिका",
        contentEn: "Whenever you download a PDF syllabus, SEE result sheet, or image from a web browser, it is automatically saved into your computer's **Downloads** folder (accessible via File Explorer / This PC).",
        contentNe: "इन्टरनेटबाट डाउनलोड गरिएका सबै कागजात, नतिजा वा तस्बिरहरू कम्प्युटरको **Downloads** फोल्डरमा गएर बस्छन्।"
      }
    ],
    caseStudyEn: "A college student in Janakpur takes screenshots of online lecture slides using Win + Shift + S and pastes them directly into their digital study notes in OneNote.",
    caseStudyNe: "जनकपुरका एक विद्यार्थीले अनलाइन क्लासका मुख्य स्लाइडहरू Win + Shift + S बाट स्क्रिनसट लिएर आफ्नो डिजिटल नोटमा तुरुन्तै पेस्ट गर्छन्।",
    flashcards: [
      {
        id: "fc-mod2-12",
        frontEn: "What is the Windows shortcut to take a custom screenshot?",
        frontNe: "विन्डोजमा स्क्रिनसट लिने मुख्य सर्टकट के हो?",
        backEn: "Windows Key + Shift + S opens the Snipping tool to capture any rectangular area.",
        backNe: "Windows Key + Shift + S थिचेर स्क्रिनको चाहेको भागको फोटो खिच्न सकिन्छ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-8-1",
        question: "Where do files downloaded from web browsers usually get saved by default?",
        questionNe: "इन्टरनेटबाट डाउनलोड गरिएका फाइलहरू साधारणतया कुन फोल्डरमा बस्छन्?",
        options: [
          "The Downloads folder",
          "The Recycle Bin",
          "The Windows System32 folder",
          "Inside the computer's monitor"
        ],
        answer: 0,
        explanation: "Web browsers save all incoming files to your user profile's Downloads folder by default.",
        explanationNe: "इन्टरनेटबाट डाउनलोड गरिएका फाइलहरू सिधै 'Downloads' फोल्डरमा सुरक्षित हुन्छन्।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Screenshot",
        termNe: "स्क्रिनसट",
        definitionEn: "A digital image capture of the visible contents of your computer monitor.",
        definitionNe: "कम्प्युटर स्क्रिनमा देखिएको दृश्यको डिजिटल तस्बिर।"
      }
    ]
  },

  // Lesson 09
  {
    id: 9,
    slug: "windows-and-linux-basic-differences",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 9,
    titleEn: "Windows and Linux: Basic Differences",
    titleNe: "विन्डोज र लिनक्स: आधारभूत भिन्नता र प्रयोग",
    subtitleEn: "Understand proprietary commercial software vs open-source operating system families and distributions.",
    subtitleNe: "विन्डोज र लिनक्स (Ubuntu, Fedora, Debian) बिचका मुख्य विशेषता र प्रयोग क्षेत्रहरू बुझ्नुहोस्।",
    duration: "10 min",
    readTime: "8 min read",
    difficulty: "Beginner",
    summaryEn: "Windows is widely used for office and personal desktop computing, while Linux is a family of open-source distributions powering servers, development, and supercomputers.",
    summaryNe: "विन्डोज व्यक्तिगत र कार्यालयको काममा धेरै चल्छ भने लिनक्स निःशुल्क र खुला सफ्टवेयर प्रणाली हो जुन सर्भर, प्रोग्रामिङ र इन्टरनेट चलाउन प्रयोग हुन्छ।",
    sections: [
      {
        id: "windows-overview",
        titleEn: "Microsoft Windows",
        titleNe: "माइक्रोसफ्ट विन्डोज (Microsoft Windows)",
        contentEn: "Developed by Microsoft, Windows (e.g. Windows 10, Windows 11) is the most popular desktop operating system worldwide. It provides broad commercial software compatibility (MS Office, Adobe Creative Cloud, PC games) and runs on PCs from HP, Dell, Lenovo, Asus, and Acer.",
        contentNe: "विन्डोज संसारमै सबैभन्दा धेरै प्रयोग हुने व्यक्तिगत कम्प्युटर प्रणाली हो। यसमा अफिस, गेम र प्रायः सबै व्यावसायिक सफ्टवेयरहरू सजिलै चल्छन्।"
      },
      {
        id: "linux-overview",
        titleEn: "Linux Operating System Family",
        titleNe: "लिनक्स (Linux) प्रणाली र डिस्ट्रिब्युसनहरू",
        contentEn: "Linux is not a single commercial product created by one company; it is an open-source operating system kernel created by Linus Torvalds. Different organizations release complete, usable distributions ('Distros'):",
        contentNe: "लिनक्स कुनै एउटा कम्पनीको मात्र सफ्टवेयर होइन; यो निःशुल्क र खुला स्रोत (Open-Source) प्रणाली हो। यसका विभिन्न रूपहरू (Distributions) उपलब्ध छन्:",
        bulletPointsEn: [
          "**Ubuntu**: Extremely user-friendly, popular for beginners, schools, and developers.",
          "**Fedora & Debian**: Robust, stable distributions widely used by software engineers and IT professionals.",
          "**Linux Mint**: Designed to feel familiar and comfortable to former Windows users.",
          "**Servers & Supercomputers**: Linux powers over 90% of the world's cloud servers, Google, NASA, and Android phones."
        ],
        bulletPointsNe: [
          "**Ubuntu**: चलाउन सजिलो र नयाँ सिक्नेहरू तथा विद्यार्थीहरूका लागि लोकप्रिय लिनक्स।",
          "**Debian र Fedora**: इन्जिनियरहरू र आईटी क्षेत्रमा प्रयोग हुने अत्यन्त भरपर्दो प्रणाली।",
          "**Linux Mint**: विन्डोज जस्तै देखिने र चलाउन सजिलो इन्टरफेस भएको लिनक्स।",
          "**सर्भर र स्मार्टफोन**: संसारका ९०% भन्दा बढी इन्टरनेट सर्भरहरू र एन्ड्रोइड फोन लिनक्समा आधारित छन्।"
        ]
      }
    ],
    misconceptions: [
      {
        mythEn: "Linux is only a black-and-white text screen and has no graphical interface.",
        mythNe: "लिनक्स भनेको कालो स्क्रिनमा कोड मात्र लेख्ने ठाउँ हो, त्यसमा माउस चल्दैन।",
        realityEn: "Modern Linux distributions like Ubuntu and Linux Mint feature gorgeous, modern graphical desktop interfaces with icons, windows, web browsers, and media players just like Windows and macOS.",
        realityNe: "आधुनिक लिनक्स (जस्तै: Ubuntu) मा विन्डोज जस्तै सुन्दर ग्राफिक्स, आइकन, माउस र विन्डोजहरू हुन्छन्।"
      }
    ],
    caseStudyEn: "A software development academy in Kathmandu runs Ubuntu Linux on all student lab workstations, saving licensing costs while providing students with powerful built-in programming tools.",
    caseStudyNe: "काठमाडौँको एक सफ्टवेयर एकेडेमीले आफ्ना सबै कम्प्युटरमा Ubuntu Linux राखेर लाइसेन्स खर्च बचाउँदै विद्यार्थीहरूलाई प्रोग्रामिङ सिकाउँछ।",
    flashcards: [
      {
        id: "fc-mod2-13",
        frontEn: "What is an Open-Source Operating System?",
        frontNe: "ओपन-सोर्स (Open-Source) अपरेटिङ सिस्टम भनेको के हो?",
        backEn: "An operating system (like Linux) whose source code is publicly accessible, free to inspect, modify, and distribute without expensive licensing fees.",
        backNe: "यस्तो सफ्टवेयर (जस्तै: Linux) जसको मुख्य कोड निःशुल्क हेर्न, सुधार गर्न र प्रयोग गर्न पाइन्छ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-9-1",
        question: "Which of the following is a popular beginner-friendly Linux distribution?",
        questionNe: "तलका मध्ये कुन नयाँ प्रयोगकर्ताका लागि सजिलो लिनक्स (Linux) को उदाहरण हो?",
        options: [
          "Ubuntu",
          "Microsoft Word",
          "Intel Core i7",
          "Google Chrome"
        ],
        answer: 0,
        explanation: "Ubuntu is one of the most widely used and user-friendly Linux distributions.",
        explanationNe: "Ubuntu नयाँ प्रयोगकर्ताका लागि चलाउन निकै सजिलो र लोकप्रिय लिनक्स वितरण हो।",
        difficulty: "medium"
      }
    ],
    keyTerms: [
      {
        termEn: "Linux Distribution (Distro)",
        termNe: "लिनक्स डिस्ट्रिब्युसन",
        definitionEn: "A complete operating system package built on top of the Linux kernel (e.g. Ubuntu, Fedora, Mint).",
        definitionNe: "लिनक्स कर्नेलमा आधारित भएर बनाइएको पूर्ण अपरेटिङ सिस्टम प्याकेज।"
      }
    ]
  },

  // Lesson 10
  {
    id: 10,
    slug: "everyday-computer-practice",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 10,
    titleEn: "Everyday Computer Practice: 10 Practical Tasks",
    titleNe: "दैनिक कम्प्युटर अभ्यास: १० मुख्य कार्यहरू",
    subtitleEn: "Take on the practical mission: 'Complete Your First 10 Computer Tasks' to build true hands-on fluency.",
    subtitleNe: "दैनिक जीवनमा कम्प्युटर चलाउँदा आवश्यक पर्ने १० मुख्य कार्यहरू पालैपालो अभ्यास गरी आत्मविश्वास बढाउनुहोस्।",
    duration: "15 min",
    readTime: "10 min read",
    difficulty: "Beginner",
    summaryEn: "Putting knowledge into practice transforms beginners into confident, self-reliant computer operators.",
    summaryNe: "सिकेका सीपहरूलाई व्यवहारमा अभ्यास गर्दा कम्प्युटर चलाउने आत्मविश्वास र दक्षता बढ्छ।",
    sections: [
      {
        id: "the-10-tasks-mission",
        titleEn: "Your 10 Practical Computing Milestones",
        titleNe: "तपाईंका १० वटा आधारभूत कम्प्युटर सीपहरू",
        contentEn: "Complete these 10 practical steps to ensure you are fully prepared for everyday digital study and work:",
        contentNe: "दैनिक कार्यालय र अध्ययनमा चाहिने यी १० कार्यहरू पूरा गर्नुहोस्:",
        bulletPointsEn: [
          "**Task 1: Launch an App**: Open Notepad or a Text Editor from the Start search.",
          "**Task 2: Type Text**: Write three sentences with punctuation and capital letters.",
          "**Task 3: Copy Text**: Highlight the sentence and press **Ctrl + C**.",
          "**Task 4: Paste Text**: Move cursor to a new line and press **Ctrl + V**.",
          "**Task 5: Save File**: Press **Ctrl + S** and name your file `MyPracticeNotes.txt`.",
          "**Task 6: Take a Screenshot**: Capture the editor window using **Win + Shift + S**.",
          "**Task 7: Launch Web Browser**: Open Chrome or Firefox to search a question.",
          "**Task 8: Switch Apps**: Press **Alt + Tab** to jump smoothly between Browser and Notepad.",
          "**Task 9: Locate Downloads**: Open File Explorer and inspect your Downloads folder.",
          "**Task 10: Close Safely**: Click the **Close [X]** button to finish your session cleanly."
        ],
        bulletPointsNe: [
          "**कार्य १: एप खोल्ने**: स्टार्ट मेनुबाट Notepad वा Text Editor खोल्नुहोस्।",
          "**कार्य २: टाइप गर्ने**: किबोर्डको सहायताले ३ वटा पूर्ण वाक्यहरू टाइप गर्नुहोस्।",
          "**कार्य ३: कपी गर्ने**: टाइप गरेका अक्षर छानेर **Ctrl + C** थिच्नुहोस्।",
          "**कार्य ४: पेस्ट गर्ने**: नयाँ लाइनमा गएर **Ctrl + V** थिचेर टाँस्नुहोस्।",
          "**कार्य ५: सेभ गर्ने**: **Ctrl + S** थिचेर फाइललाई सुरक्षित गर्नुहोस्।",
          "**कार्य ६: स्क्रिनसट लिने**: **Win + Shift + S** थिचेर स्क्रिनको फोटो खिच्नुहोस्।",
          "**कार्य ७: इन्टरनेट खोल्ने**: वेब ब्राउजर खोलेर कुनै जानकारी खोज्नुहोस्।",
          "**कार्य ८: एप्स बदल्ने**: **Alt + Tab** थिचेर खुला रहेका एपहरू बीच अदलबदल गर्नुहोस्।",
          "**कार्य ९: डाउनलोड खोज्ने**: फाइल एक्स्प्लोरर खोलेर Downloads फोल्डर हेर्नुहोस्।",
          "**कार्य १०: सुरक्षित बन्द गर्ने**: काम सकिएपछि **[X]** बटन थिचेर विन्डो बन्द गर्नुहोस्।"
        ]
      }
    ],
    caseStudyEn: "A high school student in Hetauda mastered all 10 tasks in a single afternoon, allowing them to type their school project, download reference images, and organize their study materials independently.",
    caseStudyNe: "हेटौँडाका एक विद्यार्थीले एकै दिनमा यी १० वटा कार्यहरू अभ्यास गरेपछि आफ्नो विद्यालयको प्रोजेक्ट आफैं टाइप गर्न र फाइल व्यवस्थापन गर्न सक्षम भए।",
    flashcards: [
      {
        id: "fc-mod2-14",
        frontEn: "How do you switch between open applications quickly?",
        frontNe: "खुला रहेका एपहरू बीच कसरी छिटो अदलबदल गरिन्छ?",
        backEn: "Hold down the Alt key and press Tab (Alt + Tab).",
        backNe: "किबोर्डमा Alt थिचिराखेर Tab थिच्दा (Alt + Tab) खुला रहेका एपहरू देखिन्छन्।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-10-1",
        question: "Which keyboard shortcut lets you switch between open windows without using the mouse?",
        questionNe: "माउस नचलाईकन खुला रहेका विन्डोजहरू बदल्न कुन सर्टकट प्रयोग गरिन्छ?",
        options: [
          "Alt + Tab",
          "Ctrl + P",
          "Shift + Delete",
          "Caps Lock"
        ],
        answer: 0,
        explanation: "Alt + Tab displays all active windows and switches focus seamlessly.",
        explanationNe: "Alt + Tab ले चालु रहेका विन्डोजहरू देखाउँछ र सजिलै अर्को एपमा पुर्‍याउँछ।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Multitasking",
        termNe: "मल्टिटास्किङ",
        definitionEn: "Running and switching between multiple software applications at the same time.",
        definitionNe: "कम्प्युटरमा एकैपटक धेरै सफ्टवेयरहरू चलाउने र काम गर्ने प्रक्रिया।"
      }
    ]
  }
];
