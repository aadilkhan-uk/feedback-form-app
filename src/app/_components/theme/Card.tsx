import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "solid";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "glass",
}) => {
  const variantClasses = {
    default: "bg-white/5 border border-white/10",
    glass: "bg-white/5 border border-white/10 backdrop-blur-md",
    solid: "bg-white/10 border border-white/20",
  };

  return (
    <div
      className={`rounded-lg p-3 md:rounded-xl md:p-5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
