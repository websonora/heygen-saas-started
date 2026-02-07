"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { UserAvatar } from "@/components/dashboard/user-avatar";

interface HeaderProps {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}

export function Header({ email, fullName, avatarUrl }: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle className="text-left text-sm font-semibold">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <SidebarNav />
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <UserAvatar email={email} fullName={fullName} avatarUrl={avatarUrl} />
      </div>
    </header>
  );
}
