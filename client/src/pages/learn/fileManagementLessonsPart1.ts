import { ComputerSkillLesson } from "./computerSkillsData";

export const fileManagementLessonsPart1: ComputerSkillLesson[] = [
  // =========================================================================
  // LESSON 01: What is a File and Folder?
  // =========================================================================
  {
    id: 1,
    slug: "what-is-a-file-and-folder",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 1,
    titleEn: "What is a File and Folder?",
    titleNe: "फाइल र फोल्डर भनेको के हो?",
    subtitleEn: "The fundamental digital building blocks of all computer storage.",
    subtitleNe: "कम्प्युटर भण्डारणका आधारभूत डिजिटल एकाइहरू।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Discover what digital files and folders are, how files store text, audio, video, and documents, and how folders organize digital clutter into structured hierarchies.",
    summaryNe: "डिजिटल फाइल र फोल्डर के हुन्, फाइलहरूले कसरी डेटा सुरक्षित राख्छन्, र फोल्डरहरूले कम्प्युटरलाई कसरी व्यवस्थित बनाउँछन् भन्ने कुरा सिक्नुहोस्।",
    objectives: [
      { en: "Understand what a digital file is and how it differs from physical paper files", ne: "डिजिटल फाइलको परिभाषा र कागजको फाइलसँग यसको भिन्नता बुझ्ने" },
      { en: "Explain the role of folders (directories) as organizational containers", ne: "फोल्डर (डाइरेक्टरी) को भूमिका र महत्त्व बुझ्ने" },
      { en: "Learn the concept of subfolders and hierarchical file trees", ne: "सब-फोल्डर र फोल्डर संरचना (Hierarchy) बुझ्ने" },
      { en: "Identify essential file properties: Name, Size, Date Modified, and Location", ne: "फाइलका मुख्य गुणहरू (नाम, साइज, मिति, ठेगाना) पहिचान गर्ने" }
    ],
    sections: [
      {
        id: "sec-file-def",
        titleEn: "1. What is a Digital File? (फाइल भनेको के हो?)",
        titleNe: "१. डिजिटल फाइलको परिभाषा",
        contentEn: "A computer file is a discrete collection of digital data stored under a single name on an SSD, Hard Disk, or Flash Drive. Just like a physical paper document in an office cabinet, a digital file holds specific content such as a written essay, an electricity bill, a family photo, a spreadsheet budget, or a song.",
        contentNe: "कम्प्युटर फाइल भनेको कुनै निश्चित नाम अन्तर्गत SSD वा हार्डडिस्कमा सुरक्षित राखिएको डिजिटल जानकारी वा डेटाको संग्रह हो। जसरी अफिसमा कागजी फाइल हुन्छ, त्यसरी नै कम्प्युटरमा लेखिएको बायोडाटा, बिजुलीको बिल, फोटो, गीत वा हिसाब-किताब फाइलका रूपमा बस्छन्।",
        bulletPointsEn: [
          "<strong>Files store specific information:</strong> Text (.docx, .txt), spreadsheets (.xlsx), pictures (.jpg), or PDF documents.",
          "<strong>Every file has a unique name:</strong> Such as <code>Resume_2026.pdf</code> or <code>Photo_Pokhara.jpg</code>.",
          "<strong>Files occupy storage space:</strong> Measured in Kilobytes (KB), Megabytes (MB), or Gigabytes (GB)."
        ],
        bulletPointsNe: [
          "<strong>फाइलहरूले जानकारी राख्छन्:</strong> शब्द, हिसाब, तस्बिर वा भिडियो।",
          "<strong>हरेक फाइलको नाम हुन्छ:</strong> जस्तै <code>Biodata_2026.pdf</code>।",
          "<strong>फाइलले मेमोरी ओगट्छ:</strong> KB, MB वा GB मा मापन गरिन्छ।"
        ]
      },
      {
        id: "sec-folder-def",
        titleEn: "2. What is a Folder (Directory)? (फोल्डर भनेको के हो?)",
        titleNe: "२. फोल्डर (डाइरेक्टरी) को महत्त्व",
        contentEn: "A folder (also called a directory) is a digital container used to group and organize related files and other subfolders. A folder itself does not contain text or pixels; rather, it provides a structured cabinet drawer so your desktop does not become cluttered with hundreds of loose files.",
        contentNe: "फोल्डर भनेको सम्बन्धित फाइलहरू र अन्य साना फोल्डरहरूलाई मिलाएर राख्ने डिजिटल बाकस वा ड्रयर हो। फोल्डरले कम्प्युटरमा फाइलहरू सजिलै भेट्टाउन मद्दत गर्छ।",
        bulletPointsEn: [
          "<strong>Folders can contain files and subfolders:</strong> E.g., a folder named <code>College_Notes</code> can hold folders for <code>Physics</code>, <code>Math</code>, and <code>English</code>.",
          "<strong>Helps you find work instantly:</strong> Without folders, searching among 10,000 files on a single screen would be impossible.",
          "<strong>Folders occupy virtually zero storage space:</strong> They are simply organizational maps pointing to files."
        ],
        bulletPointsNe: [
          "<strong>फोल्डरभित्र अन्य फोल्डरहरू हुन सक्छन्:</strong> जस्तै <code>कलेज नोट्स</code> भित्र <code>विज्ञान</code> र <code>गणित</code>।",
          "<strong>फाइल खोज्न सजिलो बनाउँछ:</strong> हजारौं फाइलहरू व्यवस्थित रहन्छन्।",
          "<strong>फोल्डरले मेमोरी लिँदैन:</strong> यसले केवल फाइलको बाटो देखाउँछ।"
        ]
      },
      {
        id: "sec-file-properties",
        titleEn: "3. Essential Properties of Every File (फाइलका मुख्य गुणहरू)",
        titleNe: "३. फाइलका ४ आधारभूत गुणहरू",
        contentEn: "Whenever you right-click any file in Windows and select 'Properties' (or press Alt+Enter), you can inspect 4 critical pieces of information:",
        contentNe: "कुनै पनि फाइलमा दायाँ क्लिक गरी Properties हेर्दा ४ मुख्य कुराहरू देखिन्छन्:",
        bulletPointsEn: [
          "<strong>1. File Name & Extension:</strong> E.g., <code>Nagrikta_Front.jpg</code> (tells what it is and what app opens it).",
          "<strong>2. File Size:</strong> E.g., <code>2.4 MB</code> (indicates how much disk space or mobile data it takes).",
          "<strong>3. Date Modified:</strong> The exact date and time the file was last edited and saved.",
          "<strong>4. File Location (Path):</strong> E.g., <code>C:\\Users\\Dinanath\\Documents\\LokSewa</code>."
        ],
        bulletPointsNe: [
          "<strong>१. फाइलको नाम र एक्सटेन्सन:</strong> फाइल के हो र कुन एपले खोल्छ।",
          "<strong>२. फाइल साइज:</strong> फाइलले ओगटेको ठाउँ (KB / MB)।",
          "<strong>३. परिमार्जन मिति (Date Modified):</strong> फाइल पछिल्लो पटक कहिले सम्पादन गरियो।",
          "<strong>४. फाइलको ठेगाना (Path):</strong> फाइल कम्प्युटरको कुन कुनामा बसेको छ।"
        ]
      }
    ],
    diagrams: [
      {
        step: "Hierarchy 1",
        titleEn: "Root Drive (C: or D:)",
        titleNe: "मुख्य ड्राइभ (C: वा D:)",
        descEn: "The primary physical disk partition holding all operating system and personal data.",
        descNe: "सबै फाइल र अपरेटिङ सिस्टम बस्ने मुख्य हार्डड्राइभ।",
        icon: "HardDrive"
      },
      {
        step: "Hierarchy 2",
        titleEn: "Main Parent Folder",
        titleNe: "मूल फोल्डर (Parent Folder)",
        descEn: "Top-level category folder such as 'Documents', 'Projects', or 'Office_Work'.",
        descNe: "मुख्य विधागत फोल्डर जस्तै 'Documents' वा 'Office_Work'।",
        icon: "Folder"
      },
      {
        step: "Hierarchy 3",
        titleEn: "Subfolders",
        titleNe: "सब-फोल्डर (Subfolder)",
        descEn: "Nested folders like '2026_Tax_Invoices' or 'Grade_12_Physics'.",
        descNe: "फोल्डर भित्रका साना फोल्डरहरू जस्तै 'LokSewa_2026'।",
        icon: "FolderOpen"
      },
      {
        step: "Hierarchy 4",
        titleEn: "Individual Files",
        titleNe: "अन्तिम फाइलहरू",
        descEn: "The actual digital documents, photos, audio tracks, and spreadsheets.",
        descNe: "वास्तविक डकुमेन्ट, फोटो, भिडियो वा एक्सेल सिट।",
        icon: "FileText"
      }
    ],
    caseStudyEn: "In an administrative office in Birgunj, a clerk saves all citizenship applications, tax clearance receipts, and business registrations directly onto the Desktop. Within 3 months, the desktop has over 1,200 loose files, freezing the screen whenever File Explorer starts. By creating 3 organized parent folders ('01_Citizenship', '02_Tax_Receipts', '03_Registrations'), searching time dropped from 15 minutes to under 5 seconds.",
    caseStudyNe: "वीरगन्जको एक सरकारी कार्यालयमा सबै कागजात डेस्कटपमै जथाभावी राख्दा १,२०० फाइल भएर कम्प्युटर निकै स्लो भयो। जब ३ वटा व्यवस्थित फोल्डर ('०१_नागरिकता', '०२_कर_रसिद', '०३_दर्ता') बनाएर फाइलहरू सारियो, फाइल खोज्न लाग्ने समय १५ मिनेटबाट ५ सेकेन्डमा झर्यो।",
    misconceptions: [
      {
        mythEn: "Deleting a folder only deletes the folder wrapper and keeps the files inside safe.",
        mythNe: "फोल्डर हटाउँदा (Delete गर्दा) बाहिरको बाकस मात्र हट्छ, भित्रका फाइल सुरक्षित रहन्छन्।",
        realityEn: "Deleting a folder deletes everything inside it, including all nested subfolders and files! Always check contents before deleting a folder.",
        realityNe: "फोल्डर डिलिट गर्दा त्यसबारे भित्र रहेका सबै फाइल र सब-फोल्डरहरू पनि सँगै मेटिन्छन्! त्यसैले सावधानी अपनाउनुहोस्।"
      }
    ],
    keyTerms: [
      { termEn: "File", termNe: "फाइल", definitionEn: "A block of arbitrary digital data stored under a single name.", definitionNe: "कम्प्युटरमा एउटै नाममा सुरक्षित राखिएको डिजिटल डेटाको संग्रह।" },
      { termEn: "Folder (Directory)", termNe: "फोल्डर (डाइरेक्टरी)", definitionEn: "A virtual container used for organizing and grouping computer files and subfolders.", definitionNe: "फाइलहरूलाई व्यवस्थित रूपमा मिलाएर राख्ने डिजिटल ड्रयर।" },
      { termEn: "Subfolder", termNe: "सब-फोल्डर", definitionEn: "A folder created inside another parent folder.", definitionNe: "कुनै मुख्य फोल्डर भित्र बनाइएको अर्को सानो फोल्डर।" },
      { termEn: "File Path", termNe: "फाइल पाथ (ठेगाना)", definitionEn: "The complete directory address leading to a specific file on a storage disk.", definitionNe: "कम्प्युटरमा फाइल कुन ठाउँमा छ भन्ने पूर्ण बाटो वा ठेगाना।" }
    ],
    flashcards: [
      { id: "fm-f101", frontEn: "What is a Computer File?", frontNe: "कम्प्युटर फाइल के हो?", backEn: "A discrete collection of digital data (text, image, audio) stored with a specific name and extension.", backNe: "कुनै निश्चित नाम र एक्सटेन्सनमा सुरक्षित राखिएको डिजिटल डेटा।" },
      { id: "fm-f102", frontEn: "What is a Folder?", frontNe: "फोल्डर के हो?", backEn: "A digital container used to organize and hold files and subfolders in structured categories.", backNe: "फाइलहरूलाई मिलाएर राख्ने डिजिटल बाकस वा ड्रयर।" },
      { id: "fm-f103", frontEn: "What happens if you delete a folder?", frontNe: "फोल्डर डिलिट गर्दा के हुन्छ?", backEn: "The folder and ALL files/subfolders inside it are moved to the Recycle Bin.", backNe: "त्यसभित्र रहेका सबै फाइल र सब-फोल्डरहरू पनि सँगै डिलिट हुन्छन्।" },
      { id: "fm-f104", frontEn: "What is a File Path?", frontNe: "फाइल पाथ (File Path) के हो?", backEn: "The full route to a file on disk (e.g. C:\\Users\\User\\Documents\\Resume.pdf).", backNe: "फाइल रहेको पूर्ण ठेगाना (जस्तै: C:\\Users\\Documents)।" },
      { id: "fm-f105", frontEn: "Which units measure file size?", frontNe: "फाइल साइज नाप्ने एकाइहरू के हुन्?", backEn: "Bytes (B), Kilobytes (KB), Megabytes (MB), and Gigabytes (GB).", backNe: "बाइट, किलोबाइट (KB), मेगाबाइट (MB) र गिगाबाइट (GB)।" }
    ],
    quiz: [
      {
        question: "What is a digital computer file?",
        questionNe: "डिजिटल कम्प्युटर फाइल भनेको के हो?",
        options: [
          "A collection of digital data stored under a unique name",
          "A plastic box placed beside the monitor",
          "A wire connecting the CPU to power",
          "A type of physical printer ink"
        ],
        answer: 0,
        explanation: "A file is a discrete digital record holding text, images, video, or data on a storage disk."
      },
      {
        question: "What is the primary purpose of creating folders?",
        questionNe: "फोल्डर बनाउनुको मुख्य उद्देश्य के हो?",
        options: [
          "To organize, categorize, and quickly locate files",
          "To make the computer heavy",
          "To decrease internet speed",
          "To delete old photos automatically"
        ],
        answer: 0,
        explanation: "Folders provide structured drawers to group related files and prevent chaotic desktop clutter."
      },
      {
        question: "If you delete a parent folder named 'College_Projects', what happens to the files inside?",
        questionNe: "'College_Projects' नामक फोल्डर हटाउँदा भित्रका फाइल के हुन्छन्?",
        options: [
          "Only the folder is deleted; files remain floating on the desktop",
          "The folder and ALL contained files are deleted together",
          "Files are automatically uploaded to YouTube",
          "Files turn into sound tracks"
        ],
        answer: 1,
        explanation: "Deleting a folder deletes every file and subfolder contained within it."
      },
      {
        question: "Which of the following represents a full file path in Windows?",
        questionNe: "विन्डोजमा पूर्ण फाइल पाथ (ठेगाना) कुन हो?",
        options: [
          "C:\\Users\\Student\\Documents\\BioData.docx",
          "http://google.com/search",
          "Ctrl + Alt + Delete",
          "Windows Key + L"
        ],
        answer: 0,
        explanation: "A file path traces the drive letter, folders, subfolders, and final filename with its extension."
      }
    ]
  },

  // =========================================================================
  // LESSON 02: Understanding File Extensions & Formats
  // =========================================================================
  {
    id: 2,
    slug: "understanding-file-extensions-and-formats",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 2,
    titleEn: "Understanding File Extensions & Formats",
    titleNe: "फाइलका प्रकार र एक्सटेन्सनहरू",
    subtitleEn: "Learn why .pdf, .docx, .xlsx, .jpg, and .zip tell your PC how to open files.",
    subtitleNe: "फाइल एक्सटेन्सनले कम्प्युटरलाई फाइल कसरी खोल्ने भन्ने कुरा कसरी निर्देशन गर्छ?",
    duration: "12 mins",
    readTime: "9 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Master file extensions (.pdf, .docx, .xlsx, .pptx, .jpg, .png, .mp4, .zip), discover default software associations, and protect yourself against hidden executable malware (.pdf.exe).",
    summaryNe: "फाइलका मुख्य एक्सटेन्सनहरू (.pdf, .docx, .xlsx, .jpg, .zip), ती खोल्ने सफ्टवेयरहरू, र भाइरसयुक्त एक्सटेन्सनबाट बच्ने उपायहरू सिक्नुहोस्।",
    objectives: [
      { en: "Identify standard file extensions for documents, spreadsheets, images, and video", ne: "डकुमेन्ट, हिसाब, तस्बिर र भिडियोका मुख्य एक्सटेन्सनहरू पहिचान गर्ने" },
      { en: "Understand default program associations and how to use 'Open With'", ne: "'Open With' प्रयोग गरेर आफूलाई मनपर्ने सफ्टवेयरबाट फाइल खोल्न सिक्ने" },
      { en: "Recognize dangerous double extensions like 'Invoice.pdf.exe'", ne: "'Invoice.pdf.exe' जस्ता शंकास्पद भाइरस फाइल पहिचान गर्ने" }
    ],
    sections: [
      {
        id: "sec-ext-def",
        titleEn: "1. What is a File Extension? (फाइल एक्सटेन्सन के हो?)",
        titleNe: "१. फाइल एक्सटेन्सनको अर्थ र महत्त्व",
        contentEn: "A file extension is a suffix of 3 or 4 letters following a dot at the end of a filename (e.g., `.pdf`, `.docx`, `.png`). The operating system uses this extension to identify the format of the data and determine which software application should open it when you double-click.",
        contentNe: "फाइलको नामको पछाडि थोप्ला (.) पछिका ३ वा ४ वटा अक्षरलाई फाइल एक्सटेन्सन भनिन्छ (जस्तै `.pdf`, `.docx`)। यसले कम्प्युटरलाई यो फाइल कुन सफ्टवेयरले खोल्ने भन्ने जानकारी दिन्छ।",
        bulletPointsEn: [
          "<strong>Dot Separator:</strong> In <code>Report.docx</code>, <code>Report</code> is the name, and <code>.docx</code> is the extension.",
          "<strong>Determines the Default App:</strong> Double-clicking a <code>.xlsx</code> file tells Windows to launch Microsoft Excel or Google Sheets.",
          "<strong>Changing the extension manually:</strong> Renaming <code>Photo.jpg</code> to <code>Photo.docx</code> does NOT convert the image to Word; it only confuses the computer!"
        ],
        bulletPointsNe: [
          "<strong>थोप्लाले छुट्याउँछ:</strong> <code>Report.docx</code> मा <code>.docx</code> एक्सटेन्सन हो।",
          "<strong>सफ्टवेयर पहिचान:</strong> <code>.xlsx</code> ले एक्सेल खोल्छ।",
          "<strong>एक्सटेन्सन जबरजस्ती नफेर्नुहोस्:</strong> नाम फेर्दैमा फोटो वर्ड डकुमेन्ट बन्दैन।"
        ]
      },
      {
        id: "sec-ext-table",
        titleEn: "2. Common File Types in Everyday Use (दैनिक प्रयोग हुने एक्सटेन्सनहरू)",
        titleNe: "२. मुख्य फाइल एक्सटेन्सन तालिका",
        contentEn: "Here are the universal file formats you will encounter in offices, schools, and online services in Nepal:",
        contentNe: "नेपालका अफिस, कलेज र अनलाइन सेवाहरूमा प्रयोग हुने मुख्य फाइल प्रकारहरू:",
        bulletPointsEn: [
          "<strong>.pdf (Portable Document Format):</strong> Official government forms, CVs, bank statements, and school transcripts.",
          "<strong>.docx (Microsoft Word):</strong> Editable essays, office memos, job applications, and letters.",
          "<strong>.xlsx (Microsoft Excel):</strong> Financial tables, accounting sheets, and student mark ledgers.",
          "<strong>.pptx (PowerPoint):</strong> Presentation slide decks for meetings and classrooms.",
          "<strong>.jpg / .png:</strong> Camera photos and clean graphic screenshots.",
          "<strong>.zip:</strong> Compressed folders holding multiple files in small size.",
          "<strong>.mp4 / .mp3:</strong> Digital video lectures and audio recordings."
        ],
        bulletPointsNe: [
          "<strong>.pdf:</strong> सरकारी फारम, बायोडाटा, बैंक स्टेटमेन्ट।",
          "<strong>.docx:</strong> सम्पादन गर्न सकिने वर्ड डकुमेन्ट।",
          "<strong>.xlsx:</strong> हिसाब, बजेट र नतिजा सिट।",
          "<strong>.pptx:</strong> प्रेजेन्टेसन स्लाइडहरू।",
          "<strong>.jpg / .png:</strong> क्यामेरा फोटो र स्क्रिनसट।",
          "<strong>.zip:</strong> कम्प्रेस गरिएका फाइलहरूको पोको।",
          "<strong>.mp4 / .mp3:</strong> भिडियो र अडियो फाइल।"
        ]
      },
      {
        id: "sec-security-ext",
        titleEn: "3. File Extension Security & Malicious Tricks (एक्सटेन्सन सुरक्षा)",
        titleNe: "३. भाइरसबाट बच्ने एक्सटेन्सन सुरक्षा",
        contentEn: "Cybercriminals often attempt to trick users by sending executable program files (`.exe`) disguised as harmless documents (e.g., `Electricity_Bill_Nepal.pdf.exe`). Windows always executes the FINAL extension. If you double-click this file, it will install malware instead of showing a bill!",
        contentNe: "ह्याकरहरूले भाइरस फैलाउन फाइलको नाम <code>Electricity_Bill.pdf.exe</code> राख्ने गर्छन्। विन्डोजले सधैं अन्तिमको <code>.exe</code> लाई मुख्य मान्छ। यस्तो फाइल खोल्दा भाइरस लाग्न सक्छ!",
        bulletPointsEn: [
          "<strong>Turn on 'File name extensions' in View tab:</strong> Make sure Windows always shows the full extension.",
          "<strong>Never open unknown .exe, .bat, or .vbs files:</strong> Especially from strange emails or WhatsApp messages.",
          "<strong>Use 'Open With' for choice:</strong> Right-click → 'Open with' lets you open a PDF in Edge, Chrome, or Adobe Reader."
        ],
        bulletPointsNe: [
          "<strong>File name extensions अन गर्नुहोस्:</strong> जसले गर्दा फाइलको पूरा नाम प्रस्ट देखियोस्।",
          "<strong>अज्ञात .exe फाइल नखोल्नुहोस्:</strong> इमेलमा आएका शंकास्पद फाइलबाट बच्नुहोस्।",
          "<strong>'Open With' को प्रयोग:</strong> दायाँ क्लिक गरेर आफूलाई मनपर्ने एपबाट खोल्नुहोस्।"
        ]
      }
    ],
    caseStudyEn: "A staff member in a travel agency in Thamel received an email with an attachment titled 'Customer_Flight_Tickets.docx.exe'. Because file extensions were hidden by default, the staff thought it was a Word document and clicked it, locking their accounting files with ransomware. Turning on 'Show File Name Extensions' in File Explorer immediately reveals dangerous disguised files.",
    caseStudyNe: "ठमेलको एक ट्राभल एजेन्सीमा 'Flight_Tickets.docx.exe' नामको इमेल आयो। एक्सटेन्सन लुकेको हुनाले कर्मचारीले वर्ड फाइल ठानेर खोल्दा कम्प्युटरमा भाइरस पस्यो। एक्सटेन्सन देखिने बनाउँदा यस्ता धोकाबाट तुरुन्तै बच्न सकिन्छ।",
    misconceptions: [
      {
        mythEn: "Changing the extension of a file from .mp4 to .mp3 converts the video into an audio file.",
        mythNe: ".mp4 भिडियोको नाम फेरेर .mp3 बनाउँदा त्यो आफैं अडियो फाइलमा परिणत हुन्छ।",
        realityEn: "Renaming the extension only changes the label, not the internal encoding. The file will become unreadable or corrupted until restored.",
        realityNe: "नाम फेर्दैमा भित्री कोड फेरिँदैन। फाइल नखुल्ने वा बिग्रिने हुन सक्छ। कन्भर्ट गर्न उचित सफ्टवेयर चाहिन्छ।"
      }
    ],
    keyTerms: [
      { termEn: "File Extension", termNe: "फाइल एक्सटेन्सन", definitionEn: "The 3 or 4 letter suffix at the end of a filename indicating its format and type.", definitionNe: "फाइलको नामको पछाडि थोप्लापछिका अक्षरहरू जसले फाइलको प्रकार जनाउँछ।" },
      { termEn: "Default Program", termNe: "पूर्वनिर्धारित सफ्टवेयर (Default App)", definitionEn: "The software application assigned by the OS to open a specific file type automatically.", definitionNe: "डबल क्लिक गर्दा फाइल आफैं खुल्ने मुख्य सफ्टवेयर।" },
      { termEn: "Open With", termNe: "ओपन विथ (Open With)", definitionEn: "Context menu option allowing the user to select an alternative application to open a file.", definitionNe: "फाइल खोल्न अन्य विभिन्न सफ्टवेयर रोज्ने विकल्प।" }
    ],
    flashcards: [
      { id: "fm-f201", frontEn: "What is a File Extension?", frontNe: "फाइल एक्सटेन्सन भनेको के हो?", backEn: "The suffix following the dot in a filename (e.g. .pdf) that identifies the file format.", backNe: "फाइलको नामपछिको थोप्ला पछिको भाग (जस्तै .pdf) जसले फाइलको प्रकार जनाउँछ।" },
      { id: "fm-f202", frontEn: "Which format is standard for non-editable official documents?", frontNe: "नबिग्रिने सरकारी वा औपचारिक कागजातका लागि कुन फर्म्याट प्रयोग हुन्छ?", backEn: "PDF (.pdf — Portable Document Format).", backNe: "PDF (.pdf — पोर्टेबल डकुमेन्ट फर्म्याट)।" },
      { id: "fm-f203", frontEn: "Which application opens a .xlsx file?", frontNe: ".xlsx फाइल कुन सफ्टवेयरले खोल्छ?", backEn: "Microsoft Excel, Google Sheets, or LibreOffice Calc.", backNe: "माइक्रोसफ्ट एक्सेल वा गुगल सिट्स।" },
      { id: "fm-f204", frontEn: "What is an .exe file?", frontNe: ".exe फाइल के हो?", backEn: "A Windows executable program file used to run and install applications.", backNe: "विन्डोजमा प्रोग्राम चलाउने र इन्स्टल गर्ने फाइल।" },
      { id: "fm-f205", frontEn: "What does 'Open With' do?", frontNe: "'Open With' ले के गर्छ?", backEn: "Lets you choose which application opens a file instead of the default one.", backNe: "फाइल खोल्न चाहेको छुट्टै सफ्टवेयर रोज्न दिन्छ।" }
    ],
    quiz: [
      {
        question: "Which file extension indicates a spreadsheet used for calculations and budgeting?",
        questionNe: "हिसाब-किताब र बजेटका लागि कुन फाइल एक्सटेन्सन प्रयोग हुन्छ?",
        options: [".xlsx", ".mp3", ".jpg", ".exe"],
        answer: 0,
        explanation: ".xlsx is the standard file extension for Microsoft Excel spreadsheets."
      },
      {
        question: "Why should you NOT manually rename a file from 'MySong.mp3' to 'MySong.docx'?",
        questionNe: "फाइलको नाम 'MySong.mp3' बाट 'MySong.docx' मा किन फेर्नु हुँदैन?",
        options: [
          "It confuses the OS and does not actually convert audio into a text document",
          "It makes the keyboard stop working",
          "It permanently melts the CPU chip",
          "It turns off the internet router"
        ],
        answer: 0,
        explanation: "Renaming an extension only changes the label, leaving the internal binary data incompatible with Word."
      },
      {
        question: "What is the final true format of a file named 'Tax_Form_2026.pdf.exe'?",
        questionNe: "'Tax_Form_2026.pdf.exe' नामको फाइलको वास्तविक प्रकार के हो?",
        options: [
          "An executable program (.exe) that could run potentially dangerous code",
          "A safe standard PDF file",
          "An image file",
          "A music file"
        ],
        answer: 0,
        explanation: "Windows evaluates the final suffix (.exe), making this an executable program rather than a PDF document."
      }
    ]
  },

  // =========================================================================
  // LESSON 03: File Explorer / Finder Navigation
  // =========================================================================
  {
    id: 3,
    slug: "navigating-file-explorer-and-drives",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 3,
    titleEn: "Navigating File Explorer & Drives",
    titleNe: "फाइल एक्सप्लोरर र ड्राइभहरू चलाउने तरिका",
    subtitleEn: "Master This PC, C: Drive vs D: Drive, standard libraries, and navigation breadcrumbs.",
    subtitleNe: "दिस पीसी (This PC), सी र डी ड्राइभ, र फाइल एक्सप्लोरर नेभिगेसन बुझौं।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Explore the internal organization of Windows File Explorer: navigate between system drives (C:) and personal drives (D:), use default libraries (Documents, Downloads, Pictures), and use breadcrumbs to never get lost.",
    summaryNe: "फाइल एक्सप्लोररको प्रयोग, सी ड्राइभ र डी ड्राइभ बीचको भिन्नता, मुख्य फोल्डरहरू (Documents, Downloads), र ठेगाना बार (Address Bar) प्रयोग गर्न सिक्नुहोस्।",
    objectives: [
      { en: "Understand the layout of Windows File Explorer (Sidebar, Address Bar, Search Bar)", ne: "फाइल एक्सप्लोररका मुख्य भागहरू बुझ्ने" },
      { en: "Differentiate between Local Disk C: (System) and Local Disk D: (Personal Data)", ne: "सी ड्राइभ (सिस्टम) र डी ड्राइभ (व्यक्तिगत डेटा) बीचको फरक बुझ्ने" },
      { en: "Use default Windows user folders: Desktop, Documents, Downloads, Pictures", ne: "विन्डोजका मुख्य फोल्डरहरू (Documents, Downloads) प्रयोग गर्ने" }
    ],
    sections: [
      {
        id: "sec-explorer-layout",
        titleEn: "1. The Anatomy of File Explorer (फाइल एक्सप्लोररका भागहरू)",
        titleNe: "१. फाइल एक्सप्लोररको संरचना",
        contentEn: "File Explorer (shortcut: `Win + E`) is the built-in file manager of Windows. It consists of 4 primary navigation areas:",
        contentNe: "फाइल एक्सप्लोरर खोल्ने सर्टकट <code>Win + E</code> हो। यसका ४ मुख्य भागहरू हुन्छन्:",
        bulletPointsEn: [
          "<strong>1. Navigation Pane (Left Sidebar):</strong> Quick links to Desktop, Downloads, Documents, This PC, and USB drives.",
          "<strong>2. Address Bar / Breadcrumbs (Top):</strong> Shows your exact current location (e.g. <code>This PC > Documents > LokSewa</code>).",
          "<strong>3. Search Box (Top Right):</strong> Instant search filter for finding files in the active folder.",
          "<strong>4. Main Content Area (Center):</strong> Displays all files and subfolders in icons or list view."
        ],
        bulletPointsNe: [
          "<strong>१. बायाँ साइडबार:</strong> मुख्य फोल्डर र ड्राइभहरूमा जाने छिटो बाटो।",
          "<strong>२. ठेगाना बार (Address Bar):</strong> तपाईं कुन फोल्डरमा हुनुहुन्छ प्रस्ट देखाउँछ।",
          "<strong>३. सर्च बक्स:</strong> चालु फोल्डर भित्रका फाइल खोज्ने ठाउँ।",
          "<strong>४. मुख्य फाइल क्षेत्र:</strong> फाइल र फोल्डरहरू देखिने ठाउँ।"
        ]
      },
      {
        id: "sec-drives-cd",
        titleEn: "2. C: Drive vs. D: Drive: Where Should You Save Work? (C: र D: ड्राइभ)",
        titleNe: "२. सी ड्राइभ र डी ड्राइभ बीचको भिन्नता",
        contentEn: "Most desktop and laptop computers in Nepal are partitioned into two main storage disks:",
        contentNe: "कम्प्युटरमा प्रायः दुईवटा मुख्य ड्राइभहरू बनाइएको हुन्छ:",
        bulletPointsEn: [
          "<strong>Local Disk (C:):</strong> Reserved for the Windows Operating System, core system drivers, and installed applications (Program Files).",
          "<strong>Data Disk (D: / E:):</strong> Recommended location for all your personal files, office archives, student projects, photos, and movies.",
          "<strong>Why keep personal files in D:?</strong> If Windows crashes and requires reinstallation/formatting, everything inside C: is erased, but files in D: remain 100% safe!"
        ],
        bulletPointsNe: [
          "<strong>सी ड्राइभ (C:):</strong> विन्डोज अपरेटिङ सिस्टम र एपहरू बस्ने ठाउँ।",
          "<strong>डी ड्राइभ (D:):</strong> आफ्ना व्यक्तिगत कागजात, फोटो र अफिसका फाइल राख्ने ठाउँ।",
          "<strong>फाइलहरू D: मा किन राख्ने?</strong> विन्डोज बिग्रिएर फर्म्याट गर्दा C: को डेटा मेटिन्छ, तर D: को डेटा सुरक्षित रहन्छ।"
        ]
      }
    ],
    caseStudyEn: "A college student in Pokhara kept all their 4-year thesis notes and assignments on the Desktop (which is part of the C: Drive). When their laptop caught a virus and required a Windows reset, all desktop documents were formatted away. Keeping documents on the D: Drive or backed up to Google Drive prevents heartbreaking data loss.",
    caseStudyNe: "पोखराका एक विद्यार्थीले कलेजका सबै थेसिस फाइलहरू डेस्कटप (C: ड्राइभ) मै राखेका थिए। विन्डोज बिग्रिएर फर्म्याट गर्दा सबै थेसिस हरायो। आफ्ना महत्त्वपूर्ण फाइलहरू सधैं D: ड्राइभ वा क्लाउडमा राख्नुपर्छ।",
    misconceptions: [
      {
        mythEn: "The Desktop is a separate physical hard drive from the C: Drive.",
        mythNe: "डेस्कटप भनेको C: ड्राइभ भन्दा बिल्कुलै छुट्टै हार्डड्राइभ हो।",
        realityEn: "The Desktop is just a special folder located inside C:\\Users\\YourName\\Desktop. If C: is formatted, Desktop files are formatted too.",
        realityNe: "डेस्कटप पनि C: ड्राइभ भित्रकै एउटा फोल्डर हो। C: फर्म्याट हुँदा डेस्कटपको डेटा पनि मेटिन्छ।"
      }
    ],
    keyTerms: [
      { termEn: "File Explorer", termNe: "फाइल एक्सप्लोरर", definitionEn: "The graphical file management utility built into the Windows operating system.", definitionNe: "विन्डोजमा फाइल र फोल्डर हेर्ने र चलाउने मुख्य एप।" },
      { termEn: "C: Drive", termNe: "सी ड्राइभ (C:)", definitionEn: "The primary hard drive partition that holds the Windows operating system and installed software.", definitionNe: "अपरेटिङ सिस्टम र सफ्टवेयर रहने मुख्य डिस्क।" },
      { termEn: "D: Drive", termNe: "डी ड्राइभ (D:)", definitionEn: "A secondary storage partition dedicated to storing user documents, media, and backups safely.", definitionNe: "व्यक्तिगत फाइल र ब्याकअप सुरक्षित राख्ने छुट्टै डिस्क।" },
      { termEn: "Address Bar", termNe: "ठेगाना बार (Address Bar)", definitionEn: "The bar showing the hierarchical path of the currently open folder.", definitionNe: "चालु फोल्डरको पूर्ण बाटो देखाउने बार।" }
    ],
    flashcards: [
      { id: "fm-f301", frontEn: "What is the shortcut to open File Explorer?", frontNe: "फाइल एक्सप्लोरर खोल्ने किबोर्ड सर्टकट के हो?", backEn: "Windows Key + E.", backNe: "विन्डोज की + E (Win + E)।" },
      { id: "fm-f302", frontEn: "Why should you store personal work in D: Drive instead of C:?", frontNe: "व्यक्तिगत फाइल C: को साटो D: मा किन राख्नुपर्छ?", backEn: "Because if Windows crashes and C: is formatted, D: Drive data remains safe.", backNe: "किनकि विन्डोज फर्म्याट गर्दा C: मेटिए पनि D: को फाइल सुरक्षित रहन्छ।" },
      { id: "fm-f303", frontEn: "Where do internet downloads go by default?", frontNe: "इन्टरनेटबाट डाउनलोड गरेका फाइल कहाँ बस्छन्?", backEn: "In the 'Downloads' folder inside File Explorer.", backNe: "फाइल एक्सप्लोररको 'Downloads' फोल्डरमा।" }
    ],
    quiz: [
      {
        question: "What keyboard shortcut opens File Explorer instantly in Windows?",
        questionNe: "विन्डोजमा फाइल एक्सप्लोरर तुरुन्तै खोल्ने सर्टकट के हो?",
        options: ["Windows Key + E", "Ctrl + Alt + Del", "Alt + F4", "Windows Key + L"],
        answer: 0,
        explanation: "Pressing Win + E launches File Explorer from anywhere in Windows."
      },
      {
        question: "Why is it best practice to keep personal data in the D: Drive?",
        questionNe: "व्यक्तिगत फाइलहरू D: ड्राइभमा राख्नु किन उत्तम मानिन्छ?",
        options: [
          "It protects your files if the C: drive needs to be formatted or reinstalled",
          "It makes your computer run on battery power forever",
          "It increases your typing speed",
          "It changes the monitor resolution"
        ],
        answer: 0,
        explanation: "The C: drive holds the OS; keeping personal files on D: insulates them from system formatting."
      }
    ]
  },

  // =========================================================================
  // LESSON 04: Creating, Renaming & Deleting Files and Folders
  // =========================================================================
  {
    id: 4,
    slug: "creating-renaming-and-deleting-files",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 4,
    titleEn: "Creating, Renaming & Deleting Files and Folders",
    titleNe: "नयाँ बनाउने, नाम फेर्ने र हटाउने",
    subtitleEn: "Learn Ctrl+Shift+N, F2 renaming rules, forbidden characters, and Recycle Bin safety.",
    subtitleNe: "नयाँ फोल्डर बनाउने, F2 बाट नाम फेर्ने र रद्दीको टोकरीबाट फाइल पुन: प्राप्त गर्ने तरिका।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Master essential file operations: create folders with Ctrl+Shift+N, rename with F2 using clean professional naming conventions, understand illegal filename characters, and restore deleted files from the Recycle Bin.",
    summaryNe: "नयाँ फोल्डर बनाउने, F2 बाट नाम फेर्ने, नाममा प्रयोग गर्न नमिल्ने संकेतहरू, र गल्तीले मेटिएका फाइलहरू Recycle Bin बाट फिर्ता ल्याउने तरिका सिक्नुहोस्।",
    objectives: [
      { en: "Create new folders quickly using mouse context menus and keyboard shortcuts (Ctrl+Shift+N)", ne: "सर्टकट (Ctrl+Shift+N) बाट नयाँ फोल्डर बनाउने" },
      { en: "Rename files and folders using F2 and adhere to clean naming conventions", ne: "F2 थिचेर नाम फेर्ने र उपयुक्त नाम राख्ने" },
      { en: "Recognize illegal filename characters: \\ / : * ? \" < > |", ne: "नाममा राख्न नमिल्ने ९ वटा चिन्हहरू बुझ्ने" },
      { en: "Understand Recycle Bin safety vs Permanent Deletion (Shift + Delete)", ne: "Recycle Bin र स्थायी रूपमा हटाउने (Shift + Delete) को फरक बुझ्ने" }
    ],
    sections: [
      {
        id: "sec-create-folder",
        titleEn: "1. Creating a New Folder (नयाँ फोल्डर बनाउने)",
        titleNe: "१. नयाँ फोल्डर बनाउने २ तरिकाहरू",
        contentEn: "You can create a new folder anywhere on your computer using either the mouse or keyboard:",
        contentNe: "कम्प्युटरको कुनै पनि ठाउँमा नयाँ फोल्डर बनाउन दुई तरिकाहरू छन्:",
        bulletPointsEn: [
          "<strong>Method 1 (Keyboard Shortcut):</strong> Press <code>Ctrl + Shift + N</code> simultaneously.",
          "<strong>Method 2 (Mouse):</strong> Right-click on empty space → Select <code>New</code> → Click <code>Folder</code>.",
          "<strong>Type the name immediately:</strong> When the blue highlighted box appears, type your chosen name and press <code>Enter</code>."
        ],
        bulletPointsNe: [
          "<strong>तरिका १ (किबोर्ड सर्टकट):</strong> एकैसाथ <code>Ctrl + Shift + N</code> थिच्नुहोस्।",
          "<strong>तरिका २ (माउस):</strong> खाली ठाउँमा दायाँ क्लिक → <code>New</code> → <code>Folder</code> रोज्नुहोस्।",
          "<strong>तुरुन्तै नाम लेख्नुहोस्:</strong> नाम लेखेर <code>Enter</code> थिच्नुहोस्।"
        ]
      },
      {
        id: "sec-rename-rules",
        titleEn: "2. Renaming Rules & Illegal Characters (नाम फेर्ने नियम)",
        titleNe: "२. नाम फेर्ने नियम र निषेधित चिन्हहरू",
        contentEn: "To rename any file or folder, click on it once to select it, and press `F2` on your keyboard (or right-click → Rename).",
        contentNe: "फाइलको नाम फेर्न त्यसलाई सेलेक्ट गरी किबोर्डमा <code>F2</code> थिच्नुहोस्।",
        bulletPointsEn: [
          "<strong>Best Practice Naming:</strong> Use clear, descriptive names with dates (e.g. <code>Resume_Dinanath_2026.pdf</code> instead of <code>final_final2_new.pdf</code>).",
          "<strong>Illegal Characters:</strong> Operating systems prohibit these 9 special characters in filenames: <code>\\ / : * ? \" &lt; &gt; |</code> because they are reserved for system commands.",
          "<strong>Keep extensions intact:</strong> When renaming, only change the name before the dot, not the <code>.pdf</code> or <code>.docx</code> suffix."
        ],
        bulletPointsNe: [
          "<strong>राम्रो नाम राख्ने शैली:</strong> मिति र विषय स्पष्ट खुल्ने नाम राख्नुहोस्।",
          "<strong>प्रयोग गर्न नमिल्ने चिन्हहरू:</strong> <code>\\ / : * ? \" &lt; &gt; |</code> यी चिन्हहरू नाममा राख्न पाइँदैन।",
          "<strong>एक्सटेन्सन नहटाउनुहोस्:</strong> थोप्लापछिको भाग (.pdf) यथावत राख्नुहोस्।"
        ]
      },
      {
        id: "sec-recycle-bin",
        titleEn: "3. Deleting & Restoring from Recycle Bin (हटाउने र फिर्ता ल्याउने)",
        titleNe: "३. रद्दीको टोकरी (Recycle Bin) को सुरक्षा",
        contentEn: "When you press the `Delete` key on a file, Windows does NOT permanently erase it. It moves the file into the **Recycle Bin** as a safety cushion.",
        contentNe: "फाइल सेलेक्ट गरेर <code>Delete</code> थिच्दा त्यो तुरुन्तै नष्ट हुँदैन, <code>Recycle Bin</code> मा गएर बस्छ।",
        bulletPointsEn: [
          "<strong>Restoring an accidentally deleted file:</strong> Open Recycle Bin on your desktop → Right-click the file → Click <code>Restore</code> (it jumps right back to its original location!).",
          "<strong>Permanent Deletion (Shift + Delete):</strong> Pressing <code>Shift + Delete</code> completely erases the file, bypassing the Recycle Bin. Use with extreme caution!",
          "<strong>Emptying Recycle Bin:</strong> Periodically right-click Recycle Bin → 'Empty Recycle Bin' to free up disk storage space."
        ],
        bulletPointsNe: [
          "<strong>फाइल फिर्ता ल्याउन (Restore):</strong> Recycle Bin खोल्नुहोस् → दायाँ क्लिक → <code>Restore</code> थिच्नुहोस्।",
          "<strong>स्थायी रूपमा हटाउन (Shift + Delete):</strong> यो गर्दा Recycle Bin मा नबसी सधैंका लागि मेटिन्छ।",
          "<strong>खाली गर्ने:</strong> डिस्क खाली गर्न समय समयमा 'Empty Recycle Bin' गर्नुहोस्।"
        ]
      }
    ],
    caseStudyEn: "In an accounting firm in Butwal, an assistant accidentally pressed Delete on a quarterly financial ledger. Instead of panicking or re-doing 2 weeks of work, the senior accountant opened the Recycle Bin, found 'Quarter_4_Ledger.xlsx', clicked 'Restore', and the spreadsheet immediately reappeared in the accounting folder intact.",
    caseStudyNe: "बुटवलको एक अफिसमा कर्मचारीले गल्तीले २ हप्ता लगाएर बनाएको हिसाबको फाइल डिलिट गरे। तर नआत्तिई Recycle Bin खोलेर 'Restore' गर्दा फाइल तत्काल जस्ताको तस्तै आफ्नै ठाउँमा फिर्ता आयो।",
    misconceptions: [
      {
        mythEn: "Files deleted from a USB Flash Drive go into the computer's desktop Recycle Bin.",
        mythNe: "पेनड्राइभबाट डिलिट गरेका फाइलहरू पनि कम्प्युटरको Recycle Bin मा बस्छन्।",
        realityEn: "Files deleted from external USB drives are permanently deleted immediately and DO NOT go to the Recycle Bin! Always double-check before deleting from a USB stick.",
        realityNe: "पेनड्राइभबाट डिलिट गर्दा फाइल Recycle Bin मा बस्दैन, सिधै सधैंका लागि मेटिन्छ! त्यसैले पेनड्राइभमा होसियार हुनुहोस्।"
      }
    ],
    keyTerms: [
      { termEn: "Recycle Bin", termNe: "रद्दीको टोकरी (Recycle Bin)", definitionEn: "A temporary holding location for deleted files allowing recovery before permanent erasure.", definitionNe: "डिलिट गरिएका फाइलहरू अस्थायी रूपमा बस्ने ठाउँ, जहाँबाट पुनः फिर्ता ल्याउन सकिन्छ।" },
      { termEn: "Restore", termNe: "पुनःस्थापना (Restore)", definitionEn: "Returning a deleted file from the Recycle Bin back to its original folder.", definitionNe: "मेटिएको फाइललाई Recycle Bin बाट पहिलेकै ठाउँमा फिर्ता पठाउने कार्य।" },
      { termEn: "Shift + Delete", termNe: "स्थायी डिलिट (Shift + Delete)", definitionEn: "Keyboard combination to permanently delete a file, bypassing the Recycle Bin entirely.", definitionNe: "Recycle Bin मा नराखी सिधै सधैंका लागि मेटाउने सर्टकट।" }
    ],
    flashcards: [
      { id: "fm-f401", frontEn: "What is the shortcut to create a New Folder?", frontNe: "नयाँ फोल्डर बनाउने किबोर्ड सर्टकट के हो?", backEn: "Ctrl + Shift + N.", backNe: "Ctrl + Shift + N।" },
      { id: "fm-f402", frontEn: "What is the shortcut key to Rename a file?", frontNe: "फाइलको नाम फेर्ने सर्टकट के हो?", backEn: "F2.", backNe: "F2।" },
      { id: "fm-f403", frontEn: "How do you recover a deleted file?", frontNe: "डिलिट भएको फाइल कसरी फिर्ता ल्याउने?", backEn: "Open Recycle Bin → Right-click the file → Select 'Restore'.", backNe: "Recycle Bin खोल्ने → फाइलमा दायाँ क्लिक → 'Restore' रोज्ने।" },
      { id: "fm-f404", frontEn: "What does Shift + Delete do?", frontNe: "Shift + Delete ले के गर्छ?", backEn: "Permanently deletes the file without sending it to the Recycle Bin.", backNe: "Recycle Bin मा नराखी स्थायी रूपमा मेटाउँछ।" }
    ],
    quiz: [
      {
        question: "Which keyboard shortcut creates a new folder in Windows File Explorer?",
        questionNe: "विन्डोज फाइल एक्सप्लोररमा नयाँ फोल्डर बनाउने सर्टकट कुन हो?",
        options: ["Ctrl + Shift + N", "Ctrl + Alt + N", "Win + F", "Alt + Shift + D"],
        answer: 0,
        explanation: "Ctrl + Shift + N creates a new folder instantly."
      },
      {
        question: "Which of the following characters is ILLEGAL in a file name?",
        questionNe: "तलका मध्ये कुन चिन्ह फाइलको नाममा राख्न मिल्दैन?",
        options: ["Question mark (?)", "Underscore (_)", "Hyphen (-)", "Number (9)"],
        answer: 0,
        explanation: "The characters \\ / : * ? \" < > | are forbidden in Windows filenames."
      },
      {
        question: "What happens when you delete a file from an external USB Flash Drive?",
        questionNe: "पेनड्राइभबाट फाइल डिलिट गर्दा के हुन्छ?",
        options: [
          "It is permanently deleted immediately and does NOT go to Recycle Bin",
          "It goes to the desktop Recycle Bin safely",
          "It copies itself to Google Drive automatically",
          "It sends an email to Microsoft"
        ],
        answer: 0,
        explanation: "Removable USB drives do not support the Windows desktop Recycle Bin; deletions are permanent."
      }
    ]
  },

  // =========================================================================
  // LESSON 05: Copying, Moving & Organizing Files
  // =========================================================================
  {
    id: 5,
    slug: "copying-moving-and-organizing-files",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 5,
    titleEn: "Copying, Moving & Organizing Files",
    titleNe: "फाइल सार्ने र कपी गर्ने तरिका",
    subtitleEn: "Master Copy vs Cut, Ctrl+C / Ctrl+X / Ctrl+V, multi-selection (Shift/Ctrl), and drag-and-drop.",
    subtitleNe: "कपी (Copy), कट (Cut), पेस्ट (Paste), र धेरै फाइलहरू एकैपटक सेलेक्ट गर्ने तरिका।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Learn the difference between duplicating files (Copy) and relocating files (Cut/Move), master keyboard shortcuts (Ctrl+C, Ctrl+X, Ctrl+V), select multiple items with Ctrl/Shift, and practice drag-and-drop.",
    summaryNe: "फाइल कपी गर्ने (Duplicate) र फाइल सार्ने (Move) बीचको भिन्नता, सर्टकटहरू (Ctrl+C, Ctrl+X, Ctrl+V), र धेरै फाइल एकैसाथ छानेर सार्ने विधि सिक्नुहोस्।",
    objectives: [
      { en: "Differentiate between Copy (duplicate) and Cut/Move (relocate)", ne: "कपी (Duplicate) र कट/मुभ (सार्ने) को फरक बुझ्ने" },
      { en: "Execute file transfers using Ctrl+C, Ctrl+X, and Ctrl+V with speed", ne: "Ctrl+C, Ctrl+X, Ctrl+V बाट छिटो काम गर्न सिक्ने" },
      { en: "Select multiple non-adjacent files (Ctrl + Click) and continuous ranges (Shift + Click)", ne: "Ctrl र Shift थिचेर धेरै फाइलहरू एकैपटक सेलेक्ट गर्ने" }
    ],
    sections: [
      {
        id: "sec-copy-vs-cut",
        titleEn: "1. Copy vs. Cut (Move): The Core Difference (कपी र कटको भिन्नता)",
        titleNe: "१. कपी र कट बीचको भिन्नता",
        contentEn: "Understanding whether to Copy or Cut is fundamental to digital file management:",
        contentNe: "फाइल व्यवस्थापनमा कपी र कटको सही प्रयोग जान्नु निकै जरुरी छ:",
        bulletPointsEn: [
          "<strong>Copy (Ctrl + C):</strong> Creates a duplicate clone. The original file stays in its existing folder, and a second identical copy is pasted in the new location.",
          "<strong>Cut / Move (Ctrl + X):</strong> Relocates the original file. It removes the file from the source folder and places it into the target folder.",
          "<strong>Paste (Ctrl + V):</strong> The command that drops the copied or cut item into your currently active folder."
        ],
        bulletPointsNe: [
          "<strong>कपी (Ctrl + C):</strong> हुबहु नक्कल (Duplicate) बनाउँछ। पुरानो ठाउँमा पनि रहन्छ र नयाँ ठाउँमा पनि बस्छ।",
          "<strong>कट (Ctrl + X):</strong> फाइललाई पुरानो ठाउँबाट हटाएर नयाँ ठाउँमा सार्छ।",
          "<strong>पेस्ट (Ctrl + V):</strong> कपी वा कट गरिएको फाइललाई नयाँ ठाउँमा राख्ने आदेश।"
        ]
      },
      {
        id: "sec-multi-select",
        titleEn: "2. Supercharged Multi-File Selection Techniques (धेरै फाइल सेलेक्ट गर्ने तरिका)",
        titleNe: "२. एकैपटक धेरै फाइल छान्ने विधि",
        contentEn: "Selecting files one by one is slow. Use these power-user selection shortcuts:",
        contentNe: "एक-एक गर्दै फाइल सार्नु झन्झटिलो हुन्छ। यी किबोर्ड तरिकाहरू अपनाउनुहोस्:",
        bulletPointsEn: [
          "<strong>Ctrl + A (Select All):</strong> Instantly highlights EVERY file and folder inside the current window.",
          "<strong>Ctrl + Click (Pick & Choose):</strong> Hold <code>Ctrl</code> and click individual files anywhere in the list to select non-adjacent items.",
          "<strong>Shift + Click (Range Select):</strong> Click the first file, hold <code>Shift</code>, and click the last file. All 50 files in between will be selected automatically!"
        ],
        bulletPointsNe: [
          "<strong>Ctrl + A:</strong> फोल्डरभित्रका सबै फाइलहरू एकैपटक सेलेक्ट गर्छ।",
          "<strong>Ctrl + Click:</strong> छानीछानी फरक-फरक ठाउँका फाइलहरू सेलेक्ट गर्न।",
          "<strong>Shift + Click:</strong> पहिलो फाइल थिचेर Shift थिची अन्तिम फाइल थिच्दा बीचका सबै सेलेक्ट हुन्छन्।"
        ]
      }
    ],
    caseStudyEn: "A school teacher in Chitwan needed to transfer 180 student exam papers from the Downloads folder to the School_Records folder. By using Shift+Click to select all 180 items in 1 second, and pressing Ctrl+X then Ctrl+V, the entire transfer took 4 seconds instead of 20 minutes of dragging files one by one.",
    caseStudyNe: "चितवनका एक शिक्षकले १८० जना विद्यार्थीका परीक्षा फारम एकैसाथ सार्न Shift+Click र Ctrl+X, Ctrl+V प्रयोग गर्दा २० मिनेट लाग्ने काम जम्मा ४ सेकेन्डमै सम्पन्न भयो।",
    misconceptions: [
      {
        mythEn: "Dragging a file between two folders always moves the file.",
        mythNe: "माउसले तानेर फाइल सार्दा त्यो सधैं Move (कट) नै हुन्छ।",
        realityEn: "Dragging between folders on the SAME drive moves the file. Dragging to a DIFFERENT drive (like to a USB flash drive) creates a COPY automatically. Look at the tooltip on your cursor!",
        realityNe: "एउटै ड्राइभमा तान्दा Move हुन्छ; तर USB पेनड्राइभमा तान्दा आफैं Copy (नक्कल) हुन्छ।"
      }
    ],
    keyTerms: [
      { termEn: "Copy", termNe: "कपी (Copy)", definitionEn: "Duplicating a file or folder to place a clone elsewhere.", definitionNe: "फाइलको हुबहु नक्कल बनाउने कार्य।" },
      { termEn: "Cut (Move)", termNe: "कट वा सार्ने (Cut/Move)", definitionEn: "Removing a file from its original location to move it into another destination.", definitionNe: "फाइललाई पुरानो ठाउँबाट हटाएर नयाँ ठाउँमा लैजाने कार्य।" },
      { termEn: "Paste", termNe: "पेस्ट (Paste)", definitionEn: "Placing the copied or cut item into the target folder.", definitionNe: "क्लिपबोर्डमा रहेको फाइललाई तोकिएको ठाउँमा राख्ने कार्य।" }
    ],
    flashcards: [
      { id: "fm-f501", frontEn: "What is the shortcut for Copy?", frontNe: "कपी गर्ने सर्टकट के हो?", backEn: "Ctrl + C.", backNe: "Ctrl + C।" },
      { id: "fm-f502", frontEn: "What is the shortcut for Cut (Move)?", frontNe: "कट (सार्ने) सर्टकट के हो?", backEn: "Ctrl + X.", backNe: "Ctrl + X।" },
      { id: "fm-f503", frontEn: "What is the shortcut for Paste?", frontNe: "पेस्ट गर्ने सर्टकट के हो?", backEn: "Ctrl + V.", backNe: "Ctrl + V।" },
      { id: "fm-f504", frontEn: "How do you select all files in a folder?", frontNe: "सबै फाइल एकैपटक कसरी सेलेक्ट गर्ने?", backEn: "Ctrl + A.", backNe: "Ctrl + A।" },
      { id: "fm-f505", frontEn: "How do you select multiple non-adjacent files?", frontNe: "फरक-फरक ठाउँका फाइलहरू कसरी छान्ने?", backEn: "Hold Ctrl while clicking each file.", backNe: "Ctrl थिचेर हरेक फाइलमा क्लिक गर्ने।" }
    ],
    quiz: [
      {
        question: "Which combination of shortcuts duplicates a file from Documents into a USB drive?",
        questionNe: "डकुमेन्टबाट पेनड्राइभमा फाइल कपी गर्न कुन सर्टकट जोडी प्रयोग गरिन्छ?",
        options: ["Ctrl + C, then Ctrl + V", "Ctrl + X, then Ctrl + Z", "Ctrl + A, then Delete", "Alt + Tab, then F4"],
        answer: 0,
        explanation: "Ctrl + C copies the file to the clipboard, and Ctrl + V pastes a duplicate into the target USB drive."
      },
      {
        question: "What does Ctrl + A do in a folder?",
        questionNe: "फोल्डरभित्र Ctrl + A थिच्दा के हुन्छ?",
        options: [
          "Selects every single file and folder in the window",
          "Deletes all files immediately",
          "Turns files into audio songs",
          "Shuts down Windows"
        ],
        answer: 0,
        explanation: "Ctrl + A is the universal shortcut to Select All items in the active window."
      }
    ]
  }
];
