import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "AI Guru Nepal — Learn Artificial Intelligence in Nepali & English",
  description = "Nepal's premier AI education platform. Master ChatGPT, Prompt Engineering, Machine Learning, Python, and AI tools in simple Nepali and English.",
  keywords = "AI Guru Nepal, Learn AI Nepal, Artificial Intelligence Course Nepal, ChatGPT Nepali, Prompt Engineering Nepal, AI Learning Hub",
  image = "https://aigurunepal.com/og-image.png",
  url = "https://aigurunepal.com",
  type = "website",
}) => {
  const fullTitle = `${title} | AI Guru Nepal`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AI Guru Nepal" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
