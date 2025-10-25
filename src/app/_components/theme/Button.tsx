import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "font-sans font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer border-none";

  const variantClasses = {
    primary:
      "bg-[var(--color-accent-pink)] text-[var(--color-text-white)] hover:bg-[#D67A7A] hover:-translate-y-0.5",
    secondary:
      "bg-[var(--color-accent-green)] text-[var(--color-text-white)] hover:bg-[#5BC9A3] hover:-translate-y-0.5",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:transform-none"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};
