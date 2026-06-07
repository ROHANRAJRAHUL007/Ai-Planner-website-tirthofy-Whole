"use client";

import { useState } from "react";

import SidebarAuth from "@/app/components/sidebar/SidebarAuthDesign";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarNewChat from "./SidebarNewChat";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`
        ${open ? "w-64" : "w-20"}
        bg-black text-white
        border-r border-zinc-800
        h-screen p-5
        transition-all duration-300
      `}
    >
      <SidebarHeader open={open} setOpen={setOpen} />

      <SidebarMenu open={open} />

      <SidebarNewChat open={open} />

      <SidebarAuth open={open} />
    </div>
  );
}
