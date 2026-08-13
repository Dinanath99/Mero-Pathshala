import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, CheckCircle, ChevronDown, Clock, PlayCircle, Star, Target, Users, BookMarked, Wrench, Shield, Lightbulb, ChevronRight } from 'lucide-react';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';
import { useGetBlogsQuery, useGetCategoriesQuery } from '@/features/api/blogApi';
import { aiBasicsRoadmap } from './aiBasicsData';

const tools = [
  { name: 'ChatGPT', description: 'Versatile AI assistant for text, code, and brainstorming.', url: 'https://chat.openai.com', color: 'bg-green-100 text-green-600' },
  { name: 'Google Gemini', description: 'Google\'s advanced multimodal AI model.', url: 'https://gemini.google.com', color: 'bg-blue-100 text-blue-600' },
  { name: 'Claude', description: 'Highly capable and safe AI by Anthropic.', url: 'https://claude.ai', color: 'bg-orange-100 text-orange-600' },
  { name: 'Perplexity', description: 'AI-powered conversational search engine.', url: 'https://perplexity.ai', color: 'bg-indigo-100 text-indigo-600' },
];

const faqs = [
  { q: 'What is AI?', qNe: 'AI भनेको के हो?', a: 'AI (Artificial Intelligence) refers to computer systems that can perform tasks normally requiring human intelligence, such as visual perception, speech recognition, and decision-making.', aNe: 'AI (कृत्रिम बुद्धिमत्ता) भन्नाले यस्तो कम्प्युटर प्रणालीलाई जनाउँछ जसले मानव बुद्धि आवश्यक पर्ने कामहरू जस्तै हेर्ने, सुन्ने, र निर्णय लिने कार्य गर्न सक्छ।' },
  { q: 'Can beginners learn AI?', qNe: 'के शुरुवातकर्ताहरूले AI सिक्न सक्छन्?', a: 'Absolutely! Our beginner paths are designed for people with no prior experience.', aNe: 'पक्कै! हाम्रा शुरुवातकर्ताहरूको लागि बनाइएका सामग्रीहरू कुनै पूर्व ज्ञान नभएका व्यक्तिहरूको लागि हुन्।' },
  { q: 'Do I need coding?', qNe: 'के मलाई कोडिङ चाहिन्छ?', a: 'For basics and using AI tools, no coding is required. For advanced AI development, basic Python is helpful.', aNe: 'AI का आधारभूत कुराहरू र टुलहरू प्रयोग गर्न कोडिङ आवश्यक पर्दैन। तर, AI विकास गर्न सामान्य पाइथन (Python) जान्नु राम्रो हुन्छ।' },
  { q: 'Is this free?', qNe: 'के यो निःशुल्क हो?', a: 'The basics and roadmap tutorials are free. We also offer premium courses for deep dives.', aNe: 'आधारभूत कुराहरू र रोडम्यापका ट्युटोरियलहरू निःशुल्क छन्। थप गहिरो ज्ञानको लागि हामी प्रिमियम कोर्सहरू पनि दिन्छौं।' },
];

const AccordionItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border dark:border-slate-800 rounded-xl mb-3 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:border-orange-200 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-4 md:p-5 font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center focus:outline-none"
      >
        <div>
          <h4 className="text-base">{faq.q}</h4>
          <h5 className="text-sm text-gray-500 font-medium mt-1">{faq.qNe}</h5>
        </div>
        <ChevronDown className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out px-4 md:px-5 ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{faq.a}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{faq.aNe}</p>
      </div>
    </div>
  );
};

const AIBasics = () => {
  // Fetch a featured course
  const { data: courseData } = useGetPublishedCourseQuery();
  const recommendedCourse = courseData?.courses?.[0]; // just grab the first one

  // Fetch blogs (optional dynamic integration)
  const { data: categoryData } = useGetCategoriesQuery();
  const aiCategory = categoryData?.categories?.find(c => c.slug === 'ai-basics' || c.name.toLowerCase().includes('ai'));
  const { data: blogsData } = useGetBlogsQuery({ category: aiCategory?._id }, { skip: !aiCategory });
  
  // Use fetched blogs or fallback to dummy data if none exist yet
  const displayedBlogs = blogsData?.blogs?.length > 0 ? blogsData.blogs.slice(0, 3) : [
    { _id: '1', title: 'Top 10 Prompt Engineering Tips', titleNe: 'प्रम्प्ट इन्जिनियरिङका १० टिप्स', readTime: '5 min read' },
    { _id: '2', title: 'How ChatGPT is changing education', titleNe: 'शिक्षामा ChatGPT को प्रभाव', readTime: '8 min read' },
    { _id: '3', title: 'Getting Started with Google Gemini', titleNe: 'Google Gemini को सुरुवात', readTime: '6 min read' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/learn-ai" className="hover:text-orange-500">Learn</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 dark:text-gray-100">AI Basics</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-3xl">
            <Badge className="bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border-orange-500/30 mb-6 py-1.5 px-4 font-semibold text-sm">
              Learning Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 tracking-tight">
              Learn Artificial Intelligence from Scratch
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-6">
              सुरुदेखि कृत्रिम बुद्धिमत्ता (AI) सिक्नुहोस्
            </h2>
            <p className="text-slate-300 text-lg mb-2">
              Start your AI journey with beginner-friendly lessons, practical examples, blogs, AI tools, and recommended courses.
            </p>
            <p className="text-slate-400 mb-8 font-medium">
              AI को यात्रा सुरुदेखि सुरु गर्नुहोस्। सजिलो भाषामा सिक्नुहोस्, अभ्यास गर्नुहोस्, र आफ्नो सीप विकास गर्नुहोस्।
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 shadow-lg shadow-orange-500/30">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700 hover:text-white rounded-full px-8 font-bold">
                View AI Course
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-16">
            
            {/* Track 1: Digital Skills Level 1 Banner */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border-2 border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white font-black text-[10px] px-2.5 py-0.5">
                    LEVEL 1: PREREQUISITE
                  </Badge>
                  <span className="text-xs font-bold text-gray-500">कम्प्युटरका आधारभूत ज्ञान</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  Computer Fundamentals Academy (12 Lessons)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xl">
                  Complete beginner course on hardware, software, CPU, RAM, storage, operating systems, and real-life digital skills in Nepal.
                </p>
              </div>

              <Button asChild className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-6 py-5 shrink-0 shadow-md">
                <Link to="/learn/computer-skills">
                  Start Track 1 →
                </Link>
              </Button>
            </section>

            {/* Learning Roadmap */}
            <section id="roadmap">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Basics Learning Roadmap (Level 2)</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">AI अध्ययनको मार्गचित्र</p>
                </div>
              </div>
              
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                {aiBasicsRoadmap.map((mod, idx) => (
                  <div key={mod.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* Timeline dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#020817] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-200 transition-colors">
                      {mod.type === 'video' ? <PlayCircle size={18} /> : mod.type === 'quiz' ? <CheckCircle size={18} /> : <BookOpen size={18} />}
                    </div>
                    
                    {/* Card */}
                    <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] shadow-sm hover:shadow-md transition-shadow border dark:border-slate-800">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-none font-semibold">
                            Module {mod.id}
                          </Badge>
                          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                            <Clock size={12} /> {mod.duration}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">{mod.title}</h4>
                        <h5 className="text-sm text-gray-500 font-medium mb-4">{mod.subtitle}</h5>
                        <Button asChild variant="secondary" size="sm" className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold rounded-lg">
                          <Link to={`/learn/ai-basics/${mod.slug}`}>
                            {mod.type === 'quiz' ? 'Take Quiz' : 'Start Module'}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended AI Tools */}
            <section id="tools">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Wrench size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended AI Tools</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">सिफारिस गरिएका AI उपकरणहरू</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool, i) => (
                  <a href={tool.url} target="_blank" rel="noreferrer" key={i} className="group block">
                    <Card className="h-full border dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors shadow-sm">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl ${tool.color}`}>
                          {tool.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{tool.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>

            {/* Recommended Course */}
            <section id="course">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                  <Star size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended Premium Course</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">सिफारिस गरिएको प्रिमियम कोर्स</p>
                </div>
              </div>
              
              {recommendedCourse ? (
                <Card className="overflow-hidden border dark:border-slate-800 shadow-md hover:shadow-lg transition-shadow group">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 aspect-video sm:aspect-auto overflow-hidden">
                      <img src={recommendedCourse.courseThumbnail || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"} alt={recommendedCourse.courseTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                      <Badge className="w-fit mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Bestseller</Badge>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{recommendedCourse.courseTitle}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Users size={14} /> {recommendedCourse.enrolledStudents?.length || 0} Students</span>
                        <span className="flex items-center gap-1"><Shield size={14} /> {recommendedCourse.courseLevel}</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-2xl text-orange-600 dark:text-orange-400">Rs. {recommendedCourse.coursePrice}</span>
                        <Button asChild className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 font-semibold rounded-full px-6">
                          <Link to={`/course-detail/${recommendedCourse._id}`}>Enroll Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="border dark:border-slate-800 p-8 text-center text-gray-500 bg-gray-50 dark:bg-slate-900/50 shadow-inner">
                  <p>Our featured AI course is launching soon!</p>
                </Card>
              )}
            </section>

            {/* FAQs */}
            <section id="faqs">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">प्रायः सोधिने प्रश्नहरू</p>
                </div>
              </div>
              <div>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} faq={faq} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Progress Box */}
              <Card className="border dark:border-slate-800 shadow-sm bg-orange-50 dark:bg-orange-950/20">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Your Progress</h4>
                  <div className="w-full bg-orange-200 dark:bg-slate-800 rounded-full h-2.5 mb-2">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">0% Completed (0/6 modules)</p>
                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 rounded-full">Sign in to track</Button>
                </CardContent>
              </Card>

              {/* Related Blogs */}
              <Card className="border dark:border-slate-800 shadow-sm">
                <div className="p-5 border-b dark:border-slate-800 flex items-center gap-2">
                  <BookMarked size={18} className="text-orange-500" />
                  <h4 className="font-bold text-gray-900 dark:text-white">Related Blogs</h4>
                </div>
                <CardContent className="p-0">
                  <div className="flex flex-col divide-y dark:divide-slate-800">
                    {displayedBlogs.map((blog, idx) => (
                      <Link to={blog.slug ? `/blog/${blog.slug}` : '#'} key={idx} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover:text-orange-500 line-clamp-2 leading-tight">{blog.title}</h5>
                        {blog.titleNe && <h6 className="text-xs text-gray-500 font-medium mt-1 mb-2">{blog.titleNe}</h6>}
                        <span className="text-xs text-gray-400">{blog.readTime || '5 min read'}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-4 border-t dark:border-slate-800 text-center">
                    <Link to="/blogs" className="text-sm font-bold text-orange-500 hover:text-orange-600">View All Resources →</Link>
                  </div>
                </CardContent>
              </Card>

            </div>
          </aside>

        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gray-900 dark:bg-slate-900 rounded-3xl p-10 text-center shadow-xl border dark:border-slate-800">
          <h2 className="text-3xl font-bold text-white mb-2">Ready to continue your AI journey?</h2>
          <p className="text-gray-400 mb-8 font-medium">अब आफ्नो AI यात्रा अगाडि बढाउन तयार हुनुहुन्छ?</p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-10 shadow-lg shadow-orange-500/20">
            <Link to="/course/search">Explore All Courses</Link>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AIBasics;
