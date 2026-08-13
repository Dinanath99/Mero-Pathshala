import { ComputerSkillLesson, KeyTerm } from "./computerSkillsData";

export const fileManagementModuleQuizQuestions = [
  {
    question: "What is the primary role of a digital file in computing?",
    questionNe: "कम्प्युटरमा डिजिटल फाइलको मुख्य भूमिका के हो?",
    options: [
      "To store discrete digital data (text, image, audio, data) under a unique name",
      "To power the cooling fan in the CPU",
      "To connect the keyboard to Bluetooth",
      "To clean the monitor glass"
    ],
    answer: 0,
    explanation: "A file is a named unit of storage holding specific data like documents, pictures, or spreadsheets."
  },
  {
    question: "Which of the following describes a folder (directory)?",
    questionNe: "फोल्डर (डाइरेक्टरी) को सही परिभाषा कुन हो?",
    options: [
      "A virtual organizational container used to group related files and subfolders",
      "A physical hardware cable",
      "A type of computer RAM chip",
      "An internet browser search engine"
    ],
    answer: 0,
    explanation: "Folders organize files and subfolders into structured hierarchies without containing raw content themselves."
  },
  {
    question: "Which file extension is standard for official, non-editable documents like certificates and CVs?",
    questionNe: "प्रमाणपत्र र नबिग्रिने बायोडाटाका लागि कुन एक्सटेन्सन सबैभन्दा उपयुक्त हुन्छ?",
    options: [".pdf", ".exe", ".mp3", ".zip"],
    answer: 0,
    explanation: ".pdf (Portable Document Format) preserves fonts and layout across all devices."
  },
  {
    question: "Which software application opens a .xlsx spreadsheet by default?",
    questionNe: ".xlsx फाइल खोल्न कुन सफ्टवेयर प्रयोग गरिन्छ?",
    options: [
      "Microsoft Excel or Google Sheets",
      "Windows Media Player",
      "Adobe Photoshop",
      "Notepad"
    ],
    answer: 0,
    explanation: ".xlsx is the default extension for Microsoft Excel and compatible spreadsheet tools."
  },
  {
    question: "What does the keyboard shortcut Windows Key + E do?",
    questionNe: "किबोर्डमा Windows Key + E थिच्दा के हुन्छ?",
    options: [
      "Opens File Explorer immediately",
      "Ejects the DVD drive",
      "Empties the Recycle Bin",
      "Exits all open applications"
    ],
    answer: 0,
    explanation: "Win + E is the universal shortcut to launch Windows File Explorer."
  },
  {
    question: "Why is it best practice to save personal projects and photos in the D: Drive rather than C: Drive?",
    questionNe: "व्यक्तिगत फाइल C: को साटो D: मा राख्नु किन राम्रो मानिन्छ?",
    options: [
      "If Windows crashes and C: is formatted, files in D: remain safe and untouched",
      "D: Drive runs on solar electricity",
      "Files in D: Drive do not take up any storage space",
      "D: Drive translates English to Nepali automatically"
    ],
    answer: 0,
    explanation: "The C: drive holds system files and is wiped during clean OS reinstalls; D: stays intact."
  },
  {
    question: "What keyboard shortcut creates a New Folder in File Explorer?",
    questionNe: "नयाँ फोल्डर बनाउने सर्टकट कुन हो?",
    options: [
      "Ctrl + Shift + N",
      "Ctrl + Alt + Del",
      "Alt + F4",
      "Win + L"
    ],
    answer: 0,
    explanation: "Ctrl + Shift + N creates a new folder instantly in the active folder."
  },
  {
    question: "What is the function key shortcut to Rename a selected file?",
    questionNe: "फाइलको नाम फेर्न कुन Function Key थिचिन्छ?",
    options: ["F2", "F5", "F1", "F12"],
    answer: 0,
    explanation: "F2 activates inline renaming for any selected file or folder."
  },
  {
    question: "Which of the following characters CANNOT be used in a Windows file name?",
    questionNe: "विन्डोजमा फाइलको नाममा कुन चिन्ह प्रयोग गर्न पाइँदैन?",
    options: [
      "Asterisk (*) and Question mark (?)",
      "Underscore (_)",
      "Hyphen (-)",
      "Numbers (0-9)"
    ],
    answer: 0,
    explanation: "Special system characters \\ / : * ? \" < > | are strictly forbidden in file names."
  },
  {
    question: "What happens when you delete a file by pressing the Delete key?",
    questionNe: "फाइल सेलेक्ट गरी Delete थिच्दा के हुन्छ?",
    options: [
      "It moves to the Recycle Bin and can be restored if needed",
      "It is vaporized forever instantly",
      "It is emailed to the police",
      "It turns into a photo"
    ],
    answer: 0,
    explanation: "Normal deletion sends files to the Recycle Bin as a safety buffer for easy restoration."
  },
  {
    question: "What keyboard combination permanently deletes a file, bypassing the Recycle Bin?",
    questionNe: "Recycle Bin मा नराखी सिधै सधैंका लागि मेटाउने सर्टकट कुन हो?",
    options: [
      "Shift + Delete",
      "Ctrl + Delete",
      "Alt + Delete",
      "Win + Delete"
    ],
    answer: 0,
    explanation: "Shift + Delete permanently erases the file without placing it in the Recycle Bin."
  },
  {
    question: "What is the core difference between Copy (Ctrl+C) and Cut (Ctrl+X)?",
    questionNe: "कपी (Copy) र कट (Cut) बीचको मुख्य भिन्नता के हो?",
    options: [
      "Copy duplicates the file; Cut moves the file from original location to destination",
      "Copy deletes the file; Cut makes it larger",
      "Copy changes the color; Cut prints the paper",
      "There is no difference"
    ],
    answer: 0,
    explanation: "Copy creates an identical twin; Cut removes the original and relocates it upon Paste."
  },
  {
    question: "How do you select 5 non-adjacent files scattered across a list?",
    questionNe: "छरिएका ५ वटा फरक-फरक फाइल कसरी छान्ने?",
    options: [
      "Hold the Ctrl key and click each file individually",
      "Hold Shift and click the spacebar",
      "Double click the monitor screen",
      "Turn off the mouse"
    ],
    answer: 0,
    explanation: "Holding Ctrl enables individual toggling of non-contiguous items."
  },
  {
    question: "Which wildcard query will find all PDF documents in File Explorer search?",
    questionNe: "फाइल एक्सप्लोररमा सबै PDF फाइल खोज्न के टाइप गर्नुपर्छ?",
    options: ["*.pdf", "find:pdf", "all_pdf", "open.pdf"],
    answer: 0,
    explanation: "*.pdf instructs the search engine to match any name ending with .pdf."
  },
  {
    question: "What is the primary advantage of compressing 40 photos into a .zip archive?",
    questionNe: "४० वटा तस्बिरलाई ZIP फाइल बनाउनुको मुख्य फाइदा के हो?",
    options: [
      "It reduces total file size and bundles them into 1 single file for easy email attachment",
      "It makes the photos 3D",
      "It turns black-and-white photos into color",
      "It prevents photos from ever being opened again"
    ],
    answer: 0,
    explanation: "ZIP archives compress redundant data and bundle loose files into a single download."
  },
  {
    question: "Why should you 'Extract All' (Unzip) before editing files from a ZIP archive?",
    questionNe: "ZIP भित्रका फाइल चलाउनुअघि 'Extract All' किन गर्नुपर्छ?",
    options: [
      "Files opened inside a ZIP preview are temporary and changes may not be saved",
      "ZIP files explode if edited",
      "It is required by Nepal telecom law",
      "It increases computer RAM"
    ],
    answer: 0,
    explanation: "Editing inside an unextracted ZIP opens a temporary copy that often fails to persist edits."
  },
  {
    question: "Why MUST you click 'Safely Remove Hardware / Eject' before unplugging a USB flash drive?",
    questionNe: "पेनड्राइभ निकाल्नुअघि 'Eject' किन गर्नुपर्छ?",
    options: [
      "To ensure all cached background write operations are completed and prevent drive corruption",
      "To give the computer a 5-second rest",
      "To clean dust from the USB port",
      "To disconnect from Wi-Fi"
    ],
    answer: 0,
    explanation: "Eject flushes write buffers and safely unmounts the file system to prevent partition damage."
  },
  {
    question: "What is the industry-standard '3-2-1 Backup Rule'?",
    questionNe: "३-२-१ ब्याकअप नियम के हो?",
    options: [
      "3 copies of data, on 2 different media types, with 1 copy offsite in Cloud storage",
      "3 passwords, 2 usernames, 1 computer",
      "3 screens, 2 keyboards, 1 mouse",
      "3 minutes of typing, 2 minutes of rest, 1 cup of tea"
    ],
    answer: 0,
    explanation: "3 copies, 2 media formats, 1 cloud offsite copy guarantees protection from loss."
  },
  {
    question: "Which of the following file names follows the best professional naming convention?",
    questionNe: "तलका मध्ये कुन नाम व्यावसायिक र व्यवस्थित छ?",
    options: [
      "2026-02_Dinanath_CV_Accounting_v2.pdf",
      "final_final_new_doc(1).pdf",
      "doc1.pdf",
      "asdf123.pdf"
    ],
    answer: 0,
    explanation: "Including date, owner, category, and version ensures fast search and sorting."
  },
  {
    question: "If a file is named 'Passport_Scan.pdf.exe', what kind of file is it really?",
    questionNe: "'Passport_Scan.pdf.exe' वास्तवमा कस्तो प्रकारको फाइल हो?",
    options: [
      "A dangerous executable program (.exe) masquerading as a PDF",
      "A normal PDF document",
      "An audio file",
      "A spreadsheet"
    ],
    answer: 0,
    explanation: "Windows uses the final suffix (.exe), making this an executable file, often malware."
  }
];

export const fileManagementFlashcards = [
  { id: "fm-fc01", frontEn: "What is a File?", frontNe: "फाइल के हो?", backEn: "A block of arbitrary digital data stored under a single name.", backNe: "एउटै नाममा सुरक्षित राखिएको डिजिटल डेटाको संग्रह।" },
  { id: "fm-fc02", frontEn: "What is a Folder?", frontNe: "फोल्डर के हो?", backEn: "A digital container used to group and organize files and subfolders.", backNe: "फाइलहरूलाई मिलाएर राख्ने डिजिटल बाकस वा ड्रयर।" },
  { id: "fm-fc03", frontEn: "What does a file extension tell the OS?", frontNe: "फाइल एक्सटेन्सनले के जनाउँछ?", backEn: "The format of the file and which application should open it.", backNe: "फाइलको प्रकार र त्यो कुन सफ्टवेयरले खोल्ने भन्ने कुरा।" },
  { id: "fm-fc04", frontEn: "Shortcut to open File Explorer?", frontNe: "फाइल एक्सप्लोरर खोल्ने सर्टकट?", backEn: "Windows Key + E.", backNe: "Win + E।" },
  { id: "fm-fc05", frontEn: "Shortcut to create a New Folder?", frontNe: "नयाँ फोल्डर बनाउने सर्टकट?", backEn: "Ctrl + Shift + N.", backNe: "Ctrl + Shift + N।" },
  { id: "fm-fc06", frontEn: "Shortcut to Rename a file?", frontNe: "फाइलको नाम फेर्ने सर्टकट?", backEn: "F2.", backNe: "F2।" },
  { id: "fm-fc07", frontEn: "What does Shift + Delete do?", frontNe: "Shift + Delete ले के गर्छ?", backEn: "Permanently deletes the file bypassing the Recycle Bin.", backNe: "Recycle Bin मा नराखी सिधै स्थायी रूपमा मेटाउँछ।" },
  { id: "fm-fc08", frontEn: "Shortcut for Copy?", frontNe: "कपी गर्ने सर्टकट?", backEn: "Ctrl + C.", backNe: "Ctrl + C।" },
  { id: "fm-fc09", frontEn: "Shortcut for Cut (Move)?", frontNe: "कट (सार्ने) सर्टकट?", backEn: "Ctrl + X.", backNe: "Ctrl + X।" },
  { id: "fm-fc10", frontEn: "Shortcut for Paste?", frontNe: "पेस्ट गर्ने सर्टकट?", backEn: "Ctrl + V.", backNe: "Ctrl + V।" },
  { id: "fm-fc11", frontEn: "Shortcut for Select All?", frontNe: "सबै छान्ने सर्टकट?", backEn: "Ctrl + A.", backNe: "Ctrl + A।" },
  { id: "fm-fc12", frontEn: "What is a .zip archive?", frontNe: "ZIP फाइल के हो?", backEn: "A compressed archive that reduces file sizes and bundles items.", backNe: "साइज घटाएर धेरै फाइलहरूलाई एकै ठाउँमा बाँध्ने आर्काइभ।" },
  { id: "fm-fc13", frontEn: "What is 'Extract All'?", frontNe: "'Extract All' भनेको के हो?", backEn: "Unpacking files from a ZIP archive into a normal folder.", backNe: "ZIP भित्रका फाइलहरूलाई सामान्य फोल्डरमा निकाल्ने कार्य।" },
  { id: "fm-fc14", frontEn: "Why use 'Eject' before unplugging USB?", frontNe: "पेनड्राइभ निकाल्नुअघि 'Eject' किन गर्ने?", backEn: "To flush write cache and protect against data corruption.", backNe: "डेटा नबिग्रियोस् भनेर सुरक्षित रूपमा बन्द गर्न।" },
  { id: "fm-fc15", frontEn: "What is Cloud Storage?", frontNe: "क्लाउड स्टोरेज के हो?", backEn: "Saving files on secure remote internet servers (Google Drive).", backNe: "गुगल ड्राइभ जस्ता अनलाइन सुरक्षित सर्भरमा डेटा राख्ने प्रविधि।" },
  { id: "fm-fc16", frontEn: "What is the 3-2-1 Backup Rule?", frontNe: "३-२-१ ब्याकअप नियम के हो?", backEn: "3 copies of data, 2 media types, 1 offsite copy in the Cloud.", backNe: "३ कपी फाइल, २ फरक माध्यममा, र १ कपी क्लाउड अनलाइनमा।" },
  { id: "fm-fc17", frontEn: "Why keep files in D: Drive?", frontNe: "फाइल D: ड्राइभमा किन राख्ने?", backEn: "Because C: drive is erased during clean OS reinstallations.", backNe: "विन्डोज फर्म्याट हुँदा D: ड्राइभको डेटा सुरक्षित रहन्छ।" },
  { id: "fm-fc18", frontEn: "How to select non-adjacent files?", frontNe: "छरिएका फाइलहरू कसरी छान्ने?", backEn: "Hold Ctrl while clicking each individual file.", backNe: "Ctrl थिचेर छानीछानी क्लिक गर्ने।" },
  { id: "fm-fc19", frontEn: "Wildcard search for all Word documents?", frontNe: "सबै वर्ड डकुमेन्ट खोज्ने वाइल्डकार्ड?", backEn: "*.docx", backNe: "*.docx" },
  { id: "fm-fc20", frontEn: "Illegal filename characters?", frontNe: "नाममा राख्न नमिल्ने चिन्हहरू?", backEn: "\\ / : * ? \" < > |", backNe: "\\ / : * ? \" < > |" }
];

export const fileManagementKeyTerms: KeyTerm[] = [
  { termEn: "File", termNe: "फाइल", definitionEn: "A block of digital data stored under a single name.", definitionNe: "कम्प्युटरमा एउटै नाममा सुरक्षित राखिएको डिजिटल डेटाको संग्रह।" },
  { termEn: "Folder (Directory)", termNe: "फोल्डर (डाइरेक्टरी)", definitionEn: "A virtual container used to group and organize files and subfolders.", definitionNe: "फाइलहरूलाई मिलाएर राख्ने डिजिटल बाकस वा ड्रयर।" },
  { termEn: "File Extension", termNe: "फाइल एक्सटेन्सन", definitionEn: "The 3-4 letter suffix at the end of a filename indicating its format (.pdf, .docx).", definitionNe: "फाइलको नामको पछाडि थोप्लापछिका अक्षरहरू जसले फाइलको प्रकार जनाउँछ।" },
  { termEn: "File Path", termNe: "फाइल पाथ (ठेगाना)", definitionEn: "The complete directory address leading to a specific file on disk.", definitionNe: "कम्प्युटरमा फाइल कुन ठाउँमा छ भन्ने पूर्ण बाटो वा ठेगाना।" },
  { termEn: "Recycle Bin", termNe: "रद्दीको टोकरी (Recycle Bin)", definitionEn: "A temporary storage holding deleted files allowing easy restoration.", definitionNe: "डिलिट गरिएका फाइलहरू अस्थायी रूपमा बस्ने ठाउँ, जहाँबाट पुनः फिर्ता ल्याउन सकिन्छ।" },
  { termEn: "ZIP File", termNe: "जिप फाइल (ZIP)", definitionEn: "An archive file format that supports lossless data compression.", definitionNe: "साइज घटाएर धेरै फाइलहरूलाई एकै ठाउँमा बाँधिएको आर्काइभ फाइल।" },
  { termEn: "Safely Remove / Eject", termNe: "सुरक्षित रूपमा निकाल्ने (Eject)", definitionEn: "Flushes memory write buffers to safely disconnect external USB storage.", definitionNe: "डेटा नबिग्रियोस् भनेर पेनड्राइभलाई सफ्टवेयरबाट बन्द गरी निकाल्ने प्रक्रिया।" },
  { termEn: "Cloud Storage", termNe: "क्लाउड स्टोरेज", definitionEn: "Saving files on secure remote internet servers (e.g. Google Drive, OneDrive).", definitionNe: "इन्टरनेट मार्फत सुरक्षित अनलाइन सर्भरमा डेटा राख्ने प्रविधि।" },
  { termEn: "3-2-1 Backup Rule", termNe: "३-२-१ ब्याकअप नियम", definitionEn: "3 copies of data, 2 different storage media, and 1 offsite cloud copy.", definitionNe: "३ कपी फाइल, २ फरक माध्यममा, र १ कपी क्लाउड अनलाइनमा राख्ने नियम।" }
];

export const fileManagementLessonsPart3: ComputerSkillLesson[] = [
  // =========================================================================
  // LESSON 11: Module Review & Comprehensive Assessment
  // =========================================================================
  {
    id: 11,
    slug: "files-module-review-and-assessment",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 11,
    titleEn: "Module 3 Review & Comprehensive Assessment",
    titleNe: "समग्र समीक्षा र अन्तिम मूल्याङ्कन",
    subtitleEn: "Consolidate file management, compression, USB safety, and test your mastery with 20 questions.",
    subtitleNe: "फाइल व्यवस्थापन, कम्प्रेसन, पेनड्राइभ सुरक्षाको समग्र समीक्षा र २० प्रश्नको अन्तिम परीक्षा।",
    duration: "15 mins",
    readTime: "10 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Review core concepts of Module 3: file extensions, directory hierarchies, search filters, ZIP extraction, USB safety, and cloud backup. Take the 20-question final quiz to earn your File & Data Management Specialist certification badge.",
    summaryNe: "मोड्युल ३ को पूर्ण समीक्षा: फाइल एक्सटेन्सन, डाइरेक्टरी संरचना, ZIP अनजिप, पेनड्राइभ Eject, र क्लाउड ब्याकअप। २० प्रश्नको परीक्षा दिएर ब्याच प्राप्त गर्नुहोस्।",
    objectives: [
      { en: "Review all 10 lessons of Module 3: Files & File Management", ne: "मोड्युल ३ का सबै १० पाठहरूको पुनरावलोकन गर्ने" },
      { en: "Demonstrate mastery across file properties, naming, shortcuts, compression, and safety", ne: "फाइलका गुण, नामकरण, सर्टकट, कम्प्रेसन र सुरक्षामा पूर्ण दक्षता देखाउने" },
      { en: "Pass the 20-question comprehensive MCQ assessment with at least 70% score", ne: "२० प्रश्नको परीक्षामा कम्तीमा ७०% ल्याएर मोड्युल पूरा गर्ने" }
    ],
    sections: [
      {
        id: "sec-m3-takeaways",
        titleEn: "Module 3 Key Takeaways (तेस्रो मोड्युलका मुख्य उपलब्धिहरू)",
        titleNe: "तेस्रो मोड्युलका मुख्य उपलब्धिहरू",
        contentEn: "Congratulations on completing all lessons of Module 3: Files & File Management! Here is a recap of the essential digital file management rules:",
        contentNe: "फाइल तथा फोल्डर व्यवस्थापन सम्बन्धी तेस्रो मोड्युल सफलतापूर्वक पूरा गर्नुभएकोमा बधाई छ! यहाँ मुख्य नियमहरूको सार प्रस्तुत गरिएको छ:",
        bulletPointsEn: [
          "<strong>1. Keep work off the C: Drive:</strong> Save personal documents, projects, and media in D: Drive or Google Drive to survive system crashes.",
          "<strong>2. Master File Extensions:</strong> Know what .pdf, .docx, .xlsx, .jpg, and .zip mean, and never open suspicious .exe attachments.",
          "<strong>3. Use Power Shortcuts:</strong> <code>Win + E</code> (Explorer), <code>Ctrl + Shift + N</code> (New Folder), <code>F2</code> (Rename), <code>Ctrl + C / X / V</code> (Copy/Cut/Paste), <code>Ctrl + A</code> (Select All).",
          "<strong>4. Extract Before Editing:</strong> Always click 'Extract All' on ZIP archives before modifying files.",
          "<strong>5. Eject USBs Safely:</strong> Always click 'Safely Remove / Eject' in the Taskbar before physically pulling out a flash drive.",
          "<strong>6. Follow the 3-2-1 Rule:</strong> Maintain 3 copies of vital documents across 2 different media and 1 offsite cloud storage."
        ],
        bulletPointsNe: [
          "<strong>१. फाइल D: ड्राइभमा राख्नुहोस्:</strong> विन्डोज फर्म्याट हुँदा पनि डकुमेन्ट जोगियोस्।",
          "<strong>२. एक्सटेन्सन बुझ्नुहोस्:</strong> .pdf, .docx, .xlsx चिन्नुहोस् र शंकास्पद .exe फाइल नखोल्नुहोस्।",
          "<strong>३. सर्टकट प्रयोग गर्नुहोस्:</strong> <code>Win + E</code>, <code>Ctrl + Shift + N</code>, <code>F2</code>, <code>Ctrl + C/X/V</code>।",
          "<strong>४. ZIP अनजिप गरेर काम गर्नुहोस्:</strong> फाइल सम्पादन गर्नुअघि 'Extract All' गर्नुहोस्।",
          "<strong>५. पेनड्राइभ Eject गर्नुहोस्:</strong> डेटा नबिग्रियोस् भनेर सधैं सफ्टवेयरबाट Eject गरेर मात्र निकाल्नुहोस्।",
          "<strong>६. ३-२-१ ब्याकअप नियम:</strong> आफ्ना महत्त्वपूर्ण कागजात गुगल ड्राइभमा पनि ब्याकअप राख्नुहोस्।"
        ]
      }
    ],
    keyTerms: fileManagementKeyTerms,
    flashcards: fileManagementFlashcards,
    quiz: fileManagementModuleQuizQuestions
  }
];
