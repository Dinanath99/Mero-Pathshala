export const learningPathsData = {
  student: {
    id: "student",
    role: "Student",
    titleEn: "Learn AI to Study Smarter",
    titleNp: "AI प्रयोग गरेर पढाइलाई अझ प्रभावकारी बनाउनुहोस्",
    descEn: "Master AI tools for intelligent note-taking, exam preparation, academic research, and presentation creation.",
    descNp: "नोटहरू बनाउन, परीक्षाको तयारी गर्न, अनुसन्धान र प्रेजेन्टेसन बनाउन AI प्रयोग गर्न सिक्नुहोस्।",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    modules: [
      {
        id: "st-m1",
        slug: "smart-notes",
        title: "Smart AI Note-Taking & Summarization",
        subtitle: "स्मार्ट नोटहरू र सारांश तयार गर्ने तरिका",
        duration: "12 min",
        level: "Beginner",
        objectives: [
          { en: "Turn long textbooks into concise flashcards using ChatGPT.", ne: "लामा पाठ्यपुस्तकहरूलाई ChatGPT प्रयोग गरी संक्षिप्त फ्ल्यासकार्डमा रूपान्तरण गर्न।" },
          { en: "Summarize PDFs and lecture recordings.", ne: "PDF र लेक्चर रेकर्डिङको सारांश निकाल्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "Summarizing Textbooks & PDFs with AI",
            textNe: "AI बाट पाठ्यपुस्तक र PDF को सारांश बनाउने",
          },
          {
            type: "paragraph",
            text: "Students can save hours by asking AI to extract key concepts, definitions, and formulas from lengthy study materials.",
            textNe: "विद्यार्थीहरूले लामा अध्ययन सामग्रीहरूबाट मुख्य अवधारणा, परिभाषा र सूत्रहरू निकाल्न AI लाई सोधेर समय बचत गर्न सक्छन्।",
          },
          {
            type: "highlight",
            text: "Top Prompt: 'Summarize the attached PDF into 5 key bullet points for an upcoming exam.'",
            textNe: "उत्कृष्ट प्रम्प्ट: 'आगामी परीक्षाका लागि संलग्न PDF लाई ५ वटा मुख्य बुँदाहरूमा सारांशित गर्नुहोस्।'",
          },
        ],
        examples: [
          {
            title: "Flashcard Generation",
            titleNe: "फ्ल्यासकार्ड निर्माण",
            desc: "Generate 10 Q&A flashcards for biology terms instantly.",
            descNe: "बायोलोजीका शब्दहरूका लागि १० वटा प्रश्नोत्तर फ्ल्यासकार्ड तुरुन्तै तयार पार्नुहोस्।",
          },
        ],
        practice: {
          task: "Summarize a chapter.",
          taskNe: "एउटा पाठको सारांश निकाल्नुहोस्।",
          action: "Copy a 500-word essay into ChatGPT and prompt: 'Provide a 3-bullet point summary in simple Nepali and English.'",
          actionNe: "५०० शब्दको निबन्ध ChatGPT मा कपी गर्नुहोस् र भन्नुहोस्: 'सरल नेपाली र अंग्रेजीमा ३ बुँदे सारांश दिनुहोस्।'",
        },
        quiz: [
          {
            question: "How can AI best assist students in note-taking?",
            options: ["By taking exams for them", "By extracting key definitions and creating summaries", "By replacing teachers"],
            answer: 1,
            explanation: "AI excels at analyzing long text and pulling out critical formulas, terms, and summaries.",
          },
        ],
      },
      {
        id: "st-m2",
        slug: "exam-prep",
        title: "AI Exam Preparation & Practice Tests",
        subtitle: "परीक्षाको पूर्व तयारी र मोक टेस्ट",
        duration: "15 min",
        level: "Intermediate",
        objectives: [
          { en: "Create customized practice quizzes for any subject.", ne: "कुनै पनि विषयको लागि अनुकूलित अभ्यास प्रश्नोत्तरी सिर्जना गर्न।" },
          { en: "Ask AI to act as a strict examiner providing feedback.", ne: "AI लाई कडा परीक्षकको रूपमा प्रस्तुत गरी प्रतिक्रिया प्राप्त गर्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "Generating Practice Questions",
            textNe: "अभ्यास प्रश्नहरू सिर्जना गर्ने",
          },
          {
            type: "paragraph",
            text: "AI can analyze your syllabus and generate multiple-choice, short answer, or long-form exam questions.",
            textNe: "AI ले तपाईंको पाठ्यक्रमको विश्लेषण गरेर बहुवैकल्पिक, छोटो उत्तर वा लामा प्रश्नहरू तयार पार्न सक्छ।",
          },
        ],
        examples: [
          {
            title: "Mock Interview & Viva",
            titleNe: "भाइभा र मौखिक परीक्षा अभ्यास",
            desc: "Simulate a college viva voice exam with ChatGPT asking follow-up questions.",
            descNe: "ChatGPT ले निरन्तर प्रश्न सोध्ने गरी कलेजको भाइभा परीक्षाको अभ्यास गर्नुहोस्।",
          },
        ],
        practice: {
          task: "Create a 5-question quiz.",
          taskNe: "५ प्रश्नको क्विज बनाउनुहोस्।",
          action: "Prompt: 'Act as a physics professor. Ask me 5 hard questions about Newton\'s Laws one by one.'",
          actionNe: "सोध्नुहोस्: 'भौतिकशास्त्रको प्राध्यापक बनेर मलाई न्यूटनका नियमहरूबारे ५ वटा कडा प्रश्नहरू एक-एक गरी सोध्नुहोस्।'",
        },
        quiz: [
          {
            question: "What is the benefit of asking AI to test your knowledge?",
            options: ["It gives instant feedback and explains mistakes", "It forces you to memorize without understanding", "It makes studying slower"],
            answer: 0,
            explanation: "Interactive testing with AI helps identify knowledge gaps with explanations.",
          },
        ],
      },
      {
        id: "st-m3",
        slug: "research",
        title: "Academic Research & Citation Assistance",
        subtitle: "शैक्षिक अनुसन्धान र सन्दर्भ सामग्री",
        duration: "10 min",
        level: "Intermediate",
        objectives: [
          { en: "Use Perplexity AI for cited research papers.", ne: "सन्दर्भ सामाग्री सहितको अनुसन्धानका लागि Perplexity AI प्रयोग गर्न।" },
          { en: "Evaluate credible scientific sources.", ne: "विश्वसनीय वैज्ञानिक स्रोतहरूको मूल्याङ्कन गर्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "AI for Literature Review",
            textNe: "साहित्य पुनरावलोकनका लागि AI",
          },
          {
            type: "paragraph",
            text: "Tools like Perplexity and Elicit help students find real academic papers with citations.",
            textNe: "Perplexity र Elicit जस्ता टुलहरूले विद्यार्थीहरूलाई सन्दर्भ सहित वास्तविक शैक्षिक पत्रिकाहरू खोज्न मद्दत गर्छन्।",
          },
        ],
        examples: [
          {
            title: "Citation Generator",
            titleNe: "साइटेशन जेनेरेटर",
            desc: "Format references into APA, MLA, or Harvard style automatically.",
            descNe: "सन्दर्भहरूलाई स्वतः APA, MLA वा Harvard ढाँचामा मिलाउनुहोस्।",
          },
        ],
        practice: {
          task: "Conduct cited research.",
          taskNe: "साइटेटेड अनुसन्धान गर्नुहोस्।",
          action: "Search Perplexity AI for 'Impact of Renewable Energy in Nepal' and review the source links.",
          actionNe: "Perplexity AI मा 'नेपालमा नवीकरणीय ऊर्जाको प्रभाव' खोज्नुहोस् र लिङ्कहरू जाँच गर्नुहोस्।",
        },
        quiz: [
          {
            question: "Which tool provides direct web citations for research?",
            options: ["Calculator", "Perplexity AI", "Paint"],
            answer: 1,
            explanation: "Perplexity AI explicitly links cited sources for every answer.",
          },
        ],
      },
      {
        id: "st-m4",
        slug: "presentations",
        title: "AI Presentation & Slide Creation",
        subtitle: "AI बाट आकर्षक प्रेजेन्टेसन र स्लाइड निर्माण",
        duration: "10 min",
        level: "Beginner",
        objectives: [
          { en: "Build presentation outlines and slide scripts using Gamma AI.", ne: "Gamma AI प्रयोग गरी स्लाइड र प्रेजेन्टेसन आउटलाइन बनाउन।" },
          { en: "Generate compelling speaker notes.", ne: "प्रभावकारी वक्ता नोटहरू (Speaker Notes) तयार पार्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "From Topic to Finished Slides in Minutes",
            textNe: "विषयवस्तुबाट मिनेटमै तयारी स्लाइडसम्म",
          },
          {
            type: "paragraph",
            text: "AI presentation builders can create visual slide decks with images, layouts, and bullet points automatically.",
            textNe: "AI प्रेजेन्टेसन टुलहरूले फोटो, लेआउट र बुँदाहरू सहित दृश्य स्लाइडहरू स्वतः सिर्जना गर्न सक्छन्।",
          },
        ],
        examples: [
          {
            title: "Gamma AI Decks",
            titleNe: "Gamma AI डिक्स",
            desc: "Generate a 10-slide presentation on Climate Change in 60 seconds.",
            descNe: "जलवायु परिवर्तनबारे ६० सेकेन्डमै १० वटा स्लाइडको प्रेजेन्टेसन तयार गर्नुहोस्।",
          },
        ],
        practice: {
          task: "Create a slide outline.",
          taskNe: "स्लाइड आउटलाइन बनाउनुहोस्।",
          action: "Ask ChatGPT: 'Create a 5-slide outline for a presentation on AI Ethics with speaker notes.'",
          actionNe: "ChatGPT मा सोध्नुहोस्: 'AI नैतिकता सम्बन्धी ५ स्लाइडको प्रेजेन्टेसन आउटलाइन स्पिकर नोट सहित बनाउनुहोस्।'",
        },
        quiz: [
          {
            question: "What benefit do AI presentation tools provide?",
            options: ["They eliminate the need to present", "They auto-generate slide outlines, layouts, and speaker notes", "They format USB drives"],
            answer: 1,
            explanation: "AI presentation software dramatically speeds up slide design and script writing.",
          },
        ],
      },
    ],
  },
  developer: {
    id: "developer",
    role: "Developer",
    titleEn: "Build AI-Powered Applications",
    titleNp: "AI प्रयोग गरेर आधुनिक वेबसाइट र एप बनाउनुहोस्",
    descEn: "Integrate OpenAI APIs, build AI automation workflows, implement RAG architecture, and deploy AI agents.",
    descNp: "OpenAI API जोडौँ, AI अटोमेसन, RAG आर्किटेक्चर र AI एजेन्टहरू निर्माण गरौँ।",
    badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
    modules: [
      {
        id: "dev-m1",
        slug: "ai-apis",
        title: "Integrating OpenAI & LLM APIs",
        subtitle: "OpenAI र LLM API इन्टिग्रेसन",
        duration: "20 min",
        level: "Advanced",
        objectives: [
          { en: "Connect Node.js or Python backend to OpenAI API.", ne: "Node.js वा Python ब्याकएन्डलाई OpenAI API सँग जोड्न।" },
          { en: "Handle API authentication, prompt parameters, and streaming responses.", ne: "API प्रमाणीकरण, प्रम्प्ट पारामिटर र स्ट्रिमिङ रेस्पोन्स नियन्त्रण गर्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "Calling GPT Models Programmatically",
            textNe: "प्रोग्रामिङ मार्फत GPT मोडलहरू कल गर्ने",
          },
          {
            type: "paragraph",
            text: "Developers can utilize the OpenAI SDK to send chat completion prompts and parse responses dynamically.",
            textNe: "डेभलपरहरूले OpenAI SDK प्रयोग गरी च्याट कम्पलिसन प्रम्प्ट पठाउन र नतिजाहरू गतिशील रूपमा प्राप्त गर्न सक्छन्।",
          },
        ],
        examples: [
          {
            title: "Custom Chatbot API",
            titleNe: "कस्टम च्याटबट API",
            desc: "Build an express endpoint `/api/v1/chat` that returns AI streaming completions.",
            descNe: "AI स्ट्रिमिङ नतिजा दिने एक्सप्रेस एन्डपोइन्ट `/api/v1/chat` बनाउनुहोस्।",
          },
        ],
        practice: {
          task: "Test an API request.",
          taskNe: "API अनुरोध परीक्षण गर्नुहोस्।",
          action: "Write a short JS script using `openai.chat.completions.create()` with model `gpt-4o-mini`.",
          actionNe: "मोडल `gpt-4o-mini` प्रयोग गरेर एउटा छोटो JS कोड लेख्नुहोस्।",
        },
        quiz: [
          {
            question: "Which OpenAI parameter controls output randomness?",
            options: ["max_tokens", "temperature", "model"],
            answer: 1,
            explanation: "Temperature ranges from 0 (deterministic) to 1 (creative).",
          },
        ],
      },
      {
        id: "dev-m2",
        slug: "rag-architecture",
        title: "RAG & Vector Database Architecture",
        subtitle: "RAG र भेक्टर डाटाबेस आर्किटेक्चर",
        duration: "25 min",
        level: "Advanced",
        objectives: [
          { en: "Understand Retrieval-Augmented Generation (RAG).", ne: "Retrieval-Augmented Generation (RAG) को सिद्धान्त बुझ्न।" },
          { en: "Store text embeddings inside vector databases like Pinecone or ChromaDB.", ne: "Pinecone वा ChromaDB मा टेक्सट एम्बेडिङ संग्रह गर्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "Why RAG is Essential for Enterprise AI",
            textNe: "व्यापारिक AI को लागि RAG किन अनिवार्य छ",
          },
          {
            type: "paragraph",
            text: "RAG allows LLMs to query custom internal databases without expensive model fine-tuning.",
            textNe: "RAG ले LLM लाई कुनै महँगो मोडल फाइन-ट्युनिङ बिना नै आन्तरिक डाटाबेसमा खोज्न सक्षम बनाउँछ।",
          },
        ],
        examples: [
          {
            title: "Company Knowledge Bot",
            titleNe: "कम्पनी ज्ञान बट",
            desc: "Answer customer questions based on company internal documentation.",
            descNe: "कम्पनीको आन्तरिक कागजातका आधारमा ग्राहकका प्रश्नहरूको उत्तर दिनुहोस्।",
          },
        ],
        practice: {
          task: "Understand Embeddings.",
          taskNe: "एम्बेडिङ बुझ्नुहोस्।",
          action: "Convert text to vector embeddings using OpenAI embedding model `text-embedding-3-small`.",
          actionNe: "`text-embedding-3-small` प्रयोग गरी पाठलाई भेक्टरमा रूपान्तरण गर्नुहोस्।",
        },
        quiz: [
          {
            question: "What does RAG stand for in AI engineering?",
            options: ["Real-time Automated Generation", "Retrieval-Augmented Generation", "Random Agent Generator"],
            answer: 1,
            explanation: "RAG fetches relevant document context from vector DBs before generating AI responses.",
          },
        ],
      },
    ],
  },
  teacher: {
    id: "teacher",
    role: "Teacher",
    titleEn: "Teach Better with AI",
    titleNp: "AI प्रयोग गरेर उत्कृष्ट शिक्षण सामग्री तयार गर्नुहोस्",
    descEn: "Generate lesson plans, interactive classroom quizzes, personalized assignment rubrics, and educational aids.",
    descNp: "पाठ योजना, कक्षाकोठा क्विज, रुब्रिक्स र शिक्षण सामग्रीहरू सहजै बनाउनुहोस्।",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    modules: [
      {
        id: "tch-m1",
        slug: "lesson-plans",
        title: "Automated AI Lesson Planning",
        subtitle: "स्वचालित पाठ योजना (Lesson Plan) निर्माण",
        duration: "15 min",
        level: "Beginner",
        objectives: [
          { en: "Create curriculum-aligned lesson plans in minutes.", ne: "पाठ्यक्रम अनुसारको पाठ योजना मिनेटमै तयार पार्न।" },
          { en: "Differentiate instruction for varied learning paces.", ne: "विभिन्न सिकाइ क्षमता भएका विद्यार्थीका लागि फरक सिकाइ विधि अपनाउन।" },
        ],
        content: [
          {
            type: "heading",
            text: "Effortless Curriculum Planning",
            textNe: "सहज पाठ्यक्रम योजना",
          },
          {
            type: "paragraph",
            text: "Teachers can input learning objectives and get structured lesson plans complete with timing and activities.",
            textNe: "शिक्षकहरूले सिकाइ उद्देश्यहरू राखेर समय र क्रियाकलाप सहितको व्यवस्थित पाठ योजना प्राप्त गर्न सक्छन्।",
          },
        ],
        examples: [
          {
            title: "45-Minute Math Plan",
            titleNe: "४५ मिनेटको गणित पाठ योजना",
            desc: "Generate a step-by-step 45-minute lesson plan on basic fractions.",
            descNe: "भिन्न (fractions) सम्बन्धी ४५ मिनेटको क्रमिक पाठ योजना बनाउनुहोस्।",
          },
        ],
        practice: {
          task: "Generate a lesson plan.",
          taskNe: "एउटा पाठ योजना बनाउनुहोस्।",
          action: "Prompt: 'Create a 45-minute interactive science lesson plan for Grade 7 on Photosynthesis in Nepali.'",
          actionNe: "सोध्नुहोस्: 'कक्षा ७ का लागि प्रकाश संश्लेषण सम्बन्धी ४५ मिनेटको नेपालीमा पाठ योजना बनाउनुहोस्।'",
        },
        quiz: [
          {
            question: "How does AI save time for educators?",
            options: ["By auto-generating lesson plan drafts and rubrics", "By attending meetings", "By replacing physical classrooms"],
            answer: 0,
            explanation: "AI handles repetitive drafting so teachers can focus on personal student mentoring.",
          },
        ],
      },
    ],
  },
  business: {
    id: "business",
    role: "Business",
    titleEn: "Grow Your Business with AI",
    titleNp: "AI प्रयोग गरेर आफ्नो व्यवसायलाई अझ प्रभावकारी बनाउनुहोस्",
    descEn: "Supercharge marketing campaigns, customer support automation, operational efficiency, and sales outreach.",
    descNp: "मार्केटिङ, ग्राहक सेवा अटोमेसन, सञ्चालन र बिक्री बढाउन AI को प्रयोग गरौँ।",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    modules: [
      {
        id: "biz-m1",
        slug: "marketing",
        title: "AI Marketing & Social Media Copywriting",
        subtitle: "AI मार्केटिङ र सामाजिक सञ्जाल कपीराइटिङ",
        duration: "15 min",
        level: "Beginner",
        objectives: [
          { en: "Write engaging Facebook ads and email newsletters.", ne: "फेसबुक विज्ञापन र इमेल न्युजलेटरहरू आकर्षित तरिकाले लेख्न।" },
          { en: "Craft high-converting product descriptions.", ne: "सामान बिक्री बढाउने प्रडक्ट डिस्क्रिप्सन तयार पार्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "High-Converting Ad Copy",
            textNe: "आकर्षक विज्ञापन कपी",
          },
          {
            type: "paragraph",
            text: "AI enables businesses to generate targeted ad variations in both English and Nepali effortlessly.",
            textNe: "AI ले व्यवसायहरूलाई अंग्रेजी र नेपाली दुवै भाषामा लक्षित विज्ञापनहरू सजिलै बनाउन मद्दत गर्छ।",
          },
        ],
        examples: [
          {
            title: "Facebook Ad Campaign",
            titleNe: "फेसबुक विज्ञापन क्याम्पेन",
            desc: "Write 3 variations of Facebook posts for a local organic tea shop in Nepal.",
            descNe: "नेपालको स्थानीय अर्गानिक चिया पसलका लागि ३ प्रकारका फेसबुक पोस्टहरू लेख्नुहोस्।",
          },
        ],
        practice: {
          task: "Write an ad caption.",
          taskNe: "विज्ञापन क्याप्शन लेख्नुहोस्।",
          action: "Prompt: 'Write a catchy Facebook ad post in natural Nepali promoting a clothing brand sale.'",
          actionNe: "सोध्नुहोस्: 'लुगा पसलको सेल सम्बन्धी आकर्षित फेसबुक विज्ञापन पोस्ट नेपालीमा लेख्नुहोस्।'",
        },
        quiz: [
          {
            question: "Why do marketers use AI for ad copy?",
            options: ["To test multiple headlines and target audiences quickly", "To stop advertising", "To replace products"],
            answer: 0,
            explanation: "AI lets marketers generate dozens of creative ad hooks instantly for A/B testing.",
          },
        ],
      },
    ],
  },
  creator: {
    id: "creator",
    role: "Content Creator",
    titleEn: "Create Videos, Images, and Social Media with AI",
    titleNp: "AI प्रयोग गरेर भिडियो, फोटो र सामग्री तयार गर्नुहोस्",
    descEn: "Master YouTube video scripts, thumbnail design, Midjourney image generation, and viral social content creation.",
    descNp: "युट्युब स्क्रिप्ट, थम्बनेल डिजाइन, Midjourney फोटो र भाइरल कन्टेन्ट बनाउन सिक्नुहोस्।",
    badgeColor: "bg-pink-500/10 text-pink-500 border-pink-500/30",
    modules: [
      {
        id: "crt-m1",
        slug: "youtube",
        title: "AI YouTube Scriptwriting & Storyboarding",
        subtitle: "युट्युब स्क्रिप्ट लेखन र स्टोरीबोर्डिङ",
        duration: "15 min",
        level: "Beginner",
        objectives: [
          { en: "Write engaging video hooks and structured YouTube scripts.", ne: "भिडियोको सुरुवातमा ध्यान खिच्ने हुक र स्क्रिप्ट लेख्न।" },
          { en: "Generate B-roll image prompts for Midjourney.", ne: "Midjourney का लागि B-roll फोटो प्रम्प्टहरू तयार पार्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "Crafting Viral Video Hooks",
            textNe: "भाइरल भिडियो हुक तयार गर्ने",
          },
          {
            type: "paragraph",
            text: "The first 5 seconds of a video determine its retention. AI helps creators craft compelling hooks.",
            textNe: "भिडियोको पहिलो ५ सेकेन्डले दर्शक रहने वा जाने निर्धारण गर्छ। AI ले आकर्षित हुक बनाउन मद्दत गर्छ।",
          },
        ],
        examples: [
          {
            title: "Tech Review Script",
            titleNe: "टेक रिभ्यु स्क्रिप्ट",
            desc: "Draft a 3-minute YouTube Short script on the latest smartphone.",
            descNe: "नयाँ स्मार्टफोनबारे ३ मिनेटको युट्युब सर्ट्स स्क्रिप्ट तयार गर्नुहोस्।",
          },
        ],
        practice: {
          task: "Write a video hook.",
          taskNe: "भिडियो हुक लेख्नुहोस्।",
          action: "Prompt: 'Give me 3 viral opening hooks for a YouTube video titled Top 5 AI Tools in 2026.'",
          actionNe: "सोध्नुहोस्: 'Top 5 AI Tools in 2026 भिडियोका लागि ३ वटा आकर्षित हुकहरू दिनुहोस्।'",
        },
        quiz: [
          {
            question: "Why is the opening hook critical in video creation?",
            options: ["It captures viewer attention in the first few seconds", "It speeds up render times", "It renders captions"],
            answer: 0,
            explanation: "Hooks prevent viewers from scrolling away immediately.",
          },
        ],
      },
    ],
  },
  beginner: {
    id: "beginner",
    role: "Beginner",
    titleEn: "Start Learning AI from Zero",
    titleNp: "AI मा नयाँ हुनुहुन्छ? यहीँबाट सुरु गर्नुहोस्",
    descEn: "Foundational AI concepts, ChatGPT fundamentals, prompt engineering basics, and practical exercises.",
    descNp: "AI का आधारभूत कुराहरू, ChatGPT प्रयोग र प्रम्प्ट इन्जिनियरिङ सिक्नुहोस्।",
    badgeColor: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    modules: [
      {
        id: "beg-m1",
        slug: "ai-basics-intro",
        title: "Understanding Artificial Intelligence Simply",
        subtitle: "AI का आधारभूत कुराहरू सरल रूपमा",
        duration: "10 min",
        level: "Beginner",
        objectives: [
          { en: "Explain AI in plain Nepali and English.", ne: "सरल नेपाली र अंग्रेजीमा AI को व्याख्या गर्न।" },
          { en: "Recognize AI applications in daily life.", ne: "दैनिक जीवनमा AI को प्रयोग पहिचान गर्न।" },
        ],
        content: [
          {
            type: "heading",
            text: "What is AI?",
            textNe: "AI भनेको के हो?",
          },
          {
            type: "paragraph",
            text: "Artificial Intelligence is teaching machines to think, learn, and assist humans intelligently.",
            textNe: "कृत्रिम बुद्धिमत्ता (AI) भनेको मेसिनहरूलाई सोच्न, सिक्न र मानिसलाई मद्दत गर्न सक्षम बनाउनु हो।",
          },
        ],
        examples: [
          {
            title: "Everyday AI",
            titleNe: "दैनिक जीवनको AI",
            desc: "Google Maps route navigation and smartphone face unlock.",
            descNe: "गुगल म्याप्सको बाटो देखाउने र फोनको अनुहार पहिचान।",
          },
        ],
        practice: {
          task: "Ask ChatGPT a simple question.",
          taskNe: "ChatGPT मा एउटा सरल प्रश्न सोध्नुहोस्।",
          action: "Open ChatGPT and type: 'Explain what AI is in simple terms in Nepali.'",
          actionNe: "ChatGPT खोल्नुहोस् र सोध्नुहोस्: 'AI भनेको के हो सरल शब्दमा नेपालीमा बुझाउनुहोस्।'",
        },
        quiz: [
          {
            question: "Is AI meant to assist humans in daily tasks?",
            options: ["Yes", "No"],
            answer: 0,
            explanation: "AI acts as a powerful assistant to enhance human productivity.",
          },
        ],
      },
    ],
  },
};
