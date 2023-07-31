"use client";

import { FC, useState } from "react";
import { ButtonLogin } from "./button-login";
import { Sidebar, SidebarClose } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const Header: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <header className="flex items-center justify-center w-full p-4 border-b fixed h-16 bg-background/70 backdrop-blur-xl z-10 top-0 dark:border-foreground/30">
      <main className="max-w-screen-sm w-full flex justify-between items-center px-4 translate-x-0">
        <div className="flex gap-2 transition-all items-center justify-center">
          {sidebarOpen ? (
            <SidebarClose
              size={24}
              className="md:hidden active:scale-90 transition-all cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <Sidebar
              size={24}
              className="md:hidden active:scale-90 transition-all cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
          <h1 className="text-lg font-bold ">Home</h1>
        </div>
        <ModeToggle />
        <ButtonLogin />
      </main>
    </header>
  );
};
