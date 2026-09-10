import type { Metadata } from "next";
import {
  CLASH_HOME,
  HONESTY,
  SITE_ORIGIN,
  SITE_URL as MOUNT_SITE_URL,
  absUrl,
} from "@/lib/mount";

export const ORG_NAME = "Anannt Education";
export const PRODUCT_NAME = "Anannt Study";
export const TITLE_BRAND = "Anannt Study";
export const SITE_URL = MOUNT_SITE_URL;

export const DEFAULT_TITLE = "Physics C: E&M self-prep · May 2027 · Anannt Study";
export const DEFAULT_DESCRIPTION =
  "Two public calculus E&M lessons. Wednesday 5 May 2027 Session 2 clashes with Physics 1. Pick one sitting. Not a complete course. Anannt Education, Dubai.";

export function pageTitle(page: string) {
  if (page === DEFAULT_TITLE) return page;
  const suffix = ` · ${TITLE_BRAND}`;
  const max = 70;
  if (page.length + suffix.length <= max) return `${page}${suffix}`;
  const budget = Math.max(12, max - suffix.length - 1);
  return `${page.slice(0, budget).trim()}…${suffix}`;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = absUrl(path);
  const fullTitle = pageTitle(title);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: ORG_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function jsonLdGraph() {
  const url = SITE_URL;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${url}/#organization`,
        name: ORG_NAME,
        url: SITE_ORIGIN,
        email: "wecare@anannt.ae",
        telephone: "+971585853551",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Office 105, Bank Street Building, Burjuman Metro Exit 2",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        description: HONESTY,
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: PRODUCT_NAME,
        url,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "Course",
        "@id": `${url}/#course`,
        name: "AP Physics C: Electricity and Magnetism — two public lessons",
        description: `${HONESTY} ${CLASH_HOME}`,
        provider: { "@id": `${url}/#organization` },
        educationalLevel: "High school",
        inLanguage: "en",
        isAccessibleForFree: true,
        teaches: "Gauss’s law: net flux versus local field. Coulomb integration for a finite line of charge.",
        hasCourseInstance: {
          "@type": "CourseInstance",
          name: "Two public E&M lessons · May 2027 sitting choice",
          courseMode: "online",
          courseWorkload: "PT70M",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function faqJsonLd(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export { SITE_ORIGIN } from "@/lib/mount";
