import React from "react";
import { SocialIcon } from "./SocialIcon";

interface FooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ children, className = "" }) => {
  return (
    <footer className={`mt-auto bg-black/20 py-8 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        {children || (
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent-green)]"
              >
                GIFT CERTIFICATE
              </a>
              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent-green)]"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent-green)]"
              >
                T&C's
              </a>
              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent-green)]"
              >
                ALLERGEN INFORMATION
              </a>
              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent-green)]"
              >
                NUTRITION INFORMATION
              </a>
              <span>COPYRIGHT CHOPPALUNA 2024</span>
            </div>
            <div className="flex gap-3">
              <SocialIcon platform="instagram" href="#" />
              <SocialIcon platform="facebook" href="#" />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
