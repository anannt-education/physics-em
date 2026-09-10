"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  FlaskConical,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageCircleQuestion,
  NotebookPen,
  Timer,
} from "lucide-react";
import { AnanntLogo } from "@/components/layout/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PUBLIC_LESSONS } from "@/lib/mount";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStudent } from "@/lib/store/student-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/plan", label: "My Plan", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/investigations", label: "Investigations", icon: FlaskConical },
  { href: "/mocks", label: "Mock Exams", icon: Timer },
  { href: "/notebook", label: "Mistake Notebook", icon: NotebookPen },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/ask", label: "Ask Anannt", icon: MessageCircleQuestion },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useStudent();
  const reduced = state.profile?.accessibility.reducedMotion;
  const large = state.profile?.accessibility.largeText;

  return (
    <div className={cn("min-h-dvh bg-background", reduced && "reduce-motion", large && "large-text")}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-amber focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-sidebar-border bg-navy text-sidebar-foreground">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:px-6">
          <Sheet>
            <SheetTrigger className="inline-flex size-8 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-navy text-sidebar-foreground w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <AnanntLogo inverse />
                </SheetTitle>
              </SheetHeader>
              <NavList pathname={pathname} className="mt-4 flex flex-col gap-1 p-2" />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <AnanntLogo inverse />
          </Link>
          <Link href={PUBLIC_LESSONS[0].path} className="hidden text-xs text-amber-soft sm:inline">
            Two lessons open
          </Link>
          <nav className="ml-4 hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-[0.78rem] font-medium whitespace-nowrap transition-colors",
                    active
                      ? "bg-sidebar-accent text-amber-soft"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2 text-[0.7rem] text-sidebar-foreground/80">
            <span className="hidden sm:inline">May 2027 profile</span>
            <Link href="/progress" className="rounded-full border border-amber/40 px-2 py-0.5 text-amber-soft">
              {state.entitlement.tier === "free" ? "Free diagnostic" : state.entitlement.tier}
            </Link>
          </div>
        </div>
      </header>
      <div id="main" className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}

function NavList({ pathname, className }: { pathname: string; className?: string }) {
  return (
    <nav className={className} aria-label="Mobile primary">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
              active ? "bg-sidebar-accent text-amber-soft" : "hover:bg-sidebar-accent",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
