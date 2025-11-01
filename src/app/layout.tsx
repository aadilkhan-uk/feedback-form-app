import "root/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "root/trpc/react";

export const metadata: Metadata = {
  title: {
    template: "%s | Choppaluna",
    default: "Choppaluna Feedback",
  },
  description: "Share your dining experience with us",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col">
              {/* Header Banner with Logo */}
              <header className="bg-white py-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center">
                    <a
                      href="https://choppaluna.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80"
                    >
                      <img
                        src="/assets/logo.png"
                        alt="Company Logo"
                        className="h-auto w-20 max-w-48"
                      />
                    </a>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1">{children}</main>
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
