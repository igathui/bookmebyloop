"use client";

import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/images/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-border bg-background border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex-shrink-0">
          <Image
            src={logoImg}
            alt="Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Button
            className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            variant="ghost"
            asChild
          >
            <Link href="/dashboard">Home</Link>
          </Button>
          <Button
            className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            variant="ghost"
            asChild
          >
            <Link href="/appointments">Appointments</Link>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex" asChild>
            <Link href="/">Logout</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-border bg-background border-t md:hidden">
          <div className="space-y-1 px-4 pt-2 pb-3">
            <Button
              className="text-foreground hover:text-primary w-full justify-start text-sm font-medium transition-colors"
              variant="ghost"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/dashboard">Home</Link>
            </Button>
            <Button
              className="text-foreground hover:text-primary w-full justify-start text-sm font-medium transition-colors"
              variant="ghost"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/appointments">Appointments</Link>
            </Button>
            <Button
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/">Logout</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
