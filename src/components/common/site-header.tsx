"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Convert a slug like "business-profile" to a human-readable title: "Business Profile"
function humanizeSlug(slug: string): string {
  if (!slug) return "Home";
  let s = slug;
  try {
    s = decodeURIComponent(slug);
  } catch {
    // ignore decode errors and use raw slug
  }
  return s
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const lastSegment = pathname?.split("/").filter(Boolean).pop() ?? "";
  const pageName = humanizeSlug(lastSegment);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageName || "Home"}</h1>
      </div>
    </header>
  );
}
