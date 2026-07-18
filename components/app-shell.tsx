"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BarChart3,
  CarFront,
  ClipboardList,
  Gauge,
  Shield,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/checklist",
    label: "Checklist",
    icon: ClipboardList
  },
  {
    href: "/drivers",
    label: "Drivers",
    icon: Users
  },
  {
    href: "/teams",
    label: "Teams",
    icon: Shield
  },
  {
    href: "/rookies",
    label: "Rookies",
    icon: BadgeCheck
  },
  {
    href: "/progress",
    label: "Progress",
    icon: BarChart3
  }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/70 shadow-glow backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/checklist" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/80 bg-[linear-gradient(135deg,rgba(255,77,123,0.22),rgba(163,255,18,0.22),rgba(20,166,255,0.22))] text-signal shadow-glow">
              <CarFront className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-normal text-ink">
                GridLedger
              </span>
              <span className="block text-xs text-zinc-500">
                2025 Chrome F1 checklist
              </span>
            </span>
          </Link>

          <nav className="scrollbar-soft flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition",
                    active
                      ? "border-signal/30 bg-[linear-gradient(135deg,rgba(255,77,123,0.14),rgba(20,166,255,0.1))] text-signal shadow-glow"
                      : "border-white/70 bg-white/60 text-zinc-600 hover:border-lilac/25 hover:bg-white/85 hover:text-ink"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/65 px-3 py-1 text-xs font-medium uppercase text-zinc-500 shadow-glow backdrop-blur">
              <Gauge className="h-3.5 w-3.5 text-champagne" aria-hidden />
              Personal checklist MVP
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
