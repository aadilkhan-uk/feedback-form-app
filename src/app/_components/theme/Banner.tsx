import React from "react";

interface BannerProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export const Banner: React.FC<BannerProps> = ({
  children,
  className = "",
  rotation = -2,
}) => {
  return (
    <div
      className={`my-4 inline-block rounded-lg bg-[var(--color-accent-green)] px-8 py-4 text-xl font-bold tracking-widest text-[var(--color-text-white)] uppercase ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
};
