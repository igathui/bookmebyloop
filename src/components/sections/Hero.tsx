"use client";

import Image from "next/image";
import logoImg from "@/assets/images/logo.png";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

export default function Hero({
  badge = "🔖 Appointment Scheduling",
  description = "A Web Application Concept for a Mini-App for the Loop Consumer Platform.",
  buttons = {
    primary: {
      text: "Sign Up",
      url: "/signup",
    },
    secondary: {
      text: "Log In",
      url: "/login",
    },
  },
}: HeroProps) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              Welcome to
              <br />
              <span className="text-orange-600">BookMe! by Loop </span>
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="max-h-96 w-full items-center justify-items-center rounded-md object-cover opacity-50">
            <Image src={logoImg} alt="hero image" className="h-72 w-72" />
          </div>
        </div>
      </div>
    </section>
  );
}
