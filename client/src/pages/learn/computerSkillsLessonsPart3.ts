import { ComputerLesson } from "./computerSkillsData";

export const lessonsPart3: ComputerLesson[] = [
  // ==========================================
  // LESSON 09: Types of Computers
  // ==========================================
  {
    id: 9,
    slug: "types-of-computers",
    title: "Types of Computers",
    titleNp: "कम्प्युटरका प्रकारहरू",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Explore the different categories of computers: Desktops, Laptops, Tablets, Smartphones, Servers, Workstations, and Supercomputers.",
    summaryNp: "डेस्कटप, ल्यापटप, ट्याब्लेट, स्मार्टफोन, सर्भर, वर्कस्टेसन र सुपरकम्प्युटर जस्ता विभिन्न प्रकारका कम्प्युटरहरू चिन्नुहोस्।",
    objectives: [
      { en: "Categorize computers by their size, purpose, and computational power", ne: "आकार, उद्देश्य र क्षमताका आधारमा कम्प्युटर वर्गीकरण गर्ने" },
      { en: "Compare portable devices (Laptops, Tablets, Phones) with stationary Desktops", ne: "बोकेर हिँड्न मिल्ने (ल्यापटप, मोबाइल) र स्थिर डेस्कटप बीच तुलना गर्ने" },
      { en: "Understand what Servers and Supercomputers do behind the scenes", ne: "इन्टरनेटका सर्भर र ठूला सुपरकम्प्युटरले के काम गर्छन् बुझ्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Computers come in various shapes and sizes tailored for different tasks — from pocket-sized smartphones to giant supercomputers predicting weather patterns for entire continents.",
        textNe: "कम्प्युटरहरू खल्तीमा अटाउने स्मार्टफोनदेखि लिएर मौसमको पूर्वानुमान गर्ने विशाल सुपरकम्प्युटरसम्म विभिन्न आकार र क्षमतामा पाइन्छन्।"
      },
      {
        type: "heading",
        title: "Major Types of Modern Computers",
        titleNe: "आधुनिक कम्प्युटरका मुख्य प्रकारहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "1", titleEn: "Desktop PC", titleNe: "डेस्कटप कम्प्युटर", descEn: "Designed to stay in one location on a desk. Powerful, easily upgraded, and cost-effective.", descNe: "टेबलमा राखेर चलाइने बलियो र पार्टपुर्जा सजिलै फेर्न मिल्ने कम्प्युटर।", icon: "Monitor" },
          { step: "2", titleEn: "Laptop / Notebook", titleNe: "ल्यापटप", descEn: "All-in-one portable computer with built-in screen, keyboard, trackpad, and battery.", descNe: "स्क्रिन, किबोर्ड र ब्याट्री सँगै भएको जहाँ पनि बोकेर हिँड्न मिल्ने कम्प्युटर।", icon: "Laptop" },
          { step: "3", titleEn: "Tablet & Smartphone", titleNe: "ट्याब्लेट र स्मार्टफोन", descEn: "Handheld touch devices ideal for browsing, communication, mobile banking, and reading.", descNe: "हातमा लिएर टच गरी चलाउन मिल्ने दैनिक सञ्चार र अनलाइन कामको साधन।", icon: "Smartphone" },
          { step: "4", titleEn: "Server", titleNe: "सर्भर (Server)", descEn: "Powerful continuous-operation computer that provides websites, data, and services to other devices over a network.", descNe: "संसारभरका मोबाइल र कम्प्युटरलाई वेबसाइट र डेटा सेवा दिने शक्तिशाली यन्त्र।", icon: "Server" },
          { step: "5", titleEn: "Supercomputer", titleNe: "सुपरकम्प्युटर", descEn: "Massive computing systems with thousands of CPUs tackling scientific simulations, weather forecasting, and AI training.", descNe: "मौसम विज्ञान, अन्तरिक्ष र ठूलो वैज्ञानिक अनुसन्धानमा प्रयोग हुने अति शक्तिशाली प्रणाली।", icon: "Cpu" }
        ]
      },
      {
        type: "nepalExample",
        title: "Everyday Nepal Context: Who Uses What?",
        titleNe: "नेपालको सन्दर्भमा: कसले कुन कम्प्युटर प्रयोग गर्छ?",
        text: "Students use laptops for college homework. Banks and shopping centers use desktop PCs for cashier counters. Telecommunication providers (like NTC / Ncell) and eSewa rely on high-capacity servers to process millions of transactions 24/7.",
        textNe: "विद्यार्थीहरू ल्यापटपमा पढ्छन्; बैंक र पसलका काउन्टरमा डेस्कटप हुन्छ; र इसेवा वा टेलिकमका सेवाहरू दिनरात चल्ने सर्भरहरूमा सञ्चालन हुन्छन्।"
      }
    ],
    keyTerms: [
      { termEn: "Desktop Computer", termNe: "डेस्कटप कम्प्युटर", definitionEn: "A personal computer designed for regular use at a single fixed location on a desk.", definitionNe: "टेबलमा राखेर चलाउन बनाइएको व्यक्तिगत कम्प्युटर।" },
      { termEn: "Laptop", termNe: "ल्यापटप", definitionEn: "A portable, battery-powered personal computer combining screen, keyboard, and trackpad.", definitionNe: "ब्याट्रीबाट चल्ने र बोकेर हिँड्न मिल्ने कम्प्युटर।" },
      { termEn: "Server", termNe: "सर्भर", definitionEn: "A dedicated computer system that serves resources, websites, and data to other network clients.", definitionNe: "इन्टरनेट वा नेटवर्कमा अन्य कम्प्युटरहरूलाई सेवा र डेटा दिने कम्प्युटर।" },
      { termEn: "Supercomputer", termNe: "सुपरकम्प्युटर", definitionEn: "The fastest, most powerful class of computers capable of executing trillions of calculations per second.", definitionNe: "संसारको सबैभन्दा शक्तिशाली र तीव्र गतिको वैज्ञानिक कम्प्युटर।" }
    ],
    misconceptions: [
      {
        mythEn: "A smartphone is just a phone and not an actual computer.",
        mythNe: "स्मार्टफोन केवल फोन मात्र हो, कम्प्युटर होइन।",
        realityEn: "A modern smartphone is a full-fledged pocket computer with a multi-core CPU, RAM, flash storage, GPU, sensors, and operating system.",
        realityNe: "आधुनिक स्मार्टफोन वास्तवमा एउटा शक्तिशाली कम्प्युटर नै हो जसमा CPU, RAM, स्टोरेज र अपरेटिङ सिस्टम सबै हुन्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Classify Computer Use Cases",
      titleNe: "प्रयोग अनुसार कम्प्युटरको प्रकार मिलाउनुहोस्",
      instructionEn: "Match each scenario to the most suitable computer type.",
      instructionNe: "दिइएको अवस्थाका लागि सबैभन्दा उपयुक्त कम्प्युटर छनोट गर्नुहोस्।",
      categories: [
        { key: "port", labelEn: "Laptop / Smartphone (बोक्न मिल्ने)", labelNe: "पोर्टेबल", color: "indigo" },
        { key: "desk", labelEn: "Desktop / Workstation (कार्यालय/ल्याब)", labelNe: "डेस्कटप", color: "emerald" },
        { key: "serv", labelEn: "Server / Supercomputer (नेटवर्क/विज्ञान)", labelNe: "सर्भर", color: "purple" }
      ],
      items: [
        { id: "t1", nameEn: "Studying notes while traveling on a bus", nameNe: "यात्रा गर्दा नोट पढ्ने", category: "port" },
        { id: "t2", nameEn: "Hosting an online educational portal 24/7", nameNe: "वेबसाइट दिनरात इन्टरनेटमा चलाउने", category: "serv" },
        { id: "t3", nameEn: "Typing daily letters in a government office desk", nameNe: "कार्यालयको टेबलमा चिठी टाइप गर्ने", category: "desk" },
        { id: "t4", nameEn: "Predicting national monsoon flood weather models", nameNe: "बाढी र मनसुन मौसमको वैज्ञानिक हिसाब", category: "serv" },
        { id: "t5", nameEn: "Making QR code payments at a grocery shop", nameNe: "पसलमा QR कोड स्क्यान गरेर पैसा तिर्ने", category: "port" }
      ]
    },
    quiz: [
      {
        question: "Which type of computer is designed for portability with a built-in screen, keyboard, and battery?",
        options: ["Laptop / Notebook", "Mainframe", "Supercomputer", "Desktop Tower"],
        answer: 0,
        explanation: "A laptop integrates all essential components including battery and display into a compact, foldable portable design.",
        difficulty: "easy"
      },
      {
        question: "What is a Server computer primarily used for?",
        options: [
          "To provide data, web services, and files to other computers over a network",
          "Only for playing sound effects in cars",
          "To serve hot food in restaurants",
          "To make physical paper copies"
        ],
        answer: 0,
        explanation: "A server is built for 24/7 reliability, serving web pages, databases, and network resources to connected client devices.",
        difficulty: "easy"
      },
      {
        question: "Which of the following is the most computationally powerful type of computer in the world?",
        options: ["Supercomputer", "Pocket Calculator", "Tablet", "Home Desktop"],
        answer: 0,
        explanation: "Supercomputers contain tens of thousands of linked processors capable of calculating quadrillions of floating-point operations per second.",
        difficulty: "easy"
      },
      {
        question: "Why is a modern smartphone considered a computer?",
        options: [
          "Because it contains a CPU, RAM, storage, operating system, and performs the IPOS cycle",
          "Because it has plastic buttons",
          "Because it is shiny",
          "Because it can fit in a bag"
        ],
        answer: 0,
        explanation: "Smartphones possess all structural elements of modern computers (Processor, Memory, OS, I/O) in a miniaturized form factor.",
        difficulty: "easy"
      },
      {
        question: "What is a 'Workstation' computer?",
        options: [
          "A high-end desktop computer designed for demanding technical tasks like 3D animation, engineering CAD, and video rendering",
          "A wooden desk with drawers",
          "A gym exercise bike",
          "A broken laptop"
        ],
        answer: 0,
        explanation: "Workstations are specialized desktop computers equipped with high-core processors, professional GPUs, and error-correcting RAM for intense workloads.",
        difficulty: "medium"
      },
      {
        question: "What is an 'Embedded Computer'?",
        options: [
          "A dedicated microprocessor built inside a household appliance like a microwave, washing machine, or modern car",
          "A computer buried under the ground",
          "A computer made of clay",
          "A screen without buttons"
        ],
        answer: 0,
        explanation: "Embedded systems are special-purpose microcontrollers embedded inside non-computer devices (like smart TVs, cars, and AC units) to control specific functions.",
        difficulty: "hard"
      },
      {
        question: "What is the main advantage of a traditional Desktop PC over a Laptop of the same price?",
        options: [
          "Desktops generally offer higher performance, easier part upgrading, better cooling, and lower cost",
          "Desktops can be carried easily in a pocket",
          "Desktops don't need electricity",
          "Desktops never need screens"
        ],
        answer: 0,
        explanation: "Desktops have larger chassis allowing superior cooling, standard interchangeable components, and more computational power per rupee.",
        difficulty: "medium"
      },
      {
        question: "Which computer form factor is best suited for reading digital eBooks and sketching with a digital stylus?",
        options: ["Tablet", "Heavy Server Rack", "Desktop tower", "Typewriter"],
        answer: 0,
        explanation: "Tablets feature lightweight, flat touchscreen surfaces ideal for reading, sketching, and handheld interactive media.",
        difficulty: "easy"
      },
      {
        question: "What are 'Data Centers'?",
        options: [
          "Large facilities housing thousands of networked server computers running cloud services like Google, YouTube, and banking systems",
          "Shops selling empty CDs",
          "Offices where people type books on paper",
          "Museums of old keyboards"
        ],
        answer: 0,
        explanation: "Data centers are specialized buildings with industrial power, cooling, and security that host thousands of high-speed servers.",
        difficulty: "medium"
      },
      {
        question: "What does 'IoT' (Internet of Things) refer to?",
        options: [
          "Everyday physical objects embedded with smart chips and internet connectivity (e.g. smart bulbs, smart watches, security cameras)",
          "A brand of computer mouse",
          "An old programming language",
          "A paper dictionary"
        ],
        answer: 0,
        explanation: "IoT connects ordinary objects with embedded processing and sensors to the internet for remote monitoring and automation.",
        difficulty: "hard"
      }
    ],
    flashcards: [
      { id: "f901", frontEn: "What is a Desktop Computer?", frontNe: "डेस्कटप कम्प्युटर के हो?", backEn: "A stationary personal computer designed to sit on a desk with separate monitor, keyboard, and mouse.", backNe: "टेबलमा राखेर चलाउन बनाइएको छुट्टै स्क्रिन र किबोर्ड भएको कम्प्युटर।" },
      { id: "f902", frontEn: "What is a Laptop?", frontNe: "ल्यापटप के हो?", backEn: "A portable computer with an integrated screen, keyboard, trackpad, and rechargeable battery.", backNe: "ब्याट्रीबाट चल्ने र जहाँ पनि बोकेर काम गर्न सकिने पोर्टेबल कम्प्युटर।" },
      { id: "f903", frontEn: "What is a Server?", frontNe: "सर्भर (Server) के हो?", backEn: "A continuous computer system that stores and delivers websites, apps, and files to other devices over the internet.", backNe: "इन्टरनेटमा वेबसाइट, एप र डेटा सेवा दिने दिनरात चल्ने शक्तिशाली प्रणाली।" },
      { id: "f904", frontEn: "What is a Supercomputer?", frontNe: "सुपरकम्प्युटर के हो?", backEn: "An ultra-powerful scientific computing system capable of trillions of calculations per second.", backNe: "मौसम पूर्वानुमान र वैज्ञानिक अनुसन्धान गर्ने संसारकै तीव्र गतिको कम्प्युटर।" },
      { id: "f905", frontEn: "What is an Embedded System?", frontNe: "इम्बेडेड सिस्टम (Embedded System) के हो?", backEn: "A dedicated microcomputer inside everyday devices like smart TVs, cars, and washing machines.", backNe: "स्मार्ट टिभी, गाडी वा वासिङ मेसिनभित्र रहने सानो विशेष कम्प्युटर चिप।" },
      { id: "f906", frontEn: "Is a Smartphone a computer?", frontNe: "के स्मार्टफोन कम्प्युटर हो?", backEn: "Yes, it has a CPU, RAM, storage, touchscreen I/O, and runs an operating system (Android/iOS).", backNe: "हो, यसमा प्रोसेसर, मेमोरी, स्क्रिन र अपरेटिङ सिस्टम सबै हुन्छ।" },
      { id: "f907", frontEn: "What is a Workstation?", frontNe: "वर्कस्टेसन (Workstation) के हो?", backEn: "A high-performance desktop built for demanding engineering, 3D graphics, and video rendering.", backNe: "इन्जिनियरिङ, थ्रीडी डिजाइन र भिडियो सम्पादनका लागि बनाइएको बलियो कम्प्युटर।" },
      { id: "f908", frontEn: "What is a Tablet?", frontNe: "ट्याब्लेट के हो?", backEn: "A flat, portable touch-screen device larger than a phone, great for reading and media.", backNe: "मोबाइलभन्दा ठूलो स्क्रिन भएको र हातले छोएर चलाइने पातलो उपकरण।" },
      { id: "f909", frontEn: "What is a Data Center?", frontNe: "डेटा सेन्टर के हो?", backEn: "A secure facility housing rows of servers that host cloud websites and digital platforms.", backNe: "हजारौं सर्भरहरू सुरक्षित रूपमा राखिएका ठूला प्राविधिक भवनहरू।" },
      { id: "f910", frontEn: "What is IoT (Internet of Things)?", frontNe: "IoT (Internet of Things) के हो?", backEn: "Smart everyday devices (watches, cameras, lights) connected to the internet.", backNe: "इन्टरनेटमा जोडिएका स्मार्ट घडी, क्यामेरा र आधुनिक घरायसी उपकरणहरू।" },
    ],
    rememberPoints: [
      { en: "Choose the computer type that best fits your portability, budget, and computing power needs.", ne: "आफ्नो कामको आवश्यकता, बजेट र बोक्नुपर्ने सुविधा अनुसार सही कम्प्युटर छनोट गर्नुहोस्।" },
      { en: "From smartphones to cloud servers, computing power is ubiquitous in the modern world.", ne: "स्मार्टफोनदेखि क्लाउड सर्भरसम्म आधुनिक संसार कम्प्युटर प्रणालीमै आधारित छ।" }
    ]
  },

  // ==========================================
  // LESSON 10: Computers in Everyday Life
  // ==========================================
  {
    id: 10,
    slug: "computers-in-everyday-life",
    title: "Computers in Everyday Life",
    titleNp: "दैनिक जीवनमा कम्प्युटरको प्रयोग",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "Discover how computers transform key sectors: Education, Banking, Healthcare, Government, Agriculture, Business, and Communication in Nepal.",
    summaryNp: "शिक्षा, बैंकिङ, स्वास्थ्य, सरकारी सेवा, कृषि, व्यापार र सञ्चारमा कम्प्युटरले ल्याएको परिवर्तन बुझ्नुहोस्।",
    objectives: [
      { en: "Identify real-world computing applications across diverse industries", ne: "विभिन्न क्षेत्रमा कम्प्युटरको व्यावहारिक प्रयोग पहिचान गर्ने" },
      { en: "Understand digital citizenship, e-banking, and digital public services in Nepal", ne: "नेपालमा डिजिटल नागरिकता, अनलाइन बैंकिङ र सरकारी सेवाहरू बुझ्ने" },
      { en: "Recognize the importance of computer literacy for future career growth", ne: "भविष्यको रोजगारी र प्रगतिका लागि कम्प्युटर ज्ञानको महत्व बुझ्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Computers are no longer just office tools; they are the digital foundation of modern society. From learning online to instant mobile payments, computers save time, increase precision, and connect communities.",
        textNe: "कम्प्युटर अब कार्यालयमा मात्र सीमित छैन; यो समाजको आधार बनिसकेको छ। अनलाइन पढाइदेखि डिजिटल भुक्तानीसम्म यसले समय बचाउने र काम सजिलो बनाउने काम गरेको छ।"
      },
      {
        type: "heading",
        title: "Key Areas of Impact in Nepal and Globally",
        titleNe: "नेपाल र संसारभर कम्प्युटरका मुख्य प्रयोग क्षेत्रहरू"
      },
      {
        type: "diagram",
        items: [
          { step: "Area 1", titleEn: "Education (शिक्षा)", titleNe: "शिक्षा", descEn: "Online learning portals, digital textbooks, virtual classrooms, and interactive research.", descNe: "अनलाइन कक्षा, डिजिटल पुस्तक, शैक्षिक भिडियो र अनुसन्धान।", icon: "BookOpen" },
          { step: "Area 2", titleEn: "Banking & Finance (बैंकिङ)", titleNe: "बैंकिङ", descEn: "Mobile banking (ConnectIPS, eSewa, Khalti), ATM withdrawals, and secure digital ledgers.", descNe: "मोबाइल बैंकिङ, ATM सेवा, र तत्काल पैसा पठाउने सुविधा।", icon: "CreditCard" },
          { step: "Area 3", titleEn: "Healthcare (स्वास्थ्य)", titleNe: "स्वास्थ्य", descEn: "Digital patient records, MRI / X-ray imaging, telemedicine consultations, and laboratory testing.", descNe: "डिजिटल बिरामी रेकर्ड, एक्सरे/एमआरआई मेसिन र टेलिमेडिसिन।", icon: "HeartPulse" },
          { step: "Area 4", titleEn: "Government & Public Services (नागरिक सेवा)", titleNe: "नागरिक सेवा", descEn: "Online passport and driving license portals, tax filing, and digital citizen identity apps.", descNe: "राहदानी, लाइसेन्स फारम भर्ने, कर तिर्ने र डिजिटल नागरिक सेवा।", icon: "Landmark" },
          { step: "Area 5", titleEn: "Agriculture & Business (कृषि र व्यापार)", titleNe: "कृषि र व्यापार", descEn: "Weather forecasting for crops, inventory tracking, online shopping, and digital marketing.", descNe: "कृषिका लागि मौसमको जानकारी, पसलको हिसाबकिताब र अनलाइन व्यापार।", icon: "ShoppingBag" }
        ]
      },
      {
        type: "nepalExample",
        title: "Nepal Practical Example: Digital Empowerment in Daily Life",
        titleNe: "नेपालको व्यावहारिक उदाहरण: दैनिक जीवनमा डिजिटल प्रविधि",
        text: "A family in Pokhara pays their electricity bill online via a mobile wallet, a student in Biratnagar takes an AI masterclass on AI Guru Nepal, and a farmer in Chitwan checks seasonal rainfall predictions on their smartphone.",
        textNe: "पोखराका नागरिकले मोबाइलबाट बिजुलीको महसुल तिर्छन्; विराटनगरका विद्यार्थीले AI Guru Nepal मा अनलाइन कोर्स सिक्छन्; र चितवनका किसानले मोबाइलमै मौसमको जानकारी पाउँछन्।"
      }
    ],
    keyTerms: [
      { termEn: "Digital Literacy", termNe: "डिजिटल साक्षरता", definitionEn: "The ability to navigate, evaluate, and create information using digital computer technologies safely.", definitionNe: "कम्प्युटर र इन्टरनेट सुरक्षित तथा प्रभावकारी रूपमा चलाउन सक्ने सीप।" },
      { termEn: "E-Commerce", termNe: "ई-कमर्स (E-Commerce)", definitionEn: "The buying and selling of goods and services over the internet.", definitionNe: "इन्टरनेटमार्फत सामान किनबेच गर्ने अनलाइन व्यापार।" },
      { termEn: "Telemedicine", termNe: "टेलिमेडिसिन", definitionEn: "Caring for patients remotely when the provider and patient are not physically in the same place using video calls.", definitionNe: "इन्टरनेट र भिडियो कलमार्फत टाढा रहेका डाक्टरसँग परामर्श लिने सेवा।" },
      { termEn: "E-Governance", termNe: "ई-गभर्नेन्स (E-Governance)", definitionEn: "The application of digital technology to deliver public government services to citizens efficiently.", definitionNe: "नागरिकलाई छिटो र पारदर्शी सरकारी सेवा दिन डिजिटल प्रविधिको प्रयोग।" }
    ],
    misconceptions: [
      {
        mythEn: "Computers eliminate the need for human professionals entirely.",
        mythNe: "कम्प्युटरले गर्दा मानिसको कुनै आवश्यकता नै रहँदैन।",
        realityEn: "Computers are powerful tools that amplify human productivity. Humans provide critical thinking, creativity, empathy, and strategic direction.",
        realityNe: "कम्प्युटर मानिसको सहयोगी औजार हो। निर्णय लिने, सिर्जनात्मक सोच र मानवीय भावना मानिसमै हुन्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Match Applications to Everyday Sectors",
      titleNe: "क्षेत्र अनुसार कम्प्युटरको प्रयोग मिलाउनुहोस्",
      instructionEn: "Classify each activity into its respective field.",
      instructionNe: "दिइएको गतिविधिलाई सम्बन्धित क्षेत्रमा वर्गीकरण गर्नुहोस्।",
      categories: [
        { key: "bank", labelEn: "Banking & Trade (बैंकिङ/व्यापार)", labelNe: "बैंकिङ", color: "indigo" },
        { key: "med", labelEn: "Health & Education (स्वास्थ्य/शिक्षा)", labelNe: "स्वास्थ्य/शिक्षा", color: "emerald" },
        { key: "gov", labelEn: "Public Services (सरकारी सेवा)", labelNe: "सरकारी सेवा", color: "purple" }
      ],
      items: [
        { id: "u1", nameEn: "Scanning an ultrasound or MRI scan", nameNe: "अल्ट्रासाउन्ड वा MRI जाँच गर्ने", category: "med" },
        { id: "u2", nameEn: "Transferring money via Mobile Banking QR", nameNe: "QR कोडबाट पैसा पठाउने", category: "bank" },
        { id: "u3", nameEn: "Filling an online Driving License application", nameNe: "सवारी चालक अनुमति पत्रको अनलाइन फारम", category: "gov" },
        { id: "u4", nameEn: "Attending a live video lecture on AI Guru Nepal", nameNe: "अनलाइन कक्षामा भिडियो लेक्चर हेर्ने", category: "med" },
        { id: "u5", nameEn: "Generating daily sales receipts in a superstore", nameNe: "पसलको दैनिक बिलिङ र हिसाब राख्ने", category: "bank" }
      ]
    },
    quiz: [
      {
        question: "How do computers assist modern healthcare?",
        options: [
          "By storing digital patient medical records, running MRI scans, and enabling remote telemedicine",
          "By physically baking bread for patients",
          "By replacing hospital beds with plastic cases",
          "By eliminating all medicine"
        ],
        answer: 0,
        explanation: "Computers process medical diagnostic imaging, keep accurate health histories, and connect remote patients with specialist doctors.",
        difficulty: "easy"
      },
      {
        question: "What is an example of an E-Governance service in Nepal?",
        options: [
          "Online passport pre-enrollment and driving license exam registration",
          "Eating lunch in a park",
          "Playing offline cricket",
          "Drawing on a blackboard"
        ],
        answer: 0,
        explanation: "E-governance portals allow citizens to book passport appointments, check tax records, and register documents digitally.",
        difficulty: "easy"
      },
      {
        question: "What is Digital Literacy?",
        options: [
          "The skills and confidence to use computers, smartphones, and internet services safely and productively",
          "Only knowing how to turn on a TV",
          "Writing on paper with a fountain pen",
          "Memorizing computer model numbers"
        ],
        answer: 0,
        explanation: "Digital literacy encompasses understanding how to operate devices, evaluate online information, protect privacy, and use apps.",
        difficulty: "easy"
      },
      {
        question: "How do digital mobile wallets (like eSewa or Khalti) help consumers in Nepal?",
        options: [
          "By enabling instant, paperless bill payments, school fees, and peer-to-peer transfers 24/7",
          "By making physical wallet leather thicker",
          "By turning mobile screens into paper banknotes",
          "By printing coins"
        ],
        answer: 0,
        explanation: "Mobile wallets connect to the banking network to provide cashless, instantaneous financial transactions anytime, anywhere.",
        difficulty: "easy"
      },
      {
        question: "What role do computers play in modern weather forecasting for agriculture?",
        options: [
          "Simulating atmospheric climate data to predict rainfall, frost, and storm warnings for farmers",
          "Making artificial rain fall on keyboards",
          "Planting seeds automatically on screens",
          "Cooking crop harvests"
        ],
        answer: 0,
        explanation: "Meteorological supercomputers analyze satellite readings and radar data to provide accurate forecasts that protect crops.",
        difficulty: "medium"
      },
      {
        question: "What is E-Commerce?",
        options: [
          "Buying and selling products or services over online digital platforms",
          "Trading physical paper coupons by hand",
          "Selling only computer cables",
          "Watching sports on TV"
        ],
        answer: 0,
        explanation: "E-Commerce refers to commercial transactions conducted electronically over the internet (e.g. Daraz, Amazon).",
        difficulty: "easy"
      },
      {
        question: "Why is strong computer literacy essential for students today?",
        options: [
          "Most modern careers, higher education courses, and workplaces require digital skills and computer communication",
          "Because exams forbid paper books",
          "Because computers make homework disappear",
          "Only to play video games"
        ],
        answer: 0,
        explanation: "Digital proficiency is a core competency across virtually all modern professions, from business and medicine to education and government.",
        difficulty: "easy"
      },
      {
        question: "What is Telemedicine?",
        options: [
          "Medical consultations delivered remotely over video call and internet platforms",
          "Delivering pills via television cables",
          "A brand of digital thermometer",
          "An emergency hospital siren"
        ],
        answer: 0,
        explanation: "Telemedicine uses telecommunication technology to evaluate, diagnose, and treat patients at a distance.",
        difficulty: "medium"
      },
      {
        question: "What does 'Cyber Hygiene' mean?",
        options: [
          "Practicing safe digital habits like strong passwords, avoiding suspicious links, and keeping software updated",
          "Washing the keyboard with soap and water",
          "Cleaning the monitor with oil",
          "Throwing away mouse pads"
        ],
        answer: 0,
        explanation: "Cyber hygiene refers to the foundational routines users practice to maintain system security and protect private data online.",
        difficulty: "medium"
      },
      {
        question: "How do computers improve warehouse and shop inventory management?",
        options: [
          "By automatically tracking stock quantities, barcode scans, and expiry dates with zero manual math errors",
          "By making goods heavier",
          "By storing items inside the monitor screen",
          "By painting shelves"
        ],
        answer: 0,
        explanation: "Inventory software uses barcode scanning to update real-time stock levels, generate invoices, and trigger restock alerts.",
        difficulty: "easy"
      }
    ],
    flashcards: [
      { id: "f1001", frontEn: "What is Digital Literacy?", frontNe: "डिजिटल साक्षरता के हो?", backEn: "The essential ability to use digital devices, apps, and internet tools safely and effectively.", backNe: "कम्प्युटर र इन्टरनेटका साधनहरू सुरक्षित र उपयोगी तरिकाले चलाउन सक्ने ज्ञान र सीप।" },
      { id: "f1002", frontEn: "What is E-Governance?", frontNe: "ई-गभर्नेन्स (E-Governance) के हो?", backEn: "Using digital platforms to deliver fast, transparent public government services to citizens.", backNe: "सरकारी सेवाहरू (जस्तै लाइसेन्स, राहदानी) अनलाइनमार्फत छिटो र पारदर्शी बनाउने व्यवस्था।" },
      { id: "f1003", frontEn: "What is Telemedicine?", frontNe: "टेलिमेडिसिन के हो?", backEn: "Providing healthcare consultations and medical advice remotely over video calls and internet.", backNe: "भिडियो कल र इन्टरनेटको मद्दतले टाढा रहेका डाक्टरसँग उपचार सल्लाह लिने सेवा।" },
      { id: "f1004", frontEn: "What is E-Commerce?", frontNe: "ई-कमर्स के हो?", backEn: "The online buying and selling of goods and services over the web (e.g. Daraz).", backNe: "इन्टरनेटको माध्यमबाट सामान किनबेच गर्ने डिजिटल व्यापार।" },
      { id: "f1005", frontEn: "What is Mobile Banking?", frontNe: "मोबाइल बैंकिङ के हो?", backEn: "Managing bank accounts, paying utility bills, and transferring funds instantly from a phone.", backNe: "मोबाइलबाटै खाताको कारोबार गर्ने, बिल तिर्ने र पैसा पठाउने डिजिटल सुविधा।" },
      { id: "f1006", frontEn: "How do computers aid Education?", frontNe: "शिक्षामा कम्प्युटरको के फाइदा छ?", backEn: "Enables access to digital libraries, virtual masterclasses, interactive quizzes, and global research.", backNe: "अनलाइन पुस्तक, भिडियो कक्षा, अन्तरक्रियात्मक अभ्यास र विश्वभरको ज्ञानमा पहुँच दिन्छ।" },
      { id: "f1007", frontEn: "What is Cyber Hygiene?", frontNe: "साइबर सरसफाइ / सुरक्षा (Cyber Hygiene) के हो?", backEn: "Safe online habits: strong passwords, two-factor authentication, and avoiding phishing links.", backNe: "बलियो पासवर्ड राख्ने र शंकास्पद लिङ्क नखोल्ने जस्ता सुरक्षित डिजिटल बानीहरू।" },
      { id: "f1008", frontEn: "How does Banking use Computers?", frontNe: "बैंकिङ क्षेत्रमा कम्प्युटर कसरी प्रयोग हुन्छ?", backEn: "To securely process ATM transactions, maintain encrypted financial ledgers, and prevent fraud.", backNe: "ATM चलाउन, खाताको हिसाब सुरक्षित राख्न र ठगी रोक्न प्रयोग हुन्छ।" },
      { id: "f1009", frontEn: "How does Agriculture use Computers?", frontNe: "कृषिमा कम्प्युटरको के प्रयोग छ?", backEn: "Satellite weather forecasts, soil moisture sensors, and market price tracking for farmers.", backNe: "मौसमको पूर्वानुमान, माटोको जाँच र बजार भाउ बुझ्न किसानलाई मद्दत गर्छ।" },
      { id: "f1010", frontEn: "Why is Computer Skill crucial for jobs?", frontNe: "रोजगारीका लागि कम्प्युटर सीप किन अनिवार्य छ?", backEn: "Virtually all modern office, engineering, and service professions operate on digital systems.", backNe: "आजका लगभग सबै कार्यालय, प्राविधिक र व्यापारिक कामहरू कम्प्युटरमै हुन्छन्।" },
    ],
    rememberPoints: [
      { en: "Computers empower citizens, streamline public services, and unlock global career opportunities.", ne: "कम्प्युटरले नागरिकलाई सशक्त बनाउँछ, सेवा छिटो गर्छ र विश्वभर रोजगारीको ढोका खोल्छ।" },
      { en: "Always practice strong cyber hygiene to protect your personal identity and finances.", ne: "आफ्नो व्यक्तिगत विवरण र पैसा सुरक्षित राख्न सधैं राम्रो साइबर सुरक्षा नियम पालना गर्नुहोस्।" }
    ]
  },

  // ==========================================
  // LESSON 11: Computer Terminology (Glossary)
  // ==========================================
  {
    id: 11,
    slug: "computer-terminology",
    title: "Computer Terminology",
    titleNp: "कम्प्युटर शब्दावली (Glossary)",
    duration: "10 mins",
    level: "Beginner",
    summaryEn: "A comprehensive, searchable bilingual glossary of fundamental computer terms with English and Nepali definitions and examples.",
    summaryNp: "कम्प्युटरका सम्पूर्ण आधारभूत प्राविधिक शब्दहरूको अर्थ, नेपाली व्याख्या र उदाहरणसहितको खोज्न मिल्ने शब्दावली।",
    objectives: [
      { en: "Master the 18 essential foundational terms in everyday computing", ne: "दैनिक जीवनमा प्रयोग हुने १८ मुख्य कम्प्युटर शब्दहरूको अर्थ जान्ने" },
      { en: "Understand technical terms in clear English and authentic Nepali", ne: "प्राविधिक शब्दहरूलाई सरल नेपाली र अंग्रेजी दुवैमा बुझ्ने" },
      { en: "Confidently speak and navigate computer interfaces and settings", ne: "कम्प्युटरका सेटिङ र शब्दहरू नझुक्किई निर्धक्क चलाउन सक्ने बन्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Understanding the vocabulary of computing gives you the confidence to navigate operating systems, troubleshoot minor issues, and communicate effectively with technical peers.",
        textNe: "कम्प्युटरका प्राविधिक शब्दहरूको सही अर्थ बुझ्दा कम्प्युटर चलाउन, समस्या बुझ्न र प्रविधिबारे कुरा गर्न निकै सजिलो हुन्छ।"
      },
      {
        type: "callout",
        variant: "concept",
        title: "Searchable Glossary Hub",
        titleNe: "खोज्न मिल्ने शब्दावली केन्द्र",
        text: "Use the interactive search and filter bar below to quickly find any technical term, its Nepali equivalent, and a practical example.",
        textNe: "तल दिइएको सर्च बक्समा कुनै पनि शब्द टाइप गरेर त्यसको नेपाली अर्थ, परिभाषा र व्यावहारिक उदाहरण तुरुन्तै हेर्नुहोस्।"
      }
    ],
    keyTerms: [
      { termEn: "Hardware", termNe: "हार्डवेयर", definitionEn: "The physical electronic parts and machinery of a computer system.", definitionNe: "कम्प्युटरका देख्न र छुन सकिने भौतिक भागहरू।", exampleEn: "Keyboard, Monitor, SSD, CPU.", exampleNe: "किबोर्ड, मोनिटर, SSD।" },
      { termEn: "Software", termNe: "सफ्टवेयर", definitionEn: "Programs and code that direct the computer hardware what to do.", definitionNe: "कम्प्युटरलाई चलाउने डिजिटल प्रोग्राम र निर्देशनहरू।", exampleEn: "Windows 11, Chrome, Word.", exampleNe: "विन्डोज, क्रोम, वर्ड।" },
      { termEn: "CPU", termNe: "केन्द्रीय प्रशोधन एकाइ (CPU)", definitionEn: "Central Processing Unit — the primary processor chip executing instructions.", definitionNe: "कम्प्युटरको मुख्य प्रोसेसर जसले हिसाब र निर्देशन पूरा गर्छ।", exampleEn: "Intel Core i5, AMD Ryzen 7.", exampleNe: "इन्टेल Core i5, Ryzen 7।" },
      { termEn: "RAM", termNe: "र्‍याम (RAM)", definitionEn: "Random Access Memory — ultra-fast temporary memory for open apps.", definitionNe: "खुल्ला रहेका एपहरू चलाउन प्रयोग हुने द्रुत अस्थायी मेमोरी।", exampleEn: "8 GB RAM, 16 GB RAM.", exampleNe: "८ GB वा १६ GB RAM।" },
      { termEn: "Storage", termNe: "भण्डारण (Storage)", definitionEn: "Permanent non-volatile space to save files, movies, and the OS.", definitionNe: "फाइलहरू सधैंका लागि सेभ गरेर राखिने स्थायी ठाउँ।", exampleEn: "512 GB SSD, 1 TB Hard Drive.", exampleNe: "५१२ GB SSD, १ TB हार्डडिस्क।" },
      { termEn: "Operating System", termNe: "अपरेटिङ सिस्टम (OS)", definitionEn: "Master software managing hardware, memory, and application execution.", definitionNe: "कम्प्युटरका सम्पूर्ण स्रोत र एपहरू चलाउने मुख्य प्रणाली।", exampleEn: "Microsoft Windows, macOS, Android, Linux.", exampleNe: "Windows, Android, macOS।" },
      { termEn: "Application", termNe: "एप्लिकेसन (एप)", definitionEn: "A software program built to perform specific user tasks.", definitionNe: "प्रयोगकर्ताको कुनै खास कामका लागि बनाइएको सफ्टवेयर।", exampleEn: "Zoom, Photoshop, VLC Player.", exampleNe: "Zoom, Photoshop, VLC।" },
      { termEn: "File", termNe: "फाइल (File)", definitionEn: "A discrete block of digital data stored under a specific name.", definitionNe: "कम्प्युटरमा नाम दिएर सेभ गरिएको डिजिटल कागजात वा तस्बिर।", exampleEn: "resume.pdf, photo.jpg, notes.docx.", exampleNe: "बायोडाटा.pdf, फोटो.jpg।" },
      { termEn: "Folder", termNe: "फोल्डर (Folder / Directory)", definitionEn: "A virtual container used to organize and group related files together.", definitionNe: "सम्बन्धित फाइलहरूलाई मिलाएर राख्ने डिजिटल बाकस।", exampleEn: "College_Assignments, Family_Photos.", exampleNe: "कलेज_असाइनमेन्ट फोल्डर।" },
      { termEn: "Web Browser", termNe: "वेब ब्राउजर", definitionEn: "An application used to access, view, and navigate websites on the Internet.", definitionNe: "इन्टरनेटमा वेबसाइटहरू खोल्न र हेर्न प्रयोग हुने एप।", exampleEn: "Google Chrome, Mozilla Firefox, Microsoft Edge.", exampleNe: "Google Chrome, Safari।" },
      { termEn: "Internet", termNe: "इन्टरनेट", definitionEn: "A massive global interconnected network linking billions of computers.", definitionNe: "संसारभरका कम्प्युटरहरूलाई एकआपसमा जोड्ने विशाल सञ्जाल।", exampleEn: "Browsing the World Wide Web, sending emails.", exampleNe: "इमेल पठाउने, अनलाइन खोज्ने।" },
      { termEn: "Website", termNe: "वेबसाइट", definitionEn: "A collection of related web pages hosted on a web server under a domain name.", definitionNe: "इन्टरनेटमा कुनै खास ठेगानामा राखिएका वेबपेजहरूको समूह।", exampleEn: "aigurunepal.com, wikipedia.org.", exampleNe: "aigurunepal.com।" },
      { termEn: "Download", termNe: "डाउनलोड (Download)", definitionEn: "Transferring a file from a remote internet server onto your local computer.", definitionNe: "इन्टरनेटबाट फाइल आफ्नो कम्प्युटर वा मोबाइलमा तान्ने कार्य।", exampleEn: "Downloading an admission PDF form.", exampleNe: "फारम वा गीत डाउनलोड गर्ने।" },
      { termEn: "Upload", termNe: "अपलोड (Upload)", definitionEn: "Sending a file from your local computer up to a remote internet server.", definitionNe: "आफ्नो कम्प्युटरको फाइल इन्टरनेटको सर्भरमा पठाउने कार्य।", exampleEn: "Uploading a CV for a job application.", exampleNe: "जागिरका लागि बायोडाटा अपलोड गर्ने।" },
      { termEn: "Data", termNe: "डेटा (Data)", definitionEn: "Raw, unorganized facts, numbers, or symbols.", definitionNe: "अव्यवस्थित र कच्चा तथ्य वा अंकहरू।", exampleEn: "Raw numbers: 12, 45, 99.", exampleNe: "कच्चा अंकहरू।" },
      { termEn: "Information", termNe: "जानकारी (Information)", definitionEn: "Processed, organized, and structured data that conveys clear meaning.", definitionNe: "प्रशोधन गरिसकिएको अर्थपूर्ण र उपयोगी नतिजा।", exampleEn: "Average student score = 85%.", exampleNe: "कक्षाको औसत अंक = ८५%।" },
      { termEn: "Input", termNe: "इनपुट (Input)", definitionEn: "Data or control signals sent into a computer system.", definitionNe: "कम्प्युटर भित्र पठाइने डेटा वा कमान्ड।", exampleEn: "Typing letters, clicking with a mouse.", exampleNe: "किबोर्डमा टाइप गर्ने कार्य।" },
      { termEn: "Output", termNe: "आउटपुट (Output)", definitionEn: "The processed results presented by the computer to the user.", definitionNe: "कम्प्युटरले प्रयोगकर्तालाई देखाउने वा दिने नतिजा।", exampleEn: "Printed certificate, video on monitor.", exampleNe: "कागजमा छापिएको सर्टिफिकेट।" }
    ],
    misconceptions: [
      {
        mythEn: "'Download' and 'Upload' mean the exact same thing.",
        mythNe: "'डाउनलोड' र 'अपलोड' दुवै एउटै हुन्।",
        realityEn: "Download means pulling files down from the internet to your device. Upload means pushing your files up to the internet.",
        realityNe: "डाउनलोड भनेको इन्टरनेटबाट आफ्नोमा तान्ने हो; अपलोड भनेको आफ्नोबाट इन्टरनेटमा पठाउने हो।"
      }
    ],
    practiceActivity: {
      titleEn: "Identify Download vs Upload",
      titleNe: "डाउनलोड र अपलोड छुट्याउनुहोस्",
      instructionEn: "Classify each digital transfer action as Download or Upload.",
      instructionNe: "दिइएको कार्य डाउनलोड हो कि अपलोड छुट्याउनुहोस्।",
      categories: [
        { key: "dl", labelEn: "Download (डाउनलोड)", labelNe: "डाउनलोड", color: "indigo" },
        { key: "ul", labelEn: "Upload (अपलोड)", labelNe: "अपलोड", color: "emerald" }
      ],
      items: [
        { id: "g1", nameEn: "Saving a PDF syllabus from the university website to your laptop", nameNe: "विश्वविद्यालयको वेबसाइटबाट सिलेबस सेभ गर्ने", category: "dl" },
        { id: "g2", nameEn: "Attaching your passport photo to an online visa application", nameNe: "अनलाइन भिसा फारममा आफ्नो फोटो पठाउने", category: "ul" },
        { id: "g3", nameEn: "Streaming and saving an offline video song to your phone", nameNe: "गीत वा भिडियो अफलाइन हेर्न सेभ गर्ने", category: "dl" },
        { id: "g4", nameEn: "Publishing a new video from your phone to YouTube", nameNe: "आफ्नो भिडियो युट्युबमा पोस्ट गर्ने", category: "ul" }
      ]
    },
    quiz: [
      {
        question: "What is the difference between Download and Upload?",
        options: [
          "Download transfers from internet to your device; Upload transfers from your device to the internet",
          "Download costs money; Upload is always free",
          "Download is for music; Upload is only for photos",
          "They are the exact same operation"
        ],
        answer: 0,
        explanation: "Downloading brings data down from remote servers to local storage, while uploading sends local files up to remote servers.",
        difficulty: "easy"
      },
      {
        question: "What is a 'Web Browser'?",
        options: [
          "An application software used to locate and display web pages on the internet",
          "A type of physical internet wire",
          "A power button on laptops",
          "A spreadsheet program"
        ],
        answer: 0,
        explanation: "Web browsers (like Google Chrome, Safari, Firefox, Edge) interpret HTML and web protocols to render websites.",
        difficulty: "easy"
      },
      {
        question: "What is a 'Folder' (Directory) used for?",
        options: [
          "To organize, group, and store related files neatly on a disk",
          "To clean the computer screen",
          "To increase internet bandwidth",
          "To print paper"
        ],
        answer: 0,
        explanation: "Folders provide an organized hierarchical structure to categorize documents, pictures, and applications.",
        difficulty: "easy"
      },
      {
        question: "What is a 'File Extension' (e.g., .pdf, .docx, .png)?",
        options: [
          "A suffix at the end of a filename that indicates the file format and compatible application",
          "A physical cable extension for screens",
          "A fee charged by the computer manufacturer",
          "An antivirus password"
        ],
        answer: 0,
        explanation: "File extensions inform the operating system which program is designed to decode and open that specific format.",
        difficulty: "medium"
      },
      {
        question: "Which of the following is an example of RAW DATA?",
        options: [
          "The unorganized numbers: '10, 45, 92, 18'",
          "A completed final grade card with student rank",
          "A printed annual financial profit report",
          "A summary graph of school attendance"
        ],
        answer: 0,
        explanation: "Unprocessed numbers without context or organization represent raw data.",
        difficulty: "medium"
      },
      {
        question: "What is a 'URL' (Uniform Resource Locator)?",
        options: [
          "The specific web address used to find a unique page or resource on the internet (e.g. https://aigurunepal.com)",
          "A brand of computer mouse",
          "A type of USB connector",
          "An internal CPU register"
        ],
        answer: 0,
        explanation: "A URL is the unique global web address that points directly to a website, document, or resource on the World Wide Web.",
        difficulty: "easy"
      },
      {
        question: "What does 'Wi-Fi' mean?",
        options: [
          "Wireless networking technology that allows devices to connect to the internet radio frequencies without physical cables",
          "Wide Fiber Installation",
          "Wired Film Interface",
          "Windows Filter"
        ],
        answer: 0,
        explanation: "Wi-Fi uses radio waves to provide high-speed wireless network and internet connections to nearby devices.",
        difficulty: "easy"
      },
      {
        question: "What is a 'Malware' (Malicious Software)?",
        options: [
          "Harmful software designed to infiltrate, damage, or steal data from a computer system (e.g. viruses, spyware)",
          "A damaged mouse cord",
          "A heavy laptop case",
          "An old monitor"
        ],
        answer: 0,
        explanation: "Malware is any malicious software intentionally created to cause harm, extract ransom, or compromise user security.",
        difficulty: "medium"
      },
      {
        question: "What is 'Cloud Storage'?",
        options: [
          "Saving your files securely on remote internet servers so you can access them from any device anywhere",
          "Storing computer parts in high mountain clouds",
          "A backup battery",
          "A special CD drive"
        ],
        answer: 0,
        explanation: "Cloud storage (like Google Drive, Microsoft OneDrive, Dropbox) synchronizes files with internet data centers.",
        difficulty: "easy"
      },
      {
        question: "What is the purpose of a 'Search Engine' (e.g. Google)?",
        options: [
          "An online tool that indexes the web to help users find relevant websites and answers using keywords",
          "A physical motor that spins hard drives",
          "A software to change keyboard lights",
          "A system to turn off electricity"
        ],
        answer: 0,
        explanation: "Search engines crawl and index billions of web pages so users can discover information instantly by typing query keywords.",
        difficulty: "easy"
      }
    ],
    flashcards: [
      { id: "f1101", frontEn: "What is Download?", frontNe: "डाउनलोड (Download) के हो?", backEn: "Copying a file from the internet server onto your local device.", backNe: "इन्टरनेटबाट कुनै फाइल आफ्नो कम्प्युटर वा मोबाइलमा तान्ने प्रक्रिया।" },
      { id: "f1102", frontEn: "What is Upload?", frontNe: "अपलोड (Upload) के हो?", backEn: "Sending a file from your local device up to an internet server.", backNe: "आफ्नो कम्प्युटरको फाइल इन्टरनेटको सर्भरमा पठाउने प्रक्रिया।" },
      { id: "f1103", frontEn: "What is a Web Browser?", frontNe: "वेब ब्राउजर के हो?", backEn: "An application used to navigate and view websites (e.g. Chrome, Edge, Safari, Firefox).", backNe: "इन्टरनेटमा विभिन्न वेबसाइटहरू खोल्ने र हेर्ने सफ्टवेयर।" },
      { id: "f1104", frontEn: "What is a File vs Folder?", frontNe: "फाइल र फोल्डरको फरक", backEn: "A File is a single saved document/photo; a Folder is a container that holds multiple files.", backNe: "फाइल एउटा डकुमेन्ट वा तस्बिर हो; फोल्डर धेरै फाइलहरू मिलाएर राख्ने बाकस हो।" },
      { id: "f1105", frontEn: "What is a URL?", frontNe: "URL के हो?", backEn: "Uniform Resource Locator — the unique web address of a website (e.g. https://aigurunepal.com).", backNe: "इन्टरनेटमा कुनै वेबसाइटको पूरा अनलाइन ठेगाना।" },
      { id: "f1106", frontEn: "What is Wi-Fi?", frontNe: "Wi-Fi के हो?", backEn: "Wireless radio technology that connects devices to local networks and the internet without wires.", backNe: "तार बिना नै रेडियो तरङ्गमार्फत इन्टरनेट जोड्ने वायरलेस प्रविधि।" },
      { id: "f1107", frontEn: "What is Malware?", frontNe: "माल्वेयर (Malware) के हो?", backEn: "Malicious software (viruses, trojans, spyware) designed to harm computers or steal data.", backNe: "कम्प्युटर बिगार्ने वा डेटा चोर्ने खराब भाइरस तथा हानिकारक सफ्टवेयर।" },
      { id: "f1108", frontEn: "What is Cloud Computing?", frontNe: "क्लाउड कम्प्युटिङ के हो?", backEn: "Accessing computing power, storage, and software over the internet on remote servers.", backNe: "इन्टरनेटमार्फत अनलाइन सर्भरमा फाइल राख्ने र सफ्टवेयर चलाउने प्रविधि।" },
      { id: "f1109", frontEn: "What is an Operating System?", frontNe: "अपरेटिङ सिस्टम के हो?", backEn: "The master system software that coordinates all hardware and applications.", backNe: "हार्डवेयर र एपहरूलाई व्यवस्थित गरी चलाउने मुख्य सफ्टवेयर।" },
      { id: "f1110", frontEn: "What is IPOS?", frontNe: "IPOS को पूरा अर्थ के हो?", backEn: "Input → Processing → Output → Storage — the 4 fundamental computing steps.", backNe: "इनपुट → प्रशोधन → आउटपुट → भण्डारण — कम्प्युटरका ४ मुख्य चरणहरू।" },
    ],
    rememberPoints: [
      { en: "Clear terminology makes navigating digital tools effortless.", ne: "सही प्राविधिक शब्दावली थाहा पाउँदा डिजिटल संसारमा काम गर्न सजिलो हुन्छ।" },
      { en: "Use the search bar anytime you encounter an unfamiliar computing term.", ne: "कुनै नयाँ प्राविधिक शब्द भेट्दा शब्दावली सर्च बक्स प्रयोग गर्नुहोस्।" }
    ]
  },

  // ==========================================
  // LESSON 12: Module Review & Final Assessment
  // ==========================================
  {
    id: 12,
    slug: "module-review",
    title: "Module Review & Final Assessment",
    titleNp: "अध्याय पुनरावलोकन तथा अन्तिम परीक्षा",
    duration: "20 mins",
    level: "Beginner",
    summaryEn: "A comprehensive summary of all 11 lessons followed by a rigorous 20-question final assessment with instant scoring and certificate badge.",
    summaryNp: "सबै ११ पाठहरूको सारसंक्षेप र ज्ञान परीक्षणका लागि २० वटा प्रश्नहरूको अन्तिम परीक्षा।",
    objectives: [
      { en: "Review the complete Computer Fundamentals curriculum in a structured summary", ne: "सबै ११ पाठहरूको मुख्य कुराहरू एकै ठाउँमा दोहोर्‍याउने" },
      { en: "Test your mastery with a 20-question comprehensive final assessment", ne: "२० वटा बहुबैकल्पिक प्रश्नहरूमार्फत आफ्नो ज्ञानको परीक्षण गर्ने" },
      { en: "Earn your Module 1 Completion Badge and unlock Level 1 graduation", ne: "कम्प्युटर फन्डामेन्टल्सको पूर्णता ब्याच (Badge) प्राप्त गर्ने" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Congratulations on reaching the final lesson of Module 1: Computer Fundamentals! You have explored everything from the IPOS cycle and internal motherboard circuits to operating systems, peripherals, and real-world applications across Nepal.",
        textNe: "कम्प्युटर फन्डामेन्टल्सको अन्तिम पाठमा तपाईंलाई हार्दिक बधाई! तपाईंले IPOS चक्र, CPU, RAM, स्टोरेज, अपरेटिङ सिस्टमदेखि नेपालमा कम्प्युटरको प्रयोगसम्म धेरै कुराहरू सिकिसक्नुभएको छ।"
      },
      {
        type: "heading",
        title: "Curriculum Summary at a Glance",
        titleNe: "सिकेका मुख्य कुराहरूको सारसंक्षेप"
      },
      {
        type: "diagram",
        items: [
          { step: "Core 1", titleEn: "1. IPOS Cycle", titleNe: "१. IPOS चक्र", descEn: "Input (Keyboard/Mouse) → Processing (CPU) → Output (Monitor/Speaker) → Storage (SSD/HDD).", descNe: "इनपुट → प्रशोधन → आउटपुट → भण्डारण।", icon: "RotateCw" },
          { step: "Core 2", titleEn: "2. Hardware vs Software", titleNe: "२. हार्डवेयर र सफ्टवेयर", descEn: "Hardware is physical machinery; Software is the digital programs and OS that direct it.", descNe: "हार्डवेयर भौतिक यन्त्र हो; सफ्टवेयर त्यसलाई चलाउने प्रोग्राम हो।", icon: "Layers" },
          { step: "Core 3", titleEn: "3. CPU & Memory", titleNe: "३. CPU र मेमोरी", descEn: "CPU calculates instructions; RAM is fast temporary memory; SSD is permanent storage.", descNe: "CPU ले हिसाब गर्छ; RAM छिटो अस्थायी मेमोरी हो; SSD स्थायी स्टोरेज हो।", icon: "Cpu" },
          { step: "Core 4", titleEn: "4. Operating Systems", titleNe: "४. अपरेटिङ सिस्टम", descEn: "Windows, macOS, Linux, Android manage hardware resources and run applications.", descNe: "Windows, macOS, Android आदिले हार्डवेयर व्यवस्थापन गर्छन्।", icon: "Settings" }
        ]
      },
      {
        type: "callout",
        variant: "concept",
        title: "Final Assessment Instructions",
        titleNe: "अन्तिम परीक्षाका निर्देशनहरू",
        text: "• Total Questions: 20 Multiple Choice Questions\n• Difficulty Distribution: 40% Easy (8 Qs), 40% Medium (8 Qs), 20% Hard (4 Qs)\n• Score Bands: 90–100% (Excellent 🎉), 75–89% (Very Good 🌟), 60–74% (Good 👍), Below 60% (Review Recommended 🔄)\n• Instant Explanations: Detailed feedback is provided after each question.",
        textNe: "• कुल प्रश्न: २० वटा बहुबैकल्पिक प्रश्नहरू\n• स्तर: ४०% सजिलो, ४०% मध्यम, २०% चुनौतीपूर्ण\n• अंक श्रेणी: ९०–१००% (उत्कृष्ट), ७५–८९% (धेरै राम्रो), ६०–७४% (राम्रो), ६०% भन्दा कम (पुनः अध्ययन गर्नुहोस्)\n• तत्काल नतिजा र व्याख्या उपलब्ध छ।"
      }
    ],
    keyTerms: [
      { termEn: "Computer Fundamentals", termNe: "कम्प्युटरका आधारभूत ज्ञान", definitionEn: "The essential baseline understanding of computer hardware, software, memory, and everyday usage.", definitionNe: "कम्प्युटरका पार्टपुर्जा, सफ्टवेयर र कार्यप्रणाली सम्बन्धी आधारभूत ज्ञान।" },
      { termEn: "Assessment", termNe: "मूल्यांकन / परीक्षा", definitionEn: "An evaluation designed to measure a learner's knowledge and skill retention.", definitionNe: "सिकेका कुरा कत्तिको बुझियो भनी जाँच गर्ने परीक्षा।" }
    ],
    misconceptions: [
      {
        mythEn: "Failing a practice quiz means you cannot become good with computers.",
        mythNe: "क्विजमा कम नम्बर आउँदैमा कम्प्युटर सिक्न सकिँदैन।",
        realityEn: "Quiz assessments are learning tools. Reviewing explanations and retrying builds strong, permanent practical understanding.",
        realityNe: "क्विज सिक्ने माध्यम हो। गल्तीबाट सिकेर फेरि प्रयास गर्दा ज्ञान अझ बलियो हुन्छ।"
      }
    ],
    practiceActivity: {
      titleEn: "Final Concept Sorter",
      titleNe: "समग्र अवधारणा वर्गीकरण",
      instructionEn: "Classify each fundamental concept into its overarching category.",
      instructionNe: "दिइएको अवधारणालाई सही मूल समूहमा राख्नुहोस्।",
      categories: [
        { key: "proc", labelEn: "Processing & Memory (प्रशोधन/मेमोरी)", labelNe: "प्रशोधन/मेमोरी", color: "indigo" },
        { key: "io", labelEn: "Peripherals & Storage (उपकरण/स्टोरेज)", labelNe: "उपकरण/स्टोरेज", color: "emerald" },
        { key: "sys", labelEn: "System & Software (सिस्टम/सफ्टवेयर)", labelNe: "सिस्टम/सफ्टवेयर", color: "purple" }
      ],
      items: [
        { id: "m1", nameEn: "Central Processing Unit (CPU)", nameNe: "केन्द्रीय प्रशोधन एकाइ (CPU)", category: "proc" },
        { id: "m2", nameEn: "Solid State Drive (SSD)", nameNe: "स्थायी SSD भण्डारण", category: "io" },
        { id: "m3", nameEn: "Windows 11 Operating System", nameNe: "विन्डोज ११ अपरेटिङ सिस्टम", category: "sys" },
        { id: "m4", nameEn: "Random Access Memory (RAM)", nameNe: "अस्थायी RAM", category: "proc" },
        { id: "m5", nameEn: "Document Scanner & Printer", nameNe: "स्क्यानर र प्रिन्टर", category: "io" },
        { id: "m6", nameEn: "Web Browser Application", nameNe: "वेब ब्राउजर", category: "sys" }
      ]
    },
    quiz: [
      // 8 Easy Questions (40%)
      {
        question: "1. What are the four core steps of the basic computing cycle?",
        options: [
          "Input → Processing → Output → Storage",
          "Output → Delete → Restart → Power",
          "Typing → Printing → Scanning → Calling",
          "Download → Upload → Restart → Close"
        ],
        answer: 0,
        explanation: "The IPOS model (Input, Processing, Output, Storage) represents the fundamental architecture of all computers.",
        difficulty: "easy"
      },
      {
        question: "2. Which of the following is considered computer HARDWARE?",
        options: ["Physical Monitor", "Google Chrome", "Windows 11", "Antivirus software"],
        answer: 0,
        explanation: "A monitor is a physical, tangible device you can touch, making it hardware.",
        difficulty: "easy"
      },
      {
        question: "3. What is the primary role of the CPU?",
        options: [
          "To execute instructions and perform calculations",
          "To physically print papers",
          "To clean dust from the room",
          "To provide emergency light"
        ],
        answer: 0,
        explanation: "The Central Processing Unit (CPU) executes software instructions and performs mathematical/logical calculations.",
        difficulty: "easy"
      },
      {
        question: "4. Which device is used to enter text and numerical commands into a computer?",
        options: ["Keyboard", "Speaker", "Printer", "Projector"],
        answer: 0,
        explanation: "A keyboard is the standard alphanumeric input device.",
        difficulty: "easy"
      },
      {
        question: "5. What happens to unsaved data stored in RAM when power is turned off?",
        options: [
          "It is lost completely because RAM is volatile memory",
          "It is automatically emailed to friends",
          "It prints automatically on paper",
          "It turns into a desktop wallpaper"
        ],
        answer: 0,
        explanation: "RAM requires continuous electrical power to hold data; turning off power clears its contents.",
        difficulty: "easy"
      },
      {
        question: "6. Which of the following is an Operating System?",
        options: ["Microsoft Windows", "Microsoft Word", "Google Chrome", "Adobe Reader"],
        answer: 0,
        explanation: "Microsoft Windows is system software (OS) that manages the computer's hardware and resources.",
        difficulty: "easy"
      },
      {
        question: "7. What is an example of an OUTPUT device?",
        options: ["Computer Speaker", "Webcam", "Microphone", "Mouse"],
        answer: 0,
        explanation: "Speakers output audible sound generated by the computer.",
        difficulty: "easy"
      },
      {
        question: "8. What does 'Downloading' a file mean?",
        options: [
          "Transferring a file from the internet down to your local device",
          "Deleting a file from your hard drive",
          "Sending a photo to a website server",
          "Turning off your WiFi router"
        ],
        answer: 0,
        explanation: "Downloading copies files from a remote server down onto your computer or phone.",
        difficulty: "easy"
      },

      // 8 Medium Questions (40%)
      {
        question: "9. How does an SSD differ from a traditional mechanical HDD?",
        options: [
          "SSDs have no moving mechanical parts, use flash memory, and are significantly faster",
          "SSDs are made of paper",
          "SSDs only work in cold rooms",
          "SSDs can only store text files"
        ],
        answer: 0,
        explanation: "Solid State Drives use electronic flash memory with zero moving parts, offering dramatically faster data access speeds.",
        difficulty: "medium"
      },
      {
        question: "10. What does a CPU clock speed of 3.2 GHz represent?",
        options: [
          "3.2 billion instruction clock cycles executed per second",
          "The computer battery lasts 3.2 hours",
          "The laptop weighs 3.2 kilograms",
          "The monitor is 3.2 inches wide"
        ],
        answer: 0,
        explanation: "Gigahertz (GHz) measures billions of electrical clock sync cycles per second.",
        difficulty: "medium"
      },
      {
        question: "11. Why is a smartphone touchscreen classified as a Dual I/O device?",
        options: [
          "It presents visual graphics (output) and detects finger touch commands (input)",
          "It can charge two batteries",
          "It has two speakers",
          "It works with both hands"
        ],
        answer: 0,
        explanation: "Touchscreens integrate an output display panel with an input capacitive touch sensor grid.",
        difficulty: "medium"
      },
      {
        question: "12. How many Gigabytes (GB) are in 1 Terabyte (TB)?",
        options: ["Approximately 1,000 GB (1,024 GB)", "10 GB", "100 GB", "1,000,000 GB"],
        answer: 0,
        explanation: "1 Terabyte is equal to 1,024 Gigabytes (commonly approximated as 1,000 GB).",
        difficulty: "medium"
      },
      {
        question: "13. What is the primary function of the computer Motherboard?",
        options: [
          "To act as the main printed circuit board connecting the CPU, RAM, storage, and ports",
          "To provide emergency battery power",
          "To clean dust from the fan",
          "To act as an external mouse pad"
        ],
        answer: 0,
        explanation: "The motherboard hosts the sockets, chips, and copper traces that link all components together.",
        difficulty: "medium"
      },
      {
        question: "14. What is 'Open Source' software?",
        options: [
          "Software whose source code is freely published for anyone to inspect, modify, and distribute",
          "Software that requires a paid monthly subscription",
          "Software that only runs with open windows",
          "Software with no security"
        ],
        answer: 0,
        explanation: "Open source projects (like Linux, Firefox, Python) make their code transparent and freely accessible.",
        difficulty: "medium"
      },
      {
        question: "15. What is the difference between raw DATA and processed INFORMATION?",
        options: [
          "Data is raw, unorganized facts; Information is processed, meaningful, and structured",
          "Data is always printed; Information is always on TV",
          "There is no difference",
          "Information is always numbers only"
        ],
        answer: 0,
        explanation: "Data represents unorganized raw values; information is the structured, useful insight derived from processed data.",
        difficulty: "medium"
      },
      {
        question: "16. In Nepal, what is an example of an E-Governance digital platform?",
        options: [
          "The online passport pre-enrollment and driving license registration portal",
          "Playing games on a console",
          "Reading a printed paper novel",
          "Watching a movie at the cinema"
        ],
        answer: 0,
        explanation: "E-governance refers to government services delivered digitally online to citizens.",
        difficulty: "medium"
      },

      // 4 Hard Questions (20%)
      {
        question: "17. What is CPU 'Thermal Throttling'?",
        options: [
          "An automatic protective reduction of CPU speed when cooling is insufficient to prevent heat damage",
          "A method to make the processor catch fire",
          "A fan speeding up until it breaks",
          "A screen turning black and white"
        ],
        answer: 0,
        explanation: "CPUs lower their operational frequency when sensing dangerous temperatures, protecting the silicon chips from thermal destruction.",
        difficulty: "hard"
      },
      {
        question: "18. What is 'Virtual Memory' (Paging / Swap)?",
        options: [
          "A system technique where the OS uses temporary space on the SSD/HDD when physical RAM is exhausted",
          "A virtual reality headset memory",
          "A fake memory card sold online",
          "Memory stored in outer space"
        ],
        answer: 0,
        explanation: "When physical RAM is full, the operating system pages inactive memory blocks onto the storage drive to keep running without crashing.",
        difficulty: "hard"
      },
      {
        question: "19. What is a 'Device Driver' in an operating system?",
        options: [
          "Specialized software that tells the OS how to communicate with and control specific hardware (e.g. printer, graphics card)",
          "A person who delivers computers in a truck",
          "A physical screw inside the case",
          "An antivirus subscription"
        ],
        answer: 0,
        explanation: "Drivers translate generic OS commands into specific electrical instructions understood by hardware accessories.",
        difficulty: "hard"
      },
      {
        question: "20. What is an 'Embedded System' in modern computing?",
        options: [
          "A dedicated microcontroller integrated inside a non-computer machine (like a car, microwave, or MRI scanner)",
          "A computer buried in sand",
          "A laptop with a broken screen",
          "A program that cannot be closed"
        ],
        answer: 0,
        explanation: "Embedded systems are special-purpose microprocessors programmed to perform dedicated real-time control functions inside machinery.",
        difficulty: "hard"
      }
    ],
    flashcards: [
      { id: "f1201", frontEn: "What is the IPOS Cycle?", frontNe: "IPOS चक्र के हो?", backEn: "Input → Processing → Output → Storage — the universal computing workflow.", backNe: "इनपुट → प्रशोधन → आउटपुट → भण्डारण — कम्प्युटरका ४ मुख्य चरणहरू।" },
      { id: "f1202", frontEn: "Hardware vs Software", frontNe: "हार्डवेयर र सफ्टवेयरको भिन्नता", backEn: "Hardware is physical machinery; Software is the instructions and code directing it.", backNe: "हार्डवेयर देख्न र छुन सकिने भौतिक भाग हो; सफ्टवेयर त्यसलाई चलाउने प्रोग्राम हो।" },
      { id: "f1203", frontEn: "RAM vs SSD Storage", frontNe: "RAM र SSD स्टोरेजको भिन्नता", backEn: "RAM is fast, volatile working memory; SSD is persistent, non-volatile long-term storage.", backNe: "RAM छिटो अस्थायी मेमोरी हो; SSD सधैंका लागि फाइल सुरक्षित राख्ने ठाउँ हो।" },
      { id: "f1204", frontEn: "What is a CPU Core?", frontNe: "CPU कोर के हो?", backEn: "An independent processing unit inside a CPU chip capable of executing tasks in parallel.", backNe: "CPU भित्रको छुट्टै स्वतन्त्र रूपमा काम गर्न सक्ने प्रशोधन एकाइ।" },
      { id: "f1205", frontEn: "What does an OS do?", frontNe: "अपरेटिङ सिस्टमले के गर्छ?", backEn: "Manages hardware, coordinates memory, provides the user GUI, and runs applications.", backNe: "हार्डवेयर व्यवस्थापन गर्छ, मेमोरी बाँडफाँड गर्छ र एपहरू चलाउँछ।" },
      { id: "f1206", frontEn: "What is a Dual I/O Device?", frontNe: "Dual I/O उपकरण के हो?", backEn: "A device like a touchscreen that performs both Input (touch) and Output (visual display).", backNe: "टचस्क्रिन जस्तो इनपुट र आउटपुट दुवै काम गर्ने यन्त्र।" },
      { id: "f1207", frontEn: "1 Byte = ? Bits", frontNe: "१ बाइट = कति बिट?", backEn: "1 Byte = 8 Bits of binary data (0s and 1s).", backNe: "१ बाइट = ८ बाइनरी बिट्स (० र १)।" },
      { id: "f1208", frontEn: "What is Open Source?", frontNe: "ओपन सोर्स सफ्टवेयर के हो?", backEn: "Software with public source code that anyone can inspect, improve, and share freely.", backNe: "सबैका लागि कोड हेर्न र सच्याउन पाइने निःशुल्क सफ्टवेयर।" },
      { id: "f1209", frontEn: "What is Cloud Storage?", frontNe: "क्लाउड स्टोरेज के हो?", backEn: "Saving files on secure remote internet servers for access anywhere on any device.", backNe: "इन्टरनेटको सुरक्षित सर्भरमा फाइल राख्ने र जहाँबाट पनि खोल्न मिल्ने प्रविधि।" },
      { id: "f1210", frontEn: "What is Digital Literacy?", frontNe: "डिजिटल साक्षरता के हो?", backEn: "The essential ability to safely and productively use computer tools and internet services.", backNe: "कम्प्युटर र अनलाइन सेवाहरू सुरक्षित र प्रभावकारी रूपमा चलाउन सक्ने क्षमता।" },
    ],
    rememberPoints: [
      { en: "Mastering computer fundamentals builds the foundation for all future digital and AI skills.", ne: "कम्प्युटरका आधारभूत ज्ञानले भविष्यका सम्पूर्ण डिजिटल र AI सीपहरूको बलियो जग बसाल्छ।" },
      { en: "Practice regularly, explore with curiosity, and apply what you've learned to your daily study and work.", ne: "नियमित अभ्यास गर्नुहोस् र सिकेका सीपहरूलाई आफ्नो पढाइ र काममा प्रयोग गर्नुहोस्।" }
    ]
  }
];
