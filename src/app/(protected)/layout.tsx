import SidebarLayout from "@/components/layouts/sidebar-layout";
import React from "react";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
