'use client';

import React from "react";
import { Button } from "@heroui/button";
import { useSidebar } from "@/contexts/sidebar-context";
import { MenuIcon } from "lucide-react";

export const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button isIconOnly onClick={toggleSidebar} aria-label="Toggle sidebar" variant="light">
      <MenuIcon />
    </Button>
  );
};
