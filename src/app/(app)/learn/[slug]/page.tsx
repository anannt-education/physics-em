import { notFound } from "next/navigation";
import { LESSONS, lessonBySlug } from "@/content/lessons";
import { LessonView } from "@/components/lesson/LessonView";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  if (!lesson) notFound();
  return <LessonView lesson={lesson} />;
}
