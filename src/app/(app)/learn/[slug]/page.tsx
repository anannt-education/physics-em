import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LESSONS, lessonBySlug } from "@/content/lessons";
import { LessonView } from "@/components/lesson/LessonView";
import { JsonLd } from "@/components/json-ld";
import { PUBLIC_LESSONS } from "@/lib/mount";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  const publicLesson = PUBLIC_LESSONS.find((l) => l.slug === slug);
  if (!lesson) {
    return pageMetadata({
      title: "Lesson not on this desk",
      description: "That Physics C E&M lesson is not in the two public sittings.",
      path: `/learn/${slug}`,
      index: false,
    });
  }
  if (publicLesson) {
    return pageMetadata({
      title: publicLesson.title,
      description: publicLesson.blurb.slice(0, 158),
      path: publicLesson.path,
    });
  }
  return pageMetadata({
    title: lesson.title,
    description: `${lesson.title} sits behind the study gate. Two public E&M lessons are open. Anannt, Dubai.`,
    path: `/learn/${slug}`,
    index: false,
  });
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  if (!lesson) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: lesson.title, path: `/learn/${slug}` },
        ])}
      />
      <LessonView lesson={lesson} />
    </>
  );
}
