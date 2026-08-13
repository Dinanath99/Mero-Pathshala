import { ComputerSkillLesson } from "./computerSkillsData";

export const fileManagementLessonsPart2: ComputerSkillLesson[] = [
  // =========================================================================
  // LESSON 06: Searching & Finding Lost Files Fast
  // =========================================================================
  {
    id: 6,
    slug: "searching-and-finding-lost-files",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 6,
    titleEn: "Searching & Finding Lost Files Fast",
    titleNe: "हराएका फाइलहरू छिटो खोज्ने विधि",
    subtitleEn: "Master File Explorer search, wildcards (*.pdf), filter by date, and locate downloads.",
    subtitleNe: "सर्च बार, वाइल्डकार्ड (*.pdf), र डाउनलोड फोल्डरबाट हराएका फाइल तुरुन्तै भेट्टाउने उपाय।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Learn how to instantly track down misplaced documents using the File Explorer Search bar, filter by file extension (*.docx, *.pdf), search by modification date, and navigate Downloads.",
    summaryNe: "फाइल एक्सप्लोरर सर्च बार, फाइल प्रकार अनुसार खोज्ने (*.pdf), मिति अनुसार फिल्टर गर्ने र डाउनलोड फोल्डरमा खोज्ने तरिका सिक्नुहोस्।",
    objectives: [
      { en: "Use the File Explorer Search bar (Ctrl + F) to find files by name", ne: "फाइलको नामबाट छिटो खोज्न सर्च बार (Ctrl+F) प्रयोग गर्ने" },
      { en: "Use wildcard searches like *.pdf or *.xlsx to find all files of a specific type", ne: "वाइल्डकार्ड (*.pdf) प्रयोग गरेर सबै पीडीएफ फाइलहरू एकैपटक खोज्ने" },
      { en: "Filter search results by 'Date Modified' (Today, This Week, Last Month)", ne: "पछिल्लो समय काम गरिएका फाइलहरू मिति अनुसार फिल्टर गर्ने" }
    ],
    sections: [
      {
        id: "sec-search-bar",
        titleEn: "1. The File Explorer Search Bar (सर्च बारको प्रयोग)",
        titleNe: "१. सर्च बारबाट फाइल खोज्ने तरिका",
        contentEn: "If you cannot remember where you saved a document, navigate to `This PC` and press `Ctrl + F` to activate the Search bar in the top right corner. Windows will scan all drives and folders for matching names.",
        contentNe: "यदि फाइल कहाँ राखेको बिर्सिनुभयो भने <code>This PC</code> मा गएर <code>Ctrl + F</code> थिच्नुहोस् र फाइलको नामको कुनै शब्द टाइप गर्नुहोस्।",
        bulletPointsEn: [
          "<strong>Search everywhere or in a specific folder:</strong> Searching inside <code>This PC</code> searches the whole computer; searching inside <code>Documents</code> searches only documents.",
          "<strong>Partial words work:</strong> Typing <code>nagrikta</code> will find <code>Nagrikta_Front_Scan.jpg</code>.",
          "<strong>Quick Access / Recent Files:</strong> Windows also shows recently opened files at the top of File Explorer."
        ],
        bulletPointsNe: [
          "<strong>पूरै कम्प्युटर वा निश्चित फोल्डर:</strong> 'This PC' मा खोज्दा पूरै कम्प्युटरमा खोजिन्छ।",
          "<strong>आधा नाम लेखे पनि पुग्छ:</strong> जस्तै 'biodata' लेख्दा 'Biodata_2026.pdf' भेटिन्छ।",
          "<strong>Recent Files:</strong> भर्खरै चलाइएका फाइलहरू अगाडि नै देखिन्छन्।"
        ]
      },
      {
        id: "sec-wildcard-search",
        titleEn: "2. Wildcard Search Tricks: Finding all PDFs or Excels (वाइल्डकार्ड सर्च)",
        titleNe: "२. फाइल प्रकार अनुसार खोज्ने ट्रिक",
        contentEn: "The asterisk (`*`) is a wildcard symbol that means 'anything'. You can use it to instantly list every file of a certain format:",
        contentNe: "तारा चिन्ह (<code>*</code>) को अर्थ जे पनि हुन सक्छ। यसको प्रयोग गरेर कुनै खास प्रकारका सबै फाइल निकाल्न सकिन्छ:",
        bulletPointsEn: [
          "<code>*.pdf</code> — Finds every single PDF document on your drive.",
          "<code>*.xlsx</code> — Lists all Excel financial budget spreadsheets.",
          "<code>*.docx</code> — Finds all Microsoft Word documents.",
          "<code>datemodified:today</code> — Shows all files you created or edited today."
        ],
        bulletPointsNe: [
          "<code>*.pdf</code> — कम्प्युटरमा भएका सबै PDF फाइलहरू देखाउँछ।",
          "<code>*.xlsx</code> — सबै एक्सेल हिसाब सिटहरू देखाउँछ।",
          "<code>*.docx</code> — सबै वर्ड डकुमेन्टहरू देखाउँछ।",
          "<code>datemodified:today</code> — आज चलाइएका सबै फाइलहरू देखाउँछ।"
        ]
      }
    ],
    caseStudyEn: "A tax consultant in Lalitpur downloaded an official VAT invoice from the Inland Revenue Department portal but closed the browser before noticing where it was saved. Instead of downloading it again, pressing Ctrl+J in Chrome or opening the 'Downloads' folder in File Explorer and sorting by 'Date Modified' revealed the invoice at the very top within 2 seconds.",
    caseStudyNe: "ललितपुरका एक कर परामर्शदाताले आन्तरिक राजस्व विभागबाट कर चुक्ता प्रमाणपत्र डाउनलोड गरे तर कहाँ बस्यो पत्ता लागेन। फाइल एक्सप्लोररको 'Downloads' फोल्डर खोलेर 'Date Modified' मा क्लिक गर्दा फाइल २ सेकेन्डमै सबैभन्दा माथि भेटियो।",
    misconceptions: [
      {
        mythEn: "If a file disappears from the desktop, it is permanently deleted from the hard drive.",
        mythNe: "डेस्कटपबाट फाइल हरायो भने त्यो कम्प्युटरबाट सधैंका लागि मेटिसक्यो।",
        realityEn: "Most 'missing' files were simply dragged into a neighboring folder by accident or saved to the Downloads folder. Searching by filename in This PC almost always recovers them.",
        realityNe: "प्रायः फाइल हराएको नभई झुक्किएर अर्को फोल्डर वा Downloads मा सरेको हुन्छ। सर्च बारमा नाम खोज्दा तुरुन्तै भेटिन्छ।"
      }
    ],
    keyTerms: [
      { termEn: "Search Filter", termNe: "सर्च फिल्टर", definitionEn: "Refining search queries by file type, size, or modification date.", definitionNe: "फाइलको प्रकार, साइज वा मिति अनुसार खोज्ने तरिका।" },
      { termEn: "Wildcard (*)", termNe: "वाइल्डकार्ड (*)", definitionEn: "A placeholder symbol representing any character sequence in search queries.", definitionNe: "खोज्दा जुनसुकै नाम वा शब्द बुझाउन प्रयोग गरिने तारा चिन्ह।" }
    ],
    flashcards: [
      { id: "fm-f601", frontEn: "How do you search for all PDF files in File Explorer?", frontNe: "फाइल एक्सप्लोररमा सबै PDF फाइल कसरी खोज्ने?", backEn: "Type *.pdf in the Search box.", backNe: "सर्च बक्समा *.pdf टाइप गरेर।" },
      { id: "fm-f602", frontEn: "What is the shortcut to focus the Search bar in File Explorer?", frontNe: "सर्च बारमा जाने सर्टकट के हो?", backEn: "Ctrl + F (or F3).", backNe: "Ctrl + F (वा F3)।" },
      { id: "fm-f603", frontEn: "Where are web downloads saved by default?", frontNe: "इन्टरनेटबाट डाउनलोड गरिएका फाइल कहाँ बस्छन्?", backEn: "In the 'Downloads' folder.", backNe: "'Downloads' फोल्डरमा।" }
    ],
    quiz: [
      {
        question: "Which search query in File Explorer displays every Excel spreadsheet on the computer?",
        questionNe: "कम्प्युटरमा भएका सबै एक्सेल सिटहरू खोज्न सर्च बक्समा के लेख्नुपर्छ?",
        options: ["*.xlsx", "excel.com", "file:delete", "find/all"],
        answer: 0,
        explanation: "*.xlsx searches for any filename ending in the .xlsx Excel extension."
      }
    ]
  },

  // =========================================================================
  // LESSON 07: File Compression & ZIP Archives
  // =========================================================================
  {
    id: 7,
    slug: "file-compression-and-zip-archives",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 7,
    titleEn: "File Compression & ZIP Archives",
    titleNe: "फाइल कम्प्रेस गर्ने र ZIP बनाउने",
    subtitleEn: "Learn how to bundle 50 files into one small .zip archive and extract files properly.",
    subtitleNe: "फाइलहरूको साइज घटाउने, ZIP बनाउने र अनजिप (Extract) गर्ने तरिका।",
    duration: "12 mins",
    readTime: "9 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Understand data compression algorithms, create ZIP archives in Windows without extra software, extract files safely before editing, and meet upload size limits for government portals and job applications.",
    summaryNe: "फाइल कम्प्रेसनको सिद्धान्त, विन्डोजमै ZIP बनाउने, काम गर्नुअघि 'Extract All' गर्ने, र लोकसेवा तथा बैंक फारममा साइज घटाएर अपलोड गर्ने उपाय सिक्नुहोस्।",
    objectives: [
      { en: "Understand why file compression reduces file size and saves bandwidth", ne: "फाइल कम्प्रेसनले साइज कसरी घटाउँछ र इन्टरनेट बचाउँछ बुझ्ने" },
      { en: "Create a .zip archive from multiple files using Windows built-in tools", ne: "विन्डोजमै धेरै फाइलहरूलाई एउटै ZIP फाइल बनाउन सिक्ने" },
      { en: "Extract (Unzip) archives completely before editing files", ne: "फाइल सम्पादन गर्नुअघि 'Extract All' गर्ने नियम बुझ्ने" }
    ],
    sections: [
      {
        id: "sec-why-zip",
        titleEn: "1. What is a ZIP Archive & Why Use It? (ZIP फाइल के हो?)",
        titleNe: "१. ZIP आर्काइभको महत्त्व",
        contentEn: "A ZIP file is a compressed digital package that bundles one or many files and folders into a single file with a `.zip` extension. Compression algorithms eliminate redundant data patterns, shrinking a 25 MB folder down to 8 MB.",
        contentNe: "ZIP फाइल भनेको धेरै फाइल र फोल्डरहरूलाई एकै ठाउँमा बाँधेर साइज घटाइएको एउटा फाइल हो। यसले २५ MB को फोल्डरलाई ८ MB मा झार्न सक्छ।",
        bulletPointsEn: [
          "<strong>Fast Email Attachments:</strong> Sending 1 ZIP file is 50x easier than attaching 50 separate images.",
          "<strong>Saves Disk & Internet Data:</strong> Smaller size means faster upload and download speeds on mobile hotspots.",
          "<strong>Maintains Folder Hierarchy:</strong> All your subfolders and file names remain organized inside the archive."
        ],
        bulletPointsNe: [
          "<strong>इमेल पठाउन सजिलो:</strong> ५० वटा छुट्टाछुट्टै फोटो पठाउनु भन्दा एउटै ZIP पठाउनु छिटो हुन्छ।",
          "<strong>इन्टरनेट डेटा बचत:</strong> सानो साइजले गर्दा छिटो अपलोड र डाउनलोड हुन्छ।",
          "<strong>फोल्डर संरचना बिग्रिँदैन:</strong> भित्रका सबै सब-फोल्डरहरू जस्ताको तस्तै रहन्छन्।"
        ]
      },
      {
        id: "sec-how-to-zip",
        titleEn: "2. How to Create and Extract a ZIP File (ZIP बनाउने र खोल्ने तरिका)",
        titleNe: "२. ZIP बनाउने र अनजिप (Extract) गर्ने विधि",
        contentEn: "Windows has native ZIP support without needing paid software like WinRAR:",
        contentNe: "विन्डोजमा कुनै नयाँ एप नराखी सिधै ZIP बनाउन र खोल्न सकिन्छ:",
        bulletPointsEn: [
          "<strong>To Create a ZIP:</strong> Select the files → Right-click → <code>Compress to ZIP file</code> (or <code>Send to > Compressed (zipped) folder</code>).",
          "<strong>To Extract (Unzip):</strong> Right-click the <code>.zip</code> file → Click <code>Extract All...</code> → Choose destination folder → Click <code>Extract</code>.",
          "<strong>CRITICAL RULE:</strong> Never edit spreadsheets or Word docs directly inside a ZIP! Always 'Extract All' first, otherwise your changes will NOT be saved."
        ],
        bulletPointsNe: [
          "<strong>ZIP बनाउन:</strong> फाइल सेलेक्ट गर्नुहोस् → दायाँ क्लिक → <code>Compress to ZIP file</code> रोज्नुहोस्।",
          "<strong>अनजिप गर्न (Extract):</strong> ZIP फाइलमा दायाँ क्लिक → <code>Extract All...</code> → <code>Extract</code> थिच्नुहोस्।",
          "<strong>मुख्य नियम:</strong> ZIP भित्र सिधै फाइल सम्पादन नगर्नुहोस्; पहिले सधैं 'Extract All' गर्नुहोस्।"
        ]
      }
    ],
    caseStudyEn: "A candidate in Hetauda applying for an IT officer position was required to submit citizenship, certificates, and CV in an online portal with a 5 MB limit. Their uncompressed scanned PDFs totaled 14 MB, causing constant upload errors. By selecting all 3 documents and compressing to a ZIP archive, the file size shrank to 3.8 MB and uploaded instantly on the first try.",
    caseStudyNe: "हेटौंडाका एक परीक्षार्थीले सरकारी फारम भर्दा ५ MB भन्दा ठूलो फाइल अपलोड भएन। जब उनले ३ वटै कागजातलाई ZIP फाइल बनाए, साइज १४ MB बाट घटेर ३.८ MB भयो र सजिलै अपलोड भयो।",
    misconceptions: [
      {
        mythEn: "Opening a file inside a ZIP preview and editing it saves the changes to the ZIP file automatically.",
        mythNe: "ZIP भित्र सिधै फाइल खोलेर काम गर्दा त्यो स्वतः सेभ हुन्छ।",
        realityEn: "Windows opens files from ZIP in a temporary read-only directory. When you close the app, your edits are lost unless you extracted the files first!",
        realityNe: "ZIP भित्र अस्थायी रूपमा मात्र खुल्छ। 'Extract All' नगरी काम गर्दा गरेका परिवर्तनहरू मेटिन सक्छन्।"
      }
    ],
    keyTerms: [
      { termEn: "ZIP File", termNe: "जिप फाइल (ZIP)", definitionEn: "An archive file format that supports lossless data compression.", definitionNe: "साइज घटाएर धेरै फाइलहरूलाई एकै ठाउँमा बाँधिएको आर्काइभ फाइल।" },
      { termEn: "Extract All", termNe: "अनजिप गर्ने (Extract All)", definitionEn: "Decompressing all bundled files from an archive into a regular folder on disk.", definitionNe: "ZIP भित्रका सबै फाइलहरूलाई बाहिर सामान्य फोल्डरमा निकाल्ने कार्य।" }
    ],
    flashcards: [
      { id: "fm-f701", frontEn: "What is the primary benefit of a ZIP file?", frontNe: "ZIP फाइलको मुख्य फाइदा के हो?", backEn: "Reduces file size and bundles multiple files into a single easy-to-share file.", backNe: "फाइल साइज घटाउँछ र धेरै फाइललाई एउटै पोको बनाउँछ।" },
      { id: "fm-f702", frontEn: "Why must you 'Extract All' before editing files from a ZIP?", frontNe: "ZIP भित्रका फाइल चलाउनुअघि 'Extract All' किन गर्नुपर्छ?", backEn: "To prevent data loss, because files inside a ZIP preview are temporary.", backNe: "डेटा नष्ट नहोस् भन्नका लागि, किनकि ZIP भित्र अस्थायी रूपमा मात्र खुल्छ।" }
    ],
    quiz: [
      {
        question: "How do you turn a folder of 20 photos into a single compressed ZIP file in Windows?",
        questionNe: "विन्डोजमा २० वटा फोटोलाई एउटै ZIP फाइल कसरी बनाउने?",
        options: [
          "Right-click the folder → Select 'Compress to ZIP file'",
          "Change the monitor brightness to 100%",
          "Press Ctrl + Alt + Delete",
          "Restart the computer 3 times"
        ],
        answer: 0,
        explanation: "Right-clicking and choosing 'Compress to ZIP file' generates a .zip archive immediately."
      }
    ]
  },

  // =========================================================================
  // LESSON 08: USB Flash Drives & External Storage
  // =========================================================================
  {
    id: 8,
    slug: "usb-flash-drives-and-external-storage",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 8,
    titleEn: "USB Flash Drives & External Storage",
    titleNe: "पेनड्राइभ र बाहिरी हार्डडिस्कको प्रयोग",
    subtitleEn: "Learn file transfers, Safely Remove Hardware (Eject), and format types (FAT32, NTFS).",
    subtitleNe: "पेनड्राइभमा फाइल सार्ने, सुरक्षित रूपमा निकाल्ने (Eject), र भाइरसबाट बच्ने उपाय।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Master external storage devices: insert USB flash drives and external SSDs, copy files between PC and removable drives, use 'Safely Remove / Eject' to protect against data corruption, and understand FAT32 vs NTFS.",
    summaryNe: "पेनड्राइभ र बाहिरी हार्डड्राइभ चलाउने, कम्प्युटरबाट पेनड्राइभमा फाइल कपी गर्ने, सुरक्षित रूपमा Eject गर्ने, र पेनड्राइभको भाइरसबाट बच्ने तरिका सिक्नुहोस्।",
    objectives: [
      { en: "Connect and locate external USB flash drives in File Explorer (Drive E: / F:)", ne: "पेनड्राइभ कम्प्युटरमा जोडेर फाइल एक्सप्लोररमा खोज्ने" },
      { en: "Transfer files safely between PC and USB flash drive using Send To and Copy/Paste", ne: "'Send To' वा Copy/Paste बाट पेनड्राइभमा फाइल हाल्ने" },
      { en: "Always use 'Safely Remove Hardware and Eject Media' before unplugging", ne: "पेनड्राइभ थुत्नुअघि सधैं 'Safely Remove / Eject' गर्ने नियम बुझ्ने" }
    ],
    sections: [
      {
        id: "sec-usb-basics",
        titleEn: "1. Connecting & Using a USB Flash Drive (पेनड्राइभको प्रयोग)",
        titleNe: "१. पेनड्राइभ जोड्ने र फाइल सार्ने तरिका",
        contentEn: "A USB flash drive (commonly called a pen drive in Nepal) is a portable solid-state storage device. When plugged into a USB port, Windows assigns it a drive letter like `E:` or `F:`.",
        contentNe: "पेनड्राइभ एक पोर्टेबल स्टोरेज डिभाइस हो। कम्प्युटरको USB पोर्टमा जोड्नासाथ यो फाइल एक्सप्लोररमा <code>E:</code> वा <code>F:</code> ड्राइभको रूपमा देखिन्छ।",
        bulletPointsEn: [
          "<strong>Fast Send To:</strong> Right-click any file → <code>Send to</code> → Click your USB Drive name.",
          "<strong>Copy & Paste:</strong> Select files → <code>Ctrl + C</code> → Open USB Drive in File Explorer → <code>Ctrl + V</code>.",
          "<strong>Check Free Space:</strong> Right-click the USB drive icon in File Explorer → Click <code>Properties</code> to see available storage."
        ],
        bulletPointsNe: [
          "<strong>Send to को प्रयोग:</strong> फाइलमा दायाँ क्लिक → <code>Send to</code> → पेनड्राइभको नाम रोज्नुहोस्।",
          "<strong>कपी र पेस्ट:</strong> फाइल कपी गरी पेनड्राइभ खोलेर पेस्ट गर्नुहोस्।",
          "<strong>खाली ठाउँ हेर्न:</strong> पेनड्राइभमा दायाँ क्लिक गरी Properties हेर्नुहोस्।"
        ]
      },
      {
        id: "sec-safely-remove",
        titleEn: "2. Why You MUST Always 'Eject' Before Unplugging (सुरक्षित निकाल्ने)",
        titleNe: "२. पेनड्राइभ निकाल्नुअघि 'Eject' किन गर्नुपर्छ?",
        contentEn: "Computers use write-caching to speed up file transfers, meaning Windows might still be writing data in the background even when the progress bar reaches 100%. Pulling out the USB abruptly can corrupt the master file table, making the entire drive unreadable!",
        contentNe: "कम्प्युटरले फाइल सारिसकेपछि पनि केही मिलिसेकेन्ड भित्री काम गरिरहेको हुन सक्छ। सीधै थुत्दा पेनड्राइभ बिग्रिने वा फाइल करप्ट हुने जोखिम हुन्छ।",
        bulletPointsEn: [
          "<strong>How to Safely Remove:</strong> Click the small USB icon in the bottom right Taskbar (System Tray) → Click <code>Eject Flash Drive</code>.",
          "<strong>Wait for notification:</strong> Unplug only when Windows displays <code>'Safe To Remove Hardware'</code>.",
          "<strong>Scanning for Viruses:</strong> Cyber-cafes and print shops often have shortcut viruses on their PCs. Always scan your USB with Windows Security when you plug it back in."
        ],
        bulletPointsNe: [
          "<strong>Eject गर्ने तरिका:</strong> स्क्रिनको तल दायाँ टास्कबारमा रहेको USB चिन्हमा थिची <code>Eject</code> रोज्नुहोस्।",
          "<strong>सन्देश पर्खनुहोस्:</strong> 'Safe To Remove Hardware' आएपछि मात्र थुत्नुहोस्।",
          "<strong>भाइरस स्क्यान:</strong> साइबर वा प्रिन्ट पसलबाट ल्याएपछि सधैं एन्टिभाइरसले स्क्यान गर्नुहोस्।"
        ]
      }
    ],
    caseStudyEn: "A photographer in Pokhara copied 800 wedding photos onto a 64 GB flash drive and immediately pulled it out of the USB port while the indicator light was still flashing. When the client inserted the drive at home, Windows prompted 'You need to format the disk before you can use it' because the partition table was damaged. Using 'Safely Remove' completely prevents partition corruption.",
    caseStudyNe: "पोखराका एक फोटोग्राफरले बिहेका ८०० फोटो पेनड्राइभमा सारेर तत्काल थुते। घरमा ग्राहकले खोल्दा 'Format Disk' भन्यो र सबै फोटो हराए। सधैं 'Safely Remove' गरेर मात्र पेनड्राइभ निकाल्नुपर्छ।",
    misconceptions: [
      {
        mythEn: "If the file copy progress bar disappears, it is 100% safe to instantly rip the USB drive out.",
        mythNe: "कपी सकिएपछि पेनड्राइभ तत्काल सिधै थुत्दा केही फरक पर्दैन।",
        realityEn: "Cached data may still reside in RAM buffers. Always click 'Eject' in the Taskbar to flush the cache safely.",
        realityNe: "मेमोरी बफरमा अझै डेटा बाँकी हुन सक्छ। सधैं 'Eject' थिचेर मात्र निकाल्नुपर्छ।"
      }
    ],
    keyTerms: [
      { termEn: "USB Flash Drive", termNe: "पेनड्राइभ (USB Flash Drive)", definitionEn: "A portable solid-state memory storage device connecting via USB.", definitionNe: "कम्प्युटरमा सजिलै जोड्न र बोक्न मिल्ने सानो मेमोरी डिभाइस।" },
      { termEn: "Safely Remove / Eject", termNe: "सुरक्षित रूपमा निकाल्ने (Eject)", definitionEn: "Operating system command flushing all write buffers to safely disconnect external storage.", definitionNe: "डेटा नबिग्रियोस् भनेर पेनड्राइभलाई सफ्टवेयरबाट बन्द गरी निकाल्ने प्रक्रिया।" }
    ],
    flashcards: [
      { id: "fm-f801", frontEn: "Why should you use 'Safely Remove Hardware' before unplugging a USB?", frontNe: "पेनड्राइभ थुत्नुअघि 'Safely Remove' किन गर्नुपर्छ?", backEn: "To prevent data corruption caused by background write caching.", backNe: "भित्री डेटा बिग्रिनबाट जोगाउन र पेनड्राइभ सुरक्षित राख्न।" },
      { id: "fm-f802", frontEn: "How do you quickly copy a file to a flash drive?", frontNe: "फाइललाई पेनड्राइभमा छिटो कसरी पठाउने?", backEn: "Right-click the file → Send to → Select the USB drive.", backNe: "फाइलमा दायाँ क्लिक → Send to → पेनड्राइभ रोज्ने।" }
    ],
    quiz: [
      {
        question: "What is the proper procedure before physically unplugging a USB drive from a laptop?",
        questionNe: "ल्यापटपबाट पेनड्राइभ निकाल्नुअघि कुन सही प्रक्रिया अपनाउनुपर्छ?",
        options: [
          "Click the Taskbar USB icon and select 'Eject / Safely Remove'",
          "Pull it out as fast as possible with one jerk",
          "Turn off the power circuit breaker in the room",
          "Delete all files from the C: drive"
        ],
        answer: 0,
        explanation: "Selecting Eject ensures all pending data in memory is safely written before physical removal."
      }
    ]
  },

  // =========================================================================
  // LESSON 09: Cloud Storage & Online Backup
  // =========================================================================
  {
    id: 9,
    slug: "cloud-storage-and-online-backup",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 9,
    titleEn: "Cloud Storage & Online Backup",
    titleNe: "गुगल ड्राइभ र क्लाउड ब्याकअप",
    subtitleEn: "Discover Google Drive, OneDrive, the 3-2-1 backup rule, and multi-device access.",
    subtitleNe: "गुगल ड्राइभ, ३-२-१ ब्याकअप नियम, र मोबाइल तथा ल्यापटपबाट फाइल हेर्ने तरिका।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Learn how Cloud storage (Google Drive, Microsoft OneDrive, Dropbox) protects files against laptop theft, broken hard drives, and flooding. Master the universal 3-2-1 backup rule.",
    summaryNe: "क्लाउड स्टोरेज (गुगल ड्राइभ, वानड्राइभ) को प्रयोग, ल्यापटप हराए वा बिग्रिए पनि फाइल सुरक्षित राख्ने तरिका, र ३-२-१ ब्याकअप नियम सिक्नुहोस्।",
    objectives: [
      { en: "Understand what Cloud Storage is and how it synchronizes files across devices", ne: "क्लाउड स्टोरेज के हो र यसले कसरी फाइल सुरक्षित राख्छ बुझ्ने" },
      { en: "Upload, download, and share files using Google Drive and OneDrive", ne: "गुगल ड्राइभमा फाइल अपलोड गर्न र अरूलाई सेयर गर्न सिक्ने" },
      { en: "Implement the industry-standard 3-2-1 Backup Strategy for critical records", ne: "महत्त्वपूर्ण कागजात जोगाउन ३-२-१ ब्याकअप नियम लागू गर्ने" }
    ],
    sections: [
      {
        id: "sec-cloud-basics",
        titleEn: "1. What is Cloud Storage? (क्लाउड स्टोरेज के हो?)",
        titleNe: "१. क्लाउड स्टोरेजको परिभाषा र फाइदा",
        contentEn: "Cloud storage means saving your files onto secure, remote data center servers over the Internet (such as Google's or Microsoft's servers) rather than solely on your local laptop hard drive.",
        contentNe: "क्लाउड स्टोरेज भनेको आफ्ना फाइलहरू आफ्नै कम्प्युटरमा मात्र सीमित नराखी इन्टरनेट मार्फत गुगल वा माइक्रोसफ्टका सुरक्षित सर्भरमा राख्ने प्रविधि हो।",
        bulletPointsEn: [
          "<strong>Access from Any Device:</strong> Open your citizenship scans or CV from your Android phone, iPad, or an internet cafe computer anywhere in Nepal.",
          "<strong>Disaster Recovery:</strong> If your laptop is stolen, dropped in water, or destroyed by lightning, your files remain 100% safe online.",
          "<strong>Free Starter Storage:</strong> Google provides 15 GB free with every Gmail account; Microsoft OneDrive provides 5 GB free."
        ],
        bulletPointsNe: [
          "<strong>जुनसुकै डिभाइसबाट पहुँच:</strong> मोबाइल, साइबर वा अन्य कम्प्युटरबाट सजिलै फाइल खोल्न सकिने।",
          "<strong>दुर्घटनाबाट सुरक्षा:</strong> ल्यापटप हराए वा बिग्रिए पनि अनलाइनमा फाइल सुरक्षित रहने।",
          "<strong>निःशुल्क स्टोरेज:</strong> गुगलले हरेक जिमेल खातामा १५ GB निःशुल्क दिन्छ।"
        ]
      },
      {
        id: "sec-321-backup",
        titleEn: "2. The Golden 3-2-1 Backup Rule (३-२-१ ब्याकअप नियम)",
        titleNe: "२. ३-२-१ ब्याकअप नियम के हो?",
        contentEn: "Professional IT engineers and data managers follow this universal backup rule to ensure zero data loss:",
        contentNe: "कम्प्युटर इन्जिनियरहरू आफ्ना महत्त्वपूर्ण कागजात कहिल्यै नहराओस् भनेर यो नियम पालना गर्छन्:",
        bulletPointsEn: [
          "<strong>3 Copies:</strong> Maintain 3 separate copies of important data (1 primary copy + 2 backups).",
          "<strong>2 Different Media Types:</strong> Store them on 2 different physical types (e.g., 1 on internal PC SSD + 1 on an external USB hard drive).",
          "<strong>1 Offsite Copy:</strong> Keep at least 1 copy offsite in the Cloud (Google Drive, OneDrive, or Dropbox)."
        ],
        bulletPointsNe: [
          "<strong>३ प्रतिलिपि (3 Copies):</strong> महत्त्वपूर्ण फाइलका ३ वटा कपी राख्ने।",
          "<strong>२ फरक माध्यम (2 Media):</strong> कम्प्युटरको हार्डडिस्क र पेनड्राइभ गरी २ ठाउँमा राख्ने।",
          "<strong>१ अनलाइन/क्लाउड (1 Offsite):</strong> कम्तीमा १ कपी गुगल ड्राइभ जस्ता क्लाउडमा राख्ने।"
        ]
      }
    ],
    caseStudyEn: "A high-school student in Dharan had their final Grade 12 project stored on a single USB flash drive that stopped working on the morning of submission. A classmate who saved their project in Google Drive simply logged into the school computer, downloaded their project in 10 seconds, and submitted on time.",
    caseStudyNe: "धरानका एक विद्यार्थीको १२ कक्षाको प्रोजेक्ट पेनड्राइभ बिग्रिएर हरायो। तर अर्का साथीले गुगल ड्राइभमा सेभ गरेकाले स्कुलको कम्प्युटरबाट १० सेकेन्डमै डाउनलोड गरी समयमै बुझाउन सफल भए।",
    misconceptions: [
      {
        mythEn: "Saving a file to Google Drive means anyone on the internet can see it.",
        mythNe: "गुगल ड्राइभमा राखेका फाइल इन्टरनेटका सबै मानिसले हेर्न सक्छन्।",
        realityEn: "All files in Google Drive are completely private to your password-protected account unless you specifically generate and share a public link.",
        realityNe: "गुगल ड्राइभका फाइलहरू तपाईंको पासवर्ड सुरक्षित खातामा पूर्ण रूपमा गोप्य रहन्छन्, जबसम्म तपाईं आफैं सेयर गर्नुहुन्न।"
      }
    ],
    keyTerms: [
      { termEn: "Cloud Storage", termNe: "क्लाउड स्टोरेज", definitionEn: "Digital data storage maintained on secure remote servers accessed via the Internet.", definitionNe: "इन्टरनेट मार्फत सुरक्षित अनलाइन सर्भरमा डेटा राख्ने प्रविधि।" },
      { termEn: "Sync (Synchronization)", termNe: "सिङ्क्रोनाइजेसन (Sync)", definitionEn: "Automatically keeping identical copies of files updated across computer and cloud.", definitionNe: "कम्प्युटर र मोबाइलमा फाइलहरू स्वतः अपडेट राख्ने प्रक्रिया।" }
    ],
    flashcards: [
      { id: "fm-f901", frontEn: "What is Cloud Storage?", frontNe: "क्लाउड स्टोरेज के हो?", backEn: "Storing data on secure remote internet servers (like Google Drive) instead of only local disks.", backNe: "आफ्नो हार्डडिस्कमा मात्र नभई अनलाइन सुरक्षित सर्भरमा डेटा राख्ने प्रविधि।" },
      { id: "fm-f902", frontEn: "What is the 3-2-1 Backup Rule?", frontNe: "३-२-१ ब्याकअप नियम के हो?", backEn: "3 copies of data, on 2 different media types, with 1 copy stored offsite in the Cloud.", backNe: "३ कपी फाइल, २ फरक माध्यममा, र १ कपी क्लाउड अनलाइनमा।" }
    ],
    quiz: [
      {
        question: "What is the primary advantage of keeping a copy of your CV in Google Drive?",
        questionNe: "गुगल ड्राइभमा बायोडाटा राख्नुको मुख्य फाइदा के हो?",
        options: [
          "You can access and print it from any computer or mobile even if your laptop breaks",
          "It makes your computer run without electricity",
          "It types the resume for you automatically",
          "It changes the language to French"
        ],
        answer: 0,
        explanation: "Cloud storage provides universal access from any connected device, safeguarding your work from hardware failure."
      }
    ]
  },

  // =========================================================================
  // LESSON 10: Building a Professional Folder Structure
  // =========================================================================
  {
    id: 10,
    slug: "building-a-professional-folder-structure",
    moduleNumber: 3,
    moduleTitleEn: "Module 3: Files & File Management",
    moduleTitleNe: "मोड्युल ३: फाइल तथा फोल्डर व्यवस्थापन",
    lessonNumber: 10,
    titleEn: "Building a Professional Folder Structure",
    titleNe: "व्यावसायिक फोल्डर संरचना निर्माण",
    subtitleEn: "Eliminate messy desktop syndrome and build a lifelong organized digital workspace.",
    subtitleNe: "अव्यवस्थित डेस्कटप हटाउने र जीवनभर काम लाग्ने सफा फोल्डर संरचना बनाउने विधि।",
    duration: "10 mins",
    readTime: "8 min read",
    difficulty: "Beginner",
    level: "Beginner",
    summaryEn: "Transform chaotic desktops into structured professional workstations: create numbered category folders (01_Work, 02_Official, 03_Finance), apply standard naming conventions, and practice the 8-step clean desktop routine.",
    summaryNe: "छरिएका डेस्कटपलाई व्यवस्थित बनाउने, नम्बरसहितका विधागत फोल्डर (०१_काम, ०२_कागजात, ०३_हिसाब) बनाउने, र व्यावसायिक नामकरण नियम सिक्नुहोस्।",
    objectives: [
      { en: "Understand the 'Messy Desktop Syndrome' and why it harms computer performance and mental focus", ne: "अव्यवस्थित डेस्कटपले कम्प्युटर र काममा पार्ने असर बुझ्ने" },
      { en: "Build a 3-tier hierarchical folder taxonomy for work, studies, and personal records", ne: "काम, पढाइ र घरायसी कागजातका लागि ३ तहको फोल्डर संरचना बनाउने" },
      { en: "Adopt standard naming conventions: YYYY-MM-DD_Category_Name_v01.pdf", ne: "व्यावसायिक फाइल नामकरण विधि (मिति र भर्सन सहित) लागू गर्ने" }
    ],
    sections: [
      {
        id: "sec-taxonomy",
        titleEn: "1. The 3-Tier Folder Taxonomy (३ तहको फोल्डर ढाँचा)",
        titleNe: "१. आदर्श फोल्डर संरचनाको नियम",
        contentEn: "To never lose another file, organize your `Documents` or `D: Drive` into these numbered primary folders:",
        contentNe: "फाइलहरू सधैं व्यवस्थित राख्न <code>Documents</code> वा <code>D: Drive</code> मा यी मुख्य फोल्डरहरू बनाउनुहोस्:",
        bulletPointsEn: [
          "<code>📁 01_Career_and_Work:</code> Holds CVs, Cover Letters, Portfolios, Certificates.",
          "<code>📁 02_Official_Documents:</code> Scanned Citizenship, Passport, PAN Card, Electricity/Water Bills.",
          "<code>📁 03_Education_and_Courses:</code> Semester notes, assignments, e-books, lecture slides.",
          "<code>📁 04_Finance_and_Receipts:</code> Tax clearance, bank statements, monthly expense spreadsheets.",
          "<code>📁 05_Media_and_Family:</code> Photos sorted by year/event (e.g. <code>2026_Pokhara_Trip</code>)."
        ],
        bulletPointsNe: [
          "<code>📁 ०१_रोजगारी_र_काम:</code> बायोडाटा, जब निवेदन, प्रमाणपत्र।",
          "<code>📁 ०२_सरकारी_कागजात:</code> नागरिकता, राहदानी, प्यान कार्ड, बिजुली बिल।",
          "<code>📁 ०३_पढाइ_र_कोर्स:</code> कलेजका नोट, असाइनमेन्ट, पुस्तक।",
          "<code>📁 ०४_हिसाब_र_कर:</code> बैंक स्टेटमेन्ट, कर चुक्ता, घरायसी बजेट।",
          "<code>📁 ०५_फोटो_र_भिडियो:</code> वर्ष र कार्यक्रम अनुसार मिलाइएका तस्बिर।"
        ]
      },
      {
        id: "sec-naming-conventions",
        titleEn: "2. The Golden File Naming Formula (फाइलको नाम राख्ने सही सुत्र)",
        titleNe: "२. फाइलको व्यावसायिक नामकरण सुत्र",
        contentEn: "Avoid vague names like `document1.docx`, `final_final.pdf`, or `test.jpg`. Follow this formula:",
        contentNe: "<code>final_new_2.pdf</code> जस्ता अस्पष्ट नामको साटो यो सुत्र अपनाउनुहोस्:",
        bulletPointsEn: [
          "<strong>Formula:</strong> <code>[Date/Year]_[Topic/Client]_[DocumentType]_[Version].[ext]</code>",
          "<strong>Good Example 1:</strong> <code>2026-02_Dinanath_Resume_Banking_v2.pdf</code>",
          "<strong>Good Example 2:</strong> <code>2026_NEA_Electricity_Bill_Magh.pdf</code>",
          "<strong>Good Example 3:</strong> <code>Grade12_Physics_Chapter04_Notes.docx</code>",
          "<strong>Why it works:</strong> Files automatically sort in perfect chronological order in File Explorer!"
        ],
        bulletPointsNe: [
          "<strong>सुत्र:</strong> <code>[मिति]_[विषय]_[कागजात_प्रकार].[ext]</code>",
          "<strong>राम्रो उदाहरण:</strong> <code>2026_नागरिकता_स्क्यान_अगाडि.jpg</code>",
          "<strong>फाइदा:</strong> फाइलहरू मिति र नाम अनुसार आफैं क्रमबद्ध भएर बस्छन्!"
        ]
      }
    ],
    caseStudyEn: "A legal assistant in Kathmandu handled hundreds of court petitions. By renaming files with the standard format '2026-Case-402_Petition_Draft_v1.docx', any lawyer in the firm could locate any case file within 3 seconds, eliminating duplicate submissions and billing confusion.",
    caseStudyNe: "काठमाडौंका एक कानुन व्यवसायीले '२०२६_मुद्दा_४०२_निवेदन.docx' ढाँचामा नाम राख्न सुरु गरेपछि सयौं फाइलहरू बीचमा पनि कुनै पनि मुद्दाको कागजात ३ सेकेन्डमै पत्ता लगाउन सम्भव भयो।",
    misconceptions: [
      {
        mythEn: "Keeping everything on the Desktop is faster because you don't need to open folders.",
        mythNe: "डेस्कटपमै सबै फाइल राख्दा फोल्डर खोल्नै नपर्ने भएकाले छिटो काम हुन्छ।",
        realityEn: "Having 200+ loose icons on the desktop forces Windows to render thumbnails on every startup, slowing boot speed and creating cognitive stress.",
        realityNe: "डेस्कटपमा सयौं फाइल हुँदा कम्प्युटर खुल्न ढिलो हुन्छ र काम गर्दा फाइल खोज्न धेरै समय खेर जान्छ।"
      }
    ],
    keyTerms: [
      { termEn: "File Taxonomy", termNe: "फाइल वर्गीकरण (Taxonomy)", definitionEn: "The logical classification and hierarchical structure of files and folders.", definitionNe: "फाइल र फोल्डरहरूलाई विधागत रूपमा मिलाएर राख्ने वैज्ञानिक संरचना।" },
      { termEn: "Naming Convention", termNe: "नामकरण नियम (Naming Convention)", definitionEn: "A standardized system for naming files to ensure clarity and easy sorting.", definitionNe: "फाइलको नाम स्पष्ट र क्रमबद्ध राख्न बनाइएको नियम।" }
    ],
    flashcards: [
      { id: "fm-f1001", frontEn: "What is the recommended naming convention formula?", frontNe: "फाइलको नाम राख्ने उत्तम सुत्र के हो?", backEn: "[Date]_[Topic]_[DocumentType] (e.g. 2026_CV_Final.pdf).", backNe: "[मिति]_[विषय]_[प्रकार] (जस्तै: 2026_CV_Final.pdf)।" },
      { id: "fm-f1002", frontEn: "Why prefix category folders with numbers (e.g. 01_Work, 02_Official)?", frontNe: "फोल्डरको अगाडि ०१, ०२ नम्बर किन राख्नुपर्छ?", backEn: "To keep folders locked in your preferred custom order rather than alphabetical.", backNe: "फोल्डरहरू आफूले चाहेको प्राथमिकता अनुसार क्रमबद्ध राख्न।" }
    ],
    quiz: [
      {
        question: "Which of the following represents the most professional and searchable file name?",
        questionNe: "तलका मध्ये कुन नाम सबैभन्दा व्यावसायिक र खोज्न सजिलो छ?",
        options: [
          "2026-02_Dinanath_Citizenship_Front.jpg",
          "new_photo_final_final(1).jpg",
          "doc.jpg",
          "asdfgh.jpg"
        ],
        answer: 0,
        explanation: "Including the date, person, subject, and side creates an unambiguous, easily searchable filename."
      }
    ]
  }
];
