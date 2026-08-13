import { ComputerSkillLesson } from "./computerSkillsData";

export const operatingComputerLessonsPart1: ComputerSkillLesson[] = [
  // Lesson 01
  {
    id: 1,
    slug: "understanding-the-desktop",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 1,
    titleEn: "Understanding the Desktop Workspace",
    titleNe: "डेस्कटप बुझ्ने र चलाउने तरिका",
    subtitleEn: "Learn the core visual elements: Desktop, Icons, Taskbar, Start Menu, Search, and System Tray.",
    subtitleNe: "डेस्कटप, आइकन, टास्कबार, स्टार्ट मेनु, सर्च र सिस्टम ट्रे जस्ता मुख्य भागहरू सरल तरिकाले बुझ्नुहोस्।",
    duration: "8 min",
    readTime: "7 min read",
    difficulty: "Beginner",
    summaryEn: "The desktop is your computer's main home workspace screen, serving as the starting launchpad for all apps, files, and settings.",
    summaryNe: "कम्प्युटर सुरु हुने बित्तिकै देखिने मुख्य स्क्रिनलाई डेस्कटप भनिन्छ, जहाँबाट सम्पूर्ण फाइल र सफ्टवेयरहरू खोल्न सकिन्छ।",
    sections: [
      {
        id: "what-is-desktop",
        titleEn: "What is the Desktop?",
        titleNe: "डेस्कटप भनेको के हो?",
        contentEn: "When you turn on your computer and log in, the primary screen that appears is called the **Desktop**. Just like a physical wooden study desk where you keep books, pens, and notepads, your digital computer desktop is where you place program shortcuts, active project folders, and files for fast everyday access.",
        contentNe: "कम्प्युटर अन गरेपछि स्क्रिनमा देखिने मुख्य पृष्ठभूमिलाई **डेस्कटप (Desktop)** भनिन्छ। जसरी हाम्रो पढ्ने काठको टेबलमा किताब, कलम र कापी राखिन्छ, त्यसरी नै डिजिटल डेस्कटपमा पनि हामीलाई दैनिक आवश्यक पर्ने सफ्टवेयर र फाइलहरू राखिन्छ।"
      },
      {
        id: "desktop-components",
        titleEn: "Core Components of the Desktop Screen",
        titleNe: "डेस्कटपका मुख्य भागहरू",
        contentEn: "Every modern operating system desktop (Windows, macOS, Linux) consists of distinct functional zones:",
        contentNe: "प्रत्येक आधुनिक कम्प्युटरको डेस्कटपमा निम्न मुख्य भागहरू हुन्छन्:",
        bulletPointsEn: [
          "**Wallpaper / Desktop Background**: The visual background picture covering the screen.",
          "**Desktop Icons**: Small clickable graphical symbols representing software apps, folders, and files.",
          "**The Taskbar**: The horizontal navigation bar located along the bottom edge of the screen.",
          "**The Start Menu Button**: The main hub button (usually on the bottom-left or center) to browse all installed programs.",
          "**System Search Bar**: Instant search tool to find documents, apps, and web answers in seconds.",
          "**System Tray / Notification Area**: The bottom-right corner displaying clock, calendar, Wi-Fi status, battery, and sound volume."
        ],
        bulletPointsNe: [
          "**वालपेपर (Wallpaper)**: डेस्कटपको पृष्ठभूमिमा देखिने तस्बिर वा रङ्ग।",
          "**आइकनहरू (Desktop Icons)**: सफ्टवेयर, फोल्डर वा फाइललाई प्रतिनिधित्व गर्ने साना चित्रहरू।",
          "**टास्कबार (Taskbar)**: स्क्रिनको तल्लो भागमा रहने लामो पट्टी, जहाँ चालु रहेका एपहरू देखिन्छन्।",
          "**स्टार्ट मेनु (Start Menu)**: कम्प्युटरका सम्पूर्ण प्रोग्रामहरू खोज्न र खोल्न प्रयोग गरिने मुख्य बटन।",
          "**सर्च बक्स (Search Bar)**: कम्प्युटरभित्र रहेका फाइल वा सफ्टवेयर तुरुन्तै खोज्ने ठाउँ।",
          "**सिस्टम ट्रे (System Tray)**: स्क्रिनको तल दायाँ कुनामा घडी, मिति, इन्टरनेट (Wi-Fi), ब्याट्री र आवाज नियन्त्रण गर्ने भाग।"
        ]
      }
    ],
    diagrams: [
      {
        step: "Zone 1",
        titleEn: "Desktop Icons",
        titleNe: "डेस्कटप आइकनहरू",
        descEn: "Clickable shortcuts for apps and files",
        descNe: "एप र फाइल खोल्ने साना सर्टकट चित्रहरू",
        icon: "Layout"
      },
      {
        step: "Zone 2",
        titleEn: "Start Menu",
        titleNe: "स्टार्ट मेनु",
        descEn: "Access all installed apps & power settings",
        descNe: "कम्प्युटरका सम्पूर्ण सफ्टवेयर र बन्द गर्ने बटन",
        icon: "AppWindow"
      },
      {
        step: "Zone 3",
        titleEn: "Taskbar",
        titleNe: "टास्कबार",
        descEn: "Shows all active running applications",
        descNe: "हाल चलिरहेका सबै एप्लिकेसनहरू देखाउने पट्टी",
        icon: "Layers"
      },
      {
        step: "Zone 4",
        titleEn: "System Tray",
        titleNe: "सिस्टम ट्रे",
        descEn: "Clock, Wi-Fi, Sound, & Notifications",
        descNe: "घडी, इन्टरनेट, आवाज र सूचना देखाउने भाग",
        icon: "Settings"
      }
    ],
    misconceptions: [
      {
        mythEn: "Deleting a desktop icon permanently deletes the program from the computer.",
        mythNe: "डेस्कटपको आइकन डिलिट गर्दा कम्प्युटरबाट पुरै सफ्टवेयर हट्छ।",
        realityEn: "Most desktop icons are only shortcuts (pointers). Deleting an icon usually just removes the shortcut, while the actual application remains safely installed in your system drive.",
        realityNe: "डेस्कटपका धेरैजसो आइकनहरू सर्टकट मात्र हुन्। आइकन हटाउँदैमा भित्रको मुख्य सफ्टवेयर डिलिट हुँदैन।"
      }
    ],
    caseStudyEn: "In an administrative bank branch in Kathmandu, an officer keeps only 5 essential daily shortcuts on their desktop (Core Banking, Spreadsheet, Email, Scanner, and Reports folder) to maintain a fast, clean, distraction-free digital workplace.",
    caseStudyNe: "काठमाडौँको एक बैंक शाखामा कर्मचारीले आफ्नो डेस्कटपमा दैनिक चाहिने ५ वटा मुख्य सर्टकट (बैंकिङ सफ्टवेयर, एक्सेल, इमेल, स्क्यानर र रिपोर्ट फोल्डर) मात्र राखेर सफा र छिटो काम गर्ने वातावरण बनाएका छन्।",
    flashcards: [
      {
        id: "fc-mod2-01",
        frontEn: "What is the Taskbar?",
        frontNe: "टास्कबार (Taskbar) भनेको के हो?",
        backEn: "The Taskbar is the horizontal strip at the bottom of the screen displaying the Start button, pinned applications, active running windows, and the system clock.",
        backNe: "टास्कबार स्क्रिनको तल्लो भागमा रहने लामो पट्टी हो, जहाँ स्टार्ट बटन, खुला रहेका एपहरू र घडी देखिन्छ।"
      },
      {
        id: "fc-mod2-02",
        frontEn: "What is a Desktop Shortcut Icon?",
        frontNe: "सर्टकट आइकन भनेको के हो?",
        backEn: "A small graphical link with a tiny arrow that lets you quickly launch an application or open a file without searching through deep folders.",
        backNe: "कम्प्युटरको कुनै पनि सफ्टवेयर वा फाइललाई गहिरो फोल्डरमा नखोजिकन एकै क्लिकमा खोल्न बनाइएको सानो लिंक आइकन हो।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-1-1",
        question: "Where is the System Tray (showing clock, Wi-Fi, and volume) usually located?",
        questionNe: "घडी, Wi-Fi र आवाज देखाउने सिस्टम ट्रे साधारणतया कहाँ हुन्छ?",
        options: [
          "At the bottom-right corner of the taskbar",
          "In the center of the monitor screen",
          "Inside the computer's CPU casing",
          "At the top of web pages only"
        ],
        answer: 0,
        explanation: "The system tray notification area is located at the bottom-right of the desktop taskbar.",
        explanationNe: "सिस्टम ट्रे डेस्कटपको टास्कबारको तल दायाँ कुनामा अवस्थित हुन्छ।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Desktop",
        termNe: "डेस्कटप",
        definitionEn: "The primary working screen display shown after booting and logging into a computer.",
        definitionNe: "कम्प्युटर खुलेपछि स्क्रिनमा देखिने मुख्य कार्यक्षेत्र वा पृष्ठभूमि।",
        exampleEn: "Saving an urgent report directly to Desktop for quick access."
      },
      {
        termEn: "Taskbar",
        termNe: "टास्कबार",
        definitionEn: "The bottom system bar holding running programs, start menu, and notification area.",
        definitionNe: "कम्प्युटरमा चालु रहेका सबै प्रोग्रामहरू देखाउने तल्लो पट्टी।"
      }
    ]
  },

  // Lesson 02
  {
    id: 2,
    slug: "using-the-mouse-and-touchpad",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 2,
    titleEn: "Using the Mouse & Laptop Touchpad",
    titleNe: "माउस र टचप्याडको सही प्रयोग",
    subtitleEn: "Master essential hand gestures: Left click, Right click, Double click, Scroll wheel, and Drag-and-drop.",
    subtitleNe: "लेफ्ट क्लिक, राइट क्लिक, डबल क्लिक, स्क्रोलिङ र ड्र्याग-एन्ड-ड्रप जस्ता आधारभूत माउस सीपहरू सिक्नुहोस्।",
    duration: "10 min",
    readTime: "8 min read",
    difficulty: "Beginner",
    summaryEn: "The mouse and touchpad allow you to point, select, open, and move graphical items on screen with precision.",
    summaryNe: "माउस र टचप्याडको मद्दतले स्क्रिनमा रहेका कुनै पनि वस्तु छनोट गर्न, खोल्न र सार्न सकिन्छ।",
    sections: [
      {
        id: "mouse-actions",
        titleEn: "The 5 Fundamental Mouse Actions",
        titleNe: "माउसका ५ मुख्य कार्यहरू",
        contentEn: "Learning to control the on-screen mouse pointer (cursor) requires mastering five distinct physical movements:",
        contentNe: "स्क्रिनमा देखिने माउसको पोइन्टर (तीर) चलाउन ५ वटा मुख्य कार्यहरू जान्नुपर्छ:",
        bulletPointsEn: [
          "**Left Click (Primary Click)**: Pressing the left button once to select an icon, place a text cursor, or activate a button.",
          "**Double Click**: Pressing the left button twice rapidly in quick succession to open an application, document, or folder.",
          "**Right Click (Secondary Click)**: Pressing the right button once to open a context menu of helpful options (e.g. Copy, Paste, Rename, Properties).",
          "**Scroll Wheel**: Rolling the center wheel forward or backward to smoothly scroll through long web pages, PDF books, and documents.",
          "**Drag and Drop**: Holding down the left button while moving the mouse to reposition a window or move a file into a folder, then releasing."
        ],
        bulletPointsNe: [
          "**लेफ्ट क्लिक (Left Click)**: देब्रे बटन एक पटक थिचेर कुनै पनि वस्तु छनोट गर्ने वा बटन दबाउने।",
          "**डबल क्लिक (Double Click)**: देब्रे बटनलाई छिटो-छिटो दुई पटक थिचेर कुनै फाइल, फोल्डर वा सफ्टवेयर खोल्ने।",
          "**राइट क्लिक (Right Click)**: दायाँ बटन एक पटक थिचेर थप विकल्पहरूको मेनु (Copy, Paste, Delete, Properties) खोल्ने।",
          "**स्क्रोल ह्वील (Scroll Wheel)**: बिचको पाङ्ग्रा अगाडि-पछाडि घुमाएर लामो वेबपेज वा डकुमेन्ट तल-माथि सार्ने।",
          "**ड्र्याग एन्ड ड्रप (Drag and Drop)**: देब्रे बटन थिचिराखेर फाइललाई तानेर अर्को ठाउँ वा फोल्डरमा पुर्‍याएर छोड्ने।"
        ]
      },
      {
        id: "touchpad-gestures",
        titleEn: "Laptop Touchpad Gestures",
        titleNe: "ल्यापटपको टचप्याड चलाउने तरिका",
        contentEn: "On laptops, the rectangular touchpad replaces a physical mouse:",
        contentNe: "ल्यापटपमा छुट्टै माउस नजोडीकन हातको औंलाले टचप्याड चलाइन्छ:",
        bulletPointsEn: [
          "**One Finger Tap**: Acts as a standard Left Click.",
          "**Two Finger Tap**: Acts as a Right Click (opens context menu).",
          "**Two Finger Slide Up/Down**: Smoothly scrolls web pages and documents.",
          "**Pinch to Zoom**: Moving two fingers together or apart to zoom in or out on photos and maps."
        ],
        bulletPointsNe: [
          "**एउटा औंलाले ट्याप गर्ने**: साधारण लेफ्ट क्लिक सरह काम गर्छ।",
          "**दुईवटा औंलाले एकैपटक ट्याप गर्ने**: राइट क्लिक (मेनु) खुल्छ।",
          "**दुईवटा औंला माथि-तल सार्ने**: पेज स्क्रोल (तल-माथि) हुन्छ।",
          "**दुई औंला खुम्च्याउने वा फैलाउने**: फोटो वा नक्सा जुम (Zoom In / Zoom Out) हुन्छ।"
        ]
      }
    ],
    misconceptions: [
      {
        mythEn: "You need to press the mouse buttons very hard to make them register.",
        mythNe: "माउसको बटन काम गर्न निकै जोडले दबाउनुपर्छ।",
        realityEn: "Computer mice use sensitive micro-switches. A light, relaxed click is all that is needed. Pressing too hard causes hand fatigue and damages the hardware.",
        realityNe: "माउसमा निकै संवेदनशील स्विच हुन्छ। हल्का र आरामदायी तरिकाले एक पटक क्लिक गर्दा नै कम्प्युटरले आदेश पाउँछ।"
      }
    ],
    caseStudyEn: "A school student in Pokhara was struggling to open desktop programs because they were clicking too slowly. Once they practiced the quick 'tap-tap' rhythm of double clicking, opening apps became effortless.",
    caseStudyNe: "पोखराका एक विद्यार्थीले माउस धेरै ढिलो थिच्दा फाइल खुल्दैनथ्यो। छिटो-छिटो दुई पटक 'ट्याप-ट्याप' गर्ने तरिका सिकेपछि उनले सजिलै सफ्टवेयर खोल्न सके।",
    flashcards: [
      {
        id: "fc-mod2-03",
        frontEn: "What does Right-Clicking do?",
        frontNe: "माउसको राइट क्लिक (Right-Click) ले के गर्छ?",
        backEn: "Right-clicking opens a context menu displaying specific actions available for the clicked item (such as Copy, Rename, Delete, or Properties).",
        backNe: "राइट क्लिकले उक्त वस्तुसँग सम्बन्धित थप विकल्पहरूको मेनु (जस्तै: Copy, Rename, Delete) खोल्छ।"
      },
      {
        id: "fc-mod2-04",
        frontEn: "How do you scroll with a laptop touchpad?",
        frontNe: "टचप्याडमा कसरी स्क्रोल गरिन्छ?",
        backEn: "Place two fingers gently on the touchpad and slide them together up or down.",
        backNe: "टचप्याडमा दुईवटा औंला राखेर एकैसाथ माथि वा तल सारेर स्क्रोल गरिन्छ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-2-1",
        question: "Which mouse action is used to open a desktop folder or launch an application?",
        questionNe: "डेस्कटपको कुनै फोल्डर वा सफ्टवेयर खोल्न कुन माउस कार्य गरिन्छ?",
        options: [
          "Double-click the Left button rapidly",
          "Press the mouse wheel once",
          "Right-click three times",
          "Drag the mouse off the table"
        ],
        answer: 0,
        explanation: "Double-clicking (two quick left clicks) is the universal command to open files, folders, and applications.",
        explanationNe: "देब्रे बटनलाई छिटो-छिटो दुई पटक क्लिक (Double Click) गरेर फोल्डर वा एप खोलिन्छ।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Cursor / Pointer",
        termNe: "कर्सर / पोइन्टर",
        definitionEn: "The on-screen arrow or icon that moves corresponding to mouse or touchpad motion.",
        definitionNe: "माउस चलाउँदा स्क्रिनमा सँगसँगै सर्ने तीर वा चिन्ह।"
      }
    ]
  },

  // Lesson 03
  {
    id: 3,
    slug: "using-the-keyboard",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 3,
    titleEn: "Using the Keyboard & Key Categories",
    titleNe: "किबोर्ड र महत्वपूर्ण की (Keys) हरूको प्रयोग",
    subtitleEn: "Master Alphabet keys, Number rows, Spacebar, Enter, Backspace vs Delete, Shift, and Escape.",
    subtitleNe: "अक्षर, नम्बर, स्पेसबार, इन्टर, ब्याकस्पेस, डिलिट, सिफ्ट र इस्केप कीहरूको सही प्रयोग सिक्नुहोस्।",
    duration: "12 min",
    readTime: "9 min read",
    difficulty: "Beginner",
    summaryEn: "The keyboard is your primary text input and command tool. Understanding key layout boosts typing confidence.",
    summaryNe: "किबोर्ड कम्प्युटरमा लेख्न र आदेश दिन प्रयोग हुने मुख्य उपकरण हो। यसका मुख्य कीहरू बुझ्दा काम छिटो हुन्छ।",
    sections: [
      {
        id: "keyboard-groups",
        titleEn: "Major Groups of Keyboard Keys",
        titleNe: "किबोर्डका मुख्य भागहरू",
        contentEn: "A standard full-size keyboard has around 101 to 104 keys organized into 5 primary zones:",
        contentNe: "साधारण किबोर्डमा करिब १०४ वटा कीहरू हुन्छन्, जसलाई ५ मुख्य समूहमा विभाजन गरिएको हुन्छ:",
        bulletPointsEn: [
          "**Typing (Alphanumeric) Keys**: Letters (A–Z) and Numbers (0–9) for typing text and data.",
          "**Special Action Keys**: **Enter** (confirms action / new line), **Spacebar** (blank space), **Backspace** (deletes left), and **Delete** (deletes right).",
          "**Modifier Keys**: **Shift** (capitalizes letters), **Ctrl** (Control), **Alt** (Alternate), and **Windows key** (Opens Start).",
          "**Navigation Keys**: Arrow keys (↑, ↓, ←, →), Home, End, Page Up, and Page Down to move through documents.",
          "**Function Keys (F1–F12)**: Special shortcut keys along the very top row (e.g. F1 for Help, F5 for Refresh)."
        ],
        bulletPointsNe: [
          "**अक्षर र नम्बर कीहरू**: लेख्नका लागि A देखि Z सम्मका अक्षर र ० देखि ९ सम्मका नम्बरहरू।",
          "**विशेष कार्य कीहरू**: **Enter** (स्वीकार गर्ने/नयाँ लाइन), **Spacebar** (खाली ठाउँ), **Backspace** (देब्रेपट्टि मेटाउने), र **Delete** (दायाँपट्टि मेटाउने)।",
          "**मोडिफायर कीहरू**: **Shift** (ठूलो अक्षर निकाल्ने), **Ctrl**, **Alt**, र **Windows key**।",
          "**दिशा (Navigation) कीहरू**: माथि, तल, दायाँ, बायाँ सार्ने एरो कीहरू (↑, ↓, ←, →)।",
          "**फङ्सन कीहरू (F1–F12)**: किबोर्डको सबैभन्दा माथिल्लो लाइनमा रहेका विशेष कीहरू (F1 = Help, F5 = Refresh)।"
        ]
      },
      {
        id: "backspace-vs-delete",
        titleEn: "Backspace vs. Delete: The Critical Difference",
        titleNe: "Backspace र Delete बिचको भिन्नता",
        contentEn: "Beginners often confuse Backspace and Delete:",
        contentNe: "धेरैजसो नयाँ सिक्नेहरूले यी दुईमा झुक्किने गर्छन्:",
        bulletPointsEn: [
          "**Backspace**: Erases the character directly to the **LEFT** (before) the cursor.",
          "**Delete (Del)**: Erases the character directly to the **RIGHT** (after) the cursor, or deletes selected files."
        ],
        bulletPointsNe: [
          "**Backspace**: कर्सर भन्दा **देब्रेपट्टि (पछाडि)** रहेको अक्षर मेटाउँछ।",
          "**Delete**: कर्सर भन्दा **दायाँपट्टि (अगाडि)** रहेको अक्षर वा छानिएको फाइल मेटाउँछ।"
        ]
      }
    ],
    caseStudyEn: "In an accounting firm in Biratnagar, employees use the dedicated Numeric Keypad (Numpad) on the right side of full-size keyboards with their right hand to enter voucher amounts three times faster than using top-row numbers.",
    caseStudyNe: "विराटनगरको एक लेखा शाखामा कर्मचारीहरूले भौचर रकम छिटो टाइप गर्न किबोर्डको दायाँतर्फ रहेको नम्बर प्याड (Numpad) प्रयोग गर्छन्।",
    flashcards: [
      {
        id: "fc-mod2-05",
        frontEn: "What is the function of the Shift key?",
        frontNe: "सिफ्ट (Shift) की को काम के हो?",
        backEn: "Holding Shift while typing a letter makes it UPPERCASE (A). Holding Shift with a number key types the symbol printed on top (like Shift + 1 = !).",
        backNe: "सिफ्ट थिचेर अक्षर थिच्दा ठूलो (Capital) अक्षर आउँछ र नम्बरसँग थिच्दा माथिल्लो चिन्ह (!, @, #) आउँछ।"
      },
      {
        id: "fc-mod2-06",
        frontEn: "What is the difference between Backspace and Delete?",
        frontNe: "Backspace र Delete मा के फरक छ?",
        backEn: "Backspace deletes characters to the left of the cursor; Delete removes characters to the right of the cursor.",
        backNe: "Backspace ले कर्सरको देब्रेतर्फ र Delete ले दायाँतर्फको अक्षर मेटाउँछ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-3-1",
        question: "Which key moves the blinking text cursor to a new line in a word processor?",
        questionNe: "कागजात टाइप गर्दा कर्सरलाई नयाँ लाइनमा सार्न कुन की थिचिन्छ?",
        options: [
          "Enter / Return key",
          "Spacebar key",
          "Escape (Esc) key",
          "Caps Lock key"
        ],
        answer: 0,
        explanation: "Pressing the Enter key starts a new paragraph or line.",
        explanationNe: "Enter की थिच्दा नयाँ लाइन वा नयाँ अनुच्छेद सुरु हुन्छ।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Caps Lock",
        termNe: "क्याप्स लक",
        definitionEn: "A toggle key that causes all typed alphabet letters to appear in uppercase until pressed again.",
        definitionNe: "सबै अक्षरहरूलाई लगातार ठूलो (Capital) बनाउने की।"
      }
    ]
  },

  // Lesson 04
  {
    id: 4,
    slug: "essential-keyboard-shortcuts",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 4,
    titleEn: "Essential Everyday Keyboard Shortcuts",
    titleNe: "दैनिक जीवनमा चाहिने मुख्य किबोर्ड सर्टकटहरू",
    subtitleEn: "Master top productivity shortcuts: Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S, Ctrl+A, Alt+Tab, and Windows+D.",
    subtitleNe: "कपी, पेस्ट, अनडू, सेभ र विन्डोज बदल्ने १० वटा मुख्य किबोर्ड सर्टकटहरू अभ्यास गर्नुहोस्।",
    duration: "15 min",
    readTime: "10 min read",
    difficulty: "Beginner",
    summaryEn: "Keyboard shortcuts save hours of repetitive mouse clicking, making you fast, precise, and professional on any computer.",
    summaryNe: "किबोर्ड सर्टकटको प्रयोगले धेरै समय बचाउँछ र कम्प्युटरमा छिटो र प्रभावकारी तरिकाले काम गर्न मद्दत गर्छ।",
    sections: [
      {
        id: "top-shortcuts",
        titleEn: "Top 10 Universal Computer Shortcuts",
        titleNe: "१० वटा महत्वपूर्ण विश्वव्यापी किबोर्ड सर्टकटहरू",
        contentEn: "These keyboard combinations work identically across almost every software application:",
        contentNe: "यी सर्टकटहरू प्रायः सबै सफ्टवेयरहरूमा एकै किसिमले काम गर्छन्:",
        bulletPointsEn: [
          "**Ctrl + C**: **Copy** (Copies selected text, images, or files into the invisible clipboard).",
          "**Ctrl + V**: **Paste** (Inserts the copied item wherever your cursor is located).",
          "**Ctrl + X**: **Cut** (Removes the selected item and holds it to be pasted elsewhere).",
          "**Ctrl + Z**: **Undo** (Reverses your most recent mistake or accidental deletion).",
          "**Ctrl + S**: **Save** (Instantly saves the current open file to avoid losing work).",
          "**Ctrl + A**: **Select All** (Highlights every item or piece of text on the current page).",
          "**Ctrl + F**: **Find** (Opens a search box to find specific words in a document or webpage).",
          "**Ctrl + P**: **Print** (Opens the document print preview dialog box).",
          "**Alt + Tab**: **Switch Windows** (Instantly jumps between your open application windows).",
          "**Windows Key + D**: **Show Desktop** (Minimizes all open windows to show the clean desktop)."
        ],
        bulletPointsNe: [
          "**Ctrl + C**: **Copy (कपी)** — छानिएको अक्षर वा फाइलको प्रतिलिपि बनाउने।",
          "**Ctrl + V**: **Paste (पेस्ट)** — कपी गरिएको वस्तुलाई नयाँ ठाउँमा टाँस्ने।",
          "**Ctrl + X**: **Cut (कट)** — पुरानो ठाउँबाट हटाएर नयाँ ठाउँमा सार्नका लागि उठाउने।",
          "**Ctrl + Z**: **Undo (अनडू)** — भर्खरै भएको गल्ती वा मेटिएको कुरा तत्काल फिर्ता ल्याउने।",
          "**Ctrl + S**: **Save (सेभ)** — काम गरेको फाइल कम्प्युटरमा सुरक्षित गर्ने।",
          "**Ctrl + A**: **Select All (सबै छान्ने)** — पेजमा भएका सबै अक्षर वा फाइल एकैचोटि छान्ने।",
          "**Ctrl + F**: **Find (खोज्ने)** — डकुमेन्ट वा वेबसाइटमा कुनै शब्द खोज्ने।",
          "**Ctrl + P**: **Print (प्रिन्ट)** — कागजात प्रिन्ट गर्ने बाकस खोल्ने।",
          "**Alt + Tab**: **एप्स बदल्ने** — चालु रहेका विन्डोजहरू बीच तुरुन्तै अदलबदल गर्ने।",
          "**Win + D**: **डेस्कटप देखाउने** — सबै खुला झ्यालहरू लुकाएर सिधै डेस्कटपमा पुग्ने।"
        ]
      }
    ],
    caseStudyEn: "A teacher in Chitwan accidentally deleted three paragraphs of an exam paper while typing. Instead of panicking, she pressed Ctrl + Z twice, and all the lost text reappeared instantly.",
    caseStudyNe: "चितवनकी एक शिक्षिकाले परीक्षाको प्रश्नपत्र बनाउँदा झुक्किएर ३ वटा अनुच्छेद मेटाइन्। आत्तिनुको सट्टा उनले दुई पटक Ctrl + Z थिचिन् र मेटिएका सबै अक्षरहरू तुरुन्त फिर्ता आए।",
    flashcards: [
      {
        id: "fc-mod2-07",
        frontEn: "What is the shortcut for Copy and Paste?",
        frontNe: "कपी (Copy) र पेस्ट (Paste) को सर्टकट के हो?",
        backEn: "Ctrl + C copies the selected item, and Ctrl + V pastes it in the target location.",
        backNe: "Ctrl + C ले कपी गर्छ र Ctrl + V ले नयाँ ठाउँमा पेस्ट गर्छ।"
      },
      {
        id: "fc-mod2-08",
        frontEn: "What does Ctrl + Z do?",
        frontNe: "Ctrl + Z ले के गर्छ?",
        backEn: "Ctrl + Z performs an Undo action, reversing your most recent change or accidental mistake.",
        backNe: "Ctrl + Z ले अनडू गर्छ, अर्थात् भर्खरै भएको गल्ती वा डिलिटलाई तत्काल पहिलेकै अवस्थामा फर्काउँछ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-4-1",
        question: "Which keyboard shortcut is used to reverse a mistake (Undo)?",
        questionNe: "कुनै गल्ती सच्याउन (Undo गर्न) कुन सर्टकट प्रयोग गरिन्छ?",
        options: [
          "Ctrl + Z",
          "Ctrl + S",
          "Ctrl + P",
          "Alt + F4"
        ],
        answer: 0,
        explanation: "Ctrl + Z is the universal shortcut for Undo.",
        explanationNe: "Ctrl + Z गल्ती सच्याउने (Undo गर्ने) मुख्य सर्टकट हो।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Clipboard",
        termNe: "क्लिपबोर्ड",
        definitionEn: "Temporary computer memory that holds text or files you have copied or cut until you paste them.",
        definitionNe: "कपी वा कट गरिएका अक्षरहरू पेस्ट नगर्दासम्म अस्थायी रूपमा बस्ने ठाउँ।"
      }
    ]
  },

  // Lesson 05
  {
    id: 5,
    slug: "working-with-windows",
    moduleNumber: 2,
    moduleTitleEn: "Operating a Computer",
    moduleTitleNe: "कम्प्युटर सञ्चालन गर्ने तरिका",
    lessonNumber: 5,
    titleEn: "Working with Windows: Title Bar, Resize & Snap",
    titleNe: "विन्डोज (Windows) सँग काम गर्ने: Minimize, Maximize र Resize",
    subtitleEn: "Learn how to open, minimize, maximize, restore, resize, move, and snap windows side-by-side.",
    subtitleNe: "विन्डोलाई सानो-ठूलो बनाउने, लुकाउने, सार्ने र स्क्रिनमा दुईवटा विन्डो सँगसँगै राखेर काम गर्ने तरिका सिक्नुहोस्।",
    duration: "10 min",
    readTime: "8 min read",
    difficulty: "Beginner",
    summaryEn: "Every application opens inside a rectangular 'Window'. Controlling windows lets you multitask comfortably.",
    summaryNe: "कम्प्युटरमा खोलिने प्रत्येक सफ्टवेयर एउटा आयताकार झ्याल (Window) मा खुल्छ। यसलाई नियन्त्रण गरेर धेरै काम एकैपटक गर्न सकिन्छ।",
    sections: [
      {
        id: "window-controls",
        titleEn: "The Three Top-Right Window Buttons",
        titleNe: "विन्डोको माथि दायाँपट्टि हुने ३ मुख्य बटनहरू",
        contentEn: "At the top right corner of every window (on Windows and Linux) are three essential control buttons:",
        contentNe: "प्रत्येक विन्डोको माथिल्लो दायाँ कुनामा यी ३ वटा बटनहरू हुन्छन्:",
        bulletPointsEn: [
          "**Minimize (−)**: Hides the window from the screen and keeps it running quietly on the bottom Taskbar.",
          "**Maximize / Restore (□)**: Expands the window to fill the entire monitor, or restores it back to medium size.",
          "**Close (✕)**: Completely exits and closes the active application window."
        ],
        bulletPointsNe: [
          "**Minimize (−)**: विन्डोलाई स्क्रिनबाट लुकाएर तलको टास्कबारमा राखिराख्छ (एप बन्द हुँदैन)।",
          "**Maximize (□)**: विन्डोलाई पुरै स्क्रिन भरिने गरी ठूलो बनाउँछ वा पहिलेकै साइजमा ल्याउँछ।",
          "**Close (✕)**: उक्त विन्डो वा एप्लिकेसनलाई पूर्ण रूपमा बन्द गर्छ।"
        ]
      },
      {
        id: "snap-assist",
        titleEn: "Window Snapping & Side-by-Side Multitasking",
        titleNe: "विन्डो स्न्याप गर्ने र सँगसँगै काम गर्ने",
        contentEn: "To view two windows side-by-side (for example, typing notes in Word while reading a web page in Chrome):",
        contentNe: "दुईवटा विन्डोलाई आधा-आधा स्क्रिनमा राखेर काम गर्न:",
        bulletPointsEn: [
          "Click and drag the window's Title Bar to the far left or far right edge of your monitor.",
          "Alternatively, press **Windows Key + Left Arrow (←)** or **Windows Key + Right Arrow (→)** to snap instantly."
        ],
        bulletPointsNe: [
          "विन्डोको माथिल्लो पट्टी समातेर स्क्रिनको देब्रे वा दायाँ कुनामा तानेर छोड्नुहोस्।",
          "वा किबोर्डमा **Win + ←** वा **Win + →** थिचेर स्क्रिनलाई आधा-आधा भागमा बाँड्नुहोस्।"
        ]
      }
    ],
    caseStudyEn: "A university student in Lalitpur prepares research assignments by snapping Zoom/Google Meet to the left half of the screen and Microsoft Word to the right half, allowing seamless live note-taking.",
    caseStudyNe: "ललितपुरका एक विद्यार्थीले अनलाइन कक्षा लिँदा स्क्रिनको देब्रेपट्टि जुम (Zoom) र दायाँपट्टि वर्ड (Word) आधा-आधा राखेर एकैसाथ नोट बनाउँछन्।",
    flashcards: [
      {
        id: "fc-mod2-09",
        frontEn: "What is the difference between Minimize and Close?",
        frontNe: "Minimize र Close मा के फरक छ?",
        backEn: "Minimize keeps the program running in the background on the taskbar. Close completely shuts down the program.",
        backNe: "Minimize गर्दा प्रोग्राम टास्कबारमा चलिरहन्छ; Close गर्दा प्रोग्राम पूर्णतया बन्द हुन्छ।"
      }
    ],
    quiz: [
      {
        id: "q-mod2-5-1",
        question: "Which button hides a window to the taskbar without shutting it down?",
        questionNe: "प्रोग्राम बन्द नगरी स्क्रिनबाट लुकाएर टास्कबारमा राख्न कुन बटन थिचिन्छ?",
        options: [
          "Minimize button (−)",
          "Close button (✕)",
          "Maximize button (□)",
          "Power button"
        ],
        answer: 0,
        explanation: "The Minimize button (−) temporarily hides the window to the taskbar while keeping your work active.",
        explanationNe: "Minimize बटन (−) ले विन्डोलाई बन्द नगरी तलको टास्कबारमा राखिदिन्छ।",
        difficulty: "easy"
      }
    ],
    keyTerms: [
      {
        termEn: "Title Bar",
        termNe: "टाइटल बार",
        definitionEn: "The top horizontal bar of an application window showing the file name and window control buttons.",
        definitionNe: "विन्डोको सबैभन्दा माथिल्लो पट्टी जहाँ फाइलको नाम र कन्ट्रोल बटनहरू हुन्छन्।"
      }
    ]
  }
];
