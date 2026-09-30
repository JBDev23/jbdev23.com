import { siteConfig } from '@/config/site';

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.owner,
    "jobTitle": "Full Stack Software Engineer",
    "url": siteConfig.url,
    "sameAs": [
      siteConfig.links.github,
      siteConfig.links.linkedin
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
