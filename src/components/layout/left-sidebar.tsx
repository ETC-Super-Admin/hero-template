'use client';

import { useSidebar } from "@/contexts/sidebar-context";
import clsx from "clsx";

export const LeftSidebar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={clsx(
        "flex-col items-center justify-start py-16 px-4 border-r border-divider w-64",
        isSidebarOpen ? "flex" : "hidden"
      )}
    >
      <div className="text-lg font-semibold">Left Sidebar</div>
      <p className="text-default-500">Content goes here</p>
    </aside>
  );
};
