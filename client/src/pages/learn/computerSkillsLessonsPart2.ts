import { ComputerLesson } from "./computerSkillsData";

export const lessonsPart2: ComputerLesson[] = [
  // ==========================================
  // LESSON 05: CPU: The Brain of the Computer
  // ==========================================
  {
    id: 5,
    slug: "cpu-the-brain-of-the-computer",
    title: "CPU: The Brain of the Computer",
    titleNp: "CPU: कम्प्युटरको दिमाग",
    duration: "12 mins",
    level: "Beginner",
    summaryEn: "Understand what the CPU does, why it is called the processor, how CPU cores and clock speeds work, and clear up the 'brain' analogy.",
    summaryNp: "CPU के हो, यसले कसरी निर्देशन कार्यान्वयन गर्छ, कोर (Cores) र क्लक स्पिड के हुन् सरल भाषामा सिक्नुहोस्।",
    objectives: [
      { en: "Explain what CPU stands for and its core role in executing instructions", ne: "CPU को पूरा रूप र निर्देशन कार्यान्वयन गर्ने मुख्य काम बुझ्ने" },
      { en: "Understand CPU Cores and Clock Speed (Gigahertz/GHz) in simple terms", ne: "CPU कोर र क्लक स्पिड (GHz) को अर्थ सरल भाषामा जान्ने" },
      { en: "Understand the processor analogy without taking it too literally", ne: "CPU लाई 'दिमाग' भनिए पनि यसले मानव जस्तै सोच्दैन भन्ने वास्तविकता बुझ्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "The CPU (Central Processing Unit) is a tiny silicon chip containing billions of microscopic microscopic transistors. It is often described as the 'brain' of the computer because it handles all logical decisions, calculations, and software instructions.",
        textNe: "CPU (Central Processing Unit) एउटा सानो सिलिकन चिप हो जसमा अरबौं साना ट्रान्जिस्टरहरू हुन्छन्। यसले सबै हिसाब, निर्णय र सफ्टवेयरका आदेशहरू कार्यान्वयन गर्ने भएकाले यसलाई कम्प्युटरको 'दिमाग' भनिन्छ।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "The Chef / Worker Analogy (Simplified)",
        titleNe: "भान्छे (Chef) वा कामदारको सरल उदाहरण",
        text: "Think of the CPU as a master chef in a restaurant kitchen: The recipe book is the Software, the ingredients on the table are the RAM, and the Chef (CPU) rapidly follows instructions step-by-step to cook the meal.",
        textNe: "CPU लाई एउटा द्रुत गतिको भान्छेजस्तै सम्झनुहोस्: रेसिपी (सफ्टवेयर) हेर्दै टेबलमा राखिएका सामान (RAM) प्रयोग गरेर यसले फटाफट काम पूरा गर्छ।"
      },
      {
        type: "heading",
        title: "Key CPU Concepts for Beginners",
        titleNe: "सुरुवातकर्ताका लागि CPU का मुख्य अवधारणाहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "1", titleEn: "ALU (Arithmetic Logic Unit)", titleNe: "ALU (हिसाब गर्ने भाग)", descEn: "Performs mathematical calculations (addition, subtraction) and logical comparisons (True/False).", descNe: "गणितीय हिसाब र तुलना गर्ने भाग।", icon: "Calculator" },
          { step: "2", titleEn: "Control Unit (CU)", titleNe: "कन्ट्रोल युनिट (CU)", descEn: "Directs the flow of electrical signals between CPU, memory, and devices like a traffic controller.", descNe: "कम्प्युटरका सम्पूर्ण भागहरूमा निर्देशनको ट्राफिक मिलाउने भाग।", icon: "Sliders" },
          { step: "3", titleEn: "CPU Cores", titleNe: "कोरहरू (Cores)", descEn: "Multiple independent processor engines on one chip (Dual-core, Quad-core, Octa-core) for multitasking.", descNe: "एउटै चिपभित्र धेरै काम एकैसाथ गर्न सक्ने छुट्टाछुट्टै प्रोसेसरहरू।", icon: "Grid" },
          { step: "4", titleEn: "Clock Speed (GHz)", titleNe: "क्लक्स स्पिड (GHz)", descEn: "How many billions of instruction cycles the CPU can execute per second (e.g. 3.2 GHz = 3.2 billion cycles/sec).", descNe: "एक सेकेन्डमा कति अर्ब काम गर्न सक्छ भन्ने मापन (जस्तै ३.२ GHz)।", icon: "Activity" }
        ]
      },
      {
        type: "nepalExample",
        title: "Nepal Real-Life Example: Choosing a Study Laptop",
        titleNe: "नेपालको सन्दर्भमा: पढ्नका लागि ल्यापटप छनोट गर्दा",
        text: "When buying a laptop in Kathmandu for online classes, programming, and assignments, a processor like 'Intel Core i5' or 'AMD Ryzen 5' with 6 or 8 cores provides plenty of speed to run Zoom, Word, and multiple browser tabs simultaneously without stuttering.",
        textNe: "काठमाडौं वा बुटवलमा पढाइका लागि ल्यापटप किन्दा, ६ वा ८ कोर भएको Core i5 वा Ryzen 5 प्रोसेसरले Zoom, वर्ड र धेरै ब्राउजर ट्याबहरू एकैपटक सहजै चलाउन मद्दत गर्छ।"
      }
    ],
    keyTerms: [
      { termEn: "CPU", termNe: "केन्द्रीय प्रशोधन एकाइ (CPU)", definitionEn: "Central Processing Unit — the primary electronic processor chip in a computer.", definitionNe: "कम्प्युटरको मुख्य प्रोसेसर चिप।" },
      { termEn: "Core", termNe: "कोर (Core)", definitionEn: "An individual physical processing unit within a CPU chip capable of handling tasks independently.", definitionNe: "CPU भित्रको छुट्टै स्वतन्त्र रूपमा काम गर्न सक्ने प्रशोधन एकाइ।" },
      { termEn: "Gigahertz (GHz)", termNe: "गिगाहर्ज (GHz)", definitionEn: "A unit of frequency equal to one billion cycles per second, used to measure processor clock speed.", definitionNe: "एक सेकेन्डमा हुने एक अर्ब चक्र, जसले प्रोसेसरको गति जनाउँछ।" },
      { termEn: "Multitasking", termNe: "मल्टिटास्किङ", definitionEn: "The ability of a computer to run multiple applications and background processes smoothly at once.", definitionNe: "कम्प्युटरले एकै समयमा धेरै प्रोग्रामहरू चलाउन सक्ने क्षमता।" }
    ],
    misconceptions: [
      {
        mythEn: "The CPU literally has thoughts and emotions like a biological human brain.",
        mythNe: "CPU सँग मानिसको जैविक दिमाग जस्तै आफ्नै भावना र सोचाइ हुन्छ।",
        realityEn: "The 'brain' label is only a helpful metaphor. The CPU is an electronic circuit that executes mathematical and binary logic instructions given to it by programmers.",
        realityNe: "'दिमाग' शब्द बुझाउनका लागि मात्र प्रयोग गरिएको हो। CPU ले केवल प्रोग्रामरले दिएको बाइनरी गणित र कोडका नियमहरू मात्र पालना गर्छ।"
      },
      {
        mythEn: "Higher GHz is the only thing that makes a computer fast.",
        mythNe: "क्लक्स स्पिड (GHz) धेरै हुनु नै कम्प्युटर छिटो हुने एकमात्र कारण हो।",
        realityEn: "Overall speed depends on a balanced system: CPU core count, modern chip architecture, adequate RAM, and fast SSD storage.",
        realityNe: "समग्र गति कोर संख्या, नयाँ प्रविधि, पर्याप्त RAM र छिटो SSD स्टोरेजको सन्तुलनमा भर पर्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Identify CPU Terms and Functions",
      titleNe: "CPU का अंग र कामहरू मिलाउनुहोस्",
      instructionEn: "Classify each concept into its correct functional role.",
      instructionNe: "दिइएको अवधारणालाई सही काम अनुसार वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "calc", labelEn: "Calculations (गणना/ALU)", labelNe: "हिसाब गर्ने", color: "indigo" },
        { key: "control", labelEn: "Traffic Control (CU)", labelNe: "नियन्त्रण गर्ने", color: "purple" },
        { key: "speed", labelEn: "Performance (गति र कोर)", labelNe: "क्षमता र गति", color: "amber" }
      ],
      items: [
        { id: "c1", nameEn: "Adding 150 + 350", nameNe: "१५० + ३५० जोड्ने", category: "calc" },
        { id: "c2", nameEn: "Deciding which instruction runs next", nameNe: "अब कुन काम गर्ने निर्णय गर्ने", category: "control" },
        { id: "c3", nameEn: "Checking if Password === Correct", nameNe: "पासवर्ड मिलेको छ कि छैन जाँच्ने", category: "calc" },
        { id: "c4", nameEn: "8 Physical Cores for Multitasking", nameNe: "८ वटा कोरले धेरै काम गर्ने", category: "speed" },
        { id: "c5", nameEn: "3.5 GHz Clock Speed", nameNe: "३.५ GHz को क्लक स्पिड", category: "speed" },
      ]
    },
    quiz: [
      {
        question: "What does the abbreviation CPU stand for?",
        options: ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Core Processing Universal"],
        answer: 0,
        explanation: "CPU stands for Central Processing Unit, the main microprocessor of any computing device.",
        difficulty: "easy"
      },
      {
        question: "Why is the CPU often called the 'brain' of the computer?",
        options: [
          "Because it is made of biological cells",
          "Because it executes instructions, performs calculations, and coordinates computer tasks",
          "Because it can feel sad or happy",
          "Because it is round and squishy"
        ],
        answer: 1,
        explanation: "It manages the computational workload and logic of the system, similar to how a central control center operates.",
        difficulty: "easy"
      },
      {
        question: "What is a CPU 'Core'?",
        options: [
          "An independent hardware processing engine within a CPU chip",
          "The plastic box holding the computer",
          "The power button on the monitor",
          "A type of internet cable"
        ],
        answer: 0,
        explanation: "A core is an individual processing unit inside the CPU. Multi-core processors (e.g. 4, 8, or 16 cores) can handle multiple instructions at once.",
        difficulty: "medium"
      },
      {
        question: "What does a CPU clock speed of 3.0 GHz mean?",
        options: [
          "The computer weighs 3.0 kilograms",
          "The CPU can perform up to 3 billion clock cycles per second",
          "The computer battery lasts 3 hours",
          "The monitor has 3 screen panels"
        ],
        answer: 1,
        explanation: "Gigahertz (GHz) measures billions of clock cycles per second. 3.0 GHz means 3,000,000,000 instruction synchronization pulses per second.",
        difficulty: "medium"
      },
      {
        question: "Which part of the CPU performs arithmetic calculations (+, -, *, /)?",
        options: ["ALU (Arithmetic Logic Unit)", "Mouse wheel", "Power supply plug", "CD drawer"],
        answer: 0,
        explanation: "The Arithmetic Logic Unit (ALU) is the specific circuit inside the CPU responsible for mathematical and logical operations.",
        difficulty: "medium"
      },
      {
        question: "Which companies are well-known manufacturers of computer CPUs?",
        options: ["Intel and AMD", "Sony TV and LG", "Nike and Adidas", "Toyota and Honda"],
        answer: 0,
        explanation: "Intel and AMD are the world's leading manufacturers of desktop and laptop x86 processors, along with Apple and Qualcomm for ARM chips.",
        difficulty: "easy"
      },
      {
        question: "What is CPU Cache memory?",
        options: [
          "Super-small, ultra-fast memory built directly inside the CPU chip to store frequently needed data",
          "Paper money stored in the computer case",
          "Old files in the recycle bin",
          "A USB flash drive"
        ],
        answer: 0,
        explanation: "CPU Cache (L1, L2, L3) is lightning-fast internal static RAM placed right on the processor die to prevent waiting on slower main RAM.",
        difficulty: "hard"
      },
      {
        question: "Does having more CPU cores guarantee that every single simple task runs 10 times faster?",
        options: [
          "No, software must be designed to divide tasks across multiple cores (parallel processing) to gain full benefit",
          "Yes, every program is automatically 100 times faster",
          "No, more cores make the computer freeze",
          "Yes, but only on weekends"
        ],
        answer: 0,
        explanation: "Multi-core processors excel at multitasking and multi-threaded programs (like video editing or gaming), but single-threaded apps only utilize one core at a time.",
        difficulty: "hard"
      },
      {
        question: "What is the Control Unit (CU) inside the CPU responsible for?",
        options: [
          "Controlling room lighting",
          "Directing and coordinating the flow of data and instructions throughout the computer",
          "Printing paper documents",
          "Charging the smartphone"
        ],
        answer: 1,
        explanation: "The Control Unit decodes instructions and generates electronic control signals to orchestrate the movement of data between memory, ALU, and I/O.",
        difficulty: "medium"
      },
      {
        question: "What happens when a CPU experiences 'Thermal Throttling'?",
        options: [
          "It reduces its clock speed temporarily to cool down and prevent heat damage",
          "It speeds up until it catches fire",
          "It plays a loud siren on the radio",
          "It changes the language to French"
        ],
        answer: 0,
        explanation: "Thermal throttling is a protective mechanism where the CPU lowers its operating frequency if cooling is insufficient, preventing permanent silicon damage.",
        difficulty: "hard"
      }
    ],
    flashcards: [
      { id: "f501", frontEn: "What is a CPU?", frontNe: "CPU के हो?", backEn: "Central Processing Unit — the main chip that computes data and executes software instructions.", backNe: "कम्प्युटरको मुख्य प्रोसेसर जसले सफ्टवेयरका आदेशहरू पूरा गर्छ।" },
      { id: "f502", frontEn: "What is an ALU?", frontNe: "ALU के हो?", backEn: "Arithmetic Logic Unit — the CPU subsystem that performs mathematical calculations and logical comparisons.", backNe: "CPU भित्रको गणितीय हिसाब र तुलना गर्ने भाग।" },
      { id: "f503", frontEn: "What is the Control Unit (CU)?", frontNe: "कन्ट्रोल युनिट (CU) के हो?", backEn: "The component that directs data flow and instruction execution throughout the processor.", backNe: "डेटाको प्रवाह र निर्देशन कार्यान्वयनको व्यवस्थापन गर्ने भाग।" },
      { id: "f504", frontEn: "What is a Dual-Core vs Octa-Core CPU?", frontNe: "Dual-Core र Octa-Core मा के फरक छ?", backEn: "Dual-core has 2 physical processing cores; Octa-core has 8 cores for superior multitasking.", backNe: "Dual-core मा २ वटा र Octa-core मा ८ वटा प्रशोधन कोरहरू हुन्छन्।" },
      { id: "f505", frontEn: "What does GHz measure in a CPU?", frontNe: "GHz ले के नाप्छ?", backEn: "Clock speed — the number of billions of instruction cycles the CPU handles per second.", backNe: "एक सेकेन्डमा CPU ले गर्न सक्ने अर्बौं चक्रहरूको संख्या (गति)।" },
      { id: "f506", frontEn: "What is CPU Cache?", frontNe: "CPU Cache के हो?", backEn: "Tiny, ultra-fast memory built directly on the CPU chip to hold frequently used data.", backNe: "CPU भित्रै रहेको सबैभन्दा छिटो काम गर्ने सानो मेमोरी।" },
      { id: "f507", frontEn: "What is Thermal Throttling?", frontNe: "थर्मल थ्रोटलिङ (Thermal Throttling) के हो?", backEn: "Automatic slowdown of the CPU to prevent overheating when cooling is inadequate.", backNe: "CPU अत्यधिक तात्न नदिन आफैं गति घटाउने सुरक्षा प्रणाली।" },
      { id: "f508", frontEn: "Does the CPU think like a human?", frontNe: "के CPU ले मानिसजस्तै सोच्न सक्छ?", backEn: "No. It is an electronic logic circuit that strictly follows programmed binary instructions.", backNe: "सक्दैन। यसले प्रोग्रामरले बनाएका नियम र बाइनरी गणित मात्र चलाउँछ।" },
      { id: "f509", frontEn: "Name two top CPU brands", frontNe: "दुई चर्चित CPU कम्पनीहरूको नाम भन्नुहोस्", backEn: "Intel (Core i3, i5, i7, i9) and AMD (Ryzen 3, 5, 7, 9).", backNe: "इन्टेल (Intel) र एएमडी (AMD)।" },
      { id: "f510", frontEn: "What is a Transistor in a CPU?", frontNe: "ट्रान्जिस्टर (Transistor) के हो?", backEn: "A microscopic electronic switch (on/off) that represents binary 1s and 0s.", backNe: "विद्युतीय अन/अफ (१ र ०) गराउने अत्यन्त सानो सूक्ष्म स्विच।" },
    ],
    rememberPoints: [
      { en: "CPU is the executor of all software commands.", ne: "CPU सबै सफ्टवेयर आदेश कार्यान्वयन गर्ने मुख्य यन्त्र हो।" },
      { en: "More cores help with multitasking; higher clock speed helps with single-task speed.", ne: "धेरै कोरले धेरै काम सँगै गर्न र धेरै GHz ले काम छिटो गर्न मद्दत गर्छ।" }
    ]
  },

  // ==========================================
  // LESSON 06: RAM and Storage
  // ==========================================
  {
    id: 6,
    slug: "ram-and-storage",
    title: "RAM and Storage",
    titleNp: "RAM र भण्डारण (Storage)",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Learn the crucial distinction between short-term volatile memory (RAM) and long-term persistent storage (SSD / HDD), storage sizes (GB vs TB), and speed.",
    summaryNp: "अस्थायी मेमोरी (RAM) र स्थायी भण्डारण (SSD/HDD) बीचको भिन्नता, GB र TB को अर्थ सरल भाषामा बुझ्नुहोस्।",
    objectives: [
      { en: "Understand the difference between temporary RAM and permanent Storage", ne: "अस्थायी RAM र स्थायी Storage बीचको मुख्य भिन्नता बुझ्ने" },
      { en: "Learn digital capacity units: Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB)", ne: "मेमोरीका एकाइहरू: KB, MB, GB र TB बुझ्ने" },
      { en: "Compare modern Solid State Drives (SSDs) with traditional Hard Disk Drives (HDDs)", ne: "आधुनिक SSD र पुरानो HDD बीचको तुलना गर्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "One of the most common beginner confusions is mixing up RAM and Storage. While both hold digital data, they serve completely different purposes in a computer.",
        textNe: "धेरैजसो नयाँ प्रयोगकर्ताहरू RAM र Storage मा झुक्किन्छन्। दुवैले डेटा राख्ने भए पनि कम्प्युटरमा यिनीहरूको काम एकदम फरक हुन्छ।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "The Desk and Bookshelf Analogy",
        titleNe: "पढ्ने टेबल र दराजको सरल उदाहरण",
        text: "Think of your study room: The Bookshelf is Storage (holds hundreds of books permanently). Your Study Desk is RAM (holds only the 2 or 3 books you are currently reading right now). When you finish studying, you put the books back on the shelf!",
        textNe: "तपाईंको कोठाको दराज (Bookshelf) भनेको Storage हो जहाँ धेरै किताबहरू सधैं रहन्छन्। तपाईंको पढ्ने टेबल भनेको RAM हो जहाँ अहिले पढिरहेका २-३ वटा किताब मात्र राखिन्छ।"
      },
      {
        type: "heading",
        title: "Comparison: RAM vs Permanent Storage",
        titleNe: "तुलना: RAM र स्थायी भण्डारण"
      },
      {
        type: "diagram",
        items: [
          { step: "Feature", titleEn: "RAM (Working Memory)", titleNe: "RAM (अस्थायी मेमोरी)", descEn: "Volatile (clears when power is off). Ultra-fast speed. Typical size: 8 GB or 16 GB.", descNe: "बत्ती जाँदा खाली हुने। अत्यधिक छिटो। सामान्यतया ८ वा १६ GB।", icon: "Zap" },
          { step: "Feature", titleEn: "SSD / HDD (Permanent Storage)", titleNe: "SSD / HDD (स्थायी स्टोरेज)", descEn: "Non-volatile (keeps files forever). Larger capacity: 256 GB, 512 GB, 1 TB or more.", descNe: "सधैं फाइल सुरक्षित राख्ने। ठूलो क्षमता: २५६ GB, ५१२ GB वा १ TB।", icon: "HardDrive" }
        ]
      },
      {
        type: "heading",
        title: "Digital Storage Hierarchy Units",
        titleNe: "डिजिटल क्षमताका एकाइहरू"
      },
      {
        type: "callout",
        variant: "info",
        title: "Units of Measurement",
        titleNe: "नाप्ने एकाइहरू",
        text: "• 1 Byte = 8 Bits (holds 1 character)\n• 1 KB (Kilobyte) ≈ 1,000 Bytes (short text file)\n• 1 MB (Megabyte) ≈ 1,000 KB (one MP3 song or high-res photo)\n• 1 GB (Gigabyte) ≈ 1,000 MB (one HD movie)\n• 1 TB (Terabyte) ≈ 1,000 GB (hundreds of movies or thousands of games)",
        textNe: "• १ बाइट = ८ बिट (एउटा अक्षर)\n• १ KB = लगभग १,००० बाइट\n• १ MB = लगभग १,००० KB (एउटा गीत वा फोटो)\n• १ GB = लगभग १,००० MB (एउटा HD चलचित्र)\n• १ TB = लगभग १,००० GB (हजारौं ठूला फाइलहरू)"
      }
    ],
    keyTerms: [
      { termEn: "RAM", termNe: "र्‍याम (RAM)", definitionEn: "Random Access Memory — high-speed temporary memory that stores active programs while the computer is on.", definitionNe: "कम्प्युटर चालु हुँदा चालु एपहरू राख्ने छिटो चल्ने अस्थायी मेमोरी।" },
      { termEn: "SSD (Solid State Drive)", termNe: "एसएसडी (SSD)", definitionEn: "Modern flash-based storage drive with no moving parts, offering ultra-fast boot and load times.", definitionNe: "कुनै घुम्ने पार्ट नभएको छिटो चल्ने आधुनिक डिजिटल स्टोरेज।" },
      { termEn: "HDD (Hard Disk Drive)", termNe: "हार्ड डिस्क (HDD)", definitionEn: "Traditional mechanical storage using spinning magnetic platters to record data.", definitionNe: "चुम्बकीय चक्का घुमाएर डेटा राख्ने परम्परागत स्टोरेज।" },
      { termEn: "Gigabyte (GB)", termNe: "गिगाबाइट (GB)", definitionEn: "A unit of data storage equal to approximately 1,000 Megabytes (or 1,024 MB).", definitionNe: "लगभग १,००० मेगाबाइट बराबरको डिजिटल क्षमता।" },
      { termEn: "Terabyte (TB)", termNe: "टेराबाइट (TB)", definitionEn: "A unit of data storage equal to 1,000 Gigabytes (approx 1 trillion bytes).", definitionNe: "१,००० गिगाबाइट बराबरको ठूलो भण्डारण क्षमता।" }
    ],
    misconceptions: [
      {
        mythEn: "If my laptop has 512 GB SSD, that means I have 512 GB of RAM.",
        mythNe: "मेरो ल्यापटपमा ५१२ GB SSD छ भने ५१२ GB नै RAM छ भन्ने हुन्छ।",
        realityEn: "512 GB is your permanent disk storage for saving files. Your RAM is separate and typically 8 GB or 16 GB for running open applications.",
        realityNe: "५१२ GB भनेको फाइल सेभ गर्ने स्थायी स्टोरेज हो। RAM छुट्टै ८ वा १६ GB मात्र हुन्छ जसले चालु एप चलाउँछ।"
      }
    ],
    practiceActivity: {
      titleEn: "Classify: RAM vs Storage Properties",
      titleNe: "वर्गीकरण गर्नुहोस्: RAM कि Storage को विशेषता?",
      instructionEn: "Place each feature into RAM or Storage.",
      instructionNe: "दिइएको विशेषतालाई सही श्रेणीमा वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "ram", labelEn: "RAM (अस्थायी मेमोरी)", labelNe: "RAM", color: "indigo" },
        { key: "storage", labelEn: "Permanent Storage (स्थायी भण्डारण)", labelNe: "Storage", color: "emerald" }
      ],
      items: [
        { id: "r1", nameEn: "Loses all data when power is turned off", nameNe: "बत्ती जाँदा डेटा मेटिने", category: "ram" },
        { id: "r2", nameEn: "Saves photos, movies, and PDFs forever", nameNe: "फोटो र फिल्म सधैंका लागि सेभ राख्ने", category: "storage" },
        { id: "r3", nameEn: "Typically sized 8 GB or 16 GB", nameNe: "सामान्यतया ८ वा १६ GB आकारको हुने", category: "ram" },
        { id: "r4", nameEn: "Typically sized 512 GB or 1 TB", nameNe: "५१२ GB वा १ TB क्षमताको हुने", category: "storage" },
        { id: "r5", nameEn: "Holds currently open browser tabs and apps", nameNe: "अहिले खुलिरहेका ट्याब र एप राख्ने", category: "ram" },
        { id: "r6", nameEn: "Solid State Drive (SSD) or Hard Disk (HDD)", nameNe: "SSD वा हार्डडिस्क", category: "storage" }
      ]
    },
    quiz: [
      {
        question: "What is the key difference between RAM and SSD Storage?",
        options: [
          "RAM is temporary working memory; SSD is permanent long-term storage",
          "RAM is made of paper; SSD is made of wood",
          "RAM stores files forever; SSD deletes files when turned off",
          "There is no difference"
        ],
        answer: 0,
        explanation: "RAM holds active software data temporarily while power is on, whereas SSDs store your files permanently even when powered down.",
        difficulty: "easy"
      },
      {
        question: "How many Megabytes (MB) are approximately in 1 Gigabyte (GB)?",
        options: ["10 MB", "100 MB", "1,000 MB (1,024 MB)", "1,000,000 MB"],
        answer: 2,
        explanation: "In binary computing, 1 GB = 1,024 MB (commonly approximated as 1,000 MB).",
        difficulty: "easy"
      },
      {
        question: "What is the major advantage of an SSD over an older mechanical HDD?",
        options: [
          "SSDs are much faster, silent, and have no moving mechanical parts",
          "SSDs require gasoline to run",
          "SSDs can only store black-and-white photos",
          "SSDs are much slower than HDDs"
        ],
        answer: 0,
        explanation: "Solid State Drives use electronic flash memory chips, making them 5 to 20 times faster than spinning magnetic disks.",
        difficulty: "easy"
      },
      {
        question: "If your computer slows down significantly when you open 20 browser tabs at once, what component is likely running out of space?",
        options: ["The monitor glass", "RAM (Random Access Memory)", "The power switch", "The keyboard spacebar"],
        answer: 1,
        explanation: "Each open browser tab requires RAM. When RAM is full, the OS swaps data to slower disk storage, causing lag.",
        difficulty: "medium"
      },
      {
        question: "Which of the following represents the largest digital storage capacity?",
        options: ["100 Megabytes (MB)", "50 Gigabytes (GB)", "2 Terabytes (TB)", "500 Kilobytes (KB)"],
        answer: 2,
        explanation: "2 Terabytes (TB) = 2,000 Gigabytes, which is vastly larger than 50 GB, 100 MB, or 500 KB.",
        difficulty: "easy"
      },
      {
        question: "What does 'Volatile Memory' mean?",
        options: [
          "Memory that requires electricity to retain data and empties upon shutdown",
          "Memory that explodes when dropped",
          "Memory that only works in hot weather",
          "Memory used only for video games"
        ],
        answer: 0,
        explanation: "Volatile memory (like RAM) loses its stored state as soon as power is cut off.",
        difficulty: "medium"
      },
      {
        question: "A laptop specification reads: '16GB RAM | 512GB SSD'. What does 16GB refer to?",
        options: [
          "The weight of the laptop",
          "The temporary working memory for running applications",
          "The total storage capacity for saved videos",
          "The screen brightness level"
        ],
        answer: 1,
        explanation: "16GB refers to the system RAM used for executing multitasking apps and active processes.",
        difficulty: "easy"
      },
      {
        question: "Which device is an example of external portable storage?",
        options: ["USB Flash Drive (Pen Drive)", "CPU cooler", "Motherboard chipset", "Power supply cord"],
        answer: 0,
        explanation: "A USB Flash Drive (Pen Drive) is a portable non-volatile storage drive used to transport files between computers.",
        difficulty: "easy"
      },
      {
        question: "What is 'Virtual Memory' (Paging / Swap file)?",
        options: [
          "A portion of the SSD/HDD used as emergency temporary memory when physical RAM is full",
          "Memory only used in virtual reality headsets",
          "A fake memory card that doesn't exist",
          "Memory stored on paper"
        ],
        answer: 0,
        explanation: "Virtual memory is a system technique where the OS uses a pagefile on the storage drive when physical RAM is exhausted.",
        difficulty: "hard"
      },
      {
        question: "Why should you safely eject a USB flash drive before pulling it out of the port?",
        options: [
          "To allow pending write operations to complete and avoid corrupting saved files",
          "To prevent the USB drive from becoming too hot to touch",
          "Because the computer will lock itself permanently",
          "To clean the USB metal connector"
        ],
        answer: 0,
        explanation: "Safely ejecting ensures all cached data has finished writing to the flash memory chips, preventing file corruption.",
        difficulty: "medium"
      }
    ],
    flashcards: [
      { id: "f601", frontEn: "What is RAM?", frontNe: "RAM के हो?", backEn: "Random Access Memory — high-speed volatile memory that holds active programs while the computer is on.", backNe: "चालु अवस्थामा रहेका प्रोग्रामहरू राख्ने छिटो चल्ने अस्थायी मेमोरी।" },
      { id: "f602", frontEn: "What is Permanent Storage?", frontNe: "स्थायी भण्डारण (Storage) के हो?", backEn: "Non-volatile storage (SSD/HDD) where files, photos, and operating systems remain saved permanently.", backNe: "फाइल, तस्बिर र सफ्टवेयर सधैंका लागि सुरक्षित राखिने माध्यम।" },
      { id: "f603", frontEn: "Why is an SSD better than an HDD?", frontNe: "HDD भन्दा SSD किन राम्रो छ?", backEn: "SSDs use flash memory with no moving parts, making them 5-20x faster, quieter, and more durable.", backNe: "SSD मा कुनै घुम्ने पार्ट हुँदैन, यो ५ देखि २० गुणा छिटो र बलियो हुन्छ।" },
      { id: "f604", frontEn: "How many GB in 1 TB?", frontNe: "१ TB मा कति GB हुन्छ?", backEn: "Approximately 1,000 Gigabytes (or 1,024 GB).", backNe: "लगभग १,००० गिगाबाइट (वा १,०२४ GB)।" },
      { id: "f605", frontEn: "What happens to RAM on computer shutdown?", frontNe: "कम्प्युटर बन्द गर्दा RAM को डेटा के हुन्छ?", backEn: "It is completely cleared because RAM is volatile memory.", backNe: "बिजुली नहुँदा RAM मा भएको सबै डेटा पूर्ण रूपमा खाली हुन्छ।" },
      { id: "f606", frontEn: "What is a Byte?", frontNe: "१ बाइट भनेको कति हो?", backEn: "8 bits of digital data, enough to represent a single letter or number.", backNe: "८ बिट बराबर १ बाइट हुन्छ, जसले एउटा अक्षर जनाउँछ।" },
      { id: "f607", frontEn: "What is Cloud Storage?", frontNe: "क्लाउड स्टोरेज (Cloud Storage) के हो?", backEn: "Saving files on secure remote internet servers (e.g. Google Drive, OneDrive) accessible anywhere.", backNe: "इन्टरनेटमा सुरक्षित सर्भरमा फाइल राख्ने प्रविधि (जस्तै: Google Drive)।" },
      { id: "f608", frontEn: "Why does more RAM help multitasking?", frontNe: "धेरै RAM ले मल्टिटास्किङमा कसरी मद्दत गर्छ?", backEn: "It allows multiple heavy programs and browser tabs to remain open simultaneously without slowing down.", backNe: "धेरै एप र ट्याबहरू एकैपटक खोल्दा पनि कम्प्युटर ढिला हुन दिँदैन।" },
      { id: "f609", frontEn: "What is a Pen Drive / Flash Drive?", frontNe: "पेनड्राइभ के हो?", backEn: "A small portable USB storage device used to carry and transfer files easily.", backNe: "फाइलहरू एक ठाउँबाट अर्को ठाउँमा सार्न प्रयोग गरिने सानो USB यन्त्र।" },
      { id: "f610", frontEn: "Explain 8GB RAM vs 512GB SSD", frontNe: "८ GB RAM र ५१२ GB SSD को भिन्नता के हो?", backEn: "8GB is the fast working desk for running apps; 512GB is the large cabinet for saving your files.", backNe: "८ GB काम गर्ने छिटो टेबल हो; ५१२ GB फाइलहरू थन्क्याउने ठूलो दराज हो।" },
    ],
    rememberPoints: [
      { en: "RAM is fast and temporary; SSD is large and permanent.", ne: "RAM छिटो र अस्थायी हो; SSD ठूलो र स्थायी हो।" },
      { en: "Upgrading from HDD to SSD is the biggest single performance boost for an older computer.", ne: "पुरानो कम्प्युटरमा HDD हटाएर SSD राख्नु सबैभन्दा ठूलो सुधार हो।" }
    ]
  },

  // ==========================================
  // LESSON 07: Input and Output Devices
  // ==========================================
  {
    id: 7,
    slug: "input-and-output-devices",
    title: "Input and Output Devices",
    titleNp: "इनपुट र आउटपुट उपकरणहरू",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Explore the variety of input peripherals (keyboards, mice, scanners, webcams) and output peripherals (monitors, printers, speakers), plus dual-purpose I/O devices.",
    summaryNp: "इनपुट (किबोर्ड, माउस, स्क्यानर) र आउटपुट (मोनिटर, प्रिन्टर, स्पिकर) उपकरणहरू तथा दुवै काम गर्ने यन्त्रहरू बुझ्नुहोस्।",
    objectives: [
      { en: "Identify common input devices and their specific functions", ne: "विभिन्न इनपुट उपकरणहरू र तिनका कामहरू पहिचान गर्ने" },
      { en: "Identify common output devices and their display/audio capabilities", ne: "विभिन्न आउटपुट उपकरणहरू र तिनका कामहरू पहिचान गर्ने" },
      { en: "Understand dual-purpose I/O devices such as Touchscreens and All-in-One Printers", ne: "टचस्क्रिन जस्ता इनपुट र आउटपुट दुवै काम गर्ने यन्त्रहरू बुझ्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Input and Output (I/O) devices form the vital bridge between humans and computers. Input devices send instructions and information in; output devices communicate processed results out.",
        textNe: "इनपुट र आउटपुट उपकरणहरू मानिस र कम्प्युटर बीचको पुल हुन्। इनपुटले कम्प्युटर भित्र जानकारी पठाउँछ भने आउटपुटले नतिजा बाहिर दिन्छ।"
      },
      {
        type: "heading",
        title: "Input Devices Overview",
        titleNe: "प्रमुख इनपुट उपकरणहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "Input 1", titleEn: "Keyboard", titleNe: "किबोर्ड", descEn: "Types letters, numbers, and shortcut commands into the system.", descNe: "अक्षर, अंक र कमान्ड टाइप गर्न प्रयोग गरिन्छ।", icon: "Keyboard" },
          { step: "Input 2", titleEn: "Mouse / Trackpad", titleNe: "माउस / टचप्याड", descEn: "Pointing device used to select, drag, click, and navigate on screen.", descNe: "स्क्रिनमा कर्सर चलाउन, क्लिक गर्न र छनोट गर्न।", icon: "MousePointer" },
          { step: "Input 3", titleEn: "Microphone", titleNe: "माइक्रोफोन", descEn: "Captures voice and audio for voice calls, recording, and speech recognition.", descNe: "आवाज रेकर्ड गर्न र अनलाइन कुराकानी गर्न।", icon: "Mic" },
          { step: "Input 4", titleEn: "Webcam / Scanner", titleNe: "वेबक्याम / स्क्यानर", descEn: "Captures live video and converts paper documents into digital image files.", descNe: "भिडियो कल गर्न र कागजका डकुमेन्ट स्क्यान गर्न।", icon: "Camera" }
        ]
      },
      {
        type: "heading",
        title: "Output Devices Overview",
        titleNe: "प्रमुख आउटपुट उपकरणहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "Output 1", titleEn: "Monitor / Display", titleNe: "मोनिटर / स्क्रिन", descEn: "Displays user interfaces, text, graphics, and video in real time.", descNe: "तस्बिर, भिडियो र अक्षरहरू देखाउने स्क्रिन।", icon: "Monitor" },
          { step: "Output 2", titleEn: "Audio Speakers", titleNe: "स्पिकर / हेडफोन", descEn: "Outputs music, spoken lectures, notification sounds, and speech.", descNe: "गीत, अडियो र सूचनाका आवाज सुनाउने।", icon: "Volume2" },
          { step: "Output 3", titleEn: "Paper Printer", titleNe: "प्रिन्टर", descEn: "Creates physical hard-copy prints on sheets of paper.", descNe: "कागजमा अक्षर र तस्बिर छाप्ने यन्त्र।", icon: "Printer" },
          { step: "Output 4", titleEn: "Projector", titleNe: "प्रोजेक्टर", descEn: "Projects computer display onto large classroom walls or presentation screens.", descNe: "कक्षाकोठा वा हलमा ठूलो पर्दामा स्क्रिन देखाउने।", icon: "Tv" }
        ]
      },
      {
        type: "callout",
        variant: "concept",
        title: "Dual I/O Devices: Touchscreens",
        titleNe: "दुवै काम गर्ने: टचस्क्रिन (Touchscreen)",
        text: "A Touchscreen (on smartphones, tablets, and ATMs) is both an Input and Output device simultaneously! It displays visual graphics (Output) and senses finger touches to receive commands (Input).",
        textNe: "स्मार्टफोन र ATM को टचस्क्रिनले आउटपुट (तस्बिर देखाउने) र इनपुट (औंलाले छुँदा आदेश लिने) दुवै काम एकसाथ गर्छ!"
      }
    ],
    keyTerms: [
      { termEn: "Input Device", termNe: "इनपुट उपकरण", definitionEn: "Hardware used to provide data and control signals to a computer system.", definitionNe: "कम्प्युटरलाई डेटा र निर्देशन पठाउन प्रयोग हुने उपकरण।" },
      { termEn: "Output Device", termNe: "आउटपुट उपकरण", definitionEn: "Hardware that converts information into human-perceptible visual, audio, or physical form.", definitionNe: "कम्प्युटरको नतिजा देखाउने वा सुनाउने उपकरण।" },
      { termEn: "Touchscreen", termNe: "टचस्क्रिन", definitionEn: "A display screen that also functions as an input device by recognizing the touch of a finger or stylus.", definitionNe: "स्क्रिन पनि भएको र छुँदा निर्देशन पनि लिने दोहोरो यन्त्र।" },
      { termEn: "Hard Copy", termNe: "हार्ड कपी (कागजको प्रिन्ट)", definitionEn: "A physical printed version of digital information on paper.", definitionNe: "डिजिटल फाइललाई कागजमा छापिएको रूप।" },
      { termEn: "Soft Copy", termNe: "सफ्ट कपी (डिजिटल फाइल)", definitionEn: "Digital data stored electronically inside a computer or screen.", definitionNe: "कम्प्युटर वा मोबाइल भित्र रहेको डिजिटल फाइल।" }
    ],
    misconceptions: [
      {
        mythEn: "A printer and a scanner are always the exact same thing.",
        mythNe: "प्रिन्टर र स्क्यानर सधैं एउटै हुन्।",
        realityEn: "A scanner is an Input device (converts paper to digital). A printer is an Output device (converts digital to paper). An 'All-in-One' machine combines both inside one box.",
        realityNe: "स्क्यानर इनपुट हो (कागजलाई कम्प्युटरमा हाल्ने); प्रिन्टर आउटपुट हो (कागजमा छाप्ने)। All-in-One मेसिनमा दुवै भाग जोडिएका हुन्छन्।"
      }
    ],
    practiceActivity: {
      titleEn: "Sort Devices: Input vs Output vs Both",
      titleNe: "उपकरण वर्गीकरण: इनपुट, आउटपुट वा दुवै?",
      instructionEn: "Classify each device correctly into Input, Output, or Dual I/O.",
      instructionNe: "दिइएको यन्त्रलाई इनपुट, आउटपुट वा दुवै (Dual) मा वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "input", labelEn: "Input Only (इनपुट मात्र)", labelNe: "इनपुट", color: "indigo" },
        { key: "output", labelEn: "Output Only (आउटपुट मात्र)", labelNe: "आउटपुट", color: "emerald" },
        { key: "both", labelEn: "Dual I/O (दुवै काम गर्ने)", labelNe: "दुवै", color: "purple" }
      ],
      items: [
        { id: "io1", nameEn: "Document Scanner", nameNe: "कागज स्क्यानर", category: "input" },
        { id: "io2", nameEn: "Audio Headphones", nameNe: "हेडफोन", category: "output" },
        { id: "io3", nameEn: "Smartphone Touchscreen", nameNe: "स्मार्टफोन टचस्क्रिन", category: "both" },
        { id: "io4", nameEn: "Webcam", nameNe: "वेबक्याम", category: "input" },
        { id: "io5", nameEn: "Classroom Video Projector", nameNe: "भिडियो प्रोजेक्टर", category: "output" },
        { id: "io6", nameEn: "Computer Mouse", nameNe: "कम्प्युटर माउस", category: "input" },
      ]
    },
    quiz: [
      {
        question: "Which of the following is an INPUT device?",
        options: ["Audio speaker", "Flatbed Document Scanner", "Laser printer", "Computer monitor"],
        answer: 1,
        explanation: "A document scanner captures a physical sheet and sends the digital image into the computer, making it an input device.",
        difficulty: "easy"
      },
      {
        question: "Which of the following is an OUTPUT device?",
        options: ["Microphone", "Computer Mouse", "Multimedia Projector", "Webcam"],
        answer: 2,
        explanation: "A multimedia projector takes video output from a computer and projects it onto a wall screen for audiences.",
        difficulty: "easy"
      },
      {
        question: "Why is a smartphone touchscreen classified as a dual Input and Output device?",
        options: [
          "Because it shows visual content (output) and detects finger touch commands (input)",
          "Because it can be used as a mirror",
          "Because it connects to batteries",
          "Because it only works when plugged into wall sockets"
        ],
        answer: 0,
        explanation: "Touchscreens combine a visual display screen (output) with a capacitive touch sensor layer (input).",
        difficulty: "medium"
      },
      {
        question: "What is the difference between a 'Soft Copy' and a 'Hard Copy'?",
        options: [
          "Soft copy is digital on a screen; Hard copy is physically printed on paper",
          "Soft copy is heavy; Hard copy is light",
          "Soft copy is made of clay; Hard copy is made of glass",
          "They mean the exact same thing"
        ],
        answer: 0,
        explanation: "A soft copy is an electronic file viewed on a display, while a hard copy is printed on paper.",
        difficulty: "easy"
      },
      {
        question: "Which input device is commonly used in retail shops in Nepal to scan product barcodes?",
        options: ["Barcode / QR Scanner", "Audio Speaker", "Paper printer", "Microphone"],
        answer: 0,
        explanation: "Barcode and QR code readers use optical sensors to read codes and input product identification numbers into checkout software.",
        difficulty: "easy"
      },
      {
        question: "What type of printer is most commonly used in modern offices for fast, crisp text printing?",
        options: ["Laser Printer", "Typewriter", "Gramophone", "Telegraph"],
        answer: 0,
        explanation: "Laser printers use powdered toner and laser beams to produce crisp, high-speed text documents economically.",
        difficulty: "medium"
      },
      {
        question: "Which device captures human voice input for online meetings?",
        options: ["Microphone", "Monitor", "Printer", "Hard disk"],
        answer: 0,
        explanation: "A microphone converts sound vibrations into electronic digital audio signals for recording or transmission.",
        difficulty: "easy"
      },
      {
        question: "What does DPI stand for in the context of computer mice and printers?",
        options: ["Dots Per Inch", "Digital Program Interface", "Direct Power Input", "Data Protection Index"],
        answer: 0,
        explanation: "Dots Per Inch (DPI) measures the resolution and precision of printed images and mouse tracking sensitivity.",
        difficulty: "hard"
      },
      {
        question: "Which of the following is commonly used for gaming control input?",
        options: ["Gamepad / Joystick", "Printer tray", "Monitor power cable", "Cooling heatsink"],
        answer: 0,
        explanation: "Gamepads and joysticks are specialized input controllers designed for precise navigation and gameplay actions.",
        difficulty: "easy"
      },
      {
        question: "What type of output does an Audio DAC / Sound card produce?",
        options: [
          "Audible sound signals for headphones and speakers",
          "Paper certificates",
          "Laser beams on the wall",
          "Wifi internet signals"
        ],
        answer: 0,
        explanation: "A sound card or DAC converts digital audio numbers into analog electrical signals that drive headphones and speakers.",
        difficulty: "medium"
      }
    ],
    flashcards: [
      { id: "f701", frontEn: "Define Input Device", frontNe: "इनपुट उपकरण भनेको के हो?", backEn: "Hardware used to enter data, commands, or signals into a computer (e.g. keyboard, mouse).", backNe: "कम्प्युटर भित्र डेटा वा कमान्ड पठाउन प्रयोग गरिने यन्त्र।" },
      { id: "f702", frontEn: "Define Output Device", frontNe: "आउटपुट उपकरण भनेको के हो?", backEn: "Hardware that communicates processed results to users (e.g. monitor, printer, speakers).", backNe: "कम्प्युटरले प्रशोधन गरेको नतिजा मानिसलाई देखाउने वा सुनाउने यन्त्र।" },
      { id: "f703", frontEn: "What is a Touchscreen?", frontNe: "टचस्क्रिन के हो?", backEn: "A dual I/O device that displays visuals (output) and registers finger touches (input).", backNe: "तस्बिर देखाउने (आउटपुट) र छुँदा कमान्ड लिने (इनपुट) दुवै काम गर्ने स्क्रिन।" },
      { id: "f704", frontEn: "Soft Copy vs Hard Copy", frontNe: "सफ्ट कपी र हार्ड कपीको फरक", backEn: "Soft copy is a digital electronic file; Hard copy is a physical sheet of paper printed out.", backNe: "सफ्ट कपी स्क्रिनमा हेरिने डिजिटल फाइल हो; हार्ड कपी कागजमा छापिएको रूप हो।" },
      { id: "f705", frontEn: "What is a Scanner?", frontNe: "स्क्यानर के हो?", backEn: "An input device that captures physical paper documents and converts them into digital images.", backNe: "कागजको डकुमेन्टलाई डिजिटल तस्बिरमा बदल्ने इनपुट यन्त्र।" },
      { id: "f706", frontEn: "What is an Inkjet vs Laser Printer?", frontNe: "Inkjet र Laser प्रिन्टरको फरक", backEn: "Inkjet sprays liquid ink droplets (great for photos); Laser uses dry toner powder and heat (fast for text).", backNe: "Inkjet ले तरल मसी छर्कन्छ; Laser ले सुक्खा पाउडर (Toner) प्रयोग गरेर छिटो छाप्छ।" },
      { id: "f707", frontEn: "What is a Microphone?", frontNe: "माइक्रोफोन के हो?", backEn: "An input device that converts sound waves into digital audio signals.", backNe: "मानिसको आवाजलाई डिजिटल अडियोमा बदल्ने इनपुट उपकरण।" },
      { id: "f708", frontEn: "What is a Projector?", frontNe: "प्रोजेक्टर के हो?", backEn: "An output device that projects the computer screen onto a large surface for group viewing.", backNe: "कम्प्युटरको स्क्रिनलाई ठूलो भित्ता वा पर्दामा देखाउने आउटपुट यन्त्र।" },
      { id: "f709", frontEn: "What is an All-in-One Printer?", frontNe: "All-in-One प्रिन्टर के हो?", backEn: "A machine combining printing (output), scanning (input), and photocopying in a single unit.", backNe: "प्रिन्ट गर्ने, स्क्यान गर्ने र फोटोकपी गर्ने तीनवटै सुविधा भएको मेसिन।" },
      { id: "f710", frontEn: "What is a Barcode Reader?", frontNe: "बारकोड रिडर के हो?", backEn: "An optical input scanner used at shopping counters to read product codes instantly.", backNe: "पसलको काउन्टरमा सामानको कोड स्क्यान गरी मूल्य पत्ता लगाउने यन्त्र।" },
    ],
    rememberPoints: [
      { en: "Input feeds data into the computer; Output presents results to humans.", ne: "इनपुटले डेटा भित्र पठाउँछ; आउटपुटले नतिजा बाहिर दिन्छ।" },
      { en: "Touchscreens and all-in-one peripherals can perform both roles simultaneously.", ne: "टचस्क्रिन जस्ता उपकरणले इनपुट र आउटपुट दुवै काम एकसाथ गर्छन्।" }
    ]
  },

  // ==========================================
  // LESSON 08: Operating Systems
  // ==========================================
  {
    id: 8,
    slug: "operating-systems",
    title: "Operating Systems",
    titleNp: "अपरेटिङ सिस्टमहरू",
    duration: "12 mins",
    level: "Beginner",
    summaryEn: "Discover what an Operating System (OS) does: managing memory, files, security, and hardware, and explore Windows, macOS, Linux, Android, and iOS.",
    summaryNp: "अपरेटिङ सिस्टम के हो, यसले कसरी हार्डवेयर र एपहरू चलाउँछ, र Windows, macOS, Linux, Android, iOS को परिचय पाउनुहोस्।",
    objectives: [
      { en: "Define an Operating System and understand its core functions", ne: "अपरेटिङ सिस्टमको परिभाषा र यसका मुख्य कामहरू बुझ्ने" },
      { en: "Recognize the most popular desktop and mobile operating systems", ne: "कम्प्युटर र मोबाइलका प्रमुख अपरेटिङ सिस्टमहरू पहिचान गर्ने" },
      { en: "Understand Graphical User Interfaces (GUI) vs Command Line Interfaces (CLI)", ne: "GUI (ग्राफिकल) र CLI (कमान्ड लाइन) बीचको भिन्नता सिक्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "An Operating System (OS) is the fundamental system software that acts as an intermediary between the computer hardware and the user applications. Without an OS, a computer cannot start up or run programs.",
        textNe: "अपरेटिङ सिस्टम (OS) कम्प्युटरको मुख्य सिस्टम सफ्टवेयर हो जसले हार्डवेयर र प्रयोगकर्ताका एपहरू बीच समन्वय गर्छ। यो बिना कम्प्युटर खुल्नै सक्दैन।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "The School Principal / General Manager Analogy",
        titleNe: "प्रधानाध्यापक वा प्रबन्धकको सरल उदाहरण",
        text: "Think of an Operating System as the Principal of a school: The Principal assigns classrooms (memory management), schedules periods (CPU scheduling), maintains student records (file system), and ensures the security and smooth operation of the entire school.",
        textNe: "अपरेटिङ सिस्टमलाई विद्यालयको प्रधानाध्यापक जस्तै सम्झनुहोस्: जसले कक्षा कोठा मिलाउने, घण्टी बजाउने, रेकर्ड राख्ने र पूरै विद्यालयको व्यवस्थापन गर्ने काम गर्छ।"
      },
      {
        type: "heading",
        title: "Popular Operating Systems Today",
        titleNe: "आजका प्रमुख अपरेटिङ सिस्टमहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "OS 1", titleEn: "Microsoft Windows", titleNe: "विन्डोज (Windows)", descEn: "The most widely used desktop OS worldwide in offices, schools, and homes.", descNe: "संसारभरका कार्यालय, विद्यालय र घरहरूमा सबैभन्दा बढी प्रयोग हुने प्रणाली।", icon: "Layout" },
          { step: "OS 2", titleEn: "Apple macOS", titleNe: "म्याक ओएस (macOS)", descEn: "Apple's sleek operating system designed exclusively for Mac computers.", descNe: "एप्पलका म्याक कम्प्युटरका लागि मात्र बनाइएको सुरक्षित प्रणाली।", icon: "Apple" },
          { step: "OS 3", titleEn: "Linux", titleNe: "लिनक्स (Linux)", descEn: "Free, open-source OS powering internet servers, supercomputers, and developers.", descNe: "निःशुल्क र खुला स्रोत (Open Source) प्रणाली जसले विश्वका सर्भरहरू चलाउँछ।", icon: "Terminal" },
          { step: "OS 4", titleEn: "Android & iOS", titleNe: "एन्ड्रोइड र आईओएस", descEn: "Leading mobile operating systems powering billions of smartphones and tablets.", descNe: "स्मार्टफोन र ट्याब्लेट चलाउने विश्वका मुख्य मोबाइल प्रणालीहरू।", icon: "Smartphone" }
        ]
      },
      {
        type: "nepalExample",
        title: "Everyday Nepal Context: From Cyber Cafes to Bank Terminals",
        titleNe: "नेपालको सन्दर्भमा: कार्यालय, बैंक र स्मार्टफोनमा",
        text: "In Nepal, most government offices, colleges, and cyber cafes run Microsoft Windows. Nepali citizens interact with Google Android or Apple iOS on their phones daily, while banks host core databases on robust Linux servers.",
        textNe: "नेपालका अधिकांश सरकारी कार्यालय र कलेजहरूमा Windows चल्छ। जनताले मोबाइलमा Android वा iOS चलाउँछन् भने बैंकका सर्भरहरू Linux मा चल्छन्।"
      }
    ],
    keyTerms: [
      { termEn: "Operating System (OS)", termNe: "अपरेटिङ सिस्टम (OS)", definitionEn: "Master software controlling hardware resources, memory, files, and user interface.", definitionNe: "कम्प्युटरका सम्पूर्ण स्रोत, मेमोरी र फाइलहरू व्यवस्थापन गर्ने मुख्य सफ्टवेयर।" },
      { termEn: "GUI (Graphical User Interface)", termNe: "ग्राफिकल युजर इन्टरफेस (GUI)", definitionEn: "Visual interface allowing users to interact using windows, icons, menus, and mouse pointers.", definitionNe: "आइकन, विन्डो र माउसको मद्दतले कम्प्युटर चलाउन मिल्ने सजिलो दृश्य माध्यम।" },
      { termEn: "File System", termNe: "फाइल सिस्टम", definitionEn: "The method used by an OS to organize, name, store, and retrieve files on a storage drive.", definitionNe: "कम्प्युटरमा फाइल र फोल्डरहरू व्यवस्थित गरेर राख्ने तरिका।" },
      { termEn: "Open Source", termNe: "ओपन सोर्स (Open Source)", definitionEn: "Software whose original source code is made freely available for anyone to inspect, modify, and share.", definitionNe: "सबैका लागि निःशुल्क र कोड हेर्न तथा सच्याउन पाइने सफ्टवेयर।" }
    ],
    misconceptions: [
      {
        mythEn: "Windows and Android are made by the same company and work identically.",
        mythNe: "Windows र Android एउटै कम्पनीले बनाएका हुन् र दुवै उस्तै छन्।",
        realityEn: "Windows is made by Microsoft for PCs. Android is developed by Google for mobile touch devices based on the Linux kernel.",
        realityNe: "Windows माइक्रोसफ्ट कम्पनीको कम्प्युटर सफ्टवेयर हो भने Android गुगलले मोबाइलका लागि बनाएको प्रणाली हो।"
      }
    ],
    practiceActivity: {
      titleEn: "Match OS to Device Type",
      titleNe: "उपकरण अनुसार सही अपरेटिङ सिस्टम मिलाउनुहोस्",
      instructionEn: "Classify each OS into Desktop/Laptop or Mobile device.",
      instructionNe: "दिइएको OS लाई कम्प्युटर वा मोबाइल श्रेणीमा वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "pc", labelEn: "Desktop / Laptop OS (कम्प्युटर OS)", labelNe: "कम्प्युटर OS", color: "indigo" },
        { key: "mobile", labelEn: "Mobile / Tablet OS (मोबाइल OS)", labelNe: "मोबाइल OS", color: "emerald" }
      ],
      items: [
        { id: "os1", nameEn: "Microsoft Windows 11", nameNe: "विन्डोज ११", category: "pc" },
        { id: "os2", nameEn: "Google Android 14", nameNe: "गुगल एन्ड्रोइड", category: "mobile" },
        { id: "os3", nameEn: "Apple macOS Sonoma", nameNe: "एप्पल म्याक ओएस", category: "pc" },
        { id: "os4", nameEn: "Apple iOS (iPhone)", nameNe: "एप्पल आईओएस", category: "mobile" },
        { id: "os5", nameEn: "Ubuntu Linux Desktop", nameNe: "उबुन्टु लिनक्स", category: "pc" },
      ]
    },
    quiz: [
      {
        question: "What is an Operating System (OS)?",
        options: [
          "System software that manages computer hardware and provides a platform for applications",
          "A type of physical screwdriver for fixing screens",
          "An online shopping website",
          "A plastic keyboard protector"
        ],
        answer: 0,
        explanation: "An Operating System is the master system software that coordinates all hardware resources and user applications.",
        difficulty: "easy"
      },
      {
        question: "Which of the following is the most popular desktop operating system worldwide?",
        options: ["Microsoft Windows", "Android", "PlayStation OS", "MS-DOS 1.0"],
        answer: 0,
        explanation: "Microsoft Windows powers the vast majority of personal desktop and laptop computers globally.",
        difficulty: "easy"
      },
      {
        question: "What does GUI stand for?",
        options: ["Graphical User Interface", "General Universal Internet", "Gaming Utility Integration", "Global Unit Identifier"],
        answer: 0,
        explanation: "GUI stands for Graphical User Interface, enabling users to interact via clickable visual icons, windows, and pointers.",
        difficulty: "easy"
      },
      {
        question: "Which operating system is free, open-source, and powers most of the internet's web servers?",
        options: ["Linux", "MS Paint", "Windows 95", "iOS"],
        answer: 0,
        explanation: "Linux is open-source, stable, and secure, making it the top choice for web servers, cloud computing, and supercomputers.",
        difficulty: "medium"
      },
      {
        question: "Which OS runs on Apple iPhones?",
        options: ["iOS", "Windows Mobile", "Symbian", "Android"],
        answer: 0,
        explanation: "Apple iPhones run iOS, a mobile operating system developed specifically for iPhone hardware.",
        difficulty: "easy"
      },
      {
        question: "What is the primary role of the OS File Manager (e.g. Windows File Explorer)?",
        options: [
          "To allow users to browse, create, rename, and organize folders and files",
          "To physically print paper documents",
          "To increase monitor resolution",
          "To charge laptop batteries"
        ],
        answer: 0,
        explanation: "File managers provide a graphical view of folders and files saved on storage drives, allowing easy organization.",
        difficulty: "easy"
      },
      {
        question: "What happens during the computer 'Boot' process?",
        options: [
          "The computer kicks a football",
          "The computer initializes hardware and loads the Operating System from disk into RAM",
          "The computer turns into an audio player",
          "The computer deletes all user data"
        ],
        answer: 1,
        explanation: "Booting is the startup sequence where firmware tests hardware and loads the OS kernel into memory.",
        difficulty: "medium"
      },
      {
        question: "What does multitasking in an operating system mean?",
        options: [
          "Allowing the user to run multiple applications at the same time",
          "Using two monitors on one desk",
          "Typing with both hands",
          "Connecting two mice to one computer"
        ],
        answer: 0,
        explanation: "Multitasking is the OS capability to manage processor time across multiple open apps (e.g. listening to music while typing a document).",
        difficulty: "medium"
      },
      {
        question: "What is an Open Source software license?",
        options: [
          "Software whose source code is open to the public to inspect, modify, and redistribute freely",
          "Software that requires a paid key from a store",
          "Software that only runs when doors are open",
          "Software with no features"
        ],
        answer: 0,
        explanation: "Open source allows the global community to view, improve, and share source code freely under permissive licenses.",
        difficulty: "medium"
      },
      {
        question: "Why does an operating system require regular security updates?",
        options: [
          "To patch newly discovered security vulnerabilities and improve system stability",
          "To make the computer heavier",
          "To delete your personal photos",
          "To turn off your internet"
        ],
        answer: 0,
        explanation: "Security updates fix discovered software flaws, protect against malware, and maintain system compatibility.",
        difficulty: "easy"
      }
    ],
    flashcards: [
      { id: "f801", frontEn: "What is an Operating System?", frontNe: "अपरेटिङ सिस्टम के हो?", backEn: "System software that manages computer hardware and provides services for application programs.", backNe: "कम्प्युटरका सम्पूर्ण हार्डवेयर र एपहरू चलाउने मुख्य आधारभूत सफ्टवेयर।" },
      { id: "f802", frontEn: "What is a GUI?", frontNe: "GUI के हो?", backEn: "Graphical User Interface — a visual system using windows, icons, and mouse pointers to interact with a computer.", backNe: "आइकन, विन्डो र माउसको सहायताले चलाइने सजिलो ग्राफिकल माध्यम।" },
      { id: "f803", frontEn: "Name 3 Desktop Operating Systems", frontNe: "३ वटा कम्प्युटर OS का नाम भन्नुहोस्", backEn: "Microsoft Windows, Apple macOS, and Linux (Ubuntu/Fedora).", backNe: "Microsoft Windows, Apple macOS र Linux।" },
      { id: "f804", frontEn: "Name 2 Mobile Operating Systems", frontNe: "२ वटा मोबाइल OS का नाम भन्नुहोस्", backEn: "Google Android and Apple iOS.", backNe: "गुगल एन्ड्रोइड (Android) र एप्पल आईओएस (iOS)।" },
      { id: "f805", frontEn: "What is Open Source?", frontNe: "ओपन सोर्स (Open Source) के हो?", backEn: "Software whose source code is freely shared for anyone to study, improve, and use (e.g. Linux).", backNe: "सबैका लागि निःशुल्क र कोड हेर्न तथा सच्याउन पाइने सफ्टवेयर।" },
      { id: "f806", frontEn: "What is Booting?", frontNe: "बुटिङ (Booting) के हो?", backEn: "The startup process that initializes hardware and loads the OS from storage into RAM.", backNe: "कम्प्युटर खोल्दा हार्डवेयर जाँच गरी अपरेटिङ सिस्टम लोड हुने प्रक्रिया।" },
      { id: "f807", frontEn: "What is a File Extension?", frontNe: "फाइल एक्सटेन्सन (.docx, .jpg) के हो?", backEn: "Letters at the end of a filename (like .pdf or .mp4) showing the OS what app to open it with.", backNe: "फाइलको नामको पछाडि हुने संकेत (.pdf, .mp3) जसले फाइलको प्रकार बुझाउँछ।" },
      { id: "f808", frontEn: "What is Task Manager?", frontNe: "टास्क म्यानेजर (Task Manager) के हो?", backEn: "A system utility that shows running applications, CPU/RAM usage, and lets you close frozen apps.", backNe: "कम्प्युटरमा कुन एपले कति मेमोरी लियो हेर्ने र अड्किएको एप बन्द गर्ने टुल।" },
      { id: "f809", frontEn: "Why update your OS?", frontNe: "OS अपडेट किन गर्नुपर्छ?", backEn: "To fix security holes, protect against viruses, and gain new performance improvements.", backNe: "सुरक्षाका कमजोरी हटाउन, भाइरसबाट बच्न र नयाँ सुविधाहरू पाउन।" },
      { id: "f810", frontEn: "What is a User Account?", frontNe: "युजर अकाउन्ट (User Account) के हो?", backEn: "A personalized profile with unique desktop settings, private files, and login password.", backNe: "कम्प्युटरमा आफ्नो छुट्टै फाइल, सेटिङ र पासवर्ड भएको व्यक्तिगत खाता।" },
    ],
    rememberPoints: [
      { en: "The OS is the master manager of all computer hardware and software.", ne: "OS कम्प्युटरका सम्पूर्ण स्रोत र एपहरू चलाउने मुख्य प्रबन्धक हो।" },
      { en: "Keep your operating system updated for security and stability.", ne: "सुरक्षा र गति कायम राख्न आफ्नो अपरेटिङ सिस्टम सधैं अपडेट राख्नुहोस्।" }
    ]
  }
];
