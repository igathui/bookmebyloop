import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import logoImg from "@/assets/images/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content - Multiple Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info Column */}
          <div className="justify-items-center">
            {/* <h3 className="mb-4 text-lg font-semibold">About Us</h3> */}
            <Image src={logoImg} alt="logo" className="my-4 h-10 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are dedicated to providing exceptional service and innovative
              solutions to meet your needs. Our team is committed to excellence
              and customer satisfaction.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/appointments"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              {/* <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              > */}
              <Facebook className="h-5 w-5" />
              {/* </Link> */}
              {/* <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              > */}
              <Twitter className="h-5 w-5" />
              {/* </Link> */}
              {/* <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              > */}
              <Instagram className="h-5 w-5" />
              {/* </Link> */}
              {/* <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              > */}
              <Linkedin className="h-5 w-5" />
              {/* </Link> */}
            </div>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="mt-8 border-t pt-6">
          <p className="text-muted-foreground text-center text-sm">
            © {currentYear} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
