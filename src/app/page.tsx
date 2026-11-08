import LenisProvider from "@/components/site/lenis-provider";
import IntroLoader from "@/components/site/intro-loader";
import PageChrome from "@/components/site/page-chrome";
import CookieNotice from "@/components/site/cookie-notice";
import HeroSection from "@/components/site/hero";
import ProfileSection from "@/components/site/profile";
import ProjectsSection from "@/components/site/projects";
import AiLabSection from "@/components/site/ai-lab";
import ExperienceSection from "@/components/site/experience";
import SkillsetSection from "@/components/site/skillset";
import ContactSection from "@/components/site/contact";
import SiteFooter from "@/components/site/site-footer";
import { SITE } from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  description:
    "Kamlesh Mali is a manual QA tester based in Pune and Surat, India, with experience across e-commerce, healthcare, transportation and legal domains, and a daily AI-assisted testing workflow.",
  email: `mailto:${SITE.email}`,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  workLocation: {
    "@type": "PostalAddress",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [SITE.linkedin, SITE.instagram],
  knowsAbout: [
    "Manual Testing",
    "Functional Testing",
    "Regression Testing",
    "UAT",
    "API Testing",
    "Postman",
    "Shopify App Testing",
    "AI-Assisted Testing",
    "SQL",
    "Agile Methodology",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "North Maharashtra University" },
    { "@type": "EducationalOrganization", name: "Maharashtra State Board of Technical Education" },
  ],
};

export default function Home() {
  return (
    <LenisProvider>
      <IntroLoader />
      <PageChrome />

      <div className="flex min-h-screen flex-col">
        <main className="flex w-full flex-1 flex-col">
          <HeroSection />
          <ProfileSection />
          <ProjectsSection />
          <AiLabSection />
          <ExperienceSection />
          <SkillsetSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>

      <CookieNotice />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
    </LenisProvider>
  );
}
