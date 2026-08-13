export const aiBasicsRoadmap = [
  {
    id: 1,
    slug: 'module-1',
    title: 'What is Artificial Intelligence?',
    subtitle: 'AI भनेको के हो?',
    duration: '10 min',
    level: 'Beginner',
    type: 'reading',
    objectives: [
      { en: 'Understand what Artificial Intelligence is.', ne: 'कृत्रिम बुद्धिमत्ता (AI) भनेको के हो बुझ्न।' },
      { en: 'Identify AI in everyday life.', ne: 'दैनिक जीवनमा AI को पहिचान गर्न।' },
      { en: 'Explain AI in simple language.', ne: 'सरल भाषामा AI को व्याख्या गर्न।' }
    ],
    content: [
      {
        type: 'heading',
        text: 'The Basics of AI',
        textNe: 'AI का आधारभूत कुराहरू'
      },
      {
        type: 'paragraph',
        text: 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.',
        textNe: 'कृत्रिम बुद्धिमत्ता (AI) भन्नाले मानिसले जस्तै सोच्न र कार्य गर्न सक्ने गरी प्रोग्राम गरिएका मेसिनहरूमा मानवीय बुद्धिको अनुकरणलाई जनाउँछ। यो शब्द कुनै पनि यस्तो मेसिनमा लागू हुन सक्छ जसले सिक्ने र समस्या समाधान गर्ने जस्ता मानवीय दिमागका विशेषताहरू देखाउँछ।'
      },
      {
        type: 'highlight',
        text: 'In simple words: AI is teaching a computer to do things that normally require human intelligence.',
        textNe: 'सरल शब्दमा भन्नुपर्दा: AI भनेको कम्प्युटरलाई यस्तो काम गर्न सिकाउनु हो जसको लागि सामान्यतया मानवीय बुद्धिको आवश्यकता पर्दछ।'
      }
    ],
    examples: [
      { title: 'Face Unlock', titleNe: 'अनुहारबाट फोन अनलक (Face Unlock)', desc: 'Your smartphone uses AI to recognize your face and unlock the device.', descNe: 'तपाईंको स्मार्टफोनले अनुहार पहिचान गर्न र अनलक गर्न AI प्रयोग गर्छ।' },
      { title: 'YouTube Recommendations', titleNe: 'युट्युब सिफारिस (YouTube Recommendations)', desc: 'AI analyzes what you watch to suggest videos you might like.', descNe: 'तपाईंलाई कस्तो भिडियो मन पर्न सक्छ भनेर AI ले तपाईंले हेरेको कुराको विश्लेषण गर्छ।' }
    ],
    summary: [
      { en: 'AI learns patterns.', ne: 'AI ले ढाँचाहरू (patterns) सिक्छ।' },
      { en: 'AI is everywhere.', ne: 'AI जताततै छ।' },
      { en: 'AI helps humans make decisions.', ne: 'AI ले मानिसलाई निर्णय लिन मद्दत गर्छ।' }
    ],
    practice: {
      task: 'Open ChatGPT.',
      taskNe: 'ChatGPT खोल्नुहोस्।',
      action: 'Ask: "Explain Artificial Intelligence like I am 10 years old."',
      actionNe: 'सोध्नुहोस्: "१५ वर्षको बच्चालाई जस्तै गरी कृत्रिम बुद्धिमत्ता (AI) को व्याख्या गर्नुहोस्।"'
    },
    quiz: [
      {
        question: 'What does AI stand for?',
        options: ['Automated Internet', 'Artificial Intelligence', 'Advanced Information'],
        answer: 1,
        explanation: 'AI stands for Artificial Intelligence.'
      },
      {
        question: 'Which of the following is an everyday example of AI?',
        options: ['A regular clock', 'A wooden pencil', 'YouTube video recommendations'],
        answer: 2,
        explanation: 'YouTube uses AI to suggest videos based on your watch history.'
      }
    ]
  },
  {
    id: 2,
    slug: 'module-2',
    title: 'History of Artificial Intelligence',
    subtitle: 'AI को इतिहास',
    duration: '8 min',
    level: 'Beginner',
    type: 'reading',
    objectives: [
      { en: 'Learn the origin of AI.', ne: 'AI को उत्पत्ति बारे जान्न।' },
      { en: 'Understand major milestones in AI development.', ne: 'AI विकासका प्रमुख चरणहरू बुझ्न।' }
    ],
    content: [
      {
        type: 'heading',
        text: 'How did AI begin?',
        textNe: 'AI को सुरुवात कसरी भयो?'
      },
      {
        type: 'paragraph',
        text: 'The concept of AI dates back to ancient history with myths of artificial beings. However, the formal field of AI research was founded at a conference at Dartmouth College in 1956.',
        textNe: 'AI को अवधारणा प्राचीन इतिहासमा कृत्रिम प्राणीहरूको मिथकहरूसँगै सुरु भएको हो। यद्यपि, AI अनुसन्धानको औपचारिक क्षेत्र सन् १९५६ मा डार्टमाउथ कलेजमा भएको सम्मेलनमा स्थापना भएको थियो।'
      },
      {
        type: 'highlight',
        text: 'Key Milestone: In 1997, IBM\'s Deep Blue became the first computer to beat a reigning world chess champion, Garry Kasparov.',
        textNe: 'मुख्य कोसेढुङ्गा: सन् १९९७ मा, IBM को Deep Blue ले विश्व चेस च्याम्पियन ग्यारी कास्पारोभलाई हराउने पहिलो कम्प्युटर बन्यो।'
      }
    ],
    examples: [
      { title: 'Turing Test', titleNe: 'ट्युरिङ परीक्षण (Turing Test)', desc: 'Alan Turing proposed a test in 1950 to check if a machine can exhibit intelligent behavior indistinguishable from that of a human.', descNe: 'एलन ट्युरिङले सन् १९५० मा मेसिनले मानिसको जस्तै बुद्धि देखाउन सक्छ कि सक्दैन भनेर परीक्षण गर्न एउटा विधि प्रस्ताव गरेका थिए।' }
    ],
    summary: [
      { en: 'AI research officially started in 1956.', ne: 'AI अनुसन्धान औपचारिक रूपमा १९५६ मा सुरु भयो।' },
      { en: 'Early AI faced many failures (AI Winters).', ne: 'सुरुवाती AI ले धेरै असफलताहरू (AI Winters) सामना गर्नुपर्‍यो।' },
      { en: 'Modern AI is driven by huge data and computing power.', ne: 'आधुनिक AI विशाल डाटा र कम्प्युटिङ शक्तिद्वारा सञ्चालित छ।' }
    ],
    practice: {
      task: 'Search Google for "Alan Turing".',
      taskNe: 'गुगलमा "Alan Turing" खोज्नुहोस्।',
      action: 'Read a short summary of who he was and why he is considered the father of theoretical computer science.',
      actionNe: 'उहाँ को हुनुहुन्थ्यो र किन उहाँलाई कम्प्युटर विज्ञानको पिता मानिन्छ भन्ने छोटो सारांश पढ्नुहोस्।'
    },
    quiz: [
      {
        question: 'When was the field of AI research formally founded?',
        options: ['1956', '1999', '2010'],
        answer: 0,
        explanation: 'AI was officially founded as a research discipline at the Dartmouth conference in 1956.'
      }
    ]
  },
  {
    id: 3,
    slug: 'module-3',
    title: 'AI vs Machine Learning vs Deep Learning',
    subtitle: 'AI, Machine Learning र Deep Learning बीचको फरक',
    duration: '15 min',
    level: 'Beginner',
    type: 'video',
    objectives: [
      { en: 'Differentiate between AI, ML, and DL.', ne: 'AI, ML, र DL बीचको भिन्नता छुट्याउन।' },
      { en: 'Understand the hierarchy of these technologies.', ne: 'यी प्रविधिहरूको पदानुक्रम (hierarchy) बुझ्न।' }
    ],
    content: [
      {
        type: 'heading',
        text: 'The AI Umbrella',
        textNe: 'AI को छाता (AI Umbrella)'
      },
      {
        type: 'paragraph',
        text: 'Artificial Intelligence is the broadest concept. Machine Learning is a subset of AI that focuses on giving machines data so they can learn for themselves. Deep Learning is a further subset of Machine Learning inspired by the human brain (neural networks).',
        textNe: 'कृत्रिम बुद्धिमत्ता (AI) सबैभन्दा फराकिलो अवधारणा हो। मेशिन लर्निङ (ML) AI को एउटा भाग हो जसले मेसिनहरूलाई डाटा दिएर आफैं सिक्न सक्षम बनाउँछ। डीप लर्निङ (DL) मेशिन लर्निङकै एउटा भाग हो जुन मानव मस्तिष्क (neural networks) बाट प्रेरित छ।'
      },
      {
        type: 'highlight',
        text: 'Think of Russian Matryoshka dolls: Deep Learning is inside Machine Learning, which is inside Artificial Intelligence.',
        textNe: 'रुसी पुतली (Matryoshka dolls) जस्तै सोच्नुहोस्: Deep Learning Machine Learning को भित्र हुन्छ, जुन AI को भित्र हुन्छ।'
      }
    ],
    examples: [
      { title: 'AI', titleNe: 'AI', desc: 'A robot playing chess.', descNe: 'चेस खेल्ने रोबोट।' },
      { title: 'Machine Learning', titleNe: 'मेशिन लर्निङ (ML)', desc: 'Spam email filter learning from emails you mark as spam.', descNe: 'तपाईंले स्प्याम भनेर चिन्ह लगाएको इमेलहरूबाट सिक्ने स्प्याम फिल्टर।' },
      { title: 'Deep Learning', titleNe: 'डीप लर्निङ (DL)', desc: 'Self-driving cars recognizing pedestrians.', descNe: 'पैदलयात्री चिन्न सक्ने स्वचालित कारहरू।' }
    ],
    summary: [
      { en: 'AI is the concept of intelligent machines.', ne: 'AI भनेको बुद्धिमान मेसिनहरूको अवधारणा हो।' },
      { en: 'ML is teaching machines using data.', ne: 'ML भनेको डाटा प्रयोग गरेर मेसिनलाई सिकाउनु हो।' },
      { en: 'DL uses complex neural networks.', ne: 'DL ले जटिल न्युरल नेटवर्क प्रयोग गर्छ।' }
    ],
    practice: {
      task: 'Write down one example for each.',
      taskNe: 'प्रत्येकको लागि एउटा उदाहरण लेख्नुहोस्।',
      action: 'Can you think of a real-life app that uses Deep Learning?',
      actionNe: 'तपाईं Deep Learning प्रयोग गर्ने एउटा वास्तविक एपको बारेमा सोच्न सक्नुहुन्छ?'
    },
    quiz: [
      {
        question: 'Which of the following is the broadest concept?',
        options: ['Machine Learning', 'Deep Learning', 'Artificial Intelligence'],
        answer: 2,
        explanation: 'Artificial Intelligence encompasses both Machine Learning and Deep Learning.'
      }
    ]
  },
  {
    id: 4,
    slug: 'module-4',
    title: 'Types of Artificial Intelligence',
    subtitle: 'AI का प्रकार',
    duration: '12 min',
    level: 'Beginner',
    type: 'reading',
    objectives: [
      { en: 'Learn about Narrow AI, General AI, and Super AI.', ne: 'साँघुरो AI, सामान्य AI, र सुपर AI बारे जान्न।' },
      { en: 'Understand the current state of AI technology.', ne: 'AI प्रविधिको वर्तमान अवस्था बुझ्न।' }
    ],
    content: [
      {
        type: 'heading',
        text: 'Levels of AI Intelligence',
        textNe: 'AI बुद्धिमत्ताका स्तरहरू'
      },
      {
        type: 'paragraph',
        text: 'AI is generally categorized into three types: Narrow AI (ANI) which is designed for one specific task, General AI (AGI) which would have human-level intelligence across multiple tasks, and Super AI (ASI) which would surpass human intelligence.',
        textNe: 'AI लाई सामान्यतया तीन प्रकारमा विभाजन गरिन्छ: Narrow AI (ANI) जुन एउटा निश्चित कार्यको लागि बनाइएको हुन्छ, General AI (AGI) जसमा धेरै कार्यहरूमा मानव-स्तरको बुद्धि हुन्छ, र Super AI (ASI) जसले मानव बुद्धिलाई पार गर्दछ।'
      },
      {
        type: 'highlight',
        text: 'Important Fact: Currently, all existing AI systems (including ChatGPT) are Narrow AI.',
        textNe: 'महत्त्वपूर्ण तथ्य: हाल विद्यमान सबै AI प्रणालीहरू (ChatGPT सहित) Narrow AI हुन्।'
      }
    ],
    examples: [
      { title: 'Narrow AI', titleNe: 'Narrow AI', desc: 'Apple Siri, Google Translate, self-driving cars.', descNe: 'एप्पल सिरी (Siri), गुगल ट्रान्सलेट (Google Translate), स्वचालित कारहरू।' },
      { title: 'General AI', titleNe: 'General AI', desc: 'Does not exist yet. Only seen in sci-fi movies like C-3PO in Star Wars.', descNe: 'अहिलेसम्म अवस्थित छैन। स्टार वार्स (Star Wars) को C-3PO जस्ता विज्ञान कथा चलचित्रहरूमा मात्र देखिन्छ।' }
    ],
    summary: [
      { en: 'We currently only have Narrow AI.', ne: 'हामीसँग हाल Narrow AI मात्र छ।' },
      { en: 'AGI is AI as smart as a human.', ne: 'AGI भनेको मानिस जत्तिकै स्मार्ट AI हो।' },
      { en: 'ASI is AI smarter than humans.', ne: 'ASI भनेको मानिस भन्दा स्मार्ट AI हो।' }
    ],
    practice: {
      task: 'Identify a Narrow AI.',
      taskNe: 'एउटा Narrow AI पहिचान गर्नुहोस्।',
      action: 'Look at your phone. Name one app that uses Narrow AI to help you daily.',
      actionNe: 'आफ्नो फोन हेर्नुहोस्। तपाईंलाई दैनिक मद्दत गर्न Narrow AI प्रयोग गर्ने एउटा एपको नाम भन्नुहोस्।'
    },
    quiz: [
      {
        question: 'Is ChatGPT an example of Artificial General Intelligence (AGI)?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'No, ChatGPT is highly advanced Narrow AI focused on language tasks.'
      }
    ]
  },
  {
    id: 5,
    slug: 'module-5',
    title: 'Real-Life Applications of AI',
    subtitle: 'दैनिक जीवनमा AI को प्रयोग',
    duration: '10 min',
    level: 'Beginner',
    type: 'video',
    objectives: [
      { en: 'Recognize AI applications in various industries.', ne: 'विभिन्न उद्योगहरूमा AI को प्रयोग पहिचान गर्न।' },
      { en: 'Understand how AI impacts Nepal.', ne: 'नेपालमा AI को प्रभाव बुझ्न।' }
    ],
    content: [
      {
        type: 'heading',
        text: 'AI is Transforming the World',
        textNe: 'AI ले विश्वलाई परिवर्तन गर्दैछ'
      },
      {
        type: 'paragraph',
        text: 'From healthcare diagnosing diseases to agriculture predicting crop yields, AI is everywhere. In Nepal, AI is starting to be used in agriculture for weather forecasting, in banking for fraud detection, and in customer service through automated chatbots.',
        textNe: 'स्वास्थ्य सेवामा रोग निदानदेखि लिएर कृषिमा बाली उत्पादनको भविष्यवाणी सम्म, AI जताततै छ। नेपालमा, मौसम पूर्वानुमानको लागि कृषिमा, धोखाधडी पत्ता लगाउन बैंकिङमा, र स्वचालित च्याटबटहरू मार्फत ग्राहक सेवामा AI को प्रयोग सुरु हुँदैछ।'
      }
    ],
    examples: [
      { title: 'Agriculture (Nepal)', titleNe: 'कृषि (नेपाल)', desc: 'AI predicting weather patterns to help farmers plant at the right time.', descNe: 'किसानहरूलाई सही समयमा रोप्न मद्दत गर्न मौसमको ढाँचा भविष्यवाणी गर्ने AI।' },
      { title: 'Banking (Nepal)', titleNe: 'बैंकिङ (नेपाल)', desc: 'eSewa and banks using AI to detect unusual or fraudulent transactions.', descNe: 'ई-सेवा (eSewa) र बैंकहरूले असामान्य वा जालसाजी कारोबार पत्ता लगाउन AI प्रयोग गर्दै।' }
    ],
    summary: [
      { en: 'AI helps doctors diagnose diseases.', ne: 'AI ले डाक्टरहरूलाई रोग निदान गर्न मद्दत गर्छ।' },
      { en: 'AI helps farmers increase yields.', ne: 'AI ले किसानहरूलाई उत्पादन बढाउन मद्दत गर्छ।' },
      { en: 'AI makes banking safer.', ne: 'AI ले बैंकिङलाई सुरक्षित बनाउँछ।' }
    ],
    practice: {
      task: 'Brainstorm an AI solution for your community.',
      taskNe: 'आफ्नो समुदायको लागि एउटा AI समाधान सोच्नुहोस्।',
      action: 'Think of one local problem in your city that AI could solve.',
      actionNe: 'तपाईंको शहरको एउटा स्थानीय समस्या सोच्नुहोस् जसलाई AI ले समाधान गर्न सक्छ।'
    },
    quiz: [
      {
        question: 'Which of the following is a common application of AI in the banking sector?',
        options: ['Predicting rain', 'Fraud detection', 'Planting crops'],
        answer: 1,
        explanation: 'Banks heavily use AI for fraud detection to secure transactions.'
      }
    ]
  },
  {
    id: 6,
    slug: 'quiz',
    title: 'AI Basics Final Quiz',
    subtitle: 'AI ज्ञान परीक्षण',
    duration: '5 Questions',
    level: 'Quiz',
    type: 'quiz',
    objectives: [
      { en: 'Test your understanding of AI basics.', ne: 'AI का आधारभूत कुराहरूको बुझाइ परीक्षण गर्न।' }
    ],
    content: [
      {
        type: 'heading',
        text: 'Final Assessment',
        textNe: 'अन्तिम मूल्याङ्कन'
      },
      {
        type: 'paragraph',
        text: 'Congratulations on reaching the end of the AI Basics module! Let\'s test your knowledge with a final comprehensive quiz.',
        textNe: 'AI Basics मोड्युलको अन्त्यमा पुग्नुभएकोमा बधाई छ! अन्तिम विस्तृत प्रश्नोत्तरीको साथ तपाईंको ज्ञान परीक्षण गरौं।'
      }
    ],
    examples: [],
    summary: [],
    practice: null,
    quiz: [
      {
        question: 'What does AI stand for?',
        options: ['Automated Internet', 'Artificial Intelligence', 'Advanced Information'],
        answer: 1,
        explanation: 'AI stands for Artificial Intelligence.'
      },
      {
        question: 'Is ChatGPT an example of General AI (AGI)?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'No, ChatGPT is Narrow AI because it is specialized in language tasks.'
      },
      {
        question: 'Which is the broadest category?',
        options: ['Machine Learning', 'Artificial Intelligence', 'Deep Learning'],
        answer: 1,
        explanation: 'Artificial Intelligence encompasses all forms of machine intelligence.'
      },
      {
        question: 'Which AI type currently exists in the real world?',
        options: ['Narrow AI (ANI)', 'General AI (AGI)', 'Super AI (ASI)'],
        answer: 0,
        explanation: 'All AI today, from Siri to ChatGPT, is Narrow AI.'
      },
      {
        question: 'How does AI help in banking?',
        options: ['By planting crops', 'By detecting fraud', 'By editing photos'],
        answer: 1,
        explanation: 'Banks use AI primarily to monitor and detect fraudulent transactions securely.'
      }
    ]
  }
];
